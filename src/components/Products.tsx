"use client";
import { fetchProducts } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";
const ProductsList = () => {
  const {data, error, isLoading} = useQuery({queryKey: ["products"],queryFn: fetchProducts});
  if(error) return <div>🚩{(error as Error).message}</div>
  if(isLoading) return <div className="absolute top-1/2 left-1/2 text-2xl animate-spin size-6">⏳</div>
  return (
    <ul className="flex space-x-3 space-y-5">
      {data?.data.map((item) => (<ProductCard key={item.id} title={item.name} image={item.image.original} price={item.price}/>) )}
    </ul>
  );
};
export { ProductsList };
