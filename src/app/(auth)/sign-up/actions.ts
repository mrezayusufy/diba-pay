'use server';
import { API, api } from "@/lib";
import { _l } from "@/lib/utils";
import wretch from "wretch";
import { config } from "@/config";
import { storeToken } from "@/utils/auth";
async function handleSingUp(state: any,data: FormData) {
  const mobile_number = _l(data.get('mobile_number')?.toString() || '');
  const national_code = _l(data.get('national_code')?.toString() || '');
  
  try {
    const response = await API.url('/register').post({ mobile_number, national_code });
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
    const response = await API.url('/verify-otp-code').post({ otp_code, mobile_number }) as IResponse;
    const token: IToken = await wretch(config.app_url+"/api/auth").post({token: response.token}).json();
    storeToken(token.authToken, "access", response)
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