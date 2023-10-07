import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-separator";
import { cn } from "@/utils";

const Separator = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, orientation = "horizontal", decorative = true, ...rest }, ref) => (
        <Prim.Root
            ref={ref}
            className={cn("shrink-0 bg-border", orientation === "horizontal" ? "w-full h-[1px]" : "w-[1px] h-full", className)}
            orientation={orientation}
            decorative={decorative}
            {...rest}
        />
    )
);
Separator.displayName = Prim.Root.displayName;

export { Separator };
