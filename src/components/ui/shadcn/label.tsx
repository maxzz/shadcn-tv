//"use client"; // rollup does not like this
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const labelVariantsClasses = "\
text-sm \
font-medium \
leading-none \
peer-disabled:cursor-not-allowed \
peer-disabled:opacity-70";

const labelVariants = cva(labelVariantsClasses);

const Label = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root> & VariantProps<typeof labelVariants>>(
    ({ className, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn(labelVariants(), className)} {...rest} />
    )
);
Label.displayName = Prim.Root.displayName;

export { Label };
