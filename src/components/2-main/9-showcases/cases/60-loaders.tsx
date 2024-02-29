import { Button, Tabs, TabsContent, TabsList, TabsListWrapClasses, TabsTrigger } from "@/components/ui/shadcn";
import { BubblesDemo, DotsRing, LoadersTest, Spinner7, Spinner9, RainbowCircles, SpinnerDiv, SpinnerEmoji, SpinnerRadial, SpinnerSpherees, SpinnerSvg, Flickup, ThreeDotsLoader, OpenGoo } from "../../2-demo/60-demo-loaders";

function SpinnerTabs() {
    return (
        <Tabs defaultValue="loaders1">
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

function EffectsTabs() {
    return (
        <Tabs defaultValue="switch3">
            <TabsList className={TabsListWrapClasses}>
                <TabsTrigger value="switch3">Effects</TabsTrigger>
                <TabsTrigger value="switch4">Goo</TabsTrigger>
            </TabsList>

            <TabsContent value="switch3">
                <div className="py-4 flex flex-col items-start gap-2">
                    <Button variant="outline">
                        <Flickup className="cursor-pointer" />
                    </Button>

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

export function LoadersInTab() {
    return (
        <Tabs defaultValue="loaders1">
            <TabsList className={TabsListWrapClasses}>
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
