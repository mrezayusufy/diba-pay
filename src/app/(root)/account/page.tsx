import { fetchMe, fetchProducts } from "@/lib";
import React from "react";
import UserDetails from "./components/userDetails";
import { cookies } from "next/headers";
import { getToken } from "@/utils/auth";
type UserType ={
  id: string,
  name: string,
  mobile_number: string,
  national_code: string,
}
const Page: React.FC = () => {
  const token = getToken("token") as string;
  return (
    <div>
      <UserDetails token={token}/>
    </div>
  )
}
export default Page;

