import { deleteSCategoryDetails, getSmCategorySyncDetails, insertSCategoryDetails, updateSCategoryDetails, updateSCategoryStatus } from '../../../../api/api';
import { DbSCategory, FreshSCategory, SmCategorySyncDetails } from '../../../../api/types';
import BackLink from '../../../../components/BackLink';
import Spinner from '../../../../components/Spinner';
import { faArrowRight, faBan, faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Message } from "primereact/message";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SmCategorySyncPage = () => {
  const [apiSmCategories, setApiSmCategories] = useState<FreshSCategory[] | null>(null);
  const [dbSmCategories, setDbSmCategories] = useState<DbSCategory[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    setIsLoading(true);
    const response: SmCategorySyncDetails = await getSmCategorySyncDetails();
    setIsLoading(false);

    if (!response) {
      // redirect to an error page
      navigate('/error');
      return;
    }

    setApiSmCategories(response.apiSmCategories);
    setDbSmCategories(response.dbSmCategories);
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

  const updateStatus = async (dbCategory: DbSCategory) => {
    setErrorMsg(null);
    // switch status
    dbCategory.fsActive = dbCategory.fsActive === 1 ? 0 : 1;
    const updatedDbCategory = await updateSCategoryStatus(dbCategory);
    if (updatedDbCategory) {
      // replace element from the array with the updated one
      const index = dbSmCategories?.findIndex((dbCategory) =>
        dbCategory.categoryId === updatedDbCategory.categoryId);
      if (index !== undefined && index !== null && index !== -1) {
        dbSmCategories?.splice(index, 1);
        if (updatedDbCategory && dbSmCategories) {
          const newDbSmCategories = [...dbSmCategories, updatedDbCategory];
          setDbSmCategories(newDbSmCategories.sort((a, b) => a.categoryId - b.categoryId));
          return;
        }
      }
    }
    // set an error message in the state
    setErrorMsg('Error updating SM category status');
  }

  const upsertSCategory = async (apiCategory: FreshSCategory) => {
    setErrorMsg(null);
    // check exising
    const existingCategory = dbSmCategories?.find((dbCategory) => dbCategory.categoryId === +apiCategory.id);
    try {
      if (existingCategory) {
        // update
        const updatedDbCategory = await updateSCategoryDetails(apiCategory);

        if (updatedDbCategory) {
          // replace element from the array with the updated one
          const index = dbSmCategories?.findIndex((dbCategory) => dbCategory.categoryId === updatedDbCategory.categoryId);
          if (index !== undefined && index !== null && index !== -1) {
            dbSmCategories?.splice(index, 1);
            if (updatedDbCategory && dbSmCategories) {
              const newDbSmCategorys = [...dbSmCategories, updatedDbCategory];
              setDbSmCategories(newDbSmCategorys.sort((a, b) => a.categoryId - b.categoryId));
              return;
            }
          }
        }
      } else {
        // insert
        const insertDbCategory = await insertSCategoryDetails(apiCategory);
        if (insertDbCategory && dbSmCategories) {
          // sort dbSmCategories by categoryId
          const newCategorys = [...dbSmCategories, insertDbCategory];
          setDbSmCategories(newCategorys.sort((a, b) => a.categoryId - b.categoryId));
          return;
        }
      }
      // set an error message in the state if we get here
      setErrorMsg('Error saving SM category');

      // await fetchSyncData();
    } catch (error) {
      // set an error message in the state
      setErrorMsg('Error saving SM category');
    }
  };

  const deleteSCategory = async (dbSCategory: DbSCategory) => {
    setErrorMsg(null);
    const deleteOk = await deleteSCategoryDetails(dbSCategory.id);
    if (deleteOk) {
      // remove element from the array
      const index = dbSmCategories?.findIndex((dbCategory) => dbCategory.id === dbSCategory.id);
      if (index !== undefined && index !== null && index !== -1) {
        dbSmCategories?.splice(index, 1);
        if (dbSmCategories) {
          const newDbSmCategorys = [...dbSmCategories];
          setDbSmCategories(newDbSmCategorys.sort((a, b) => a.categoryId - b.categoryId));
          return;
        }
      }
    }
    // set an error message in the state
    setErrorMsg('Error deleting SM category');
  };

  return (
    <>
      <BackLink link="/" text="Back to Home Page" />
      {errorMsg && <Message severity='error' text={errorMsg} />}
      <div></div>
      {isLoading ? <Spinner /> :
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ minHeight: '50vh' }}>
            <h2 className="my-table-h2">Farmer Shop Categories</h2>
            {apiSmCategories && (
              <DataTable className="my-datatable" value={apiSmCategories}>
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
                    <button onClick={() => upsertSCategory(rowData)}>
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
            {dbSmCategories && (
              <DataTable className="my-datatable" value={dbSmCategories}>
                <Column field="categoryId" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="parentId" header="Parent"></Column>
                <Column field="active" header="Active" style={{ width: '15%' }}
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
                      <button onClick={() => deleteSCategory(rowData)}>
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

export default SmCategorySyncPage;
