import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const rates = [ 
  {
    name: "نقره ۹۹۹",
    unit: "گرم",
    category: 1,
    rate: 68000,
    currency: "تومان"
  },
  {
    name: "نقره ۹۲۵",
    unit: "گرم",
    category: 1,
    rate: 62970,
    currency: "تومان"
  },
  {
    name: "(ساچمه)نقره",
    unit: "مثقال",
    category: 1, 
    rate: 313360,
    currency: "تومان"
  }, 
  {
    name: "طلا ۱۸ عیار",
    unit: "گرم",
    category: 0, 
    rate: 313360,
    currency: "تومان"
  }, 
  {
    name: "طلا ۲۴ عیار",
    unit: "گرم",
    category: 0, 
    rate: 3313360,
    currency: "تومان"
  }, 
]
export async function GET(){
  return NextResponse.json(rates, { status: 200 })

}