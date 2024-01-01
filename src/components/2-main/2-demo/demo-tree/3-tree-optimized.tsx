import { ReactNode, useMemo, useState } from "react";
import { proxy } from "valtio";
import { Tree, DataItemWState } from "@/components/ui/shadcn/tree/tree-optimized";
import { DataItem, duplicateTree, findTreeItemById, walkItems } from "@/components/ui/shadcn/tree";
import { data } from "./1-tree-data";
import { Workflow as IconWorkflow, Folder as IconFolder } from "lucide-react";
import { inputFocusClasses } from "@/components/ui/shared-styles";
import { classNames } from "@/utils";
import { SimpleSplitPane } from "../../../ui/shadcn/split-pane";

const initialItemId = "6.1.2";

function addStateToTreeItems(data: DataItem[]): DataItemWState[] {
    const newTree = duplicateTree(data);
    walkItems(newTree, (item) => (item as DataItemWState).state = proxy({ selected: false }));
    return newTree as DataItemWState[];
}

const dataWithState = addStateToTreeItems(data);

export function DemoTreeOptimized() {
    const [content, setContent] = useState(() => {
        const initialItem = findTreeItemById(dataWithState, initialItemId);
        return initialItem?.name || "No content selected";
    });

    const TreeMemo = useMemo(
        () => {
            return <Tree
                data={dataWithState}
                className={`w-full h-full border rounded-l-md ${inputFocusClasses}`}
                initialSelectedItemId={initialItemId}
                onSelectChange={(item) => setContent(item?.name ?? "")}
                IconForFolder={IconFolder}
                IconForItem={IconWorkflow}
            />;
        }, []
    );

    return (
        <div className="mr-12 p-0.5 w-full h-full">

            <SimpleSplitPane vertical={false} className="splitpane h-full">
                <div className="w-full">
                    {TreeMemo}
                </div>

                <div className={classNames("flex-1 w-full h-full min-w-0 border border-l rounded-r-md z-10", inputFocusClasses)} tabIndex={0}>
                    <div className="min-w-0 overflow-hidden">
                        <div className="px-2 py-1">
                            {content}
                        </div>
                    </div>
                </div>
            </SimpleSplitPane>

        </div>
    );
}
