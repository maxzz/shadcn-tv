import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

const InputClasses = "\
px-3 py-1 w-full h-9 text-sm \
\
border-input \
bg-transparent \
\
file:border-0 \
file:bg-transparent \
file:text-sm \
file:font-medium \
\
placeholder:text-muted-foreground \
\
focus-visible:outline-none \
focus-visible:ring-1 \
focus-visible:ring-ring \
\
disabled:opacity-50 \
disabled:cursor-not-allowed \
\
transition-colors \
border rounded-md shadow-sm \
flex";

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...rest }, ref) => {
        return (
            <input type={type} className={cn(InputClasses, className)} ref={ref} {...rest} />
        );
    }
);
Input.displayName = "Input";

export { Input };
