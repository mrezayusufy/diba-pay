import { NextResponse } from 'next/server';
 
import { api } from '@/lib';
 
type Params = {
  mobile_number: string;
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mobile_number = searchParams.get('mobile_number')
  try {
    const response: { otp_code: string, message: string} = await api.url("/send-otp-code/"+mobile_number).get().json();
    return NextResponse.json({ success: true, message: response.message });
 
  } catch (error: any) {
    return NextResponse.json({error: error.error})
  }
}
