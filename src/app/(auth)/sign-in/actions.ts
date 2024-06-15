'use server';
import { redirect } from "next/navigation";

async function verificationCode(data: FormData) {
  const phone = data.get('phone')?.toString() || '';
  const response = await fetch('http://localhost:3000/api/send-verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone })
  });

  if (response.ok) {
    redirect(`/verify?phone=${phone}`);
  } else {
    throw new Error('Error sending verification code');
  }
}
export {verificationCode}