import { useState } from "react";
import { Tree, TreeDataItem } from "@/components/ui/shadcn/tree";
import { Workflow as IconWorkflow, Folder as IconFolder, Layout as IconLayout } from "lucide-react";

const data: TreeDataItem[] = [
    { id: "1", name: "Unread" },
    { id: "2", name: "Threads" },
    {
        id: "3",
        name: "Chat Rooms",
        children: [
            { id: "c1", name: "General" },
            { id: "c2", name: "Random" },
            { id: "c3", name: "Open Source Projects" },
        ],
    },
    {
        id: "4",
        name: "Direct Messages",
        children: [
            {
                id: "d1",
                name: "Alice",
                children: [
                    { id: "d11", name: "Alice2", icon: IconLayout },
                    { id: "d12", name: "Bob2" },
                    { id: "d13", name: "Charlie2" },
                ],
            },
            { id: "d2", name: "Bob", icon: IconLayout },
            { id: "d3", name: "Charlie" },
        ],
    },
    {
        id: "5",
        name: "Direct Messages",
        children: [
            {
                id: "e1",
                name: "Alice",
                children: [
                    { id: "e11", name: "Alice2" },
                    { id: "e12", name: "Bob2" },
                    { id: "e13", name: "Charlie2" },
                ],
            },
            { id: "e2", name: "Bob" },
            { id: "e3", name: "Charlie" },
        ],
    },
    {
        id: "6",
        name: "Direct Messages",
        children: [
            {
                id: "f1",
                name: "Alice",
                children: [
                    { id: "f11", name: "Alice2" },
                    { id: "f12", name: "Bob2" },
                    { id: "f13", name: "Charlie2" },
                ],
            },
            { id: "f2", name: "Bob" },
            { id: "f3", name: "Charlie" },
        ],
    },
];

export function DemoTree() {
    const [content, setContent] = useState("Admin Page");
    return (
        <div className="flex min-h-full">
            <Tree
                data={data}
                className="shrink-0 w-[220px] h-[460px] border-[1px] rounded-l-md"
                initialSlelectedItemId="f12"
                onSelectChange={(item) => setContent(item?.name ?? "")}
                iconFolder={IconFolder}
                iconItem={IconWorkflow}
            />
            <div className="flex-1 px-2 py-1 border-[1px] border-l-0 rounded-r-md">
                {content}
            </div>
        </div>
    );
}
