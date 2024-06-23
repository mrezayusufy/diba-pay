import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { jwtConfig } from "./config";
export async function middleware(req: NextRequest) {
  const cookie = req.cookies;
  const authToken: any = cookie.get("authToken")?.value;
  const hasAuthToken = cookie.has("authToken");
  const redirect = new URL("/sign-in", req.url);
  console.log(hasAuthToken);
  if (hasAuthToken) {
    // verify token with jose
    try {
      await jose.jwtVerify(authToken, jwtConfig.secret);
      return NextResponse.next();
    } catch (error: any) {
      console.error("error", error.message);
      return Response.redirect(redirect);
    }
  } else {
    return Response.redirect(redirect);
  }
}

export const config = {
  matcher: ["/"],
};
