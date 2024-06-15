"use client";
import { _p, cn } from '@/lib/utils';
import { useStepStore } from '@/store';
import React from 'react'; 
import { SignUpForm, VerifyForm } from './forms';


function SignUp() { 
  const _step = useStepStore((state) => state.step); 
  const _steps = useStepStore(s => s.steps); 
  
  return (
    <div dir="rtl" className='flex flex-1 flex-col space-y-5 px-3 py-5'>
      <ul className='flex justify-center'>
        {_steps.map((item, i) => (<li key={i} className='wrapper text-xs'>
          <button className={cn('bullet', i === (_steps.length - 1) && 'before:hidden', i === 0 && 'after:hidden', i <= _step && 'bg-slate-900', item.status && 'bg-amber-500' )}></button>
          <p className={cn('mt-1 text-slate-400', i <= _step && 'text-slate-900', item.status && 'text-amber-500')}>{item.label}</p>
        </li>))}
      </ul>
      {_step === 0 ? <SignUpForm/> : <VerifyForm/>}
    </div>
  );
}
export default SignUp;

