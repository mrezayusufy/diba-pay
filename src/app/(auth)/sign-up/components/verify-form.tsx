import OtpInput from "@/components/ui/otp-input";
import { text } from "@/constants/text";
import { redirect } from "next/navigation";
import React, { useActionState, useReducer, useState } from "react";
import { toast } from "sonner";
import { useSignUpStore, useStepStore } from "../store";
import { handleVerify } from "../actions";
import { api } from "@/lib";
import { _p } from "@/lib/utils";
import Submit from "./submit"; 
import { reducer, initialState, actions } from "./verify.reducer"
const VerifyForm: React.FC = () => { 
  const [store, dispatch] = useReducer(reducer, initialState);
  const [state, formAction] = useActionState(handleVerify, null); 
  const [otp, setOtp] = useState('');
  const form = useSignUpStore(_ => _.form); 
  const setCurrentStep = useStepStore(_ => _.setCurrentStep); 
  const reset = useStepStore(_ => _.reset);
  const handleEdit = () => { 
    reset();
    setCurrentStep(0);
  }
  const mobile_number = _p(form.mobile_number as string);
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };
  const handleResend = async () => {
    try {
      dispatch({type: actions.setLoading, payload: true})
      const res: {message: string} = await api.url("/send-otp-code").post({mobile_number: form.mobile_number}).json();
      toast.success(res?.message);
      dispatch({type: actions.reset });
      dispatch({type: actions.setLoading, payload: false})
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const minutes = Math.floor(store.timeLeft / 60).toString()
  const seconds = (store.timeLeft % 60).toString();

  React.useEffect(() => { 
    if(state !== null){
      const success = state.success;
      if (success) {    
        toast.success(state.message+"🎊😀🎉", { duration: 3000 });
        reset()
        setCurrentStep(1)
        redirect("/");
      } else {
        toast.error(state?.error, { duration: 1000})
      }
      const interval = setInterval(() => {
        dispatch({ type: actions.decrement });
      }, 1000); 
      return () => clearInterval(interval);
    }
  },[state])

  return <>
    <h1 className="text-2xl font-bold">{text.activationCode}</h1>
    <small>{text.sentCodeText}</small>
    <div className="flex items-center">
      <button type="button" onClick={handleEdit} className="pl-3 text-xs underline text-amber-600">{text.editNumber}</button>
      {mobile_number}
    </div>
    <form action={formAction} className="flex flex-col justify-between flex-1">
      <OtpInput length={6} onChange={handleOtpChange}/>
      <input type="hidden" value={otp} name="otp_code" />
      <input type="hidden" value={form.mobile_number} name="mobile_number" />
      <div className="mb-auto text-center mt-3 flex justify-center">
        {store.isLoading ? <LoadingEmoji/> : <button type="button" disabled={store.timeLeft !== 0} onClick={handleResend} className="text-xs text-center disabled:cursor-not-allowed">
          ⏱ {_p(minutes)}:{_p(seconds)} {store.timeLeft !== 0 ? text.otpSent : text.resend}
        </button>}
      </div>
      <Submit p={text.verify} />
    </form>
  </>
}
const LoadingEmoji = () => <div className="text-xl animate-spin size-6">⏳</div>
export {VerifyForm};

