import { ProductsResponse } from '@/types';
import { API, api } from './api';

export const fetchProducts = async ({queryKey}: any) => {
  const[_key, query] = queryKey;
  const queryString = new URLSearchParams(query).toString();
  const response = await API.get(`/products?${queryString}`) as ProductsResponse;
  return response;
};