import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';  
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
}
export function middleware(req: NextRequest) {
  const cookie = req.cookies;
   
  const token: any = cookie.get("token");
  const hasToken = cookie.has("token");
  if(hasToken){
    if (req.nextUrl.pathname === '/') {
      try {
        jose.jwtVerify(token.value,jwtConfig.secret); 
        return NextResponse.next();
      } catch (err) {
        console.error(err)
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
