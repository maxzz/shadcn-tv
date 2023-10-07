import { forwardRef, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const alertVariantsDefClasses = "\
relative px-4 py-3 w-full text-sm \
\
[&>svg]:absolute \
[&>svg]:left-4 \
[&>svg]:top-4 \
[&>svg]:text-foreground \
[&>svg+div]:translate-y-[-3px] \
[&>svg~*]:pl-7 \
\
border rounded-lg";

const alertVariantsClasses = cva(alertVariantsDefClasses, {
    variants: {
        variant: {
            default: "text-foreground bg-background",
            destructive:
                "text-destructive [&>svg]:text-destructive border-destructive/50 dark:border-destructive",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const Alert = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariantsClasses>>(
    ({ className, variant, ...props }, ref) => (
        <div ref={ref} className={cn(alertVariantsClasses({ variant }), className)} role="alert" {...props} />
    )
);
Alert.displayName = "Alert";

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
    )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
    )
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
