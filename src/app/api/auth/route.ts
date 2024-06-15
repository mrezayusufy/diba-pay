import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { jwtConfig } from '@/config';
import * as jose from "jose"
const usersFilePath = path.join(process.cwd(), 'src/data/users.json'); 

interface User {
  national_code: string;
  phone: string;
  first_name: string;
  last_name: string;
  verificationCode?: string;
}

export async function POST(request: Request) {
  const { national_code, phone, verificationCode, first_name, last_name } = await request.json();

  // Read users data
  const usersData: User[] = JSON.parse(readFileSync(usersFilePath, 'utf-8'));

  // Find user
  let user = usersData.find(user => user.national_code === national_code);

  if (user && user.verificationCode === verificationCode) {
    // Update user information on sign-up
    if (first_name && last_name) {
      user.first_name = first_name;
      user.last_name = last_name;
      delete user.verificationCode;
    }
    // Generate token
    const signedToken = await new jose.SignJWT({ national_code: user.national_code }).setProtectedHeader({alg: "HS256"}).sign(jwtConfig.secret); 
    console.log(signedToken)
    return NextResponse.json({ success: true, message: 'Authenticated successfully', signedToken });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid verification code' }, { status: 401 });
  }
}
