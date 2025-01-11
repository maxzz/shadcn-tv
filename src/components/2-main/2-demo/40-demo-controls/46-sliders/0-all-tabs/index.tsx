import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { SubTab_Switches } from "../../41-switches";
import { SubTab_Controls } from "../../42-controls";
import { SubTab_Navigation } from "../../44-navigation";
import { SubTab_Charts } from "../../45-demo-charts";
import { SlidersDemo } from "..";

export function Tabs_Controls() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="controls6" value={activeTabs.controls} onValueChange={(v) => appSettings.demosState.activeTabs.controls = v}>
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
