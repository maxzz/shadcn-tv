import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, tabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { classNames } from "@/utils";
import { SpinnerTabs } from "../61-spinners";
import { StyledTabs } from "../62-styled";
import { EffectsTabs } from "../63-effects";

export function Tabs_Loaders() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="loaders3" value={activeTabs.loaders} onValueChange={(v) => appSettings.demosState.activeTabs.loaders = v}>

            <TabsList className={classNames("mb-2", tabsListWrapClasses)}>
                <TabsTrigger value="loaders1">Spinners</TabsTrigger>
                <TabsTrigger value="loaders2">Styled</TabsTrigger>
                <TabsTrigger value="loaders3">Effects</TabsTrigger>
            </TabsList>

            <TabsContent value="loaders1">
                <SpinnerTabs />
            </TabsContent>

            <TabsContent value="loaders2">
                <StyledTabs />
            </TabsContent>

            <TabsContent value="loaders3">
                <EffectsTabs />
            </TabsContent>
        </Tabs>
    );
}

// TODO: orientation="vertical" for Tabs; <TabsList className={`${TabsListWrapClasses} flex flex-col`}>
//       G: 'css orientaation vertical tabs'
