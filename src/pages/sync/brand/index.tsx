import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBan } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import { getBrandSynchronizationDetails, insertSBrandDetails, insertTBrandDetails, updateSBrandDetails, updateTBrandDetails } from '../../../api/api';
import { BrandSynchronizationDetails, DbSBrand, DbTBrand, FreshSBrand, FreshTBrand } from '../../../api/types';
import BackLink from '../../../components/BackLink';
import Spinner from '../../../components/Spinner';

const BrandSyncPapge: React.FC = () => {
  const [apiSmBrands, setApiSmBrands] = useState<FreshSBrand[] | null>(null);
  const [dbSmBrands, setDbSmBrands] = useState<DbSBrand[] | null>(null);
  const [apiTrayBrands, setApiTrayBrands] = useState<FreshTBrand[] | null>(null);
  const [dbTrayBrands, setDbTrayBrands] = useState<DbTBrand[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    setIsLoading(true);
    const response: BrandSynchronizationDetails = await getBrandSynchronizationDetails();
    setIsLoading(false);

    if (!response) {
      // redirect to an error page
      navigate('/error');
      return;
    }

    setApiSmBrands(response.apiSmBrands);
    setDbSmBrands(response.dbSmBrands);
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


  const upsertSBrand = async (apiBrand: FreshSBrand) => {
    setErrorMsg(null);
    // check exising brand
    const existingBrand = dbSmBrands?.find((dbBrand) => dbBrand.brandId === +apiBrand.id);
    try {
      if (existingBrand) {
        // update
        const updatedDbBrand = await updateSBrandDetails(apiBrand);
        console.log('updatedDbBrand', JSON.stringify(updatedDbBrand));

        if (updatedDbBrand) {
          // replace element from the array with the updated one
          const index = dbSmBrands?.findIndex((dbBrand) => dbBrand.brandId === updatedDbBrand.brandId);
          if (index !== undefined && index !== null && index !== -1) {
            dbSmBrands?.splice(index, 1);
            console.log('dbSmBrands splice ', dbSmBrands);
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
      setErrorMsg('Error saving Tray brand');
    }
  };

  return (
    <>
      <BackLink link="/" text="Back to Home Page" />
      {errorMsg && <Message severity='error' text={errorMsg} />}
      <div></div>
      {isLoading ? <Spinner /> :
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
            <h2 className="my-table-h2">Market Place Brands</h2>
            {apiSmBrands && (
              <DataTable className="my-datatable" value={apiSmBrands} header="SM Brands">
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
          <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
            <h2 className="my-table-h2">FS Integrator Brands</h2>
            {dbSmBrands && (
              <DataTable className="my-datatable" value={dbSmBrands} header="SM Brands">
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
                  body={(rowData) => {
                    if (rowData.active === 1) {
                      return (
                        <>
                          <button>
                            <FontAwesomeIcon icon={faBan} />
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <button>
                            <FontAwesomeIcon icon={faCircleCheck} />
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </>
                      );
                    }
                  }}
                  style={{ width: '20%' }}
                ></Column>
              </DataTable>
            )}
          </div>
          <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
            {apiTrayBrands && (
              <DataTable className="my-datatable" value={apiTrayBrands} header="Tray Brands">
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
          <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
            {dbTrayBrands && (
              <DataTable className="my-datatable" value={dbTrayBrands} header="Tray Brands">
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
                  body={(rowData) => {
                    if (rowData.active === 1) {
                      return (
                        <>
                          <button>
                            <FontAwesomeIcon icon={faBan} />
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <button>
                            <FontAwesomeIcon icon={faCircleCheck} />
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </>
                      );
                    }
                  }}
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

export default BrandSyncPapge;
