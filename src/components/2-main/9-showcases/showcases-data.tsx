import { ReactNode } from "react";
import { LoadersTest, NeonSwitch, DemoSwitchStyled, TablesWithStyckyHeaderModules } from "@/components/2-main/3-experimental";
import { DataTableDemo } from "@/components/2-main/2-demo/demo-data-table";
import { TableDemo } from "@/components/2-main/2-demo/demo-table";
import { SkeletonDemo } from "@/components/2-main/2-demo/demo-skeleton";
import { DemoTree, DemoTreeOptimized } from "@/components/2-main/2-demo/demo-tree";
import { DemoSplitter } from "@/components/2-main/2-demo/demo-tree2";
import { GradientColorPickerExample } from "../2-demo/demo-color-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { LoaderDotsRing } from "@/components/ui/loaders";

function TableInTabs() {
    return (
        <Tabs defaultValue="table1">
            <TabsList>
                <TabsTrigger value="table1">Simple table</TabsTrigger>
                <TabsTrigger value="table2">Data table</TabsTrigger>
                <TabsTrigger value="table3">Sticky headers table</TabsTrigger>
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

function LoadersInTab() {
    return (
        <Tabs defaultValue="loaders1">
            <TabsList>
                <TabsTrigger value="loaders1">Loaders</TabsTrigger>
                <TabsTrigger value="loaders2">Circle loader</TabsTrigger>
                <TabsTrigger value="loaders3">Skeleton</TabsTrigger>
            </TabsList>

            <TabsContent value="loaders1">
                <LoadersTest className="m-auto max-w-sm flex items-center justify-between" />
            </TabsContent>

            <TabsContent value="loaders2">
                <LoaderDotsRing />
            </TabsContent>

            <TabsContent value="loaders3">
                <SkeletonDemo />
            </TabsContent>
        </Tabs>
    );
}

function SwitchInTabs() {
    return (
        <Tabs defaultValue="switch1">
            <TabsList>
                <TabsTrigger value="switch1">Neon switch</TabsTrigger>
                <TabsTrigger value="switch2">Styled switch</TabsTrigger>
                <TabsTrigger value="switch3">Gradient color picker</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1">
                <NeonSwitch />
            </TabsContent>

            <TabsContent value="switch2">
                <DemoSwitchStyled />
            </TabsContent>

            <TabsContent value="switch3">
                <GradientColorPickerExample />
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
    { id: '10', name: "Tables", component: <TableInTabs /> },
    { id: '20', name: "Loaders", component: <LoadersInTab /> },
    { id: '30', name: "Switches", component: <SwitchInTabs /> },
    { id: '41', name: "Tree", component: <DemoTreeOptimized /> },
    // { id: '42', name: "Tree unoptimized", component: <DemoTree /> },
    // { id: '63', name: "Splitter", component: <DemoSplitter /> },
];

export const initialCase = "41";
