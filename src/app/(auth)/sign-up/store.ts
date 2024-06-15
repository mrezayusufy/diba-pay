import { create } from "zustand"
import { persist } from 'zustand/middleware';

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
export default useSignUpStore;