import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import { correlateBrands, getBrandSynchronizationDetails, unrelateBrands } from '../../../api/api';
import { BrandSyncData, BrandSyncDetails, BrandSyncResult, DbTBrand } from '../../../api/types';
import BackLink from '../../../components/BackLink';
import Spinner from '../../../components/Spinner';

const BrandSyncPapge: React.FC = () => {
  const [brandSyncData, setBrandSyncData] = useState<BrandSyncData[] | null>(null);
  const [unsyncedTBrands, setUnsyncedTBrands] = useState<DbTBrand[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>();

  const navigate = useNavigate();

  const fetchSyncData = async () => {
    setIsLoading(true);
    const response: BrandSyncDetails = await getBrandSynchronizationDetails();
    setIsLoading(false);

    if (!response) {
      // redirect to an error page
      navigate('/error');
      return;
    }

    setBrandSyncData(response.brandSyncData);
    setUnsyncedTBrands(response.unsyncedTBrands);
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

  const correlateTBrand = async (tId: number, tBrandId: number, tBrandName: string) => {
    setErrorMsg(null);
    if (!selectedFarmerId) return;
    await correlateBrands({ sId: Number.parseInt(selectedFarmerId, 0), tId });
    if (brandSyncData) {
      // find the brand with sId and update the tBrandId
      const syncBrand = brandSyncData.find((brand) => brand.sId === Number.parseInt(selectedFarmerId, 0));
      // find the not mapped tBrand by tBrandId and remove it from the list
      unsyncedTBrands?.splice(unsyncedTBrands?.findIndex((brand) => brand.brandId === tBrandId), 1);
      setUnsyncedTBrands(unsyncedTBrands);
      if (syncBrand) {
        syncBrand.tBrandId = tBrandId;
        syncBrand.tBrand = tBrandName;
        setBrandSyncData([...brandSyncData].sort((a, b) => a.sBrandId - b.sBrandId));
        setSelectedFarmerId(undefined);
        return;
      }
    }
    setErrorMsg('Failed to correlate brands');
  };

  const unrelateTBrand = async (sId: number) => {
    setErrorMsg(null);
    const brandSyncResult: BrandSyncResult = await unrelateBrands({ sId });
    if (brandSyncResult) {
      if (brandSyncData) {
        // 
        // const syncBrand = brandSyncData.find((brand) => brand.sId === sId);
        const index = brandSyncData.findIndex((brand) => brand.sId === sId)
        if (index !== undefined && index !== null && index !== -1) {
          // remove old
          brandSyncData.splice(index, 1);
          if (brandSyncResult.brandSyncData) {
            // add new one
            const newBrandSyncData = [...brandSyncData, brandSyncResult.brandSyncData];
            setBrandSyncData(newBrandSyncData.sort((a, b) => a.sBrandId - b.sBrandId));
          }
        }
      }
      if (unsyncedTBrands) {
        const newUnsyncedTBrand = brandSyncResult.unsyncedTBrand;
        const newUnsyncedTBrands = [...unsyncedTBrands, newUnsyncedTBrand];
        setUnsyncedTBrands(newUnsyncedTBrands.sort((a, b) => a.brandId - b.brandId));
        return;
      }
    }
    setErrorMsg('Failed to unrelate brands');
  }

  return (
    <>
      <BackLink link="/" text="Back to Home Page" />
      {errorMsg && <Message severity='error' text={errorMsg} />}
      <div></div>
      {isLoading ? <Spinner /> :
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
            <h2 className="my-table-h2">Tray Brands Not Mapped</h2>
            {unsyncedTBrands && (
              <DataTable className="my-datatable" value={unsyncedTBrands}>
                <Column field="brandId" header="ID"></Column>
                <Column field="brand" header="Brand"></Column>
                <Column
                  field="action"
                  header="Action"
                  body={(rowData) => (
                    <button onClick={() => correlateTBrand(rowData.id, rowData.brandId, rowData.brand)}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  )}
                  style={{ width: '15%' }}
                ></Column>
              </DataTable>
            )}
          </div>
          <div style={{ minHeight: '50vh', maxHeight: '50vh' }}>
            <h2 className="my-table-h2">Brand Map</h2>
            {brandSyncData && (
              <DataTable className="my-datatable" value={brandSyncData}>
                <Column
                  field="sId"
                  header="Select"
                  body={(rowData) => (
                    rowData.tBrandId === null ? (
                      <input
                        type="radio"
                        value={rowData.sId}
                        checked={selectedFarmerId === String(rowData.sId)}
                        onChange={handleRadioChange}
                      />
                    ) : (
                      <button onClick={() => unrelateTBrand(rowData.sId)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                    )
                  )}
                />
                <Column field="sBrandId" header="Farmer Id"></Column>
                <Column field="tBrandId" header="Tray Id"></Column>
                <Column field="sName" header="Farmer Brand"></Column>
                <Column field="tBrand" header="Tray Brand"></Column>
              </DataTable>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default BrandSyncPapge;
