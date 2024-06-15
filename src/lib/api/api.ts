import { config } from '@/config';
import wretch from 'wretch';
import { Wretch } from 'wretch/types'
const API_BASE_URL = config.api_url;

export const api: Wretch = wretch(API_BASE_URL)
  .errorType('json')
  .catcher(401, (error) => {
    console.error('Unauthorized', error);
  })
  .catcher(404, (error) => {
    console.error('Not Found', error);
  })
  .catcher(500, (error) => {
    console.error('Server Error', error);
  })
  .catcher(500, (error) => {
    console.error('Unexpected error', error);
  })

export const setAuthToken = (token: string): void => {
  api.options({ headers: { Authorization: `Bearer ${token}` } });
};