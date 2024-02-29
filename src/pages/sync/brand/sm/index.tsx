import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBan } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import { deleteSBrandDetails, getSmBrandSyncDetails, insertSBrandDetails, updateSBrandDetails, updateSBrandStatus } from '../../../../api/api';
import { DbSBrand, FreshSBrand, SmBrandSyncDetails } from '../../../../api/types';
import BackLink from '../../../../components/BackLink';
import Spinner from '../../../../components/Spinner';

const SmBrandSyncPage: React.FC = () => {
  const [apiSmBrands, setApiSmBrands] = useState<FreshSBrand[] | null>(null);
  const [dbSmBrands, setDbSmBrands] = useState<DbSBrand[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    setIsLoading(true);
    const response: SmBrandSyncDetails = await getSmBrandSyncDetails();
    setIsLoading(false);

    if (!response) {
      // redirect to an error page
      navigate('/error');
      return;
    }

    setApiSmBrands(response.apiSmBrands);
    setDbSmBrands(response.dbSmBrands);
  };

  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted.current) {
      fetchSyncData();
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const updateStatus = async (dbBrand: DbSBrand) => {
    setErrorMsg(null);
    // switch status
    dbBrand.active = dbBrand.active === 1 ? 0 : 1;
    const updatedDbBrand = await updateSBrandStatus(dbBrand);
    if (updatedDbBrand) {
      // replace element from the array with the updated one
      const index = dbSmBrands?.findIndex((dbBrand) => dbBrand.brandId === updatedDbBrand.brandId);
      if (index !== undefined && index !== null && index !== -1) {
        dbSmBrands?.splice(index, 1);
        if (updatedDbBrand && dbSmBrands) {
          const newDbSmBrands = [...dbSmBrands, updatedDbBrand];
          setDbSmBrands(newDbSmBrands.sort((a, b) => a.brandId - b.brandId));
          return;
        }
      }
    }
    // set an error message in the state
    setErrorMsg('Error updating SM brand status');
  }

  const upsertSBrand = async (apiBrand: FreshSBrand) => {
    setErrorMsg(null);
    // check exising brand
    const existingBrand = dbSmBrands?.find((dbBrand) => dbBrand.brandId === +apiBrand.id);
    try {
      if (existingBrand) {
        // update
        const updatedDbBrand = await updateSBrandDetails(apiBrand);

        if (updatedDbBrand) {
          // replace element from the array with the updated one
          const index = dbSmBrands?.findIndex((dbBrand) => dbBrand.brandId === updatedDbBrand.brandId);
          if (index !== undefined && index !== null && index !== -1) {
            dbSmBrands?.splice(index, 1);
            if (updatedDbBrand && dbSmBrands) {
              const newDbSmBrands = [...dbSmBrands, updatedDbBrand];
              setDbSmBrands(newDbSmBrands.sort((a, b) => a.brandId - b.brandId));
              return;
            }
          }
        }
      } else {
        // insert
        const insertDbBrand = await insertSBrandDetails(apiBrand);
        if (insertDbBrand && dbSmBrands) {
          // sort dbSmBrands by brandId
          const newBrands = [...dbSmBrands, insertDbBrand];
          setDbSmBrands(newBrands.sort((a, b) => a.brandId - b.brandId));
          return;
        }
      }
      // set an error message in the state if we get here
      setErrorMsg('Error saving SM brand');

      // await fetchSyncData();
    } catch (error) {
      // set an error message in the state
      setErrorMsg('Error saving SM brand');
    }
  };

  const deleteSBrand = async (dbSBrand: DbSBrand) => {
    setErrorMsg(null);
    const deleteOk = await deleteSBrandDetails(dbSBrand.id);
    if (deleteOk) {
      // remove element from the array
      const index = dbSmBrands?.findIndex((dbBrand) => dbBrand.id === dbSBrand.id);
      if (index !== undefined && index !== null && index !== -1) {
        dbSmBrands?.splice(index, 1);
        if (dbSmBrands) {
          const newDbSmBrands = [...dbSmBrands];
          setDbSmBrands(newDbSmBrands.sort((a, b) => a.brandId - b.brandId));
          return;
        }
      }
    }
    // set an error message in the state
    setErrorMsg('Error deleting SM brand');
  };

  return (
    <>
      <BackLink link="/" text="Back to Home Page" />
      {errorMsg && <Message severity='error' text={errorMsg} />}
      <div></div>
      {isLoading ? <Spinner /> :
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ minHeight: '50vh' }}>
            <h2 className="my-table-h2">Farmer Shop Brands</h2>
            {apiSmBrands && (
              <DataTable className="my-datatable" value={apiSmBrands}>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column
                  field="action"
                  header="Action"
                  body={(rowData) => (
                    <button onClick={() => upsertSBrand(rowData)}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  )}
                  style={{ width: '15%' }}
                ></Column>
              </DataTable>
            )}
          </div>
          <div style={{ minHeight: '50vh' }}>
            <h2 className="my-table-h2">FS Integrator Brands</h2>
            {dbSmBrands && (
              <DataTable className="my-datatable" value={dbSmBrands}>
                <Column field="brandId" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="active" header="Active" style={{ width: '15%' }}
                  body={(rowData) => {
                    return rowData.active ?
                      <FontAwesomeIcon icon={faCircleCheck} />
                      : <FontAwesomeIcon icon={faBan} />;
                  }}></Column>
                <Column
                  field="action"
                  header="Action"
                  body={(rowData) => (
                    <>
                      {rowData.active === 1 ? (
                        <button onClick={() => updateStatus(rowData)}>
                          <FontAwesomeIcon icon={faBan} />
                        </button>
                      ) : (
                        <button onClick={() => updateStatus(rowData)}>
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </button>
                      )}
                      <button onClick={() => deleteSBrand(rowData)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </>
                  )}
                  style={{ width: '20%' }}
                ></Column>
              </DataTable>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default SmBrandSyncPage;
