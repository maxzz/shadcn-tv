import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { DemoSwitchStyled, GradientColorPickerExample, NeonSwitch } from "../../2-demo/3-demo-switches";

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
