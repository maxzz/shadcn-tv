import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Prim from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

const Accordion = Prim.Root;

const AccordionItem = forwardRef<ElementRef<typeof Prim.Item>, ComponentPropsWithoutRef<typeof Prim.Item>>(
    ({ className, ...rest }, ref) => (
        <Prim.Item ref={ref} className={cn("border-b", className)} {...rest} />
    )
);
AccordionItem.displayName = "AccordionItem";

const AccordionTriggerClasses = "\
flex-1 py-4 text-sm font-medium \
hover:underline \
[&[data-state=open]>svg]:rotate-180 \
transition-all \
flex items-center justify-between";

const AccordionTrigger = forwardRef<ElementRef<typeof Prim.Trigger>, ComponentPropsWithoutRef<typeof Prim.Trigger>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.Header className="flex">
            <Prim.Trigger ref={ref} className={cn(AccordionTriggerClasses, className)} {...rest}>
                <div>{children}</div>
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </Prim.Trigger>
        </Prim.Header>
    )
);
AccordionTrigger.displayName = Prim.Trigger.displayName;

const AccordionContentClasses = "\
text-sm \
overflow-hidden \
data-[state=closed]:animate-accordion-up \
data-[state=open]:animate-accordion-down";

const AccordionContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, children, ...rest }, ref) => (
        <Prim.Content ref={ref} className={cn(AccordionContentClasses, className)} {...rest} >
            <div className="pb-4 pt-0">{children}</div>
        </Prim.Content>
    )
);
AccordionContent.displayName = Prim.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
