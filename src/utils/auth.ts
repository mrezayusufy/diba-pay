"use server"
import { API } from "@/lib";
import { cookies } from "next/headers";
interface IResponse {
  token: string;
  role: string;
  permissions: string[]
}
function storeToken (token: string, type: "access" | "refresh", response: IResponse | null){
  const thirtyDays = 30 * 24 * 60 * 60;
  const secure = process.env.NODE_ENV === 'production';
  const options = {
    httpOnly: true,
    secure: secure,
    maxAge: thirtyDays, // 30 days
    path: '/',
  }
  cookies().set(type+"Token", token, options);
  if(response){
    cookies().set("token", response.token, options);
    cookies().set("role", response?.role);
    cookies().set("permissions", JSON.stringify(response?.permissions));
  }
};
const getToken = (type: string) => cookies().get(type)?.value;
const hasToken = (type: "access" | "refresh") => cookies().has(type+"Token")
const removeTokens = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

const register = (mobile_number: string, national_code: string) => {
  return API.post({ mobile_number, national_code }, "/register/");
};
const login = (mobile_number: string) => {
  return API.post({ mobile_number }, "/otp-login/");
};
const logout = () => {
  const refreshToken = getToken("refresh");
  return API.post({ refresh: refreshToken }, "/auth/logout/");
};
const handleJWTRefresh = () => {
  const refreshToken = getToken("refresh");
  return API.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};

export {
    login,
    handleJWTRefresh,
    register,
    storeToken,
    getToken,
    logout,
    removeTokens,
    hasToken
  };