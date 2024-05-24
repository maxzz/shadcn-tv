//"use client"; // rollup does not like this
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Prim from "@radix-ui/react-popover";
import { popupAnimatonClasses } from "./shared";
import { cn } from "@/utils";

const Popover = Prim.Root;
const PopoverTrigger = Prim.Trigger;
const PopoverAnchor = Prim.Anchor;
const PopoverClose = Prim.Close;
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

function PopoverArrorWoBottom({className, ...rest}: ComponentPropsWithoutRef<typeof Prim.Arrow>) {
    return (
        <Prim.Arrow className={cn("-mt-px fill-popover stroke-popover-foreground stroke-[1.5]", className)} asChild {...rest}>
            <svg viewBox="0 0 30 10">
                <polyline points="0,0 15,9 30,0" />
                <rect x="0" y="-1" width="30" height="2" stroke="none" />
            </svg>
        </Prim.Arrow>
    );
}

export { Popover, PopoverTrigger, PopoverAnchor, PopoverClose, PopoverArrow, PopoverArrorWoBottom, PopoverPortal, PopoverContentWoPortal, PopoverContent };
