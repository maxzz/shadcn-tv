import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/shadcn/resizable";

export function ResizableDemo() {
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full _max-w-md rounded-lg border">

            <ResizablePanel defaultSize={50}>
                <div className="p-6 h-[200px] flex items-center justify-center">
                    <span className="font-semibold">One</span>
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">

                    <ResizablePanel defaultSize={25}>
                        <div className="p-6 h-full flex items-center justify-center">
                            <span className="font-semibold">Two</span>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle />

                    <ResizablePanel defaultSize={75}>
                        <div className="p-6 h-full flex items-center justify-center">
                            <span className="font-semibold">Three</span>
                        </div>
                    </ResizablePanel>

                </ResizablePanelGroup>
            </ResizablePanel>

        </ResizablePanelGroup>
    );
}
