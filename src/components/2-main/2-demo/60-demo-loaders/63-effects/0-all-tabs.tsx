import { Tabs, TabsContent, TabsList, tabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { Effects } from "./1-effects";
import { LinksDemo } from "./2-links";
import { OpenGoo } from "./7-goo";
import { classNames } from "@/utils";

export function EffectsTabs() {
    return (
        <Tabs defaultValue="switch1">
            <TabsList className={classNames("mb-2", tabsListWrapClasses)}>
                <TabsTrigger value="switch1">Effects</TabsTrigger>
                <TabsTrigger value="switch2">Links</TabsTrigger>
                <TabsTrigger value="switch3">Goo</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1">
                <Effects />
            </TabsContent>

            <TabsContent value="switch2">
                <LinksDemo />
            </TabsContent>

            <TabsContent value="switch3">
                <OpenGoo />
            </TabsContent>
        </Tabs>
    );
}
