import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { correlateCategories, getCategorySynchronizationDetails, unrelateCategories } from '../../../api/api';
import BackLink from '../../../components/BackLink';
import {
  CategorySyncData,
  CategorySyncDetails,
  CategorySyncResult,
  DbTCategory,
} from '../../../api/types';
import Spinner from '../../../components/Spinner';

const CategorySyncPage: React.FC = () => {
  const [categorySyncData, setCategorySyncData] = useState<CategorySyncData[] | null>(null);
  const [unsyncedTCategories, setUnsyncedTCategories] = useState<DbTCategory[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>();

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    setIsLoading(true);
    const response: CategorySyncDetails = await getCategorySynchronizationDetails();
    setIsLoading(false);

    if (!response) {
      // redirect to an error page
      navigate('/error');
      return;
    }

    setCategorySyncData(response.categorySyncData);
    setUnsyncedTCategories(response.unsyncedTCategories);
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFarmerId(e.target.value);
  };

  const correlateTCategory = async (tId: number, tCategoryId: number, tName: string) => {
    setErrorMsg(null);
    if (!selectedFarmerId) return;
    await correlateCategories({ sId: Number.parseInt(selectedFarmerId, 0), tId });
    if (categorySyncData) {
      // find the category with sId and update the tCategoryId
      const syncCategory = categorySyncData.find((category) => category.sId === Number.parseInt(selectedFarmerId, 0));
      // find the not mapped tCategory by tCategoryId and remove it from the list
      unsyncedTCategories?.splice(unsyncedTCategories?.findIndex((category) => category.categoryId === tCategoryId), 1);
      setUnsyncedTCategories(unsyncedTCategories);
      if (syncCategory) {
        syncCategory.tCategoryId = tCategoryId;
        syncCategory.tName = tName;
        setCategorySyncData([...categorySyncData].sort((a, b) => a.sCategoryId - b.sCategoryId));
        setSelectedFarmerId(undefined);
        return;
      }
    }
    setErrorMsg('Failed to correlate categories');
  };

  const unrelateTCategory = async (sId: number) => {
    setErrorMsg(null);
    const categorySyncResult: CategorySyncResult = await unrelateCategories({ sId });
    if (categorySyncResult) {
      if (categorySyncData) {
        const index = categorySyncData.findIndex((category) => category.sId === sId)
        if (index !== undefined && index !== null && index !== -1) {
          // remove old
          categorySyncData.splice(index, 1);
          if (categorySyncResult.categorySyncData) {
            // add new one
            const newCategorySyncData = [...categorySyncData, categorySyncResult.categorySyncData];
            setCategorySyncData(newCategorySyncData.sort((a, b) => a.sCategoryId - b.sCategoryId));
          }
        }
      }
      if (unsyncedTCategories) {
        const newUnsyncedTCategory = categorySyncResult.unsyncedTCategory;
        const newUnsyncedTCategories = [...unsyncedTCategories, newUnsyncedTCategory];
        setUnsyncedTCategories(newUnsyncedTCategories.sort((a, b) => a.categoryId - b.categoryId));
        return;
      }
    }
    setErrorMsg('Failed to unrelate categories');
  };

  return (
    <>
      <BackLink link="/" text="Back to Home Page" />
      {errorMsg && <div className="error">{errorMsg}</div>}
      <div></div>
      {isLoading ? <Spinner /> :
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
            <h2 className="my-table-h2">Tray Categories Not Mapped</h2>
            {unsyncedTCategories && (
              <DataTable className="my-datatable" value={unsyncedTCategories}>
                <Column field="categoryId" header="ID"></Column>
                <Column field="name" header="Category"></Column>
                <Column
                  field="action"
                  header="Action"
                  body={(rowData) => (
                    <button onClick={() => correlateTCategory(rowData.id, rowData.categoryId, rowData.name)}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  )}
                  style={{ width: '15%' }}
                ></Column>
              </DataTable>
            )}
          </div>
          <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
            <h2 className="my-table-h2">Category Map</h2>
            {categorySyncData && (
              <DataTable className="my-datatable" value={categorySyncData}>
                <Column
                  field="sId"
                  header="Select"
                  body={(rowData) => (
                    rowData.tCategoryId === null ? (
                      <input
                        type="radio"
                        value={rowData.sId}
                        checked={selectedFarmerId === String(rowData.sId)}
                        onChange={handleRadioChange}
                      />
                    ) : (
                      <button onClick={() => unrelateTCategory(rowData.sId)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                    )
                  )}
                />
                <Column field="sCategoryId" header="Farmer Id"></Column>
                <Column field="tCategoryId" header="Tray Id"></Column>
                <Column field="sName" header="Farmer Category"></Column>
                <Column field="tName" header="Tray Category"></Column>
              </DataTable>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default CategorySyncPage;
