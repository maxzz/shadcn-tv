import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-progress";
import { cn } from "@/utils";

const Progress = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, value, ...rest }, ref) => (
        <Prim.Root
            ref={ref}
            className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
            {...rest}
        >
            <Prim.Indicator
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </Prim.Root>
    )
);
Progress.displayName = Prim.Root.displayName;

export { Progress };
