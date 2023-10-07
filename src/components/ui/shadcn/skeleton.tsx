import { cn } from "@/utils";

function Skeleton({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...rest} />
    );
}

export { Skeleton };
