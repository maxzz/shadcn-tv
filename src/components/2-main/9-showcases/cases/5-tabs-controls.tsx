import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CarouselDemo, PaginationDemo } from "../../2-demo/70-demo-controls";
import { ChartsInTabs } from "../../2-demo/70-demo-controls/4-charts";
import { SwitchInTabs } from "./3-switches";
import { SkeletonDemo } from "../../2-demo/02-demo-loaders/4-demo-skeleton";

export function ControlsInTabs() {
    return (
        <Tabs defaultValue="controls1">
            <TabsList>
                <TabsTrigger value="controls1">Switches</TabsTrigger>
                <TabsTrigger value="controls2">Carousel</TabsTrigger>
                <TabsTrigger value="controls3">Pagination</TabsTrigger>
                <TabsTrigger value="controls4">Skeleton</TabsTrigger>
                <TabsTrigger value="controls5">Charts</TabsTrigger>
            </TabsList>

            <TabsContent value="controls1">
                <SwitchInTabs />
            </TabsContent>

            <TabsContent value="controls2">
                <CarouselDemo />
            </TabsContent>

            <TabsContent value="controls3">
                <PaginationDemo />
            </TabsContent>

            <TabsContent value="controls4">
                <SkeletonDemo />
            </TabsContent>

            <TabsContent value="controls5">
                <ChartsInTabs />
            </TabsContent>

        </Tabs>
    );
}
