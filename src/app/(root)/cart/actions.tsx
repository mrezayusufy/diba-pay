"use server";

import { api } from "@/lib";

async function HandlePayment(state: any, data: FormData){
  const subtotal = data.get("amount")?.toString();
    const res = await api.url("/orders/checkout").post({amount: subtotal});
    console.log(res);
}

export { HandlePayment }