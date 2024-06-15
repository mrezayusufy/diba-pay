import { ProductsResponse } from '@/types';
import { api } from './api';

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await api.url('/products').get().json<ProductsResponse>();
  return response;
};