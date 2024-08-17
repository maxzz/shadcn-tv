import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { BreadcrumbDemo, CarouselDemo, ChadcnSwitchDemo, DemoSwitchStyled, InputOTPDemo, NeonSwitch, PaginationDemo, SkeletonDemo, SlidersDemo } from "../../2-demo/40-demo-controls";
import { ChartsInTabs } from "../../2-demo/40-demo-controls/5-tabs-charts";
import { CalendarDemo } from "../../2-demo/40-demo-controls/7-demo-calendar";
import { NavigationInTabs } from "../../2-demo/40-demo-controls/4-tabs-navigation";

export function SwitchInTabs() {
    return (
        <Tabs defaultValue="switch1">
            <TabsList>
                <TabsTrigger value="switch1">Shadcn</TabsTrigger>
                <TabsTrigger value="switch2">Neon switch</TabsTrigger>
                <TabsTrigger value="switch3">Styled switch</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1">
                <ChadcnSwitchDemo />
            </TabsContent>

            <TabsContent value="switch2">
                <NeonSwitch />
            </TabsContent>

            <TabsContent value="switch3">
                <DemoSwitchStyled />
            </TabsContent>
        </Tabs>
    );
}

export function ControlsInTabs() {
    return (
        <Tabs defaultValue="controls6">
            <TabsList>
                <TabsTrigger value="controls1">Switches</TabsTrigger>
                <TabsTrigger value="controls2">Carousel</TabsTrigger>
                <TabsTrigger value="controls3">Navigation</TabsTrigger>
                <TabsTrigger value="controls4">Input OTP</TabsTrigger>
                <TabsTrigger value="controls5">Skeleton</TabsTrigger>
                <TabsTrigger value="controls6">Charts</TabsTrigger>
                <TabsTrigger value="controls7">Sliders</TabsTrigger>
                <TabsTrigger value="controls8">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="controls1">
                <SwitchInTabs />
            </TabsContent>

            <TabsContent value="controls2">
                <CarouselDemo />
            </TabsContent>

            <TabsContent value="controls3">
                <NavigationInTabs />
            </TabsContent>

            <TabsContent value="controls4">
                <InputOTPDemo />
            </TabsContent>

            <TabsContent value="controls5">
                <SkeletonDemo />
            </TabsContent>

            <TabsContent value="controls6">
                <ChartsInTabs />
            </TabsContent>

            <TabsContent value="controls7">
                <SlidersDemo />
            </TabsContent>

            <TabsContent value="controls8">
                <CalendarDemo />
            </TabsContent>

        </Tabs>
    );
}
