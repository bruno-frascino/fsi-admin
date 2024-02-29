import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBan } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import { deleteTBrandDetails, getTrayBrandSyncDetails, insertTBrandDetails, updateTBrandDetails, updateTBrandStatus } from '../../../../api/api';
import { DbTBrand, FreshTBrand, TrayBrandSyncDetails } from '../../../../api/types';
import BackLink from '../../../../components/BackLink';
import Spinner from '../../../../components/Spinner';

const TrayBrandSyncPage: React.FC = () => {
  const [apiTrayBrands, setApiTrayBrands] = useState<FreshTBrand[] | null>(null);
  const [dbTrayBrands, setDbTrayBrands] = useState<DbTBrand[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    setIsLoading(true);
    const response: TrayBrandSyncDetails = await getTrayBrandSyncDetails();
    setIsLoading(false);

    if (!response) {
      // redirect to an error page
      navigate('/error');
      return;
    }

    setApiTrayBrands(response.apiTrayBrands);
    setDbTrayBrands(response.dbTrayBrands);
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

  const upsertTBrand = async (apiBrand: FreshTBrand) => {
    setErrorMsg(null);
    const existingBrand = dbTrayBrands?.find((dbBrand) => {
      // apiBrand fields type are changed to string
      return dbBrand.brandId === +apiBrand.id; // convert apiBrand.id to number
    });
    try {
      if (existingBrand) {
        // update
        const updatedDbBrand = await updateTBrandDetails(apiBrand);

        if (updatedDbBrand) {
          // replace element from the array with the updated one
          const index = dbTrayBrands?.findIndex((dbBrand) => dbBrand.brandId === updatedDbBrand.brandId);
          if (index !== undefined && index !== null && index !== -1) {
            let newDbTrayBrands = dbTrayBrands?.splice(index, 1);
            if (updatedDbBrand && newDbTrayBrands) {
              newDbTrayBrands = [...newDbTrayBrands, updatedDbBrand];
              setDbTrayBrands(newDbTrayBrands.sort((a, b) => a.brandId - b.brandId));
              return;
            }
          }
        }
      } else {
        // insert
        const insertDbBrand = await insertTBrandDetails(apiBrand);
        if (insertDbBrand && dbTrayBrands) {
          // sort dbTrayBrands by brandId
          const newBrands = [...dbTrayBrands, insertDbBrand];
          setDbTrayBrands(newBrands.sort((a, b) => a.brandId - b.brandId));
          return;
        }
      }

      // set an error message in the state if we get here
      setErrorMsg('Error saving Tray brand');
    } catch (error) {
      // set an error message in the state
      setErrorMsg('Error saving Tray brand');
    }
  };

  const updateStatus = async (dbBrand: DbTBrand) => {
    setErrorMsg(null);
    // switch status
    dbBrand.active = dbBrand.active === 1 ? 0 : 1;
    const updatedDbBrand = await updateTBrandStatus(dbBrand);
    if (updatedDbBrand) {
      // replace element from the array with the updated one
      const index = dbTrayBrands?.findIndex((dbBrand) => dbBrand.brandId === updatedDbBrand.brandId);
      if (index !== undefined && index !== null && index !== -1) {
        dbTrayBrands?.splice(index, 1);
        if (updatedDbBrand && dbTrayBrands) {
          const newDbBrands = [...dbTrayBrands, updatedDbBrand];
          setDbTrayBrands(newDbBrands.sort((a, b) => a.brandId - b.brandId));
          return;
        }
      }
    }
    // set an error message in the state
    setErrorMsg('Error updating Tray brand status');
  }

  const deleteTBrand = async (dbTBrand: DbTBrand) => {
    setErrorMsg(null);
    const deleteOk = await deleteTBrandDetails(dbTBrand.id);
    if (deleteOk) {
      // remove element from the array
      const index = dbTrayBrands?.findIndex((dbBrand) => dbBrand.id === dbTBrand.id);
      if (index !== undefined && index !== null && index !== -1) {
        dbTrayBrands?.splice(index, 1);
        if (dbTrayBrands) {
          const newDbBrands = [...dbTrayBrands];
          setDbTrayBrands(newDbBrands.sort((a, b) => a.brandId - b.brandId));
          return;
        }
      }
    }
    // set an error message in the state
    setErrorMsg('Error deleting Tray brand');
  };

  return (
    <>
      <BackLink link="/" text="Back to Home Page" />
      {errorMsg && <Message severity='error' text={errorMsg} />}
      <div></div>
      {isLoading ? <Spinner /> :
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ minHeight: '50vh' }}>
            <h2 className="my-table-h2">Tray Brands</h2>
            {apiTrayBrands && (
              <DataTable className="my-datatable" value={apiTrayBrands}>
                <Column field="id" header="ID"></Column>
                <Column field="brand" header="Brand"></Column>
                <Column
                  field="action"
                  header="Action"
                  body={(rowData) => (
                    <button onClick={() => upsertTBrand(rowData)}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  )}
                  style={{ width: '15%' }}
                ></Column>
              </DataTable>
            )}
          </div>
          <div style={{ minHeight: '50vh' }}>
            <h2 className="my-table-h2">Tray Integrator Brands</h2>
            {dbTrayBrands && (
              <DataTable className="my-datatable" value={dbTrayBrands}>
                <Column field="brandId" header="ID"></Column>
                <Column field="brand" header="Brand"></Column>
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
                      <button onClick={() => deleteTBrand(rowData)}>
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

export default TrayBrandSyncPage;
