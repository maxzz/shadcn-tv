import { ComponentProps, forwardRef } from "react";
import { ButtonProps, buttonVariants } from "@/components/ui/shadcn/button";
import { ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

export const Pagination = ({ className, ...rest }: ComponentProps<"nav">) => (
    <nav className={cn("mx-auto flex w-full justify-center", className)} role="navigation" aria-label="pagination" {...rest} />
);

export const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
    ({ className, ...rest }, ref) => (
        <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...rest} />
    )
);
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
    ({ className, ...rest }, ref) => (
        <li ref={ref} className={cn("", className)} {...rest} />
    )
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps =
    & {
        isActive?: boolean;
    }
    & Pick<ButtonProps, "size">
    & ComponentProps<"a">;

export const PaginationLink = ({ className, isActive, size = "icon", ...rest }: PaginationLinkProps) => (
    <PaginationItem>
        <a className={cn(buttonVariants({ variant: isActive ? "outline" : "ghost", size, }), className)} aria-current={isActive ? "page" : undefined} {...rest} />
    </PaginationItem>
);
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = ({ className, ...rest }: ComponentProps<typeof PaginationLink>) => (
    <PaginationLink className={cn("gap-1 pl-2.5", className)} aria-label="Go to previous page" size="default" {...rest}>
        <ChevronLeftIcon className="h-4 w-4" />
        <span>
            Previous
        </span>
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = ({ className, ...rest }: ComponentProps<typeof PaginationLink>) => (
    <PaginationLink className={cn("gap-1 pr-2.5", className)} aria-label="Go to next page" size="default" {...rest}>
        <span>
            Next
        </span>
        <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
);

export const PaginationEllipsis = ({ className, ...rest }: ComponentProps<"span">) => (
    <span className={cn("flex h-9 w-9 items-center justify-center", className)} aria-hidden {...rest}>
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">
            More pages
        </span>
    </span>
);
