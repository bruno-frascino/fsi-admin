import axios from 'axios';
import log from '../logger';
import { mockBrandSyncDetails, mockCategorySynchronizationDetails } from './mock';
import { FreshSBrand, FreshSCategory } from './types';

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

export async function insertBrandDetails(brand: FreshSBrand) {
  // try {
  // } catch (error) {}
}

export async function updateBrandDetails(brand: FreshSBrand) {
  // try {
  // } catch (error) {}
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
