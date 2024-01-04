import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/shadcn/resizable";
import { PanelGroupStorage } from "react-resizable-panels";
import { proxy } from "valtio";
import { proxyMap } from "valtio/utils";

// const storage: PanelGroupStorage = {
//     getItem: (name: string): string => {
//         console.log('getItem', name);
//         return '10'
//     },
//     setItem: (name: string, value: string): void => {
//         console.log('setItem', name, value);
//     }
// }

const resizablesStorage = proxy<{ positions: Map<string, string>; }>(
    {
        positions: new Map(),
    },
    // {
    //     onSet(obj, prop, val) {
    //         console.log('onSet', obj, prop, val);
    //         obj.positions.set(prop, val);
    //         return true;
    //     },
    // }
);

const storage: PanelGroupStorage = {
    getItem(name: string): string {
        const rv = resizablesStorage.positions.get(name) || '';
        console.log(`getItem() name: %c${name} rv: ${rv}`, 'background-color: black; color: dodgerblue');
        return rv;
    },
    setItem(name: string, value: string): void {
        console.log(`setItem() name: %c${name} ${value}`, 'background-color: black; color: limegreen'); // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
        resizablesStorage.positions.set(name, value);
    }
};

// const storage: PanelGroupStorage = {
//     getItem(name: string): string {
//         console.log(`getItem() name: %c${name}`, 'background-color: black; color: dodgerblue');
//         return '10';
//     },
//     setItem(name: string, value: string): void {
//         console.log(`setItem() name: %c${name} ${value}`, 'background-color: black; color: limegreen'); // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
//         console.log(JSON.parse(value));
//     }
// };

export function ResizableDemo() {
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full _max-w-md rounded-lg border"
            autoSaveId="tm-example"
            onLayout={(layout) => {
                //console.log('layout1', layout);
            }}
            storage={storage}
        >

            <ResizablePanel defaultSize={25}>
                <div className="p-6 h-[200px] flex items-center justify-center">
                    <span className="font-semibold">One</span>
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel >
                <ResizablePanelGroup direction="vertical"
                    onLayout={(layout) => {
                        //console.log('layout2', layout);
                    }}
                    autoSaveId="tm-example2"
                    storage={storage}
                >

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
