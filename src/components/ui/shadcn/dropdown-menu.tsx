//"use client"; // rollup does not like this
import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from "react";
import * as Prim from "@radix-ui/react-dropdown-menu";
import { popupAnimatonClasses } from "./shared";
import { CheckIcon, ChevronRightIcon, DotFilledIcon, } from "@radix-ui/react-icons";
import { cn } from "@/utils";

const DropdownMenu = Prim.Root;
const DropdownMenuTrigger = Prim.Trigger;
const DropdownMenuGroup = Prim.Group;
const DropdownMenuPortal = Prim.Portal;
const DropdownMenuSub = Prim.Sub;
const DropdownMenuRadioGroup = Prim.RadioGroup;

const DropdownMenuSubTriggerClasses = "\
px-2 py-1.5 text-sm \
\
focus:bg-accent \
data-[state=open]:bg-accent \
\
rounded-sm outline-none select-none cursor-default \
flex items-center";
const DropdownMenuSubTrigger = forwardRef<ElementRef<typeof Prim.SubTrigger>, ComponentPropsWithoutRef<typeof Prim.SubTrigger> & { inset?: boolean; }>(
    ({ className, inset, children, ...rest }, ref) => (
        <Prim.SubTrigger ref={ref} className={cn(DropdownMenuSubTriggerClasses, inset && "pl-8", className)} {...rest}>
            {children}
            <ChevronRightIcon className="ml-auto h-4 w-4" />
        </Prim.SubTrigger>
    )
);
DropdownMenuSubTrigger.displayName = Prim.SubTrigger.displayName;

const DropdownMenuSubContentClasses = `${"\
p-1 min-w-[8rem] z-50 \
text-popover-foreground bg-popover \
border rounded-md shadow-md overflow-hidden \
"} ${popupAnimatonClasses}`;
const DropdownMenuSubContent = forwardRef<ElementRef<typeof Prim.SubContent>, ComponentPropsWithoutRef<typeof Prim.SubContent>>(
    ({ className, ...rest }, ref) => (
        <Prim.SubContent ref={ref} className={cn(DropdownMenuSubContentClasses, className)} {...rest} />
    )
);
DropdownMenuSubContent.displayName = Prim.SubContent.displayName;

const DropdownMenuContentClasses = DropdownMenuSubContentClasses;
const DropdownMenuContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, sideOffset = 4, ...rest }, ref) => (
        <Prim.Portal>
            <Prim.Content ref={ref} className={cn(DropdownMenuContentClasses, className)} sideOffset={sideOffset} {...rest} />
        </Prim.Portal>
    )
);
DropdownMenuContent.displayName = Prim.Content.displayName;

const DropdownMenuItemClasses = "\
relative px-2 py-1.5 text-sm \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
transition-colors \
rounded-sm outline-none select-none cursor-default \
flex items-center";
const DropdownMenuItem = forwardRef<ElementRef<typeof Prim.Item>, ComponentPropsWithoutRef<typeof Prim.Item> & { inset?: boolean; }>(
    ({ className, inset, ...rest }, ref) => (
        <Prim.Item ref={ref} className={cn(DropdownMenuItemClasses, inset && "pl-8", className)} {...rest} />
    )
);
DropdownMenuItem.displayName = Prim.Item.displayName;

const DropdownMenuCheckboxItemClasses = "\
relative pl-8 pr-2 py-1.5 text-sm \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
transition-colors \
rounded-sm outline-none select-none cursor-default \
flex items-center";
const DropdownMenuCheckboxItem = forwardRef<ElementRef<typeof Prim.CheckboxItem>, ComponentPropsWithoutRef<typeof Prim.CheckboxItem>>(
    ({ className, children, checked, ...rest }, ref) => (
        <Prim.CheckboxItem ref={ref} className={cn(DropdownMenuCheckboxItemClasses, className)} checked={checked} {...rest}>
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <Prim.ItemIndicator>
                    <CheckIcon className="h-4 w-4" />
                </Prim.ItemIndicator>
            </span>
            {children}
        </Prim.CheckboxItem>
    )
);
DropdownMenuCheckboxItem.displayName = Prim.CheckboxItem.displayName;

const DropdownMenuRadioItemClasses = "\
relative pl-8 pr-2 py-1.5 text-sm \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
transition-colors \
rounded-sm outline-none select-none cursor-default \
flex items-center";
const DropdownMenuRadioItem = forwardRef<ElementRef<typeof Prim.RadioItem>, ComponentPropsWithoutRef<typeof Prim.RadioItem>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.RadioItem ref={ref} className={cn(DropdownMenuRadioItemClasses, className)} {...rest}>
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <Prim.ItemIndicator>
                    <DotFilledIcon className="h-4 w-4 fill-current" />
                </Prim.ItemIndicator>
            </span>
            {children}
        </Prim.RadioItem>
    )
);
DropdownMenuRadioItem.displayName = Prim.RadioItem.displayName;

const DropdownMenuLabel = forwardRef<ElementRef<typeof Prim.Label>, ComponentPropsWithoutRef<typeof Prim.Label> & { inset?: boolean; }>(
    ({ className, inset, ...props }, ref) => (
        <Prim.Label
            ref={ref}
            className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
            {...props}
        />
    )
);
DropdownMenuLabel.displayName = Prim.Label.displayName;

const DropdownMenuSeparator = forwardRef<ElementRef<typeof Prim.Separator>, ComponentPropsWithoutRef<typeof Prim.Separator>>(
    ({ className, ...props }, ref) => (
        <Prim.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
    )
);
DropdownMenuSeparator.displayName = Prim.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...rest} />
    );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
};
