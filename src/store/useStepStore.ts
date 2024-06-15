import { StepType } from '@/types';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface StepState { 
  steps: StepType[],
  step: number, 
  setStep: (step: StepType | StepType[]) => void,
  setCurrentStep: (step: number) => void,
}

const useStepStore = create<StepState>()(
  persist(
    (set) => ({
      steps: [
        { index: 0, label: 'ثبت‌نام', status: false },
        { index: 1, label: 'کد فعال‌سازی', status: false },
      ],
      step: 0, 
      setCurrentStep: (step) => set({step}),
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
      }
    }),
    { name: 'step-storage' }
  )
);

export {useStepStore};
