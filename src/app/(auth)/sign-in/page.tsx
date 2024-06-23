
"use client";
import { sendOtpCode } from './actions';
import { StatusEnum } from '@/enums';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { text } from '@/constants/text';
import Submit from '../sign-up/components/submit';
import { redirect, useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'sonner';
import OtpInput from '@/components/ui/otp-input';
import { cn } from '@/lib/utils';

export default function SignIn() {
  const router = useRouter();
  const [state, formAction] = useActionState(sendOtpCode, null);
  const [otp, setOtp] = React.useState("");
  const [status, setStatus] = React.useState(StatusEnum.idle);
  if(state?.status === StatusEnum.verified) redirect("/");
  React.useEffect(() => {
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
    console.log(state);
  },[state])
  return (
    <div className='flex flex-col relative px-4 flex-1'>
      <div className='absolute left-1/2 shape-outline size-[320px] rounded-3xl bg-primary -top-[160px] -translate-x-1/2 rotate-45 z-0'></div>
      <div className='relative mt-30 flex-1 flex flex-col'>
        <div className='justify-center flex my-[110px]'>
          <Image src="/logo-diba-white.svg" width={150} height={45} alt='logo'/>
        </div>
        <h1 className='text-primary font-bold text-center'>
        به <span className='text-primary2'>دیبا</span>.پی خوش آمدید!
        </h1>
        <form action={formAction} className='flex flex-col gap-y-3 mt-5 flex-1'>
           
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
            <div className='flex flex-1 justify-center text-xs my-5 text-gray-400 gap-3'>
              <span>{text.isSignUp}</span>
              <button type="button" className='text-primary2 font-bold' onClick={() => router.push("/sign-up")}>{text.register}</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
