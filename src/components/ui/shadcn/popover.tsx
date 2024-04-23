//"use client"; // rollup does not like this
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Prim from "@radix-ui/react-popover";
import { popupAnimatonClasses } from "./shared";
import { cn } from "@/utils";

const Popover = Prim.Root;
const PopoverTrigger = Prim.Trigger;
const PopoverAnchor = Prim.Anchor;
const PopoverArrow = Prim.Arrow;
const PopoverPortal = Prim.Portal;
const PopoverContentWoPortal = Prim.Content;

const PopoverContentClasses = `${"\
p-4 w-72 z-50 \
text-popover-foreground bg-popover \
border rounded-md shadow-md outline-none \
"} ${popupAnimatonClasses}`;

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

export { Popover, PopoverTrigger, PopoverAnchor, PopoverArrow, PopoverPortal, PopoverContentWoPortal, PopoverContent };
