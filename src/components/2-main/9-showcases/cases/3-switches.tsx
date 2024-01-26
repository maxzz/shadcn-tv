import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { DemoSwitchStyled, Flickup, GradientColorPickerExample, NeonSwitch, ThreeDotsLoader } from "../../2-demo/3-demo-switches";

export function SwitchInTabs() {
    return (
        <Tabs defaultValue="switch1">
            <TabsList>
                <TabsTrigger value="switch1">Neon switch</TabsTrigger>
                <TabsTrigger value="switch2">Styled switch</TabsTrigger>
                <TabsTrigger value="switch3">Gradient color picker</TabsTrigger>
                <TabsTrigger value="switch4">Effects</TabsTrigger>
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

            <TabsContent value="switch4">
                <div className="py-4 flex items-center justify-between">
                    <Button variant={"outline"}>
                        <Flickup className="cursor-pointer" />
                    </Button>

                    <Flickup className="cursor-pointer" />

                    <ThreeDotsLoader className="text-sky-800" />
                </div>
            </TabsContent>
        </Tabs>
    );
}
