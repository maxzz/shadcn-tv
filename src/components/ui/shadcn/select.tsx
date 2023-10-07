//"use client"; // rollup does not like this
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Prim from "@radix-ui/react-select";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

const Select = Prim.Root;
const SelectGroup = Prim.Group;
const SelectValue = Prim.Value;

const SelectTriggerClasses = "\
px-3 py-2 h-9 w-full text-sm \
border-input \
bg-transparent \
\
ring-offset-background \
placeholder:text-muted-foreground \
\
focus:outline-none \
focus:ring-1 \
focus:ring-ring \
\
disabled:cursor-not-allowed \
disabled:opacity-50 \
\
border rounded-md shadow-sm \
flex items-center justify-between";
const SelectTrigger = forwardRef<ElementRef<typeof Prim.Trigger>, ComponentPropsWithoutRef<typeof Prim.Trigger>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.Trigger ref={ref} className={cn(SelectTriggerClasses, className)} {...rest}>
            {children}
            <Prim.Icon asChild>
                <CaretSortIcon className="h-4 w-4 opacity-50" />
            </Prim.Icon>
        </Prim.Trigger>
    )
);
SelectTrigger.displayName = Prim.Trigger.displayName;

const SelectContentClasses = "\
z-50 relative min-w-[8rem] \
bg-popover \
text-popover-foreground \
\
data-[state=open]:animate-in \
data-[state=closed]:animate-out \
data-[state=closed]:fade-out-0 \
data-[state=open]:fade-in-0 \
data-[state=closed]:zoom-out-95 \
data-[state=open]:zoom-in-95 \
\
data-[side=bottom]:slide-in-from-top-2 \
data-[side=left]:slide-in-from-right-2 \
data-[side=right]:slide-in-from-left-2 \
data-[side=top]:slide-in-from-bottom-2 \
overflow-hidden \
border rounded-md shadow-md";
const SelectContentPopperClasses = "\
data-[side=bottom]:translate-y-1 \
data-[side=left]:-translate-x-1 \
data-[side=right]:translate-x-1 \
data-[side=top]:-translate-y-1";
const SelectContentViewportPopperClasses = "\
w-full \
h-[var(--radix-select-trigger-height)] \
min-w-[var(--radix-select-trigger-width)]";
const SelectContent = forwardRef<React.ElementRef<typeof Prim.Content>, React.ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, children, position = "popper", ...rest }, ref) => (
        <Prim.Portal>
            <Prim.Content
                ref={ref}
                className={cn(SelectContentClasses, position === "popper" && SelectContentPopperClasses, className)}
                position={position}
                {...rest}
            >
                <Prim.Viewport className={cn("p-1", position === "popper" && SelectContentViewportPopperClasses)}>
                    {children}
                </Prim.Viewport>
            </Prim.Content>
        </Prim.Portal>
    )
);
SelectContent.displayName = Prim.Content.displayName;

const SelectLabel = forwardRef<ElementRef<typeof Prim.Label>, ComponentPropsWithoutRef<typeof Prim.Label>>(
    ({ className, ...props }, ref) => (
        <Prim.Label
            ref={ref}
            className={cn("px-2 py-1.5 text-sm font-semibold", className)}
            {...props}
        />
    )
);
SelectLabel.displayName = Prim.Label.displayName;

const SelectItemClasses = "\
relative pl-2 pr-8 py-1.5 w-full text-sm \
focus:bg-accent \
focus:text-accent-foreground \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
rounded-sm outline-none select-none cursor-default \
flex items-center";
const SelectItem = forwardRef<ElementRef<typeof Prim.Item>, ComponentPropsWithoutRef<typeof Prim.Item>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.Item ref={ref} className={cn(SelectItemClasses, className)} {...rest} >
            <span className="absolute right-2 h-3.5 w-3.5 flex items-center justify-center">
                <Prim.ItemIndicator>
                    <CheckIcon className="h-4 w-4" />
                </Prim.ItemIndicator>
            </span>
            <Prim.ItemText>{children}</Prim.ItemText>
        </Prim.Item>
    )
);
SelectItem.displayName = Prim.Item.displayName;

const SelectSeparator = forwardRef<ElementRef<typeof Prim.Separator>, ComponentPropsWithoutRef<typeof Prim.Separator>>(
    ({ className, ...rest }, ref) => (
        <Prim.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...rest} />
    )
);
SelectSeparator.displayName = Prim.Separator.displayName;

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
};
