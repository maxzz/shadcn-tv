import { useMemo, useState } from "react";
import { proxy } from "valtio";
import { Tree, DataItemWState } from "@/components/ui/shadcn/tree/tree-optimized";
import { DataItem, duplicateTree, findTreeItemById, walkItems } from "@/components/ui/shadcn/tree";
import { data } from "./1-tree-data";
import { Workflow as IconWorkflow, Folder as IconFolder } from "lucide-react";
import { inputFocusClasses } from "@/components/ui/shared-styles";
import { classNames } from "@/utils";
import { SimpleSplitPane } from "../../split-pane";

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
                className={`w-full h-full border-[1px] rounded-l-md ${inputFocusClasses}`}
                initialSelectedItemId={initialItemId}
                onSelectChange={(item) => setContent(item?.name ?? "")}
                IconForFolder={IconFolder}
                IconForItem={IconWorkflow}
            />;
        }, []
    );

    return (
        <div className="m-0.5 min-h-full flex">

            <SimpleSplitPane vertical={false} className="splitpane" minPersent={24}>
                <div className="w-full h-[460px]">
                    {TreeMemo}
                </div>

                <div className={classNames("flex-1 px-2 py-1 border-[1px] border-l-0 rounded-r-md z-10", inputFocusClasses)} tabIndex={0}>
                    {content}
                </div>
            </SimpleSplitPane>

        </div>
    );
}
