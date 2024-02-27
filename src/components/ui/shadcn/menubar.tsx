//"use client"; // rollup does not like this
import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from "react";
import * as Prim from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, DotFilledIcon, } from "@radix-ui/react-icons";
import { cn } from "@/utils";

const MenubarMenu = Prim.Menu;
const MenubarGroup = Prim.Group;
const MenubarPortal = Prim.Portal;
const MenubarSub = Prim.Sub;
const MenubarRadioGroup = Prim.RadioGroup;

const MenubarClasses = "\
p-1 h-9 \
bg-background \
border rounded-md shadow-sm \
flex items-center space-x-1";
const Menubar = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn(MenubarClasses, className)} {...rest} />
    )
);
Menubar.displayName = Prim.Root.displayName;

const MenubarTriggerClasses = "\
px-3 py-1 text-sm font-medium \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[state=open]:text-accent-foreground \
data-[state=open]:bg-accent \
\
rounded-sm outline-none select-none cursor-default \
flex items-center";
const MenubarTrigger = forwardRef<ElementRef<typeof Prim.Trigger>, ComponentPropsWithoutRef<typeof Prim.Trigger>>(
    ({ className, ...rest }, ref) => (
        <Prim.Trigger ref={ref} className={cn(MenubarTriggerClasses, className)} {...rest} />
    )
);
MenubarTrigger.displayName = Prim.Trigger.displayName;

const MenubarSubTriggerClasses = "\
px-2 py-1.5 text-sm \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[state=open]:text-accent-foreground \
data-[state=open]:bg-accent \
\
rounded-sm outline-none select-none cursor-default \
flex items-center";
const MenubarSubTrigger = forwardRef<ElementRef<typeof Prim.SubTrigger>, ComponentPropsWithoutRef<typeof Prim.SubTrigger> & { inset?: boolean; }>(
    ({ className, inset, children, ...rest }, ref) => (
        <Prim.SubTrigger ref={ref} className={cn(MenubarSubTriggerClasses, inset && "pl-8", className)} {...rest}>
            {children}
            <ChevronRightIcon className="ml-auto h-4 w-4" />
        </Prim.SubTrigger>
    )
);
MenubarSubTrigger.displayName = Prim.SubTrigger.displayName;

const MenubarSubContentClasses = "\
p-1 min-w-[8rem] z-50 \
\
text-popover-foreground \
bg-popover \
\
data-[state=open]:animate-in \
data-[state=open]:fade-in-0 \
data-[state=open]:zoom-in-95 \
\
data-[state=closed]:fade-out-0 \
data-[state=closed]:zoom-out-95 \
\
data-[side=bottom]:slide-in-from-top-2 \
data-[side=left]:slide-in-from-right-2 \
data-[side=right]:slide-in-from-left-2 \
data-[side=top]:slide-in-from-bottom-2 \
\
border rounded-md shadow-lg \
overflow-hidden";
const MenubarSubContent = forwardRef<ElementRef<typeof Prim.SubContent>, ComponentPropsWithoutRef<typeof Prim.SubContent>>(
    ({ className, ...rest }, ref) => (
        <Prim.SubContent ref={ref} className={cn(MenubarSubContentClasses, className)} {...rest} />
    )
);
MenubarSubContent.displayName = Prim.SubContent.displayName;

const MenubarContentClasses = "\
p-1 min-w-[12rem] z-50 \
\
text-popover-foreground \
bg-popover \
\
data-[state=open]:animate-in \
data-[state=open]:fade-in-0 \
data-[state=open]:zoom-in-95 \
\
data-[state=closed]:fade-out-0 \
data-[state=closed]:zoom-out-95 \
\
data-[side=bottom]:slide-in-from-top-2 \
data-[side=left]:slide-in-from-right-2 \
data-[side=right]:slide-in-from-left-2 \
data-[side=top]:slide-in-from-bottom-2 \
\
border rounded-md shadow-md \
overflow-hidden";
const MenubarContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...rest }, ref) => (
        <Prim.Portal>
            <Prim.Content
                ref={ref}
                align={align}
                alignOffset={alignOffset}
                sideOffset={sideOffset}
                className={cn(MenubarContentClasses, className)}
                {...rest}
            />
        </Prim.Portal>
    )
);
MenubarContent.displayName = Prim.Content.displayName;

const MenubarItemClasses = "\
relative px-2 py-1.5 text-sm \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
rounded-sm select-none outline-none cursor-default \
flex items-center";
const MenubarItem = forwardRef<ElementRef<typeof Prim.Item>, ComponentPropsWithoutRef<typeof Prim.Item> & { inset?: boolean; }>(
    ({ className, inset, ...rest }, ref) => (
        <Prim.Item ref={ref} className={cn(MenubarItemClasses, inset && "pl-8", className)} {...rest} />
    )
);
MenubarItem.displayName = Prim.Item.displayName;

const MenubarCheckboxRadioItemClasses = "\
relative pl-8 pr-2 py-1.5 text-sm \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
rounded-sm outline-none select-none cursor-default \
flex items-center";

const MenubarCheckboxItem = forwardRef<ElementRef<typeof Prim.CheckboxItem>, ComponentPropsWithoutRef<typeof Prim.CheckboxItem>>(
    ({ className, children, checked, ...rest }, ref) => (
        <Prim.CheckboxItem ref={ref} className={cn(MenubarCheckboxRadioItemClasses, className)} checked={checked} {...rest}>
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <Prim.ItemIndicator>
                    <CheckIcon className="h-4 w-4" />
                </Prim.ItemIndicator>
            </span>
            {children}
        </Prim.CheckboxItem>
    )
);
MenubarCheckboxItem.displayName = Prim.CheckboxItem.displayName;

const MenubarRadioItem = forwardRef<ElementRef<typeof Prim.RadioItem>, ComponentPropsWithoutRef<typeof Prim.RadioItem>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.RadioItem ref={ref} className={cn(MenubarCheckboxRadioItemClasses, className)} {...rest}>
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <Prim.ItemIndicator>
                    <DotFilledIcon className="h-4 w-4 fill-current" />
                </Prim.ItemIndicator>
            </span>
            {children}
        </Prim.RadioItem>
    )
);
MenubarRadioItem.displayName = Prim.RadioItem.displayName;

const MenubarLabel = forwardRef<ElementRef<typeof Prim.Label>, ComponentPropsWithoutRef<typeof Prim.Label> & { inset?: boolean; }>(
    ({ className, inset, ...rest }, ref) => (
        <Prim.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} {...rest} />
    )
);
MenubarLabel.displayName = Prim.Label.displayName;

const MenubarSeparator = forwardRef<ElementRef<typeof Prim.Separator>, ComponentPropsWithoutRef<typeof Prim.Separator>>(
    ({ className, ...rest }, ref) => (
        <Prim.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...rest} />
    )
);
MenubarSeparator.displayName = Prim.Separator.displayName;

const MenubarShortcut = ({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...rest} />
    );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarLabel,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarPortal,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarGroup,
    MenubarSub,
    MenubarShortcut,
};
