import * as React from "react";
import * as TT from "@tanstack/react-table";
import * as M from "@/components/ui/shadcn/dropdown-menu";
import * as T from "@/components/ui/shadcn/table";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { data } from "./1-peyment-data";
import { columns } from "./2-peyment-columns";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<TT.SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<TT.ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<TT.VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = TT.useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: TT.getCoreRowModel(),
        getPaginationRowModel: TT.getPaginationRowModel(),
        getSortedRowModel: TT.getSortedRowModel(),
        getFilteredRowModel: TT.getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">

            {/* Filter and column visibility drop down menu */}
            <div className="flex items-center py-4">
                <Input
                    className="max-w-sm"
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                />
                <M.DropdownMenu>
                    <M.DropdownMenuTrigger asChild>
                        <Button className="ml-auto" variant="outline">
                            Columns
                            <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </M.DropdownMenuTrigger>

                    <M.DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map(
                                (column) => {
                                    return (
                                        <M.DropdownMenuCheckboxItem
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            key={column.id}
                                        >
                                            {column.id}
                                        </M.DropdownMenuCheckboxItem>
                                    );
                                }
                            )}
                    </M.DropdownMenuContent>
                </M.DropdownMenu>
            </div>

            {/* Table itself */}
            <div className="rounded-md border">
                <T.Table>
                    <T.TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <T.TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(
                                    (header) => {
                                        return (
                                            <T.TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : TT.flexRender(header.column.columnDef.header, header.getContext())}
                                            </T.TableHead>
                                        );
                                    }
                                )}
                            </T.TableRow>
                        ))}
                    </T.TableHeader>

                    <T.TableBody>
                        {table.getRowModel().rows?.length
                            ? (
                                table.getRowModel().rows.map((row) => (
                                    <T.TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
                                        {row.getVisibleCells().map(
                                            (cell) => (
                                                <T.TableCell key={cell.id}>
                                                    {TT.flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </T.TableCell>
                                            )
                                        )}
                                    </T.TableRow>
                                ))
                            )
                            : (
                                <T.TableRow>
                                    <T.TableCell className="h-24 text-center" colSpan={columns.length}>
                                        No results.
                                    </T.TableCell>
                                </T.TableRow>
                            )}
                    </T.TableBody>
                </T.Table>
            </div>

            {/* Footer actions and summary */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>

                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>

        </div>
    );
}
