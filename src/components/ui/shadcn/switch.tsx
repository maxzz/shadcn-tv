import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-switch";
import { cn } from "@/utils";

const RootClasses = "\
peer w-[36px] h-[20px] \
\
border-transparent \
\
focus-visible:ring-2 \
focus-visible:ring-offset-2 \
focus-visible:ring-ring \
focus-visible:ring-offset-background \
focus-visible:outline-none \
\
disabled:opacity-50 \
disabled:cursor-not-allowed \
\
data-[state=checked]:bg-primary \
data-[state=unchecked]:bg-input \
\
transition-colors \
border-2 rounded-full shadow-sm cursor-pointer \
shrink-0 \
inline-flex items-center";

const ThumbClasses = "\
block w-4 h-4 \
\
bg-background \
\
data-[state=checked]:translate-x-4 \
data-[state=unchecked]:translate-x-0 \
\
transition-transform \
pointer-events-none \
ring-0 \
rounded-full shadow-lg";

const Switch = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn(RootClasses, className)} {...rest}>
            <Prim.Thumb className={cn(ThumbClasses)} />
        </Prim.Root>
    )
);
Switch.displayName = Prim.Root.displayName;

export { Switch };
