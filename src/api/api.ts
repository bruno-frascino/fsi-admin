import axios from 'axios';
import log from '../logger';
import { mockBrandSyncDetails, mockCategorySynchronizationDetails } from './mock';
import { DbSBrand, DbSCategory, DbTBrand, FreshSBrand, FreshSCategory, FreshTBrand } from './types';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const isStandAlone = (process.env.REACT_APP_IS_STAND_ALONE && process.env.REACT_APP_IS_STAND_ALONE === 'true') || false;

export async function getBrandSynchronizationDetails(): Promise<any> {
  try {
    if (isStandAlone) return mockBrandSyncDetails;

    const response = await axios.get(`${apiUrl}/synchronization/brand`);
    return response.data;
  } catch (error) {
    log.error(`Failed to get brand synchronization details with error: ${error}`);
    return undefined;
  }
}

export async function getSmBrandSyncDetails(): Promise<any> {
  try {
    if (isStandAlone) return mockBrandSyncDetails;

    const response = await axios.get(`${apiUrl}/synchronization/sm/brand`);
    return response.data;
  } catch (error) {
    log.error(`Failed to get SM brand synchronization details with error: ${error}`);
    return undefined;
  }
}

export async function getSmCategorySyncDetails(): Promise<any> {
  try {
    if (isStandAlone) return mockBrandSyncDetails;

    const response = await axios.get(`${apiUrl}/synchronization/sm/category`);
    return response.data;
  } catch (error) {
    log.error(`Failed to get SM category synchronization details with error: ${error}`);
    return undefined;
  }
}

export async function getTrayBrandSyncDetails(): Promise<any> {
  try {
    if (isStandAlone) return mockBrandSyncDetails;

    const response = await axios.get(`${apiUrl}/synchronization/tray/brand`);
    return response.data;
  } catch (error) {
    log.error(`Failed to get Tray brand synchronization details with error: ${error}`);
    return undefined;
  }
}

export async function insertSBrandDetails(apiBrand: FreshSBrand) {
  try {
    const dbBrand = await axios.post(`${apiUrl}/brand/sm`, apiBrand);
    return dbBrand.data;
  } catch (error) {
    log.error(`Failed to insert sBrand details with error: ${error}`);
  }
}

export async function insertSCategoryDetails(apiCategory: FreshSCategory) {
  try {
    const dbCategory = await axios.post(`${apiUrl}/category/sm`, apiCategory);
    return dbCategory.data;
  } catch (error) {
    log.error(`Failed to insert sCategory details with error: ${error}`);
  }
}

export async function updateSBrandDetails(apiBrand: FreshSBrand) {
  try {
    const dbBrand = await axios.put(`${apiUrl}/brand/sm`, apiBrand);
    return dbBrand.data;
  } catch (error) {
    log.error(`Failed to update sBrand details with error: ${error}`);
  }
}

export async function updateSCategoryDetails(apiCategory: FreshSCategory) {
  try {
    const dbCategory = await axios.put(`${apiUrl}/category/sm`, apiCategory);
    return dbCategory.data;
  } catch (error) {
    log.error(`Failed to update sCategory details with error: ${error}`);
  }
}

export async function updateSBrandStatus(dbSBrand: DbSBrand) {
  try {
    const updatedDbBrand = await axios.put(`${apiUrl}/brand/fsi-sm`, dbSBrand);
    return updatedDbBrand.data;
  } catch (error) {
    log.error(`Failed to update sBrand status with error: ${error}`);
  }
}

export async function updateSCategoryStatus(dbSCategory: DbSCategory) {
  try {
    const updatedDbCategory = await axios.put(`${apiUrl}/category/fsi-sm`, dbSCategory);
    return updatedDbCategory.data;
  } catch (error) {
    log.error(`Failed to update sCategory status with error: ${error}`);
  }
}

export async function deleteSBrandDetails(id: number) {
  try {
    const result = await axios.delete(`${apiUrl}/brand/sm/${id}`);
    return result.data > 0;
  } catch (error) {
    log.error(`Failed to delete sBrand details with error: ${error}`);
  }
}

export async function deleteSCategoryDetails(id: number) {
  try {
    const result = await axios.delete(`${apiUrl}/category/sm/${id}`);
    return result.data > 0;
  } catch (error) {
    log.error(`Failed to delete sCategory details with error: ${error}`);
  }
}

export async function insertTBrandDetails(apiBrand: FreshTBrand) {
  try {
    const dbBrand = await axios.post(`${apiUrl}/brand/tray`, apiBrand);
    return dbBrand.data;
  } catch (error) {
    log.error(`Failed to insert tBrand details with error: ${error}`);
  }
}

export async function updateTBrandDetails(apiBrand: FreshTBrand) {
  try {
    log.info(`Updating tBrand details with: ${JSON.stringify(apiBrand)}`);
    const dbBrand = await axios.put(`${apiUrl}/brand/tray`, apiBrand);
    return dbBrand.data;
  } catch (error) {
    log.error(`Failed to update tBrand details with error: ${error}`);
  }
}

export async function updateTBrandStatus(dbTBrand: DbTBrand) {
  try {
    const updatedDbBrand = await axios.put(`${apiUrl}/brand/fsi-tray`, dbTBrand);
    return updatedDbBrand.data;
  } catch (error) {
    log.error(`Failed to update tBrand status with error: ${error}`);
  }
}

export async function deleteTBrandDetails(id: number) {
  try {
    const result = await axios.delete(`${apiUrl}/brand/tray/${id}`);
    return result.data > 0;
  } catch (error) {
    log.error(`Failed to delete tBrand details with error: ${error}`);
  }
}

export async function getCategorySynchronizationDetails(): Promise<any> {
  try {
    if (isStandAlone) return mockCategorySynchronizationDetails;

    const response = await axios.get(`${apiUrl}/synchronization/category`);
    return response.data;
  } catch (error) {
    log.error(`Failed to get category synchronization details with error: ${error}`);
    return undefined;
  }
}

export async function insertCategoryDetails(category: FreshSCategory) {
  // try {
  // } catch (error) {}
}

export async function updateCategoryDetails(category: FreshSCategory) {
  // try {
  // } catch (error) {}
}
