import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-scroll-area";
import { cn } from "@/utils";

export type ScrollAreaProps = ComponentPropsWithoutRef<typeof Prim.Root> & {
    horizontal?: boolean;           // adds horizontal scrollbar
    fullHeight?: boolean;           // sets ScrollArea height to 100%
    fixedWidth?: boolean;           // prevents ScrollArea width from growing; i.e. removes display: table from Prim.Viewport
    parentContentWidth?: boolean;   // allows to truncate items to parent width
};

/**
 * Additinal attribute ``data-fixed-width`` is used to prevent ScrollArea width from growing.
 * This is done by removing ``display: table`` from Prim.Viewport first utility div.
 * 
 * ``[&[data-fixed-width]>div>div]:![display:block]``
 * https://github.com/radix-ui/primitives/blob/main/packages/react/scroll-area/src/ScrollArea.tsx#L177
 * `display: table` ensures our content div will match the size of its children in both
 * horizontal and vertical axis so we can determine if scroll width/height changed and
 * recalculate thumb sizes. This doesn't account for children with *percentage*
 * widths that change. We'll wait to see what use-cases consumers come up with there
 * before trying to resolve it.
 * 
 * const fixedWidthClasses = "[&[data-fixed-width]_[data-radix-scroll-area-content]]:![display:block]";
 */
const fullHeightClasses = "[&_[data-radix-scroll-area-viewport]>div]:h-full";
const fixedWidthClasses = "[&_[data-radix-scroll-area-viewport]>div]:![display:block]"; // to block: display: table
const parentContentWidthClasses = "[&_[data-radix-scroll-area-content]]:!min-w-0";

const ScrollArea = forwardRef<ElementRef<typeof Prim.Root>, ScrollAreaProps>(
    ({ className, children, horizontal, fixedWidth, fullHeight, parentContentWidth, ...rest }, ref) => (
        <Prim.Root ref={ref}
            className={cn(
                "relative overflow-hidden",
                fullHeight && fullHeightClasses,
                fixedWidth && fixedWidthClasses,
                parentContentWidth && parentContentWidthClasses,
                className
            )}
            {...rest}
        >
            <Prim.Viewport className="h-full w-full rounded-[inherit]">
                {children}
            </Prim.Viewport>

            <ScrollBar />
            {horizontal && <ScrollBar orientation="horizontal" />}

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
