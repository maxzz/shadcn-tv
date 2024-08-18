import { Tabs, TabsContent, TabsList, tabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { classNames } from "@/utils";
import { SpinnerTabs } from "./1-spinners";
import { StyledTabs } from "./2-styled";
import { EffectsTabs } from "./3-effects";

export function Tabs_Loaders() {
    return (
        <Tabs defaultValue="loaders1">

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
