import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { BreadcrumbDemo, CarouselDemo, InputOTPDemo, PaginationDemo, SkeletonDemo, SlidersDemo } from "../../2-demo/40-demo-controls";
import { ChartsInTabs } from "../../2-demo/40-demo-controls/5-tabs-charts";
import { SwitchInTabs } from "./41-switches";

export function ControlsInTabs() {
    return (
        <Tabs defaultValue="controls6">
            <TabsList>
                <TabsTrigger value="controls1">Switches</TabsTrigger>
                <TabsTrigger value="controls2">Carousel</TabsTrigger>
                <TabsTrigger value="controls3">Pagination</TabsTrigger>
                <TabsTrigger value="controls4">Input OTP</TabsTrigger>
                <TabsTrigger value="controls5">Breadcrumb</TabsTrigger>
                <TabsTrigger value="controls6">Skeleton</TabsTrigger>
                <TabsTrigger value="controls7">Charts</TabsTrigger>
                <TabsTrigger value="controls8">Sliders</TabsTrigger>
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
                <InputOTPDemo />
            </TabsContent>

            <TabsContent value="controls5">
                <BreadcrumbDemo />
            </TabsContent>

            <TabsContent value="controls6">
                <SkeletonDemo />
            </TabsContent>

            <TabsContent value="controls7">
                <ChartsInTabs />
            </TabsContent>

            <TabsContent value="controls8">
                <SlidersDemo />
            </TabsContent>

        </Tabs>
    );
}
