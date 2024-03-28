import { forwardRef, ComponentPropsWithoutRef, ReactNode, ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils";
import { ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

export const Breadcrumb = forwardRef<HTMLElement, ComponentPropsWithoutRef<"nav"> & { separator?: ReactNode; }>(
    ({ ...rest }, ref) => (
        <nav ref={ref} aria-label="breadcrumb" {...rest} />
    )
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<"ol">>(
    ({ className, ...rest }, ref) => (
        <ol ref={ref} className={cn("text-sm text-muted-foreground break-words flex flex-wrap items-center gap-1.5 sm:gap-2.5", className)} {...rest} />
    )
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<"li">>(
    ({ className, ...rest }, ref) => (
        <li
            ref={ref}
            className={cn("inline-flex items-center gap-1.5", className)}
            {...rest}
        />
    )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<"a"> & { asChild?: boolean; }>(
    ({ asChild, className, ...rest }, ref) => {
        const Comp = asChild ? Slot : "a";
        return (
            <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...rest}/>
        );
    }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<"span">>(
    ({ className, ...rest }, ref) => (
        <span
            ref={ref}
            className={cn("font-normal text-foreground", className)}
            role="link"
            aria-disabled="true"
            aria-current="page"
            {...rest}
        />
    )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export function BreadcrumbSeparator({ children, className, ...rest }: ComponentProps<"li">) {
    return (
        <li className={cn("[&>svg]:size-3.5", className)} role="presentation" aria-hidden="true" {...rest}>
            {children ?? <ChevronRightIcon />}
        </li>
    );
}

export function BreadcrumbEllipsis({ className, ...rest }: ComponentProps<"span">) {
    return (
        <span className={cn("size-9 flex items-center justify-center", className)} role="presentation" aria-hidden="true" {...rest}>
            <DotsHorizontalIcon className="size-4" />
            <span className="sr-only">More</span>
        </span>
    );
}
