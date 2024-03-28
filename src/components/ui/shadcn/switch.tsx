import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-switch";
import { cn } from "@/utils";

const RootClasses = "\
peer w-9 h-5 \
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
block size-4 \
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

const Switch = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root> & {thumbClasses?: string}>(
    ({ className, thumbClasses, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn(RootClasses, className)} {...rest}>
            <Prim.Thumb className={cn(ThumbClasses, thumbClasses)} />
        </Prim.Root>
    )
);
Switch.displayName = Prim.Root.displayName;

export { Switch };
