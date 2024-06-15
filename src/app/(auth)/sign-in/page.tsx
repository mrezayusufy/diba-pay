
import { Button } from '@/components/ui/button';
import { verificationCode } from './actions';

export default function SignIn() {
  
  return (
    <div>
      <h1>Sign In</h1>
      <form action={verificationCode}>
        <input type="text" name="phone" placeholder="Phone Number" required />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
