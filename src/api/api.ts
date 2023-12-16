import axios from 'axios';
import log from '../logger';
import { mockBrandSyncDetails } from './mock';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function getBrandSynchronizationDetails(): Promise<any> {
  try {
    // const response = await axios.get(`${apiUrl}/api/synchronization/brand`);
    // return response.data;
    return mockBrandSyncDetails;
    
  } catch (error) {
    // log.error(error);
    log.error('Failed to get brand synchronization details');
    return undefined;
  }
}