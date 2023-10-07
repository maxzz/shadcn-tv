//"use client"; // rollup does not like this
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Prim from "@radix-ui/react-radio-group";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

const RadioGroup = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, ...rest }, ref) => {
        return (
            <Prim.Root
                className={cn("grid gap-2", className)}
                {...rest}
                ref={ref}
            />
        );
    }
);
RadioGroup.displayName = Prim.Root.displayName;

const RadioGroupItemClasses = "\
h-4 w-4 aspect-square \
\
text-primary \
border-primary \
\
focus:outline-none \
focus-visible:ring-1 \
focus-visible:ring-ring \
\
disabled:cursor-not-allowed \
disabled:opacity-50 \
\
border rounded-full shadow";

const RadioGroupItem = forwardRef<ElementRef<typeof Prim.Item>, ComponentPropsWithoutRef<typeof Prim.Item>>(
    ({ className, children, ...rest }, ref) => {
        return (
            <Prim.Item ref={ref} className={cn(RadioGroupItemClasses, className)} {...rest}>

                <Prim.Indicator className="flex items-center justify-center">
                    <CheckIcon className="h-3.5 w-3.5 fill-primary" />
                </Prim.Indicator>

            </Prim.Item>
        );
    }
);
RadioGroupItem.displayName = Prim.Item.displayName;

export { RadioGroup, RadioGroupItem };
