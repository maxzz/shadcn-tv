import { forwardRef } from "react";
import { cn } from "@/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextareaClasses = "\
px-3 py-2 w-full min-h-[60px] text-sm \
\
border-input \
bg-transparent \
placeholder:text-muted-foreground \
\
focus-visible:outline-none \
focus-visible:ring-1 \
focus-visible:ring-ring \
\
disabled:opacity-50 \
disabled:cursor-not-allowed \
\
border rounded-md shadow-sm \
flex";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...rest }, ref) => {
        return (
            <textarea className={cn(TextareaClasses, className)} ref={ref} {...rest} />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
