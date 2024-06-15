'use client'
import React from 'react';
import { handleVerify } from './actions';
import { _l, _p } from '@/lib/utils';
import { Field } from '@/components/field';

export default function Verify() { 
  
  return (
    <div>
      <h1>Verify</h1>
      <form action={handleVerify} className='flex flex-col'>
        <Field title="verification code" name="verification_code" placeholder='verification code'  />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
