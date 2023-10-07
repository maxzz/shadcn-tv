import { forwardRef, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";
import { cn } from "@/utils";

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
    ({ className, ...rest }, ref) => (
        <div className="relative w-full overflow-auto">
            <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...rest} />
        </div>
    )
);
Table.displayName = "Table";

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...rest }, ref) => (
        <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...rest} />
    )
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...rest }, ref) => (
        <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...rest} />
    )
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...rest }, ref) => (
        <tfoot ref={ref} className={cn("text-primary-foreground bg-primary font-medium", className)} {...rest} />
    )
);
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
    ({ className, ...rest }, ref) => (
        <tr ref={ref} className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...rest} />
    )
);
TableRow.displayName = "TableRow";

const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
    ({ className, ...rest }, ref) => (
        <th
            ref={ref}
            className={cn(
                "h-10 px-2 text-left font-medium align-middle text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                className
            )}
            {...rest}
        />
    )
);
TableHead.displayName = "TableHead";

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
    ({ className, ...rest }, ref) => (
        <td ref={ref} className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)} {...rest} />
    )
);
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
    ({ className, ...rest }, ref) => (
        <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...rest} />
    )
);
TableCaption.displayName = "TableCaption";

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
