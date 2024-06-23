import { ProductsResponse } from '@/types';
import { api } from './api';

export const fetchProducts = async ({queryKey}: any): Promise<ProductsResponse> => {
  
  const[_key, query] = queryKey;
  const queryString = new URLSearchParams(query).toString();
  const response = await api.url(`/products?${queryString}`).get().json<ProductsResponse>();
  return response;
};