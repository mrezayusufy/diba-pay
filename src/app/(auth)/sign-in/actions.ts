'use server';
import { api } from "@/lib";
import { cookies } from "next/headers";
import {config} from "@/config"
import wretch from "wretch";
import { StatusEnum } from "@/enums";
interface IResponse {
  token: string;
  role: string;
  permissions: string[]
}
interface IToken {success: boolean, message: string, authToken: string}

async function sendOtpCode(state: any, data: FormData) {
  const mobile_number = data.get('mobile_number')?.toString() || '';
  const otp_code = data.get('otp_code')?.toString() || '';
  
  if(otp_code) {
    console.log("verified")
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
        status: StatusEnum.verified
      }
    } catch (error: any) {
      return {
        error: error.json.error,
        success: false,
        status: StatusEnum.failure
      }
    }
  } else {
    
    try {
      const response: {message: string, otp_code: string} = await api.url('/send-otp-code').post({mobile_number }).json();
      console.log("----sent otp", state)
      return {
        message: response.message,
        success: true,
        status: StatusEnum.success,
      }
    } catch (error: any) {
      return {
        error: error.json.error,
        success: false,
        status: StatusEnum.failure
      }
    }
  }
  return {
    message: "",
    success: false,
    status: StatusEnum.idle
  }
}
export {sendOtpCode}