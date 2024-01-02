import { ReactNode } from "react";

import { SimpleTableDemo, DataTableDemo } from "../../2-demo/1-demo-tables";

import { LoaderDotsRing, RadialLoader } from "@/components/ui/loaders";
import { SkeletonDemo } from "../../2-demo/2-loaders/4-demo-skeleton";

import { LoadersTest, NeonSwitch, DemoSwitchStyled, TablesWithStyckyHeaderModules } from "../../3-experimental";
import { GradientColorPickerExample } from "../../2-demo/3-switches/3-demo-color-picker";

import { DemoTreeWithOptions } from "../../2-demo/4-demo-tree";

import { ResizableDemo } from "../../2-demo/5-demo-resizable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";

export function TableInTabs() {
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
