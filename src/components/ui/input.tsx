import * as React from "react"

import { _p, _l, cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, title, ...props }, ref) => {
    const [persianValue, setPersianValue] = React.useState('');
    const handlePersianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPersianValue(_p(value)); 
    };
    return (
      <label className="group relative mt-2 flex flex-col">
        <span className="mb-1 text-sm">{title}</span>
        <input 
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          value={persianValue}
          onChange={handlePersianChange}
          {...props}
          ref={ref}
        />
        <input type="hidden" name={name} value={_l(persianValue)} {...props} />
        <small className="absolute -bottom-4 flex-1 text-[10px] text-red-500">{props["aria-errormessage"]}</small>
      </label>
    )
  }
)
Input.displayName = "Input"

export { Input }
