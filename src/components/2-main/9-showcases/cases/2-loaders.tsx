import { ReactNode } from "react";

import { SimpleTableDemo, DataTableDemo } from "../../2-demo/1-demo-tables";

import { LoaderDotsRing, RadialLoader } from "@/components/ui/loaders";
import { SkeletonDemo } from "../../2-demo/2-loaders/4-demo-skeleton";

import { LoadersTest, NeonSwitch, DemoSwitchStyled, TablesWithStyckyHeaderModules } from "../../3-experimental";
import { GradientColorPickerExample } from "../../2-demo/3-switches/3-demo-color-picker";

import { DemoTreeWithOptions } from "../../2-demo/4-demo-tree";

import { ResizableDemo } from "../../2-demo/5-demo-resizable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";

export function LoadersInTab() {
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
