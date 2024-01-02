import { Showcase } from "./types";
import { TableInTabs } from "./1-tables";
import { LoadersInTab } from "./2-loaders";
import { SwitchInTabs } from "./3-switches";
import { DemoTreeWithOptions } from "../../2-demo/4-demo-tree";
import { ResizableDemo } from "../../2-demo/5-demo-resizable";

export * from "./types";

export const showcasesData: Showcase[] = [
    { id: '10', name: "Tables", component: <TableInTabs /> },
    { id: '20', name: "Loaders", component: <LoadersInTab /> },
    { id: '30', name: "Switches", component: <SwitchInTabs /> },
    { id: '41', name: "Tree", component: <DemoTreeWithOptions /> },
    { id: '51', name: "Resizable", component: <ResizableDemo /> },
    // { id: '63', name: "Splitter", component: <DemoSplitter /> },
];

export const initialCase = "51";
