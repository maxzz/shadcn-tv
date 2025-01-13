import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { StepsDemo12 } from "../1-timeline";
import { Timeline3WithIcon, TimelineDemo2 } from "../2-timeline-23";
import { StepIndicator4 } from "../4-timeline";
import { Timeline5WithAI } from "../5-timeline-steps-ai";
import { Timeline6Codepen } from "../6-timeline";

export function SubTab_Timeline() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="1" value={activeTabs.timeline} onValueChange={(v) => appSettings.demosState.activeTabs.timeline = v}>
            <TabsList className="mt-2">
                <TabsTrigger value="1">Timeline1</TabsTrigger>
                <TabsTrigger value="2">Timeline2</TabsTrigger>
                <TabsTrigger value="3">Timeline3</TabsTrigger>
                <TabsTrigger value="4">Timeline4</TabsTrigger>
                <TabsTrigger value="5">Timeline5</TabsTrigger>
                <TabsTrigger value="6">Timeline6</TabsTrigger>
            </TabsList>

            <TabsContent value="1">
                <StepsDemo12 />
            </TabsContent>

            <TabsContent value="2">
                <TimelineDemo2 />
            </TabsContent>

            <TabsContent value="3">
                <StepIndicator4 />
            </TabsContent>

            <TabsContent value="4">
                <Timeline3WithIcon />
            </TabsContent>

            <TabsContent value="5">
                <Timeline5WithAI />
            </TabsContent>

            <TabsContent value="6">
                <Timeline6Codepen />
            </TabsContent>
        </Tabs>
    );
}
