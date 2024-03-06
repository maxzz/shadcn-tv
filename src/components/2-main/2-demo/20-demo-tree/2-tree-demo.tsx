import { useMemo, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { Tree, DataItemWState, DataItem, duplicateTree, findTreeItemById, walkItems } from "@/components/ui/shadcn/tree";
import { data } from "./1-tree-data";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
import { inputFocusClasses } from "@/components/ui/shared-styles";
import { classNames } from "@/utils";
import { SimpleSplitPane } from "../../../ui/shadcn/split-pane";
import { Checkbox } from "@/components/ui/shadcn";
import { appSettings } from "@/store";

const initialItemId = "6.1.2";

function addStateToTreeItems(data: DataItem[]): DataItemWState[] {
    const newTree = duplicateTree(data);
    walkItems(newTree, (item) => (item as DataItemWState).state = proxy({ selected: false }));
    return newTree as DataItemWState[];
}

const dataWithState = addStateToTreeItems(data);

export function DemoTreeWithOptions() {
    const [content, setContent] = useState(() => {
        const initialItem = findTreeItemById(dataWithState, initialItemId);
        return initialItem?.name || "No content selected";
    });

    const { arrowFirst: snapArrowFirst, hideFolderIcon: snapHideFolderIcon } = useSnapshot(appSettings.treeState);

    const TreeMemo = useMemo(
        () => {
            return <Tree
                data={dataWithState}
                className={`w-full h-full border rounded-l-md ${inputFocusClasses}`}
                initialSelectedItemId={initialItemId}
                onSelectChange={(item) => setContent(item?.name ?? "")}
                IconForFolder={IconFolder}
                IconForItem={IconFile}
                arrowFirst={snapArrowFirst}
                hideFolderIcon={snapHideFolderIcon}
            />;
        }, [snapArrowFirst, snapHideFolderIcon]
    );

    return (
        <div className="mr-12 p-0.5 w-full h-full text-xs">

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

            <div className="mt-2 text-sm text-muted-foreground">
                <label className="flex items-center">
                    <Checkbox className="mr-2" checked={snapArrowFirst} onCheckedChange={() => appSettings.treeState.arrowFirst = !appSettings.treeState.arrowFirst } />
                    Icons first
                </label>

                <label className="flex items-center">
                    <Checkbox className="mr-2" checked={snapHideFolderIcon} onCheckedChange={() => appSettings.treeState.hideFolderIcon = !appSettings.treeState.hideFolderIcon} />
                    Hide folder icons
                </label>
            </div>

        </div>
    );
}
