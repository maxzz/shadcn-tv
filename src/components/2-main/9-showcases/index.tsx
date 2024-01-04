import { Showcase } from "./cases/types";
import { TableInTabs } from "./cases/1-tables";
import { LoadersInTab } from "./cases/2-loaders";
import { SwitchInTabs } from "./cases/3-switches";
import { DemoTreeWithOptions } from "../2-demo/4-demo-tree";
import { ResizableDemo } from "../2-demo/5-demo-resizable";
import { PaginationDemo } from "../2-demo/demo-pagination";
import { ChartsDemo } from "../2-demo/demo-charts";

export * from "./cases/types";
export * from "./showcases-view";

export const showcasesData: Showcase[] = [
    { id: '10', name: "Tables", component: <TableInTabs /> },
    { id: '20', name: "Loaders", component: <LoadersInTab /> },
    { id: '30', name: "Switches", component: <SwitchInTabs /> },
    { id: '41', name: "Tree", component: <DemoTreeWithOptions /> },
    { id: '51', name: "Resizable", component: <ResizableDemo /> },
    { id: '52', name: "Pagination", component: <PaginationDemo /> },
    { id: '53', name: "Charts", component: <ChartsDemo /> },
    // { id: '63', name: "Splitter", component: <DemoSplitter /> },
];

export const initialCase = "51";
