import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-slider";
import { cn } from "@/utils";

const ThumbClasses = "\
block h-4 w-4 \
\
bg-background \
border-primary/50 \
\
focus-visible:ring-1 \
focus-visible:ring-ring \
focus-visible:outline-none \
\
disabled:opacity-50 \
disabled:pointer-events-none \
\
transition-colors \
border rounded-full shadow";

const Slider = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn("relative w-full touch-none select-none flex items-center", className)} {...rest}>
            <Prim.Track className="relative w-full h-1.5 bg-primary/20 rounded-full grow overflow-hidden">
                <Prim.Range className="absolute h-full bg-primary" />
            </Prim.Track>
            <Prim.Thumb className={ThumbClasses} />
        </Prim.Root>
    )
);
Slider.displayName = Prim.Root.displayName;

export { Slider };
