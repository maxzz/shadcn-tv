import { Tabs, TabsContent, TabsList, TabsTrigger, TooltipProvider } from "@/components/ui/shadcn";
import { SolidColorPickerDemo } from "./10-color-picker";
import { GradientColorPickerDemo } from "./20-gradient-color-picker";
import { ThemeColorsDemo, ButtonRandom } from "./30-theme";
import { XArrowsDemo1 } from "./42-xarrow";
import { FlipClockDemo } from "./50-flip-clock";
import { CalendarDemo } from "./60-calendar/7-demo-calendar";

export function Tabs_Pickers() {
    return (
        <Tabs defaultValue="picker5">
            <TabsList className="mb-2">
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
