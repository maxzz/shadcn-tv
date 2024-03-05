import { ResizableHandle, ResizableHandleToys, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/shadcn/resizable";
import { appSettings } from "@/store";
import { PanelGroupStorage } from "react-resizable-panels";

const panelsStorage: PanelGroupStorage = {
    getItem(name: string): string {
        return appSettings.resisablesState.positions[name] || '';
    },
    setItem(name: string, value: string): void {
        appSettings.resisablesState.positions[name] = value; // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
    }
};

export function ResizableDemo() {
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full _max-w-md rounded-lg border" autoSaveId="tm-example" storage={panelsStorage}>

            <ResizablePanel defaultSize={25}>
                <PanelA />
            </ResizablePanel>

            <ResizableHandle>
                <ResizableHandleToys />
            </ResizableHandle>

            <ResizablePanel >
                <ResizablePanelGroup direction="vertical" autoSaveId="tm-example2" storage={panelsStorage}>

                    <ResizablePanel defaultSize={25}>
                        <PanelB />
                    </ResizablePanel>

                    <ResizableHandle />

                    <ResizablePanel defaultSize={75}>
                        <PanelC />
                    </ResizablePanel>

                </ResizablePanelGroup>
            </ResizablePanel>

        </ResizablePanelGroup>
    );
}

function PanelA() {
    return (
        <div className="p-6 h-[200px] flex items-center justify-center">
            <span className="font-semibold">One</span>
        </div>
    );
}

function PanelB() {
    return (
        <div className="p-6 h-full flex items-center justify-center">
            <span className="font-semibold">Two</span>
        </div>
    );
}

function PanelC() {
    return (
        <div className="p-6 h-full flex items-center justify-center">
            <span className="font-semibold">Three</span>
        </div>
    );
}