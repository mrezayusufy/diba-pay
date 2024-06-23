import React, { useState, useRef } from 'react';
import { _p } from "@/lib/utils"
interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('text').slice(0, length);
    const newOtp = pastedData.split('').slice(0, length);
    setOtp(newOtp);
    onChange(newOtp.join(''));
  };

  return (
    <div dir='ltr' style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
      {otp.map((value, index) => (
        <input 
          key={index}
          ref={(el: any ) => inputRefs.current[index] = el}
          id={`otp-input-${index}`}
          type="text"
          maxLength={1}
          value={_p(value)}
          onChange={(e) => handleChange(e.target.value, index)}
          onPaste={handlePaste}
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
