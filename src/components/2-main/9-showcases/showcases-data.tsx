import { ReactNode } from "react";

import { SimpleTableDemo, DataTableDemo } from "../2-demo/1-demo-tables";

import { LoaderDotsRing, RadialLoader } from "@/components/ui/loaders";
import { SkeletonDemo } from "../2-demo/2-loaders/4-demo-skeleton";

import { LoadersTest, NeonSwitch, DemoSwitchStyled, TablesWithStyckyHeaderModules } from "../3-experimental";
import { GradientColorPickerExample } from "../2-demo/3-switches/3-demo-color-picker";

import { DemoTreeWithOptions } from "../2-demo/4-demo-tree";

import { ResizableDemo } from "../2-demo/5-demo-resizable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";

function TableInTabs() {
    return (
        <Tabs defaultValue="table1">
            <TabsList>
                <TabsTrigger value="table1">Simple table</TabsTrigger>
                <TabsTrigger value="table2">Data table</TabsTrigger>
                <TabsTrigger value="table3">Sticky headers table</TabsTrigger>
            </TabsList>

            <TabsContent value="table1">
                <SimpleTableDemo className="m-auto max-w-sm" />
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
                <TabsTrigger value="loaders3">Radial</TabsTrigger>
                <TabsTrigger value="loaders4">Skeleton</TabsTrigger>
            </TabsList>

            <TabsContent value="loaders1">
                <LoadersTest className="m-auto max-w-sm flex items-center justify-between" />
            </TabsContent>

            <TabsContent value="loaders2">
                <LoaderDotsRing />
            </TabsContent>

            <TabsContent value="loaders3">
                <RadialLoader />
            </TabsContent>

            <TabsContent value="loaders4">
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
    { id: '41', name: "Tree", component: <DemoTreeWithOptions /> },
    { id: '51', name: "Resizable", component: <ResizableDemo /> },
    // { id: '63', name: "Splitter", component: <DemoSplitter /> },
];

export const initialCase = "51";
