import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CarouselDemo } from "./2-demo-carousel";
import { InputOTPDemo } from "./3-demo-input-otp";
import { SkeletonDemo } from "./4-demo-skeleton";

export function SubTab_Controls() {
    return (
        <Tabs defaultValue="controls1">
            <TabsList>
                <TabsTrigger value="controls1">Input OTP</TabsTrigger>
                <TabsTrigger value="controls2">Sceleton</TabsTrigger>
                <TabsTrigger value="controls3">Carousel</TabsTrigger>
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
        </Tabs>
    );
}
