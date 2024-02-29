import { Tabs, TabsContent, TabsList, TabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { BubblesDemo, LoaderDotsRing, LoadersTest, Spinner7, Spinner9, SpinnerCircles, SpinnerDiv, SpinnerEmoji, SpinnerRadial, SpinnerSpherees, SpinnerSvg } from "../../2-demo/60-demo-loaders";

function SpinnerTabs() {
    return (
        <Tabs defaultValue="loaders1" orientation="vertical">
            <TabsList className={TabsListWrapClasses}>
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
                </div>
            </TabsContent>

            <TabsContent value="loaders2">
                <div className="my-8 flex items-center justify-center">
                    <SpinnerCircles />
                </div>
            </TabsContent>

            <TabsContent value="loaders3">
                <div className="my-8 flex items-center justify-center">
                    <LoaderDotsRing />
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

function StyledTabs() {
    return (
        <Tabs defaultValue="loaders1">
            <TabsList className={TabsListWrapClasses}>
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

export function LoadersInTab() {
    return (
        <Tabs defaultValue="loaders1">
            <TabsList className={TabsListWrapClasses}>
                <TabsTrigger value="loaders1">Spinners</TabsTrigger>
                <TabsTrigger value="loaders2">Styled</TabsTrigger>
            </TabsList>

            <TabsContent value="loaders1">
                <SpinnerTabs />
            </TabsContent>

            <TabsContent value="loaders2">
                <StyledTabs />
            </TabsContent>
        </Tabs>
    );
}
