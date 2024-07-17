'use server';
import { API, api } from "@/lib";
import {config} from "@/config"
import wretch from "wretch";
import { StatusEnum } from "@/enums";
import { storeToken } from "@/utils/auth";
interface TokenResponse {
  token: string;
  role: string;
  permissions: string[]
}
interface IToken {success: boolean, message: string, authToken: string}

async function sendOtpCode(state: any, data: FormData) {
  const mobile_number = data.get('mobile_number')?.toString() || '';
  const otp_code = data.get('otp_code')?.toString() || '';
  
  if(otp_code) { 
    try {
      const response = await API.post({ otp_code, mobile_number }, '/verify-otp-code') as TokenResponse;
      const token: IToken = await wretch(config.app_url+"/api/auth").post({token: response.token}).json();
      storeToken(token.authToken, "access", response);
      
      return {
        success: true,
        message: "کد تایید شد",
        status: StatusEnum.verified
      }
    } catch (error: any) {
      console.error(error)
      return {
        error: error.json,
        success: false,
        status: StatusEnum.failure
      }
    }
  } else {
    
    try {
      const response = await API.url('/send-otp-code').post({mobile_number }) as {message: string, otp_code: string};
      console.log("%csent otp: " + response.otp_code, "color: green")
      return {
        message: response.message,
        success: true,
        status: StatusEnum.success,
      }
    } catch (error: any) {
      console.error("%cerror", error, "color: red");
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