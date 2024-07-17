import { UserType } from '@/types/user.type';
import { API, api } from './api';

 
export const fetchMe = async ({queryKey}: any): Promise<UserType>=> {
  const[_key, token] = queryKey;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await API.auth(`Bearer ${token}`).get('/me') as UserType;
  return response;
};