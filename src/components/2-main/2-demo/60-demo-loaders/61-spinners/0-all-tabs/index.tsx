import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, tabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { SpinnerSvg } from "../1-simple/1-spinner-svg";
import { SpinnerDiv } from "../1-simple/2-spinner-div";
import { Spinner9 } from "../1-simple/3-spinner9";
import { SpinnerEmoji } from "../1-simple/4-spinner-emoji";
import { TwoCircles } from "../1-simple/5-two-circles";
import { TextBar } from "../1-simple/6-text-bar";
import { ThreeDotsLoader } from "../1-simple/9-tree-dots";
import { RainbowCircles } from "../2-rainbow-circles";
import { DotsRing } from "../3-dots-ring";
import { Spinner7 } from "../4-commet";
import { SpinnerRadial } from "../5-radial";
import { classNames } from "@/utils";

export function SpinnerTabs() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="loaders1" value={activeTabs.loadersSpinners} onValueChange={(v) => appSettings.demosState.activeTabs.loadersSpinners = v}>
            
            <TabsList className={classNames("mb-2", tabsListWrapClasses)}>
                <TabsTrigger value="loaders1">Simple</TabsTrigger>
                <TabsTrigger value="loaders2">Circles</TabsTrigger>
                <TabsTrigger value="loaders3">Dots ring</TabsTrigger>
                <TabsTrigger value="loaders4">Commet</TabsTrigger>
                <TabsTrigger value="loaders5">Radar</TabsTrigger>
            </TabsList>

            <TabsContent value="loaders1">
                <div className="my-8 flex items-center justify-center gap-8">
                    <SpinnerSvg className="w-8 h-8 stroke-[5] stroke-sky-500" />
                    <SpinnerDiv className="w-8 h-8" />
                    <Spinner9 className="w-8 h-8 text-sky-500" />
                    <SpinnerEmoji className="text-4xl text-sky-500" />
                    <TwoCircles />
                    <TextBar className="text-sky-500" />
                    <ThreeDotsLoader className="text-sky-300" />
                </div>
            </TabsContent>

            <TabsContent value="loaders2">
                <div className="my-8 flex items-center justify-center">
                    <RainbowCircles />
                </div>
            </TabsContent>

            <TabsContent value="loaders3">
                <div className="my-8 flex items-center justify-center">
                    <DotsRing />
                </div>
            </TabsContent>

            <TabsContent value="loaders4">
                <div className="my-8 flex items-center justify-center">
                    <Spinner7 />
                </div>
            </TabsContent>

            <TabsContent value="loaders5">
                <SpinnerRadial />
            </TabsContent>
        </Tabs>
    );
}
