import { api } from '@/lib/api/api';
import { Product, ProductsResponse } from '@/types';
import { config } from '@/config';
const fetchProducts = async (): Promise<Product[]> => {
  const base_url = config.api_url;
  const response:any = await api.url(base_url+"/products").get().json<ProductsResponse>();
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
 
export { fetchProducts }
