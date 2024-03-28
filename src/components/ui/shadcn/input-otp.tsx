import { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/utils";
import { DashIcon } from "@radix-ui/react-icons";

export const InputOTP = forwardRef<ElementRef<typeof OTPInput>, ComponentPropsWithoutRef<typeof OTPInput>>(
    ({ className, containerClassName, ...rest }, ref) => (
        <OTPInput
            ref={ref}
            containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
            className={cn("disabled:cursor-not-allowed", className)}
            {...rest}
        />
    )
);
InputOTP.displayName = "InputOTP";

export const InputOTPGroup = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(
    ({ className, ...rest }, ref) => (
        <div ref={ref} className={cn("flex items-center", className)} {...rest} />
    )
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlotClasses = "\
relative size-9 text-sm \
border-input \
border-y \
border-r \
first:border-l \
first:rounded-l-md \
last:rounded-r-md \
shadow-sm \
transition-all \
flex items-center justify-center";

export const InputOTPSlot = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div"> & { index: number; }>(
    ({ index, className, ...rest }, ref) => {
        const inputOTPContext = useContext(OTPInputContext);
        const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

        return (
            <div ref={ref} className={cn(InputOTPSlotClasses, isActive && "z-10 ring-1 ring-ring", className)} {...rest}>
                {char}
                {hasFakeCaret && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                    </div>
                )}
            </div>
        );
    }
);
InputOTPSlot.displayName = "InputOTPSlot";

export const InputOTPSeparator = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(
    ({ ...rest }, ref) => (
        <div ref={ref} role="separator" {...rest}>
            <DashIcon />
        </div>
    )
);
InputOTPSeparator.displayName = "InputOTPSeparator";
