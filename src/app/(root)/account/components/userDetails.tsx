"use client"

import { LoadingEmoji } from "@/components"
import { text } from "@/constants/text"
import { fetchMe } from "@/lib"
import { _d, _p } from "@/lib/utils"
import { UserType } from "@/types/user.type"
import { useQuery } from "@tanstack/react-query"
import { UserRound } from "lucide-react"
import React from "react"

const UserDetails: React.FC<{token: string}> = ({token}) => {
  const {data, error, isLoading} = useQuery<UserType, Error>({queryKey: ['me', token], queryFn: fetchMe})
  if(error) return <div>{error.message}</div>
  if(isLoading) return <LoadingEmoji/>
  console.log("data",data)
  const name = data?.name as string;
  return <div className="flex flex-col mt-5 gap-y-5">
    <div className="size-20 mx-auto rounded-full grid place-content-center overflow-hidden bg-gray-200 text-gray-600"><UserRound size={42}/></div>
    <div className="flex bg-gray-200 rounded-full px-3 py-2 text-gray-600"> 
      <span className="w-4/12">{text.name}:</span> 
      <span>{!isNaN(+name) ? _p(name) : name}</span>
    </div>
    <div className="flex bg-gray-200 rounded-full px-3 py-2 text-gray-600"> 
      <span className="w-4/12">{text.nationalCode}:</span> 
      <span>{_p(data?.national_code as string)}</span>
    </div>
    <div className="flex bg-gray-200 rounded-full px-3 py-2 text-gray-600"> 
      <span className="w-4/12">{text.mobileNo}:</span> 
      <span>{_p(data?.mobile_number as string)}</span>
    </div>
  </div>
}
export default UserDetails