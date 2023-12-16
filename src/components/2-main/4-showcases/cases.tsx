import { ReactNode } from "react";
import { NeonSwitch } from "@/components/ui/experimental";
import { DataTableDemo } from "@/components/ui/shadcn/demo/demo-data-table";
import { SkeletonDemo } from "@/components/ui/shadcn/demo/demo-skeleton";
import { TableDemo } from "@/components/ui/shadcn/demo/demo-table";
import { LoadersTest } from "../3-loaders";

export type Case = {
    id: string;
    name: string;
    component: ReactNode;
};

export const cases: Case[] = [
    { id: '1', name: "Table", component: <TableDemo className="m-auto max-w-xs" /> },
    { id: '2', name: "Loaders", component: <LoadersTest className="m-auto max-w-sm flex items-center justify-between" /> },
    { id: '3', name: "Neon switch", component: <NeonSwitch /> },
    { id: '4', name: "Data table", component: <DataTableDemo /> },
    { id: '5', name: "Skeleton", component: <SkeletonDemo /> },
];
