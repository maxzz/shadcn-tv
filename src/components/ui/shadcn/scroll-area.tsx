import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-scroll-area";
import { cn } from "@/utils";

/**
 * [&>div]:![display:block]
 * https://github.com/radix-ui/primitives/blob/main/packages/react/scroll-area/src/ScrollArea.tsx#L177
  * `display: table` ensures our content div will match the size of its children in both
  * horizontal and vertical axis so we can determine if scroll width/height changed and
  * recalculate thumb sizes. This doesn't account for children with *percentage*
  * widths that change. We'll wait to see what use-cases consumers come up with there
  * before trying to resolve it.
 */

const ScrollArea = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn("relative overflow-hidden", className)} {...rest}>

            <Prim.Viewport data-as-table className="h-full w-full rounded-[inherit] [&[data-as-table='true']>div]:![display:block]">
                {children}
            </Prim.Viewport>

            <ScrollBar />

            <Prim.Corner />
        </Prim.Root>
    )
);
ScrollArea.displayName = Prim.Root.displayName;

const ScrollBar = forwardRef<ElementRef<typeof Prim.ScrollAreaScrollbar>, ComponentPropsWithoutRef<typeof Prim.ScrollAreaScrollbar>>(
    ({ className, orientation = "vertical", ...rest }, ref) => (
        <Prim.ScrollAreaScrollbar
            ref={ref}
            orientation={orientation}
            className={cn(
                "flex touch-none select-none transition-colors",
                orientation === "vertical" && "w-2.5 h-full border-l border-l-transparent p-[1px]",
                orientation === "horizontal" && "h-2.5 border-t border-t-transparent p-[1px]",
                className
            )}
            {...rest}
        >
            <Prim.ScrollAreaThumb className={cn("relative rounded-full bg-border", orientation === "vertical" && "flex-1")} />
        </Prim.ScrollAreaScrollbar>
    )
);
ScrollBar.displayName = Prim.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
