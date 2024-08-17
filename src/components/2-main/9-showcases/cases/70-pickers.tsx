import { Tabs, TabsContent, TabsList, TabsTrigger, TooltipProvider } from "@/components/ui/shadcn";
import { ButtonRandom, ThemeColorsDemo, GradientColorPickerDemo, SolidColorPickerDemo, FlipClockDemo, CalendarDemo } from "../../2-demo/70-pickers";
import { XArrowsDemo1, XArrowsDemo2 } from "../../2-demo/70-pickers";

export function PickersInTabs() {
    return (
        <Tabs defaultValue="picker5">
            <TabsList>
                <TabsTrigger value="picker1">Color</TabsTrigger>
                <TabsTrigger value="picker2">Gradient</TabsTrigger>
                <TabsTrigger value="picker3">Theme</TabsTrigger>
                <TabsTrigger value="picker4">Data flow</TabsTrigger>
                <TabsTrigger value="picker5">Clock</TabsTrigger>
                <TabsTrigger value="picker6">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="picker1">
                <SolidColorPickerDemo />
            </TabsContent>

            <TabsContent value="picker2">
                <GradientColorPickerDemo />
            </TabsContent>

            <TabsContent value="picker3">
                <TooltipProvider delayDuration={100}>
                    <div className="my-8 flex items-center justify-center gap-2">
                        <ThemeColorsDemo />
                        <ButtonRandom />
                    </div>
                </TooltipProvider>
            </TabsContent>

            <TabsContent value="picker4">
                <XArrowsDemo1 />
                {/* <XArrowsDemo2 /> */}
            </TabsContent>

            <TabsContent value="picker5">
                <div className="my-8 flex items-center justify-center">
                    <FlipClockDemo />
                </div>
            </TabsContent>

            <TabsContent value="picker6">
                <CalendarDemo />
            </TabsContent>
        </Tabs>
    );
}
