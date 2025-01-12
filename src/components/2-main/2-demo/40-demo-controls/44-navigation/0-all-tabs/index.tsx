import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { BreadcrumbDemo } from "../3-demo-breadcrumb";
import { PaginationDemo } from "../3-demo-pagination";
import { StepsDemo12 } from "../4-timeline-1";
import { Timeline3WithIcon, TimelineDemo2 } from "../5-timeline-23";
import { StepIndicator4 } from "../6-timeline-4";
import { Timeline5WithAI } from "../7-timeline5-steps-ai";

export function SubTab_Navigation() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="nav1" value={activeTabs.navigation} onValueChange={(v) => appSettings.demosState.activeTabs.navigation = v}>
            <TabsList>
                <TabsTrigger value="nav1">Breadcrumb</TabsTrigger>
                <TabsTrigger value="nav2">Pagination</TabsTrigger>
                <TabsTrigger value="nav3">Timeline1</TabsTrigger>
                <TabsTrigger value="nav4">Timeline2</TabsTrigger>
                <TabsTrigger value="nav5">Timeline3</TabsTrigger>
                <TabsTrigger value="nav6">Timeline4</TabsTrigger>
                <TabsTrigger value="nav7">Timeline5</TabsTrigger>
            </TabsList>

            <TabsContent value="nav1">
                <BreadcrumbDemo />
            </TabsContent>

            <TabsContent value="nav2">
                <PaginationDemo />
            </TabsContent>

            <TabsContent value="nav3">
                <StepsDemo12 />
            </TabsContent>

            <TabsContent value="nav4">
                <TimelineDemo2 />
            </TabsContent>

            <TabsContent value="nav5">
                <StepIndicator4 />
            </TabsContent>

            <TabsContent value="nav6">
                <Timeline3WithIcon />
            </TabsContent>

            <TabsContent value="nav7">
                <Timeline5WithAI />
            </TabsContent>
        </Tabs>
    );
}
