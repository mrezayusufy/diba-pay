"use client";

import { text } from "@/constants/text";
import { fetchCategories } from "@/lib" 
import CategoryItem from "./categoryItem";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  const {data, error, isLoading}: {data: any, error: any, isLoading: boolean} = useQuery({queryKey: ['categories'], queryFn: fetchCategories});

  if(isLoading) return <div className="absolute left-1/2 top-1/2 size-6 animate-spin text-2xl">⏳</div>
  if(error) return <div>🚩{(error as Error).message}</div>

  data.data[2] = {
    id: 0,
    name: text.all,
    icon: ""
  }
  return <div className="relative">
    <div className="text-sm font-semibold text-gray-400">{text.categories}</div>
    <ul className="grid-column-start grid grid-cols-3" dir="ltr">
      {data?.data.map((item: any) => <CategoryItem key={item.id} item={item} />)}
    </ul>
  </div>
}