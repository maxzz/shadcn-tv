import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { DemoSwitchStyled, NeonSwitch } from "../../2-demo/41-demo-switches";
import { ChadcnSwitchDemo } from "../../2-demo/40-demo-controls";

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
