import { Image } from "./image.type";

interface ProductType {
  id: number;
  name: string;
  slug: string;
  logo: Image | null;
  settings: any[]; 
}
interface Shop {
  id: number;
  name: string;
  slug: string;
  logo: Image;
}
interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  language: string;
  translated_languages: string[];
  product_type: string;
  shop: Shop;
  sale_price: number;
  max_price: number;
  min_price: number;
  image: Image;
  status: string;
  price: number;
  quantity: number;
  unit: string;
  sku: string;
  sold_quantity: number;
  in_flash_sale: number;
}
export type { Product, Shop, ProductType }
