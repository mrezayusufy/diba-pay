
import { config } from '@/config';
import wretch from 'wretch';
import axios from 'axios';
const API_BASE_URL = config.api_url;
export const API = wretch(API_BASE_URL) 
  .accept("application/json")
  .errorType('json')  
  .resolve(_ => _.json())
  .catcher(401, (error) => {
    console.error('Unauthorized', error);
  })
  .catcher(404, (error) => {
    console.error('Not Found', error);
  })
  .catcher(500, (error) => {
    console.error('Server Error', error);
  })

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token: string): void => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
