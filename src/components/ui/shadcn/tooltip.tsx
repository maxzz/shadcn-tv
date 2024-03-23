import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-tooltip";
import { cn } from "@/utils";

const TooltipProvider = Prim.Provider;
const Tooltip = Prim.Root;
const TooltipTrigger = Prim.Trigger;
const TooltipArrow = Prim.Arrow;
const TooltipPortal = Prim.Portal;

const TooltipContentClasses = "\
z-50 px-3 py-1.5 text-xs \
\
text-primary-foreground \
bg-primary \
\
animate-in fade-in-0 zoom-in-95 \
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
overflow-hidden \
rounded-md";

const TooltipContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, sideOffset = 4, ...rest }, ref) => (
        <Prim.Content ref={ref} sideOffset={sideOffset} className={cn(TooltipContentClasses, className)} {...rest} />
    )
);
TooltipContent.displayName = Prim.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipArrow, TooltipPortal, TooltipContent, TooltipProvider };
