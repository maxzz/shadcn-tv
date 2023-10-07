import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-hover-card";
import { cn } from "@/utils";

const HoverCard = Prim.Root;
const HoverCardTrigger = Prim.Trigger;

const HoverCardContentClasses = "\
z-50 p-4 w-64 \
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
border rounded-md shadow-md outline-none";

const HoverCardContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, align = "center", sideOffset = 4, ...rest }, ref) => (
        <Prim.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(HoverCardContentClasses, className)}
            {...rest}
        />
    )
);
HoverCardContent.displayName = Prim.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
