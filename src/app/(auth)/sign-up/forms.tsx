"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { text } from "@/constants/text";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react"
import { useFormState, useFormStatus } from "react-dom";
import { handleSingUp, handleVerify } from "./actions";
import { toast } from "sonner";
import { useStepStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
const iranPhonePattern = /^09[0-9]{9}$/;
const formSchema = z.object({
  mobile_number: z.string().regex(iranPhonePattern, text.mobilePattern).min(11, text.mobileMin).max(11, text.mobileMin),
})
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { __, _p } from "@/lib/utils";
import useSignUpStore from "./store";
import "@/lib/intl-phone-format"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import OtpInput from "@/components/ui/otp-input";



const SignUpForm: React.FC = () => {
  const [state, formAction] = useActionState(handleSingUp, null);
  const { form, setForm } = useSignUpStore();
  const step = useStepStore(s => s.step);
  const steps = useStepStore(s => s.steps);
  const setStep = useStepStore(s => s.setStep);
  const setCurrentStep = useStepStore(s => s.setCurrentStep);
  const success = state?.success as boolean;
  const response = state?.response as { message: string, otp: string, mobile_number: string, national_code: string };

  React.useEffect(() => {
    if (success) { 
      toast.success("ثبت نام با موفقیت انجام شد🎉🎊😀", { duration: 3000 });
      
      setForm({mobile_number: response.mobile_number, national_code: response.national_code})
      toast.info(response.message, { duration: 3000 })
      setTimeout(() => {
        const _step = steps[step];
        setStep({ ..._step, status: true })
        setCurrentStep(1)
      }, 3000);
    }
  }, [success]) 
  return <>

    <h1 className="text-2xl font-bold">{text.createAccount}</h1>
    <form action={formAction} className='flex flex-1 flex-col gap-y-1'>
      <Input required
        title={text.mobile_number}
        inputMode="tel"
        aria-errormessage={state?.error?.mobile_number}
        name="mobile_number"
        placeholder={text.mobile_number_ph} />
      <Input required
        title={text.national_code}
        placeholder={text.national_code}
        name="national_code"
        aria-description={text.nationalValidity}
        aria-errormessage={state?.error?.national_code} />
      <small className="mt-3 text-slate-500">{text.note}</small>
      <small className="mt-auto flex items-center text-[9px]">
        <input required type="checkbox" className="ml-1" />
        <Link href="/terms-and-condition" className="ml-1 font-bold text-orange-600 underline">{text.termsCondition1}</Link>
        <span>{text.termsCondition2}</span>
      </small>
      <Submit />
    </form>
    <div className="flex justify-center gap-x-3 text-xs">
      <span>{text.isRegistered}</span>
      <Link href={"/sign-in"} className="text-blue-500">{text.login}</Link>
    </div>
  </>
}
const Submit = ({p = 'ثبت نام'}) => {
  const { pending } = useFormStatus();
  const text = pending ? `در حال ` : `${p} کنید`;
  return <Button disabled={pending} type="submit">
    {pending && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
    {text}
  </Button>
}

const VerifyForm: React.FC = () => {
  const form = useSignUpStore(s => s.form);
  const [state, formAction] = useActionState(handleVerify, null);
  const [otp, setOtp] = React.useState('');
  const steps = useStepStore(_ => _.steps);
  const setCurrentStep = useStepStore(_ => _.setCurrentStep);
  const setStep = useStepStore(_ => _.setStep);
  const success = state?.success as boolean;
  const handleEdit = () => {
    const signUpStep = steps[0];
    setStep({...signUpStep, status: false});
    setCurrentStep(0);
  } 
  const mobile_number = _p(form.mobile_number as string);
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };
  React.useEffect(() => {

  },[])
  return <>
    <h1 className="text-2xl font-bold">{text.activationCode}</h1>
    <small>{text.sentCodeText}</small>
    <div className="flex items-center">
      <button onClick={() => handleEdit()} className="pl-3 text-xs underline text-amber-600">{text.editNumber}</button>
      {mobile_number}
    </div>
    <form action={formAction} className="flex flex-col justify-between flex-1">
      <OtpInput length={6} onChange={handleOtpChange}/>
      <input type="hidden" value={otp} name="otp_code" />
      <Submit p="تائید" />
    </form>
  </>

}
export { SignUpForm, VerifyForm }

