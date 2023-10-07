import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariantsDefClasses = "\
px-2.5 py-0.5 text-xs \
\
font-semibold \
\
focus:ring-2 \
focus:ring-ring \
focus:ring-offset-2 \
focus:outline-none \
\
transition-colors \
border rounded-md \
inline-flex items-center";

const badgeVariantsClasses = cva(badgeVariantsDefClasses, {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
            outline: "text-foreground",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariantsClasses> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariantsClasses({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariantsClasses as badgeVariants };
