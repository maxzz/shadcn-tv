import { Button, Tabs, TabsContent, TabsList, tabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { Flickup } from "./1-text-flip";
import { BorderRun } from "./2-border-run";
import { FlipBtn } from "./2-flip-btn";
import { OpenGoo } from "./9-open-dlg-goo";
import { classNames } from "@/utils";

export function EffectsTabs() {
    return (
        <Tabs defaultValue="switch3">
            
            <TabsList className={classNames("mb-2", tabsListWrapClasses)}>
                <TabsTrigger value="switch3">Effects</TabsTrigger>
                <TabsTrigger value="switch4">Goo</TabsTrigger>
            </TabsList>

            <TabsContent value="switch3">
                <div className="py-4 flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                        <Button variant="outline">
                            <Flickup className="cursor-pointer" />
                        </Button>

                        <BorderRun />

                        <FlipBtn />
                    </div>

                    <div className="px-4">
                        <Flickup className="cursor-pointer" />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="switch4">
                <OpenGoo />
            </TabsContent>
        </Tabs>
    );
}