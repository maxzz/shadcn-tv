import { Tabs, TabsContent, TabsList, TabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { LoaderDotsRing, LoadersTest, Spinner7, Spinner9, SpinnerCircles, SpinnerDiv, SpinnerEmoji, SpinnerRadial, SpinnerSpherees, SpinnerSvg } from "../../2-demo/60-demo-loaders";
import { FlipClock } from "../../2-demo/71-demo-flip-clock";

export function LoadersInTab() {
    return (
        <Tabs defaultValue="loaders8">
            <TabsList className={TabsListWrapClasses}>
                <TabsTrigger value="loaders1">Loaders</TabsTrigger>
                <TabsTrigger value="loaders2">Circle loader</TabsTrigger>
                <TabsTrigger value="loaders3">Radial</TabsTrigger>
                <TabsTrigger value="loaders4">Spinner</TabsTrigger>
                <TabsTrigger value="loaders5">Spinner7</TabsTrigger>
                <TabsTrigger value="loaders6">Circles</TabsTrigger>
                <TabsTrigger value="loaders7">Spheres</TabsTrigger>
                <TabsTrigger value="loaders8">Clock</TabsTrigger>
            </TabsList>

            <TabsContent value="loaders1">
                <LoadersTest className="m-auto max-w-sm flex items-center justify-between" />
            </TabsContent>

            <TabsContent value="loaders2">
                <LoaderDotsRing />
            </TabsContent>

            <TabsContent value="loaders3">
                <SpinnerRadial />
            </TabsContent>

            <TabsContent value="loaders4">
                <div className="my-8 flex items-center justify-center gap-8">
                    <SpinnerSvg className="w-8 h-8 stroke-[5] stroke-sky-500" />
                    <SpinnerDiv className="w-8 h-8" />
                    <Spinner9 className="w-8 h-8 text-sky-500" />
                    <SpinnerEmoji className="text-4xl text-sky-500" />
                </div>
            </TabsContent>

            <TabsContent value="loaders5">
                <div className="my-8 flex items-center justify-center">
                    <Spinner7 />
                </div>
            </TabsContent>

            <TabsContent value="loaders6">
                <div className="my-8 flex items-center justify-center">
                    <SpinnerCircles />
                </div>
            </TabsContent>

            <TabsContent value="loaders7">
                <div className="my-8 flex items-center justify-center">
                    <SpinnerSpherees />
                </div>
            </TabsContent>

            <TabsContent value="loaders8">
                <div className="my-8 flex items-center justify-center">
                    <FlipClock />
                </div>
            </TabsContent>

        </Tabs>
    );
}
