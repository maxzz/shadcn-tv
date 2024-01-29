import { Showcase } from "./cases/types";
import { TableInTabs } from "./cases/1-tables";
import { LoadersInTab } from "./cases/2-loaders";
import { DemoTreeWithOptions } from "../2-demo/04-demo-tree";
import { ResizableDemo } from "../2-demo/50-demo-resizable";
import { ToastsInTabs } from "./cases/5-toasts";
import { ControlsInTabs } from "./cases/5-tabs-controls";

export * from "./cases/types";
export * from "./showcases-view";

export const showcasesData: Showcase[] = [
    { id: '10', name: "Tables", component: <TableInTabs /> },
    { id: '20', name: "Loaders", component: <LoadersInTab /> },
    { id: '41', name: "Tree", component: <DemoTreeWithOptions /> },
    { id: '51', name: "Resizable", component: <ResizableDemo /> },
    { id: '52', name: "Switches, Carousel, Pagination, Skeleton, Charts", component: <ControlsInTabs /> },
    { id: '53', name: "Toasts and Drawer", component: <ToastsInTabs /> },
    
    // { id: '63', name: "Splitter", component: <DemoSplitter /> },
];

export const initialCase = "53";
