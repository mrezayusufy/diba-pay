'use server';

import { redirect } from "next/navigation";
import { cookies } from 'next/headers'
async function handleVerify(data: FormData) {
  const phone = data.get('phone')?.toString() || '';
  const codeMeli = data.get('code_meli')?.toString() || '';
  const verificationCode = data.get('verificationCode')?.toString() || '';
  const firstName = data.get('first_name')?.toString() || '';
  const lastName = data.get('last_name')?.toString() || '';

  const response = await fetch('http://localhost:3000/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone, codeMeli, verificationCode, first_name: firstName, last_name: lastName }),
  });

  if (response.ok) {
    const data = await response.json();
    const oneDay = 24 * 60 * 60 * 1000
    cookies().set('token', data.token, {expires: oneDay, secure: true})
    cookies().set('new token', "yusufy", {expires: oneDay, secure: true})
    redirect('/');
  } else {
    throw new Error('Invalid verification code');
  }
}

export { handleVerify }