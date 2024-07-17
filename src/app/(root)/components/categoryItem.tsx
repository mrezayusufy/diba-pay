"use client";
import { cn } from "@/lib/utils";
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation";

export default function CategoryItem({item}: any){
  const params = useSearchParams(); 
  const router = useRouter();
  const category = Number(params.get("category"));
  return <li onClick={() => router.push(`/?category=${item.id}`)} className={cn("flex flex-row-reverse items-center justify-center border-b-2 border-transparent text-sm", category === item.id && "border-primary2")}>
    <Image priority src={`/product/${item.id}.webp`} alt="" width={32} height={32}/>
    <div>{item.name}</div>
  </li>
}