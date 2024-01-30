import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CustomizeButton, GradientColorPickerDemo, SolidColorPickerDemo } from "../../2-demo/70-pickers";

export function PickersInTabs() {
    return (
        <Tabs defaultValue="picker3">
            <TabsList>
                <TabsTrigger value="picker1">Solid color picker</TabsTrigger>
                <TabsTrigger value="picker2">Gradient picker</TabsTrigger>
                <TabsTrigger value="picker3">Theme</TabsTrigger>
            </TabsList>

            <TabsContent value="picker1">
                <SolidColorPickerDemo />
            </TabsContent>

            <TabsContent value="picker2">
                <GradientColorPickerDemo />
            </TabsContent>

            <TabsContent value="picker3">
                <CustomizeButton />
            </TabsContent>

        </Tabs>
    );
}
