import Image from "next/image"
import { useCartStore } from "../store";
import { Minus, Plus, X } from "lucide-react";
import { _d, cn } from "@/lib/utils";

export default function CartItem({ item }: any) {
  const remove = useCartStore(_ => _.remove); 
  return <div className="relative flex w-full flex-1 rounded-lg bg-primary px-2 py-1 text-white">
    <Image src={item.category.id === 1 ? "/product/gold.webp" : "/product/silver.webp"} alt="product" width={64} height={64} />
    <div className="flex flex-1 flex-col justify-center text-xs">
      <span>{item.name}</span>
      <span>{_d(item.price)} تومان</span>
    </div>
    <Button fn={() => remove(item.id)} type={0} className="absolute -left-3 -top-3 bg-red-200 text-red-700 hover:bg-red-300" />
     
  </div>
}

const Button = ({ type = 0, className, fn }: any) => <button className={cn("grid size-6 place-content-center rounded-full text-xs hover:bg-slate-300 transition-all bg-slate-200 text-gray-700", className)} onClick={fn}>
  {type === 0 ? <X /> : type === 1 ? <Plus /> : <Minus />}
</button>