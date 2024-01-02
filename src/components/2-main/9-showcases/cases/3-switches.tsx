import { ReactNode } from "react";

import { SimpleTableDemo, DataTableDemo } from "../../2-demo/1-demo-tables";

import { LoaderDotsRing, RadialLoader } from "@/components/ui/loaders";
import { SkeletonDemo } from "../../2-demo/2-loaders/4-demo-skeleton";

import { LoadersTest, NeonSwitch, DemoSwitchStyled, TablesWithStyckyHeaderModules } from "../../3-experimental";
import { GradientColorPickerExample } from "../../2-demo/3-switches/3-demo-color-picker";

import { DemoTreeWithOptions } from "../../2-demo/4-demo-tree";

import { ResizableDemo } from "../../2-demo/5-demo-resizable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";

export function SwitchInTabs() {
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
