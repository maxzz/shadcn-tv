import { Tabs, TabsContent, TabsList, tabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { OpenGoo } from "./2-goo";
import { classNames } from "@/utils";
import { Effects } from "./1-effects";

export function EffectsTabs() {
    return (
        <Tabs defaultValue="switch1">
            <TabsList className={classNames("mb-2", tabsListWrapClasses)}>
                <TabsTrigger value="switch1">Effects</TabsTrigger>
                <TabsTrigger value="switch2">Goo</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1">
                <Effects />
            </TabsContent>

            <TabsContent value="switch2">
                <OpenGoo />
            </TabsContent>
        </Tabs>
    );
}
