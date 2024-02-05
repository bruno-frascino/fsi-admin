import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { faArrowRight, faBan, faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCategorySynchronizationDetails, insertCategoryDetails, updateCategoryDetails } from '../../../api/api';
import BackLink from '../../../components/BackLink';
import {
  CategorySynchronizationDetails,
  DbSCategory,
  DbTCategory,
  FreshSCategory,
  FreshTCategory,
} from '../../../api/types';

const SyncCategoryPage: React.FC = () => {
  const [apiSmCategories, setApiSmCategories] = useState<FreshSCategory[] | null>(null);
  const [dbSmCategories, setDbSmCategories] = useState<DbSCategory[] | null>(null);
  const [apiTrayCategories, setApiTrayCategories] = useState<FreshTCategory[] | null>(null);
  const [dbTrayCategories, setDbTrayCategories] = useState<DbTCategory[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    const response: CategorySynchronizationDetails = await getCategorySynchronizationDetails();

    if (!response) {
      // redirect to an error page
      navigate('/error');
      return;
    }

    setApiSmCategories(response.apiSmCategories);
    setDbSmCategories(response.dbSmCategories);
    setApiTrayCategories(response.apiTrayCategories);
    setDbTrayCategories(response.dbTrayCategories);
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

  const upsertCategory = async (category: FreshSCategory) => {
    // check exising brand
    const existingCategory = dbSmCategories?.find((cat) => cat.id === category.id);
    try {
      if (existingCategory) {
        // update
        await updateCategoryDetails(category);
      } else {
        // insert
        await insertCategoryDetails(category);
      }
      // update table state
      await fetchSyncData();
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
          <h2 className="my-table-h2">Market Place Categories</h2>
          {apiSmCategories && (
            <DataTable className="my-datatable" value={apiSmCategories} header="SM Categories">
              <Column field="id" header="ID"></Column>
              <Column field="name" header="Name"></Column>
              <Column
                field="action"
                header="Action"
                body={(rowData) => (
                  <button onClick={() => upsertCategory(rowData)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
                style={{ width: '15%' }}
              ></Column>
            </DataTable>
          )}
        </div>
        <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
          <h2 className="my-table-h2">FS Integrator Categories</h2>
          {dbSmCategories && (
            <DataTable className="my-datatable" value={dbSmCategories} header="SM Categories">
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
          {apiTrayCategories && (
            <DataTable className="my-datatable" value={apiTrayCategories} header="Tray Categories">
              <Column field="id" header="ID"></Column>
              <Column field="name" header="Name"></Column>
              <Column
                field="action"
                header="Action"
                body={(rowData) => (
                  <button onClick={() => upsertCategory(rowData)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
                style={{ width: '15%' }}
              ></Column>
            </DataTable>
          )}
        </div>
        <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
          {dbTrayCategories && (
            <DataTable className="my-datatable" value={dbTrayCategories} header="Tray Categories">
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
      </div>
    </>
  );
};

export default SyncCategoryPage;
