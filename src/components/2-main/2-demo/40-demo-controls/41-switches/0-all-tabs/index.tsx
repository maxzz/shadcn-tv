import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { ChadcnSwitchDemo } from "../1-chadcn";
import { NeonSwitch } from "../2-switch-neon";
import { DemoSwitchStyled } from "../3-switch-styled";

export function SubTab_Switches() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="switch1" className="mb-4" value={activeTabs.switches} onValueChange={(v) => appSettings.demosState.activeTabs.switches = v}>
            <TabsList className="mb-4">
                <TabsTrigger value="switch1">Shadcn</TabsTrigger>
                <TabsTrigger value="switch2">Neon switch</TabsTrigger>
                <TabsTrigger value="switch3">Styled switch</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1">
                <ChadcnSwitchDemo />
            </TabsContent>

            <TabsContent value="switch2">
                <div className="min-h-32 grid place-items-center">
                    <NeonSwitch />
                </div>

            </TabsContent>

            <TabsContent value="switch3" >
                <DemoSwitchStyled />
            </TabsContent>
        </Tabs>
    );
}
