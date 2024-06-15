import { _l, _p, cn } from "@/lib/utils";
import React from "react"; 

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Field = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, name, title, ...props}, ref) => {
    const [persianValue, setPersianValue] = React.useState('');
    const handleChange =(e: any) => {
      e.preventDefault();
      setPersianValue(_p(e.target.value));
    }
    return <label className="group relative mt-2 flex flex-col">
      <span className="mb-1 text-sm">{title}</span>
      <input dir="ltr"
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          value={persianValue}
          onChange={handleChange}
          {...props}
          ref={ref}
        />
      <input type="hidden" value={_l(persianValue)} name={name} hidden/>
      <small className="absolute -bottom-4 flex-1 text-[10px] text-red-500">{props["aria-errormessage"]}</small>
    </label>
  }
)

Field.displayName = "Field"

export { Field }