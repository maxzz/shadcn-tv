import { ReactNode } from "react";
import { NeonSwitch } from "@/components/ui/experimental";
import { DataTableDemo } from "@/components/ui/shadcn/demo/demo-data-table";
import { TableDemo } from "@/components/ui/shadcn/demo/demo-table";
import { TablesWithStyckyHeaderCss, TablesWithStyckyHeaderModules } from "../4-table-headers";
import { SkeletonDemo } from "@/components/ui/shadcn/demo/demo-skeleton";
import { LoadersTest } from "../3-loaders";
import { DemoTree, DemoTreeOptimized } from "@/components/ui/shadcn/demo/demo-tree";

export type Showcase = {
    id: string;
    name: string;
    component: ReactNode;
};

export const showcases: Showcase[] = [
    { id: '1', name: "Loaders", component: <LoadersTest className="m-auto max-w-sm flex items-center justify-between" /> },
    { id: '2', name: "Data table", component: <DataTableDemo /> },
    { id: '3', name: "Table", component: <TableDemo className="m-auto max-w-sm" /> },
    { id: '41', name: "Table sticky headers CSS", component: <TablesWithStyckyHeaderCss /> },
    { id: '42', name: "Table sticky headers module", component: <TablesWithStyckyHeaderModules /> },
    { id: '5', name: "Skeleton", component: <SkeletonDemo /> },
    { id: '6', name: "Neon switch", component: <NeonSwitch /> },
    { id: '7', name: "Tree unoptimized", component: <DemoTree /> },
    { id: '8', name: "Tree", component: <DemoTreeOptimized /> },
];
