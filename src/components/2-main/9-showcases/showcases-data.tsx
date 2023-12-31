import { ReactNode } from "react";
import { LoadersTest, NeonSwitch, DemoSwitchStyled, TablesWithStyckyHeaderModules } from "@/components/2-main/3-experimental";
import { DataTableDemo } from "@/components/2-main/2-demo/demo-data-table";
import { TableDemo } from "@/components/2-main/2-demo/demo-table";
import { SkeletonDemo } from "@/components/2-main/2-demo/demo-skeleton";
import { DemoTree, DemoTreeOptimized } from "@/components/2-main/2-demo/demo-tree";
import { DemoSplitter } from "@/components/2-main/2-demo/demo-tree2";
import { GradientColorPickerExample } from "../2-demo/demo-color-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";

function TableInTabs() {
    return (
        <Tabs defaultValue="table1">
            <TabsList>
                <TabsTrigger value="table2">Simple table</TabsTrigger>
                <TabsTrigger value="table1">Data table</TabsTrigger>
                <TabsTrigger value="table3">Table sticky headers with .module.css</TabsTrigger>
            </TabsList>

            <TabsContent value="table1">
                <TableDemo className="m-auto max-w-sm" />
            </TabsContent>

            <TabsContent value="table2">
                <DataTableDemo />
            </TabsContent>

            <TabsContent value="table3">
                <TablesWithStyckyHeaderModules />
            </TabsContent>
        </Tabs>
    );
}

export type Showcase = {
    id: string;
    name: string;
    component: ReactNode;
};

export const showcasesData: Showcase[] = [
    { id: '01', name: "Tables", component: <TableInTabs /> },

    { id: '10', name: "Loaders", component: <LoadersTest className="m-auto max-w-sm flex items-center justify-between" /> },
    { id: '50', name: "Skeleton", component: <SkeletonDemo /> },
    { id: '61', name: "Switch. neon", component: <NeonSwitch /> },
    { id: '62', name: "Switch. styled", component: <DemoSwitchStyled /> },
    // { id: '63', name: "Splitter", component: <DemoSplitter /> },
    
    // { id: '71', name: "Tree unoptimized", component: <DemoTree /> },
    { id: '72', name: "Tree", component: <DemoTreeOptimized /> },
    
    { id: '80', name: "Gradient color picker", component: <GradientColorPickerExample /> },
];

export const initialCase = "01";
