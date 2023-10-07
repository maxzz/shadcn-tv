import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const toggleVariantsDefClasses = "\
text-sm font-medium \
\
hover:text-muted-foreground \
hover:bg-muted \
\
focus-visible:ring-1 \
focus-visible:ring-ring \
focus-visible:outline-none \
\
disabled:opacity-50 \
disabled:pointer-events-none \
\
data-[state=on]:text-accent-foreground \
data-[state=on]:bg-accent \
\
transition-colors \
rounded-md \
inline-flex items-center justify-center";

const toggleVariantsClasses = cva(toggleVariantsDefClasses, {
    variants: {
        variant: {
            default: "bg-transparent",
            outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground shadow-sm",
        },
        size: {
            default: "h-9 px-3",
            sm: "h-8 px-2",
            lg: "h-10 px-3",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

const Toggle = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root> & VariantProps<typeof toggleVariantsClasses>>(
    ({ className, variant, size, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn(toggleVariantsClasses({ variant, size, className }))} {...rest} />
    )
);
Toggle.displayName = Prim.Root.displayName;

export { Toggle, toggleVariantsClasses as toggleVariants };
