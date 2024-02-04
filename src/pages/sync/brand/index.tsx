import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBan } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { getBrandSynchronizationDetails, insertBrandDetails, updateBrandDetails } from '../../../api/api';
import { BrandSynchronizationDetails, DbSBrand, DbTBrand, FreshSBrand, FreshTBrand } from '../../../api/types';
import BackLink from '../../../components/BackLink';

const SyncBrandPage: React.FC = () => {
  const [apiSmBrands, setApiSmBrands] = useState<FreshSBrand[] | null>(null);
  const [dbSmBrands, setDbSmBrands] = useState<DbSBrand[] | null>(null);
  const [apiTrayBrands, setApiTrayBrands] = useState<FreshTBrand[] | null>(null);
  const [dbTrayBrands, setDbTrayBrands] = useState<DbTBrand[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    const response: BrandSynchronizationDetails = await getBrandSynchronizationDetails();
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
    if (isMounted) {
      fetchSyncData();
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const upsertBrand = async (brand: FreshSBrand) => {
    // check exising brand
    const existingBrand = dbSmBrands?.find((b) => b.id === brand.id);
    try {
      if (existingBrand) {
        // update
        await updateBrandDetails(brand);
      } else {
        // insert
        await insertBrandDetails(brand);
      }
      // update table state
      // await fetchSyncData();
    } catch (error) {
      // set an error message in the state
      setErrorMsg('Error saving brand');
    }
  };

  return (
    <>
      <BackLink link="/" text="Back to Home Page" />
      {errorMsg && <div className="error">{errorMsg}</div>}
      <div></div>
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
                  <button onClick={() => upsertBrand(rowData)}>
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
              <Column field="id" header="ID"></Column>
              <Column field="name" header="Name"></Column>
              <Column
                field="action"
                header="Action"
                body={(rowData) => (
                  <>
                    <button>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </>
                )}
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
                  <button onClick={() => upsertBrand(rowData)}>
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
              <Column field="id" header="ID"></Column>
              <Column field="brand" header="Brand"></Column>
              <Column
                field="action"
                header="Action"
                body={(rowData) => (
                  <>
                    <button>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                    <button>
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
    </>
  );
};

export default SyncBrandPage;
