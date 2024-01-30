import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { GradientColorPickerDemo, SolidColorPickerDemo } from "../../2-demo/70-pickers";

export function PickersInTabs() {
    return (
        <Tabs defaultValue="picker1">
            <TabsList>
                <TabsTrigger value="picker1">Solid color picker</TabsTrigger>
                <TabsTrigger value="picker2">Gradient picker</TabsTrigger>
            </TabsList>

            <TabsContent value="picker1">
                <SolidColorPickerDemo />
            </TabsContent>

            <TabsContent value="picker2">
                <GradientColorPickerDemo />
            </TabsContent>

        </Tabs>
    );
}
