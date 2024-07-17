import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { jwtConfig } from "./config";
import { getToken, hasToken } from "./utils/auth";
import { cookies } from "next/headers";
export async function middleware(req: NextRequest) {
  const authToken: any = getToken("accessToken");
  const hasAuthToken = hasToken("access");
  const redirect = new URL("/sign-in", req.url);
  if (hasAuthToken) {
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
  matcher: ["/", "/account", "/transactions", "/settings", "/cart"],
};
