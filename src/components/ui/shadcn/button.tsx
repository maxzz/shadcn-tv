import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const defaultVariantClasses = "\
text-sm font-medium \
\
focus-visible:ring-1 \
focus-visible:ring-ring \
focus-visible:outline-none \
\
disabled:opacity-50 \
disabled:pointer-events-none \
\
transition-colors \
rounded-md \
inline-flex items-center justify-center";

const buttonVariantsClasses = cva(defaultVariantClasses, {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
            outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground shadow-sm",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariantsClasses> {
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...rest }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp className={cn(buttonVariantsClasses({ variant, size, className }))} ref={ref} {...rest} />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariantsClasses as buttonVariants };
