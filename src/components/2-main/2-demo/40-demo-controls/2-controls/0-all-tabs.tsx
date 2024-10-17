import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CarouselDemo } from "./3-demo-carousel";
import { InputOTPDemo } from "./1-demo-input-otp";
import { SkeletonDemo } from "./2-demo-skeleton";
import { TabsTransitionDemo } from "./4-demo-tabs-transition";
import { SelectDemo } from "./5-demo-select";
import { CommandDialogDemo } from "./6-demo-command";

export function SubTab_Controls() {
    return (
        <Tabs defaultValue="controls1">
            <TabsList>
                <TabsTrigger value="controls1">Input OTP</TabsTrigger>
                <TabsTrigger value="controls2">Sceleton</TabsTrigger>
                <TabsTrigger value="controls3">Carousel</TabsTrigger>
                <TabsTrigger value="controls4">Tabs Transition</TabsTrigger>
                <TabsTrigger value="controls5">Select</TabsTrigger>
                <TabsTrigger value="controls6">Command</TabsTrigger>
            </TabsList>

            <TabsContent value="controls1">
                <InputOTPDemo />
            </TabsContent>

            <TabsContent value="controls2">
                <SkeletonDemo />
            </TabsContent>

            <TabsContent value="controls3">
                <CarouselDemo />
            </TabsContent>

            <TabsContent value="controls4">
                <TabsTransitionDemo />
            </TabsContent>

            <TabsContent value="controls5">
                <SelectDemo />
            </TabsContent>

            <TabsContent value="controls6">
                <CommandDialogDemo />
            </TabsContent>
        </Tabs>
    );
}
