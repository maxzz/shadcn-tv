import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-tabs";
import { cn } from "@/utils";

const Tabs = Prim.Root;

const TabsListClasses = "\
p-1 h-9 \
\
text-muted-foreground \
bg-muted \
\
rounded-lg \
inline-flex items-center justify-center";

export const TabsListWrapClasses = "h-auto justify-normal flex-wrap";

const TabsList = forwardRef<ElementRef<typeof Prim.List>, ComponentPropsWithoutRef<typeof Prim.List>>(
    ({ className, ...rest }, ref) => (
        <Prim.List ref={ref} className={cn(TabsListClasses, className)} {...rest} />
    )
);
TabsList.displayName = Prim.List.displayName;

const TabsTriggerClasses = "\
px-3 py-1 text-sm font-medium whitespace-nowrap\
\
focus-visible:ring-2 \
focus-visible:ring-ring \
focus-visible:ring-offset-2 \
focus-visible:outline-none \
\
disabled:opacity-50 \
disabled:pointer-events-none \
\
data-[state=active]:text-foreground \
data-[state=active]:bg-background \
data-[state=active]:shadow \
\
ring-offset-background \
transition-all \
rounded-md \
inline-flex items-center justify-center";

const TabsTrigger = forwardRef<ElementRef<typeof Prim.Trigger>, ComponentPropsWithoutRef<typeof Prim.Trigger>>(
    ({ className, ...rest }, ref) => (
        <Prim.Trigger ref={ref} className={cn(TabsTriggerClasses, className)} {...rest} />
    )
);
TabsTrigger.displayName = Prim.Trigger.displayName;

const TabsContentClasses = "\
mt-2 \
\
focus-visible:ring-2 \
focus-visible:ring-ring \
focus-visible:ring-offset-2 \
focus-visible:outline-none \
\
ring-offset-background";

const TabsContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, ...rest }, ref) => (
        <Prim.Content ref={ref} className={cn(TabsContentClasses, className)} {...rest} />
    )
);
TabsContent.displayName = Prim.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
