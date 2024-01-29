import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { GradientColorPickerDemo } from "../../2-demo/60-pickes";

export function PickersInTabs() {
    return (
        <Tabs defaultValue="picker1">
            <TabsList>
                <TabsTrigger value="picker1">Gradient picker</TabsTrigger>
            </TabsList>

            <TabsContent value="picker1">
                <GradientColorPickerDemo />
            </TabsContent>

        </Tabs>
    );
}
