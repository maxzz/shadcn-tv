import { Payment } from "./1-peyment-data";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/shadcn/button";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import * as M from "@/components/ui/shadcn/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },

    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },

    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount); // Format the amount as a dollar amount
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <M.DropdownMenu>

                    <M.DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0" variant="ghost">
                            <span className="sr-only">
                                Open menu
                            </span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </M.DropdownMenuTrigger>

                    <M.DropdownMenuContent align="end">
                        <M.DropdownMenuLabel>Actions</M.DropdownMenuLabel>
                        <M.DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</M.DropdownMenuItem>
                        <M.DropdownMenuSeparator />
                        <M.DropdownMenuItem>View customer</M.DropdownMenuItem>
                        <M.DropdownMenuItem>View payment details</M.DropdownMenuItem>
                    </M.DropdownMenuContent>

                </M.DropdownMenu>
            );
        },
    },
];
//DataTableDemo