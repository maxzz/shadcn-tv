import { ReactNode } from "react";
import { LoadersTest, NeonSwitch, DemoSwitchStyled, TablesWithStyckyHeaderCss, TablesWithStyckyHeaderModules } from "@/components/ui/experimental";
import { DataTableDemo } from "@/components/ui/shadcn/demo/demo-data-table";
import { TableDemo } from "@/components/ui/shadcn/demo/demo-table";
import { SkeletonDemo } from "@/components/ui/shadcn/demo/demo-skeleton";
import { DemoTree, DemoTreeOptimized } from "@/components/ui/shadcn/demo/demo-tree";
import { DemoSplitter } from "@/components/ui/shadcn/demo/demo-tree2";

export type Showcase = {
    id: string;
    name: string;
    component: ReactNode;
};

export const showcases: Showcase[] = [
    // { id: '80', name: "Tree", component: <DemoTreeOptimized /> },

    { id: '10', name: "Loaders", component: <LoadersTest className="m-auto max-w-sm flex items-center justify-between" /> },
    { id: '20', name: "Data table", component: <DataTableDemo /> },
    { id: '30', name: "Table", component: <TableDemo className="m-auto max-w-sm" /> },
    // { id: '41', name: "Table sticky headers with .css", component: <TablesWithStyckyHeaderCss /> },
    { id: '42', name: "Table sticky headers with .module.css", component: <TablesWithStyckyHeaderModules /> },
    { id: '50', name: "Skeleton", component: <SkeletonDemo /> },
    { id: '61', name: "Switch. neon", component: <NeonSwitch /> },
    { id: '62', name: "Switch. styled", component: <DemoSwitchStyled /> },
    { id: '70', name: "Tree unoptimized", component: <DemoTree /> },
    { id: '80', name: "Tree", component: <DemoTreeOptimized /> },

    { id: '81', name: "Splitter", component: <DemoSplitter /> },
];

export const initialCase = "80";
