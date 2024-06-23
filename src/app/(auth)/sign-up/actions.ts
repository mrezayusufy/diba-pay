'use server';
import { api } from "@/lib";
import { _l } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WretchResponse } from "wretch/types";
import wretch from "wretch";
import { config } from "@/config";
type WretchError = Error & {
  status: number;
  response: WretchResponse;
  text?: string;
  json?: Object;
};
async function handleSingUp(state: any,data: FormData) {
  const mobile_number = _l(data.get('mobile_number')?.toString() || '');
  const national_code = _l(data.get('national_code')?.toString() || '');
  
  try {
    const response: {message: string, otp_code: string, error?: string} = await api.url('/register').post({ mobile_number, national_code }).json();
    console.log(response);
    return {
      success: true,
      message: "User created Successfully.",
      mobile_number,
      national_code,
      response,
    }
  } catch (error: any) {
    console.error(error.json);
    return {
      error: error.json
    }; 
  }
}
interface IResponse {
  token: string;
  role: string;
  permissions: string[]
}
interface IToken {success: boolean, message: string, authToken: string}
async function handleVerify(state: any, data: FormData){
  const otp_code = data.get("otp_code")?.toString() || '';
  const mobile_number = data.get("mobile_number")?.toString() || '';
 
  try {
    const response: IResponse = await api.url('/verify-otp-code').post({ otp_code, mobile_number }).json();
    const token: IToken = await wretch(config.app_url+"/api/auth").post({token: response.token}).json();
    cookies().set("authToken", token.authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
    cookies().set("token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
    cookies().set("role", response.role);
    cookies().set("permissions", JSON.stringify(response.permissions));
    return {
      success: true,
      message: "کد تایید شد", 
    }
  } catch (error: any) {  
    return {
      error: error.json.error,
      success: false
    }
  }
}
 
export { handleSingUp, handleVerify }