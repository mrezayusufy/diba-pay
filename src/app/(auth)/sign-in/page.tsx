
"use client";
import { sendOtpCode } from './actions';
import { StatusEnum } from '@/enums';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { text } from '@/constants/text';
import Submit from '../sign-up/components/submit';
import { redirect, useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import OtpInput from '@/components/ui/otp-input';
import { cn } from '@/lib/utils';
import { config } from '@/config';

export default function SignIn() {
  const router = useRouter();
  const [state, formAction] = useActionState(sendOtpCode, null);
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(StatusEnum.idle);
  if(state?.status === StatusEnum.verified) redirect("/");
  useEffect(() => {
    setStatus(StatusEnum.idle);
    
    if(state !== null) { 
      if(state.status === StatusEnum.success) {
        setStatus(StatusEnum.success)
        toast.success(state.message, {duration: 3000});
      } else if(status === StatusEnum.verified) {
        console.log(state.message)
        router.push("/"); 
      } else {
        setStatus(StatusEnum.failure);
        toast.error(state.message, {duration: 3000});
      }
    } 
  },[state])
  return (
    <div className='relative flex flex-1 flex-col px-4'>
      <div className='shape-outline absolute -top-[160px] left-1/2 z-0 size-[320px] -translate-x-1/2 rotate-45 rounded-3xl bg-primary'></div>
      <div className='mt-30 relative flex flex-1 flex-col'>
        <div className='my-[110px] flex justify-center'>
          <Image src="/logo-diba-white.svg" width={150} height={45} alt='logo'/>
        </div>
        <h1 className='text-center font-bold text-primary'>
        به <span className='text-primary2'>دیبا</span>.پی خوش آمدید!
        </h1>
        <form action={formAction} className='mt-5 flex flex-1 flex-col gap-y-3'>
          <div className={cn('flex-1 hidden flex-col', status === StatusEnum.idle && 'flex')} >
            <Input name="mobile_number" title='ورود' placeholder={text.mobile_number_ph}/>
          </div>
          {status === StatusEnum.success && <>
            <OtpInput length={6} onChange={(value) => setOtp(value)}/>
            <input type="hidden" value={otp} name="otp_code" />
          </>
          } 
          <div className="mt-auto flex flex-col">
            <Submit p={text.loginDibaPay} />
            <div className='my-5 flex flex-1 justify-center gap-3 text-xs text-gray-400'>
              <span>{text.isSignUp}</span>
              <button type="button" className='font-bold text-primary2' onClick={() => router.push("/sign-up")}>{text.register}</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
