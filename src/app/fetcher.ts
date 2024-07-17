"use server"
import { API } from "@/lib";
import { getToken } from "@/utils/auth";
export const fetcher = (url: string) => API.auth(`Bearer ${getToken("access")}`).get(url);