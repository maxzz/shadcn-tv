import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CarouselDemo } from "../../2-demo/70-demo-controls";
import { PaginationDemo } from "../../2-demo/demo-pagination";

export function ControlsInTabs() {
    return (
        <Tabs defaultValue="controls1">
            <TabsList>
                <TabsTrigger value="controls1">Carousel</TabsTrigger>
                <TabsTrigger value="controls2">Pagination</TabsTrigger>
            </TabsList>

            <TabsContent value="controls1">
                <CarouselDemo />
            </TabsContent>

            <TabsContent value="controls2">
                <PaginationDemo />
            </TabsContent>

        </Tabs>
    );
}
