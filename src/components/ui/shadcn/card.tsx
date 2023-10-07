import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => (
        <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...rest} />
    )
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...rest} />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...rest }, ref) => (
        <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...rest} />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...rest }, ref) => (
        <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...rest} />
    )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...rest} />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => (
        <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...rest} />
    )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
