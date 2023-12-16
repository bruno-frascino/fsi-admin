import { useEffect, useState } from "react";
import { BrandSynchronizationDetails, FreshSBrand, DbSBrand, FreshTBrand, DbTBrand } from "../../../api/types";
import { getBrandSynchronizationDetails } from "../../../api/api";
import PageHeader from "../../../components/PageHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const SyncBrandPage = () => {
  const [apiSmBrands, setApiSmBrands] = useState<FreshSBrand[] | null>(null);
  const [dbSmBrands, setDbSmBrands] = useState<DbSBrand[] | null>(null);
  const [apiTrayBrands, setApiTrayBrands] = useState<FreshTBrand[] | null>(null);
  const [dbTrayBrands, setDbTrayBrands] = useState<DbTBrand[] | null>(null);

  useEffect(() => {
    console.log('SyncBrandPage');

    const fetchSyncData = async () => {
      const response: BrandSynchronizationDetails = await getBrandSynchronizationDetails();
      setApiSmBrands(response.apiSmBrands);
      setDbSmBrands(response.dbSmBrands);
      setApiTrayBrands(response.apiTrayBrands);
      setDbTrayBrands(response.dbTrayBrands);
    }

    fetchSyncData();

  } , []);

  return (
    <>
    <PageHeader />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div>
        <h2>API SM Brands</h2>
        {apiSmBrands && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apiSmBrands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>
                <td>{brand.name}</td>
                <td><FontAwesomeIcon icon={faEdit} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
        <h2>DB SM Brands</h2>
        {dbSmBrands && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dbSmBrands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>
                <td>{brand.name}</td>
                <td>{/* Action goes here */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
        <h2>API Tray Brands</h2>
        {apiTrayBrands && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apiTrayBrands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>
                <td>{brand.brand}</td>
                <td><FontAwesomeIcon icon={faEdit} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
        <h2>DB Tray Brands</h2>
        {dbTrayBrands && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dbTrayBrands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>
                <td>{brand.brand}</td>
                <td>{/* Action goes here */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
    </>
  );
}

export default SyncBrandPage;