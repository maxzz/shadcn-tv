//"use client"; // rollup does not like this
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Prim from "@radix-ui/react-popover";
import { cn } from "@/utils";

const Popover = Prim.Root;

const PopoverTrigger = Prim.Trigger;
const PopoverAnchor = Prim.Anchor;

const PopoverContentClasses = "\
p-4 w-72 z-50 \
\
text-popover-foreground \
bg-popover \
\
data-[state=open]:animate-in \
data-[state=open]:fade-in-0 \
data-[state=open]:zoom-in-95 \
\
data-[state=closed]:animate-out \
data-[state=closed]:fade-out-0 \
data-[state=closed]:zoom-out-95 \
\
data-[side=bottom]:slide-in-from-top-2 \
data-[side=left]:slide-in-from-right-2 \
data-[side=right]:slide-in-from-left-2 \
data-[side=top]:slide-in-from-bottom-2 \
\
outline-none \
border rounded-md shadow-md";

const PopoverContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, align = "center", sideOffset = 4, ...rest }, ref) => (
        <Prim.Portal>
            <Prim.Content
                ref={ref}
                align={align}
                sideOffset={sideOffset}
                className={cn(PopoverContentClasses, className)}
                {...rest}
            />
        </Prim.Portal>
    )
);
PopoverContent.displayName = Prim.Content.displayName;

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent };
