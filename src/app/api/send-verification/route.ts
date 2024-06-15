import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path'; 

const usersFilePath = path.join(process.cwd(), 'src/data/users.json');

interface User {
  code_meli: string;
  phone: string;
  first_name: string;
  last_name: string;
  verificationCode?: string;
}

// Simulate sending a verification code
const sendVerificationCode = (phone: string, code: string) => {
  console.log(`Verification code ${code} sent to ${phone}`);
};

export async function POST(request: Request) {
  const { code_meli, phone } = await request.json();

  // Read users data
  const usersData: User[] = JSON.parse(readFileSync(usersFilePath, 'utf-8'));
  let user = usersData.find(user => user.code_meli === code_meli);

  if (!user) {
    // Register new user if not exist
    user = { code_meli, phone, first_name: '', last_name: '' };
    usersData.push(user);
  }

  // Generate and send verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = verificationCode;
  sendVerificationCode(phone, verificationCode);

  // Save the updated users data
  writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf-8');

  return NextResponse.json({ success: true, message: 'Verification code sent' });
}
