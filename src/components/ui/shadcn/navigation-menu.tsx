import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

const NavigationMenuClasses = "\
z-10 relative max-w-max flex-1 \
flex items-center justify-center";

const NavigationMenu = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn(NavigationMenuClasses, className)} {...rest}>
            {children}
            <NavigationMenuViewport />
        </Prim.Root>
    )
);
NavigationMenu.displayName = Prim.Root.displayName;

const NavigationMenuListClasses = "\
group flex-1\
list-none \
flex items-center justify-center space-x-1";

const NavigationMenuList = forwardRef<ElementRef<typeof Prim.List>, ComponentPropsWithoutRef<typeof Prim.List>>(
    ({ className, ...rest }, ref) => (
        <Prim.List ref={ref} className={cn(NavigationMenuListClasses, className)} {...rest} />
    )
);
NavigationMenuList.displayName = Prim.List.displayName;

const NavigationMenuItem = Prim.Item;

const navigationMenuTriggerStyleClasses = "\
group px-4 py-2 w-max h-9 text-sm font-medium \
\
bg-background \
\
hover:text-accent-foreground \
hover:bg-accent \
\
focus:text-accent-foreground \
focus:bg-accent \
focus:outline-none \
\
disabled:opacity-50 \
\
data-[active]:bg-accent/50 \
data-[state=open]:bg-accent/50 \
disabled:pointer-events-none \
\
transition-colors \
rounded-md \
inline-flex items-center justify-center";

const navigationMenuTriggerStyle = cva(navigationMenuTriggerStyleClasses);

const NavigationMenuTriggerIconClasses = "\
relative ml-1 top-[1px] w-3 h-3 \
\
group-data-[state=open]:rotate-180 \
\
transition duration-300 \
";
const NavigationMenuTrigger = forwardRef<ElementRef<typeof Prim.Trigger>, ComponentPropsWithoutRef<typeof Prim.Trigger>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.Trigger ref={ref} className={cn(navigationMenuTriggerStyle(), "group", className)} {...rest}>
            {children}
            {" "}
            <ChevronDownIcon className={NavigationMenuTriggerIconClasses} aria-hidden="true" />
        </Prim.Trigger>
    )
);
NavigationMenuTrigger.displayName = Prim.Trigger.displayName;

const NavigationMenuContentClasses = "\
left-0 top-0 w-full \
md:absolute md:w-auto \
\
data-[motion^=from-]:animate-in \
data-[motion^=from-]:fade-in \
\
data-[motion^=to-]:animate-out \
data-[motion^=to-]:fade-out \
\
data-[motion=from-start]:slide-in-from-left-52 \
data-[motion=from-end]:slide-in-from-right-52 \
\
data-[motion=to-start]:slide-out-to-left-52 \
data-[motion=to-end]:slide-out-to-right-52";

const NavigationMenuContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, ...rest }, ref) => (
        <Prim.Content ref={ref} className={cn(NavigationMenuContentClasses, className)} {...rest} />
    )
);
NavigationMenuContent.displayName = Prim.Content.displayName;

const NavigationMenuLink = Prim.Link;

const NavigationMenuViewportClasses = "\
relative mt-1.5 w-full h-[var(--radix-navigation-menu-viewport-height)] \
\
text-popover-foreground \
bg-popover \
\
data-[state=open]:animate-in \
data-[state=open]:zoom-in-90 \
\
data-[state=closed]:animate-out \
data-[state=closed]:zoom-out-95 \
\
md:w-[var(--radix-navigation-menu-viewport-width)] \
\
overflow-hidden \
origin-top-center \
border rounded-md shadow";

const NavigationMenuViewport = forwardRef<ElementRef<typeof Prim.Viewport>, ComponentPropsWithoutRef<typeof Prim.Viewport>>(
    ({ className, ...rest }, ref) => (
        <div className={cn("absolute left-0 top-full flex justify-center")}>
            <Prim.Viewport ref={ref} className={cn(NavigationMenuViewportClasses, className)} {...rest} />
        </div>
    )
);
NavigationMenuViewport.displayName = Prim.Viewport.displayName;

const NavigationMenuIndicatorClasses = "\
z-[1] top-full h-1.5 \
\
data-[state=visible]:animate-in \
data-[state=visible]:fade-in \
\
data-[state=hidden]:animate-out \
data-[state=hidden]:fade-out \
\
overflow-hidden \
flex items-end justify-center";

const NavigationMenuIndicator = forwardRef<ElementRef<typeof Prim.Indicator>, ComponentPropsWithoutRef<typeof Prim.Indicator>>(
    ({ className, ...rest }, ref) => (
        <Prim.Indicator ref={ref} className={cn(NavigationMenuIndicatorClasses, className)} {...rest}>
            <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
        </Prim.Indicator>
    )
);
NavigationMenuIndicator.displayName =
    Prim.Indicator.displayName;

export {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
};
