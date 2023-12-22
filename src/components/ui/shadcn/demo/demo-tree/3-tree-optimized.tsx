import { useState } from "react";
import { proxy } from "valtio";
import { Tree, DataItemWState, DataItem, duplicateTree, findTreeItemById, walkItems } from "@/components/ui/shadcn/tree-optimized";
import { Workflow as IconWorkflow, Folder as IconFolder } from "lucide-react";
import { classNames } from "@/utils";
import { inputFocusClasses } from "../../../shared-styles";
import { data } from "./1-tree-data";

const initialItemId = "6.1.2";

function addStateToTreeItems(data: DataItem[]): DataItemWState[] {
    const newTree = duplicateTree(data);
    walkItems(newTree, (item) => (item as DataItemWState).state = proxy({ selected: false }));
    return newTree as DataItemWState[];
}

const dataWithState = addStateToTreeItems(data);

export function DemoTreeOptimized() {
    const [content, setContent] = useState(() => findTreeItemById(data, initialItemId)?.name || "No content selected");
    return (
        <div className="m-0.5 min-h-full flex">
            <Tree
                data={dataWithState}
                className={`shrink-0 w-[230px] h-[460px] border-[1px] rounded-l-md ${inputFocusClasses}`}
                initialSelectedItemId={initialItemId}
                onSelectChange={(item) => setContent(item?.name ?? "")}
                iconFolder={IconFolder}
                iconItem={IconWorkflow}
            />

            <div className={classNames("flex-1 px-2 py-1 border-[1px] border-l-0 rounded-r-md z-10", inputFocusClasses)} tabIndex={0}>
                {content}
            </div>
        </div>
    );
}
