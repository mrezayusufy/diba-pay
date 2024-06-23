import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const Submit = ({p = 'ثبت نام'}) => {
  const { pending } = useFormStatus();
  const text = pending ? `در حال ${p}` : `${p} کنید`;
  return <Button disabled={pending} type="submit">
    {pending && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
    {text}
  </Button>
}
export default Submit;