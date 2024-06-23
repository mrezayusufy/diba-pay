import { create } from "zustand"
import { persist } from 'zustand/middleware';
import { StepType } from '@/types';
interface formType {
  mobile_number?: string;
  national_code?: string;
}
interface signUpState {
  form: formType;
  setForm: (form: formType) => void;
}
const useSignUpStore = create<signUpState>()(
  persist(
    (set) => ({
      form: {
        mobile_number: "",
        national_code: "",
      },
      setForm: (form) => set({form}) 
    }),
    { name: 'sign-up-form' }
  )
); 

interface StepState { 
  steps: StepType[],
  step: number,  
  reset: () => void,
  setStep: (step: StepType | StepType[] | null) => void,
  setCurrentStep: (step: number) => void,
 
}

const useStepStore = create<StepState>()(
  persist(
    (set, get) => ({
      steps: [
        { index: 0, label: 'ثبت‌نام', status: false },
        { index: 1, label: 'کد فعال‌سازی', status: false },
      ],
      step: 0,  
      reset: () => {
        const steps = get().steps; 
        steps[0].status = false;
        steps[1].status = false;
        return set({steps})},
      setCurrentStep: (step) => {
        console.log(step)
        return set({step})},
      setStep: (s) => {
        const steps = s as StepType[];
        const step = s as StepType; 
        if(steps.length > 0) {
          set({steps: steps});
        } else {
          set((state) => { 
            const index = state.steps.findIndex(i => i.index === step.index)
            state.steps[index] = step as StepType;
            return state;
           })
        }
      },
      
    }),
    { name: 'step-storage' }
  )
);

export {useStepStore , useSignUpStore};
 