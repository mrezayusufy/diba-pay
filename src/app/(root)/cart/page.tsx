"use client";
import { useCartStore } from "../store";
import { text } from "@/constants/text"
import { _d, _p } from "@/lib/utils"
import CartItem from "./cartItem";
import { api } from "@/lib";
import { useActionState } from "react";
import { HandlePayment } from "./actions";

export default function CartPage() {
  const [state, formAction] = useActionState(HandlePayment, null);
  const cart = useCartStore(_ => _.cart);
  const totalSum = useCartStore(_ => _.totalSum);
  const handle = () => {
    
  }
  return <div className="relative w-full max-w-[320px] justify-items-center">
    <div className="my-3 text-gray-400">{text.orderList}</div>
    <div className="flex flex-1 flex-col gap-y-6 px-4">{cart.map((item) => <CartItem key={item.id} item={item}/>)}</div>
    <form action={formAction}>
      <div className="anchor flex w-full justify-center bg-blue-400"></div>
      <input type="hidden" name="amount" value={totalSum()}/>
      <button type="submit" onClick={handle} className="pay-btn">{text.pay} {_d(totalSum())} تومان</button>
    </form>
  </div>
}