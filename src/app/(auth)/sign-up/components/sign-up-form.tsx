import { text } from "@/constants/text";
import Link from "next/link";
import Submit from "./submit";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import React, { useActionState } from "react";
import { useSignUpStore, useStepStore } from "../store";
import { handleSingUp } from "../actions";

const SignUpForm: React.FC = () => {
  const [state, formAction] = useActionState(handleSingUp, null);
  const { form, setForm } = useSignUpStore();
  const step = useStepStore(s => s.step);
  const steps = useStepStore(s => s.steps);
  const setStep = useStepStore(s => s.setStep);
  const setCurrentStep = useStepStore(s => s.setCurrentStep);
  const success = state?.success as boolean;
  const mobileNumber = state?.mobile_number as string;
  const nationalCode = state?.national_code as string;
  const response = state?.response as { message: string, otp_code: string };

  React.useEffect(() => {
    if (success) { 
      toast.success(text.successSignUp, { duration: 3000 });
      setForm({mobile_number: mobileNumber, national_code: nationalCode})
      toast.info(response.message, { duration: 1000 })
      setTimeout(() => {
        const _step = steps[step];
        setStep({ ..._step, status: true })
        setCurrentStep(1)
      }, 1000);
    }
    console.log(state?.error)
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
    <div className="flex justify-center gap-x-3 text-xs text-gray-400">
      <span>{text.isRegistered}</span>
      <Link href={"/sign-in"} className="text-primary2 font-bold">{text.login}</Link>
    </div>
  </>
}

export {SignUpForm};