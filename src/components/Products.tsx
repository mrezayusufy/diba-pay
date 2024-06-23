"use client";
import { fetchProducts } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";
import { useSearchParams } from "next/navigation";
const ProductsList = () => {
  const _params = useSearchParams();
  const params: {category?: number , order_by?: number} = {};
 
  const category = _params.get("category");
  const order_by = _params.get("order_by");
 
  if(category) params.category = +category;
  if(order_by) params.order_by = +order_by ;
  const {data, error, isLoading} = useQuery({queryKey: ["products", params], queryFn: fetchProducts});
  if(error) return <div>🚩{(error as Error).message}</div>
  if(isLoading) return <div className="absolute left-1/2 top-1/2 size-6 animate-spin text-2xl">⏳</div>
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-5">
      {data?.data.map((item) => (<ProductCard key={item.id} item={item}/>) )}
    </ul>
  );
};
export { ProductsList };
