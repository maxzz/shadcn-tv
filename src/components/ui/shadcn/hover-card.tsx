import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-hover-card";
import { popupAnimatonClasses } from "./shared";
import { cn } from "@/utils";

const HoverCard = Prim.Root;
const HoverCardTrigger = Prim.Trigger;

const HoverCardContentClasses = `${"\
z-50 p-4 w-64 \
text-popover-foreground bg-popover \
border rounded-md shadow-md outline-none \
"} ${popupAnimatonClasses}`;

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
