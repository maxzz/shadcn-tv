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

type AccordionTriggerProps = ComponentPropsWithoutRef<typeof Prim.Trigger> & {
    iconFirst?: boolean;    // show icon before children
    leftDown?: boolean;     // icon rotates left-down
};

const AccordionTriggerClasses = "\
flex-1 py-4 text-sm font-medium \
hover:underline \
[&[data-state=open]>svg]:rotate-180 \
transition-all \
flex items-center justify-between";

const leftDownClasses = "[&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0";

/**
 * Customization:
 * ``<div>{children}</div>`` can be accessed from AccordionTrigger as className="[&>div]:w-full [&>div]:text-left"
 */
const AccordionTrigger = forwardRef<ElementRef<typeof Prim.Trigger>, AccordionTriggerProps>(
    ({ className, children, iconFirst, leftDown, ...rest }, ref) => {
        const Icon = <ChevronDownIcon className="shrink-0 size-4 text-muted-foreground transition-transform duration-200" />;
        return (
            <Prim.Header className="flex">
                <Prim.Trigger
                    ref={ref}
                    className={cn(AccordionTriggerClasses, iconFirst && "justify-start", leftDown && leftDownClasses, className)}
                    {...rest}
                >
                    {iconFirst && Icon}
                    <div>
                        {children}
                    </div>
                    {!iconFirst && Icon}
                </Prim.Trigger>
            </Prim.Header>
        );
    }
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
