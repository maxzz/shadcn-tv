import { ComponentProps, forwardRef } from "react";
import { ButtonProps, buttonVariants } from "@/components/ui/shadcn/button";
import { ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

export function Pagination({ className, ...rest }: ComponentProps<"nav">) {
    return (
        <nav className={cn("mx-auto w-full flex justify-center", className)} role="navigation" aria-label="pagination" {...rest} />
    );
}

export const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
    ({ className, ...rest }, ref) => (
        <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...rest} />
    )
);
PaginationContent.displayName = "Pagination.Content";

type PaginationLinkProps =
    & {
        isActive?: boolean;
    }
    & Pick<ButtonProps, "size">
    & ComponentProps<"a">;

export function PaginationLink({ className, isActive, size = "icon", ...rest }: PaginationLinkProps) {
    return (
        <li>
            <a className={cn(buttonVariants({ variant: isActive ? "outline" : "ghost", size, }), className)} aria-current={isActive ? "page" : undefined} {...rest} />
        </li>
    );
}

export function PaginationPrevious({ className, ...rest }: ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink className={cn("pl-3 gap-1", className)} aria-label="Go to previous page" size="default" {...rest}>
            <ChevronLeftIcon className="w-4 h-4" />
            <span>
                Previous
            </span>
        </PaginationLink>
    );
}

export function PaginationNext({ className, ...rest }: ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink className={cn("pr-3 gap-1", className)} aria-label="Go to next page" size="default" {...rest}>
            <span>
                Next
            </span>
            <ChevronRightIcon className="w-4 h-4" />
        </PaginationLink>
    );
}

export function PaginationEllipsis({ className, ...rest }: ComponentProps<"span">) {
    return (
        <span className={cn("w-9 h-9 flex items-center justify-center", className)} aria-hidden {...rest}>
            <DotsHorizontalIcon className="w-4 h-4" />
            <span className="sr-only">
                More pages
            </span>
        </span>
    );
}
