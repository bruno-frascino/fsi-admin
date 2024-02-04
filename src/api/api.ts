import axios from 'axios';
import log from '../logger';
import { mockBrandSyncDetails, mockCategorySynchronizationDetails } from './mock';
import { FreshSBrand, FreshSCategory } from './types';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function getBrandSynchronizationDetails(): Promise<any> {
  try {
    // const response = await axios.get(`${apiUrl}/synchronization/brand`);
    // return response.data;
    return mockBrandSyncDetails;
    
  } catch (error) {
    // log.error(error);
    log.error('Failed to get brand synchronization details');
    return undefined;
  }
}

export async function insertBrandDetails(brand: FreshSBrand) {
  try {
    
  } catch (error) {
    
  }
}

export async function updateBrandDetails(brand: FreshSBrand) {
  try {
    
  } catch (error) {
    
  }
}

export async function getCategorySynchronizationDetails(): Promise<any> {
  try {
    // const response = await axios.get(`${apiUrl}/synchronization/category`);
    // return response.data;
    return mockCategorySynchronizationDetails;
    
  } catch (error) {
    // log.error(error);
    log.error('Failed to get category synchronization details');
    return undefined;
  }
}

export async function insertCategoryDetails(category: FreshSCategory) {
  try {
    
  } catch (error) {
    
  }
}

export async function updateCategoryDetails(category: FreshSCategory) {
  try {
    
  } catch (error) {
    
  }
}