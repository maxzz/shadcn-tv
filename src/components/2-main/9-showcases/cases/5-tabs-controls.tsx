import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CarouselDemo, PaginationDemo } from "../../2-demo/70-demo-controls";
import { ChartsInTabs } from "../../2-demo/70-demo-controls/4-charts";

export function ControlsInTabs() {
    return (
        <Tabs defaultValue="controls1">
            <TabsList>
                <TabsTrigger value="controls1">Carousel</TabsTrigger>
                <TabsTrigger value="controls2">Pagination</TabsTrigger>
                <TabsTrigger value="controls3">Charts</TabsTrigger>
            </TabsList>

            <TabsContent value="controls1">
                <CarouselDemo />
            </TabsContent>

            <TabsContent value="controls2">
                <PaginationDemo />
            </TabsContent>

            <TabsContent value="controls3">
                <ChartsInTabs />
            </TabsContent>

        </Tabs>
    );
}
