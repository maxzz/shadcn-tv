import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import RadixToastDemo from "../../2-demo/7-demo-toast";
import { SonnerDemo } from "../../2-demo/demo-sonner";

export function ToastsInTabs() {
    return (
        <Tabs defaultValue="toast1">
            <TabsList>
                <TabsTrigger value="toast1">Sonner</TabsTrigger>
                <TabsTrigger value="toast2">Radix toast</TabsTrigger>
            </TabsList>

            <TabsContent value="toast1">
                <SonnerDemo />
            </TabsContent>

            <TabsContent value="toast2">
                <RadixToastDemo />
            </TabsContent>

        </Tabs>
    );
}
