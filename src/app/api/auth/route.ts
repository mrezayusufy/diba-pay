import { NextResponse } from 'next/server';
import { jwtConfig } from '@/config';
import * as jose from "jose"
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { token } = await request.json(); 

  if (token) {
    // Generate token
    const authToken = await new jose.SignJWT({ token }).setProtectedHeader({alg: "HS256"}).sign(jwtConfig.secret); 
    cookies().set("authToken", authToken);
    return NextResponse.json({ success: true, message: 'Authenticated successfully', authToken });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid verification code' }, { status: 401 });
  }
}
