import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { SlidersDemo, SubTab_Switches } from "../../2-demo/40-demo-controls";
import { SubTab_Charts } from "../../2-demo/40-demo-controls/5-tabs-charts";
import { CalendarDemo } from "../../2-demo/40-demo-controls/7-demo-calendar";
import { SubTab_Navigation } from "../../2-demo/40-demo-controls/4-tabs-navigation";
import { SubTab_Controls } from "../../2-demo/40-demo-controls/2-tabs-controls";

export function ControlsInTabs() {
    return (
        <Tabs defaultValue="controls6">
            <TabsList>
                <TabsTrigger value="controls1">Switches</TabsTrigger>
                <TabsTrigger value="controls2">Controls</TabsTrigger>
                <TabsTrigger value="controls3">Navigation</TabsTrigger>
                <TabsTrigger value="controls4">Charts</TabsTrigger>
                <TabsTrigger value="controls5">Sliders</TabsTrigger>
                <TabsTrigger value="controls6">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="controls1">
                <SubTab_Switches />
            </TabsContent>

            <TabsContent value="controls2">
                <SubTab_Controls />
            </TabsContent>

            <TabsContent value="controls3">
                <SubTab_Navigation />
            </TabsContent>

            <TabsContent value="controls4">
                <SubTab_Charts />
            </TabsContent>

            <TabsContent value="controls5">
                <SlidersDemo />
            </TabsContent>

            <TabsContent value="controls6">
                <CalendarDemo />
            </TabsContent>
        </Tabs>
    );
}
