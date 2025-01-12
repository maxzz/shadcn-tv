import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, tabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { LoadersTest } from "../1-p-loaders";
import { BubblesDemo } from "../2-bubbles";
import { SpinnerSpherees } from "../3-sphere";
import { classNames } from "@/utils";

export function StyledTabs() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="loaders1" value={activeTabs.loadersStyled} onValueChange={(v) => appSettings.demosState.activeTabs.loadersStyled = v}>
            
            <TabsList className={classNames("mb-2", tabsListWrapClasses)}>
                <TabsTrigger value="loaders1">Blocks</TabsTrigger>
                <TabsTrigger value="loaders2">Bubbles</TabsTrigger>
                <TabsTrigger value="loaders3">3D spheres</TabsTrigger>
            </TabsList>

            <TabsContent value="loaders1">
                <LoadersTest className="m-auto max-w-sm flex items-center justify-between" />
            </TabsContent>

            <TabsContent value="loaders2">
                <div className="my-8 flex items-center justify-center">
                    <BubblesDemo />
                </div>
            </TabsContent>

            <TabsContent value="loaders3">
                <div className="my-8 flex items-center justify-center">
                    <SpinnerSpherees />
                </div>
            </TabsContent>
        </Tabs>
    );
}
