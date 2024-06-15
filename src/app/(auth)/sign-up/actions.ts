'use server';
import { api } from "@/lib";
import { _l } from "@/lib/utils";
import { redirect } from "next/navigation";

async function handleSingUp(state: any,data: FormData) {
  const mobile_number = _l(data.get('mobile_number')?.toString() || '');
  const national_code = _l(data.get('national_code')?.toString() || '');
  
  try {
    const response = await api.url('/register').post({ mobile_number, national_code }).json();
    console.log(response);
    return {
      success: true,
      message: "User created Successfully.",
      response,
    }
  } catch (error: any) {
    return {
      error: error.json
    }; 
  }
}
async function handleVerify(state: any, data: FormData){
  const otp_code = data.get("otp_code")?.toString() || '';
}
export { handleSingUp, handleVerify }