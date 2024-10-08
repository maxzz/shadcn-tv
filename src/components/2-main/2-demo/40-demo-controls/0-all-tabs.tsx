import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { SubTab_Switches } from "./1-switches";
import { SubTab_Controls } from "./2-controls";
import { SubTab_Navigation } from "./4-navigation";
import { SubTab_Charts } from "./5-demo-charts";
import { SlidersDemo } from "./6-sliders";

export function Tabs_Controls() {
    return (
        <Tabs defaultValue="controls6">
            <TabsList className="mb-2">
                <TabsTrigger value="controls1">Switches</TabsTrigger>
                <TabsTrigger value="controls2">Controls</TabsTrigger>
                <TabsTrigger value="controls3">Navigation</TabsTrigger>
                <TabsTrigger value="controls4">Charts</TabsTrigger>
                <TabsTrigger value="controls5">Sliders</TabsTrigger>
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
        </Tabs>
    );
}
