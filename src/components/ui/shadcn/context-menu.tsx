import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from "react";
import * as Prim from "@radix-ui/react-context-menu";
import { popupAnimatonClasses } from "./shared";
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

const ContextMenu = Prim.Root;
const ContextMenuTrigger = Prim.Trigger;
const ContextMenuGroup = Prim.Group;
const ContextMenuPortal = Prim.Portal;
const ContextMenuSub = Prim.Sub;
const ContextMenuRadioGroup = Prim.RadioGroup;

const ContextMenuSubTriggerClasses = "\
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

const ContextMenuSubTrigger = forwardRef<ElementRef<typeof Prim.SubTrigger>, ComponentPropsWithoutRef<typeof Prim.SubTrigger> & { inset?: boolean; }>(
    ({ className, inset, children, ...rest }, ref) => (
        <Prim.SubTrigger ref={ref} className={cn(ContextMenuSubTriggerClasses, inset && "pl-8", className)} {...rest}>
            {children}
            <ChevronRightIcon className="ml-auto h-4 w-4" />
        </Prim.SubTrigger>
    )
);
ContextMenuSubTrigger.displayName = Prim.SubTrigger.displayName;

const ContextMenuSubContentClasses = `${"\
z-50 p-1 min-w-[8rem] \
text-popover-foreground bg-popover \
border rounded-md shadow-md overflow-hidden \
"} ${popupAnimatonClasses}`;
const ContextMenuSubContent = forwardRef<ElementRef<typeof Prim.SubContent>, ComponentPropsWithoutRef<typeof Prim.SubContent>>(
    ({ className, ...rest }, ref) => (
        <Prim.SubContent ref={ref} className={cn(ContextMenuSubContentClasses, className)} {...rest} />
    )
);
ContextMenuSubContent.displayName = Prim.SubContent.displayName;

const ContextMenuContentClasses = ContextMenuSubContentClasses;
const ContextMenuContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, ...rest }, ref) => (
        <Prim.Portal>
            <Prim.Content ref={ref} className={cn(ContextMenuContentClasses, className)} {...rest} />
        </Prim.Portal>
    )
);
ContextMenuContent.displayName = Prim.Content.displayName;

const ContextMenuItemClasses = "\
relative px-2 py-1.5 text-sm \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
rounded-sm outline-none select-none cursor-default \
flex items-center";

const ContextMenuItem = forwardRef<ElementRef<typeof Prim.Item>, ComponentPropsWithoutRef<typeof Prim.Item> & { inset?: boolean; }>(
    ({ className, inset, ...rest }, ref) => (
        <Prim.Item ref={ref} className={cn(ContextMenuItemClasses, inset && "pl-8", className)} {...rest} />
    )
);
ContextMenuItem.displayName = Prim.Item.displayName;

const ContextMenuCheckboxRadioItemClasses = "\
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

const ContextMenuCheckboxItem = forwardRef<ElementRef<typeof Prim.CheckboxItem>, ComponentPropsWithoutRef<typeof Prim.CheckboxItem>>(
    ({ className, children, checked, ...rest }, ref) => (
        <Prim.CheckboxItem ref={ref} className={cn(ContextMenuCheckboxRadioItemClasses, className)} checked={checked} {...rest}>
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <Prim.ItemIndicator>
                    <CheckIcon className="h-4 w-4" />
                </Prim.ItemIndicator>
            </span>
            {children}
        </Prim.CheckboxItem>
    )
);
ContextMenuCheckboxItem.displayName = Prim.CheckboxItem.displayName;

const ContextMenuRadioItem = forwardRef<ElementRef<typeof Prim.RadioItem>, ComponentPropsWithoutRef<typeof Prim.RadioItem>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.RadioItem ref={ref} className={cn(ContextMenuCheckboxRadioItemClasses, className)} {...rest}>
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <Prim.ItemIndicator>
                    <DotFilledIcon className="h-4 w-4 fill-current" />
                </Prim.ItemIndicator>
            </span>
            {children}
        </Prim.RadioItem>
    )
);
ContextMenuRadioItem.displayName = Prim.RadioItem.displayName;

const ContextMenuLabel = forwardRef<ElementRef<typeof Prim.Label>, ComponentPropsWithoutRef<typeof Prim.Label> & { inset?: boolean; }>(
    ({ className, inset, ...rest }, ref) => (
        <Prim.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)} {...rest} />
    )
);
ContextMenuLabel.displayName = Prim.Label.displayName;

const ContextMenuSeparator = forwardRef<ElementRef<typeof Prim.Separator>, ComponentPropsWithoutRef<typeof Prim.Separator>>(
    ({ className, ...rest }, ref) => (
        <Prim.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...rest} />
    )
);
ContextMenuSeparator.displayName = Prim.Separator.displayName;

const ContextMenuShortcut = ({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...rest} />
    );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuGroup,
    ContextMenuPortal,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuRadioGroup,
};
