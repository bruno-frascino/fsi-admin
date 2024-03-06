import { deleteTCategoryDetails, getTrayCategorySyncDetails, insertTCategoryDetails, updateTCategoryDetails, updateTCategoryStatus } from '../../../../api/api';
import { DbTCategory, FreshTCategory, TrayCategorySyncDetails } from '../../../../api/types';
import BackLink from '../../../../components/BackLink';
import Spinner from '../../../../components/Spinner';
import { faArrowRight, faBan, faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Message } from "primereact/message";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrayCategorySyncPage = () => {
  const [apiTrayCategories, setApiTrayCategories] = useState<FreshTCategory[] | null>(null);
  const [dbTrayCategories, setDbTrayCategories] = useState<DbTCategory[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    setIsLoading(true);
    const response: TrayCategorySyncDetails = await getTrayCategorySyncDetails();
    setIsLoading(false);

    if (!response) {
      // redirect to an error page
      navigate('/error');
      return;
    }

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

  const updateStatus = async (dbCategory: DbTCategory) => {
    setErrorMsg(null);
    // switch status
    dbCategory.fsActive = dbCategory.fsActive === 1 ? 0 : 1;
    const updatedDbCategory = await updateTCategoryStatus(dbCategory);
    if (updatedDbCategory) {
      // replace element from the array with the updated one
      const index = dbTrayCategories?.findIndex((dbCategory) =>
        dbCategory.categoryId === updatedDbCategory.categoryId);
      if (index !== undefined && index !== null && index !== -1) {
        dbTrayCategories?.splice(index, 1);
        if (updatedDbCategory && dbTrayCategories) {
          const newDbCategories = [...dbTrayCategories, updatedDbCategory];
          setDbTrayCategories(newDbCategories.sort((a, b) => a.categoryId - b.categoryId));
          return;
        }
      }
    }
    // set an error message in the state
    setErrorMsg('Error updating Tray category status');
  }

  const upsertTCategory = async (apiCategory: FreshTCategory) => {
    setErrorMsg(null);
    // check exising
    const existingCategory = dbTrayCategories?.find((dbCategory) => dbCategory.categoryId === +apiCategory.id);
    try {
      if (existingCategory) {
        // update
        const updatedDbCategory = await updateTCategoryDetails(apiCategory);
        console.log(`updatedDbCategory: ${JSON.stringify(updatedDbCategory)}`);
        if (updatedDbCategory) {
          // replace element from the array with the updated one
          const index = dbTrayCategories?.findIndex((dbCategory) => dbCategory.categoryId === updatedDbCategory.categoryId);
          if (index !== undefined && index !== null && index !== -1) {
            console.log(`index: ${index}`);
            dbTrayCategories?.splice(index, 1);
            if (updatedDbCategory && dbTrayCategories) {
              console.log('Got here');
              const newDbSmCategories = [...dbTrayCategories, updatedDbCategory];
              setDbTrayCategories(newDbSmCategories.sort((a, b) => a.categoryId - b.categoryId));
              return;
            }
          }
        }
      } else {
        // insert
        const insertDbCategory = await insertTCategoryDetails(apiCategory);
        if (insertDbCategory && dbTrayCategories) {
          // sort dbTrayCategories by categoryId
          const newCategorys = [...dbTrayCategories, insertDbCategory];
          setDbTrayCategories(newCategorys.sort((a, b) => a.categoryId - b.categoryId));
          return;
        }
      }
      // set an error message in the state if we get here
      setErrorMsg('Error saving Tray category');

      // await fetchSyncData();
    } catch (error) {
      // set an error message in the state
      setErrorMsg('Error saving Tray category');
    }
  };

  const deleteTCategory = async (dbTCategory: DbTCategory) => {
    setErrorMsg(null);
    const deleteOk = await deleteTCategoryDetails(dbTCategory.id);
    if (deleteOk) {
      // remove element from the array
      const index = dbTrayCategories?.findIndex((dbCategory) => dbCategory.id === dbTCategory.id);
      if (index !== undefined && index !== null && index !== -1) {
        dbTrayCategories?.splice(index, 1);
        if (dbTrayCategories) {
          const newDbCategories = [...dbTrayCategories];
          setDbTrayCategories(newDbCategories.sort((a, b) => a.categoryId - b.categoryId));
          return;
        }
      }
    }
    // set an error message in the state
    setErrorMsg('Error deleting Tray category');
  };

  return (
    <>
      <BackLink link="/" text="Back to Home Page" />
      {errorMsg && <Message severity='error' text={errorMsg} />}
      <div></div>
      {isLoading ? <Spinner /> :
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ minHeight: '50vh' }}>
            <h2 className="my-table-h2">Tray Categories</h2>
            {apiTrayCategories && (
              <DataTable className="my-datatable" value={apiTrayCategories}>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="parent_id" header="Parent"></Column>
                <Column field="active" header="Active"
                  body={(rowData) => {
                    return rowData.active ?
                      <FontAwesomeIcon icon={faCircleCheck} />
                      : <FontAwesomeIcon icon={faBan} />;
                  }}></Column>
                <Column
                  field="action"
                  header="Action"
                  body={(rowData) => (
                    <button onClick={() => upsertTCategory(rowData)}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  )}
                  style={{ width: '15%' }}
                ></Column>
              </DataTable>
            )}
          </div>
          <div style={{ minHeight: '50vh' }}>
            <h2 className="my-table-h2">FS Integrator Categories</h2>
            {dbTrayCategories && (
              <DataTable className="my-datatable" value={dbTrayCategories}>
                <Column field="categoryId" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="parentId" header="Parent"></Column>
                <Column field="fsActive" header="Active" style={{ width: '15%' }}
                  body={(rowData) => {
                    return rowData.fsActive ?
                      <FontAwesomeIcon icon={faCircleCheck} />
                      : <FontAwesomeIcon icon={faBan} />;
                  }}></Column>
                <Column
                  field="action"
                  header="Action"
                  body={(rowData) => (
                    <>
                      {rowData.fsActive === 1 ? (
                        <button onClick={() => updateStatus(rowData)}>
                          <FontAwesomeIcon icon={faBan} />
                        </button>
                      ) : (
                        <button onClick={() => updateStatus(rowData)}>
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </button>
                      )}
                      <button onClick={() => deleteTCategory(rowData)}>
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
}

export default TrayCategorySyncPage;