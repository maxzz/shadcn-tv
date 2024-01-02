import { NeonSwitch, DemoSwitchStyled } from "../../3-experimental";
import { GradientColorPickerExample } from "../../2-demo/3-switches/3-demo-color-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";

export function SwitchInTabs() {
    return (
        <Tabs defaultValue="switch1">
            <TabsList>
                <TabsTrigger value="switch1">Neon switch</TabsTrigger>
                <TabsTrigger value="switch2">Styled switch</TabsTrigger>
                <TabsTrigger value="switch3">Gradient color picker</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1">
                <NeonSwitch />
            </TabsContent>

            <TabsContent value="switch2">
                <DemoSwitchStyled />
            </TabsContent>

            <TabsContent value="switch3">
                <GradientColorPickerExample />
            </TabsContent>
        </Tabs>
    );
}
