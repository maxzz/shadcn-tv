import { Showcase } from "./cases/types";
import { TableInTabs } from "./cases/10-tables";
import { DemoTreeWithOptions } from "../2-demo/20-demo-tree";
import { ResizableDemo } from "../2-demo/30-demo-resizable";
import { ControlsInTabs } from "./cases/40-controls";
import { ToastsInTabs } from "./cases/50-toasts";
import { PickersInTabs } from "./cases/60-pickers";
import { LoadersInTab } from "./cases/70-loaders";

export * from "./cases/types";
export * from "./showcases-view";

export const showcasesData: Showcase[] = [
    { id: '10', name: "Tables", component: <TableInTabs /> },
    { id: '20', name: "Tree", component: <DemoTreeWithOptions /> },
    { id: '30', name: "Resizable", component: <ResizableDemo /> },
    { id: '40', name: "Switches, Carousel, Pagination, Skeleton, Charts", component: <ControlsInTabs /> },
    { id: '50', name: "Toasts, Drawer", component: <ToastsInTabs /> },
    { id: '70', name: "Loaders", component: <LoadersInTab /> },
    { id: '60', name: "Pickers", component: <PickersInTabs /> },
    
    // { id: '63', name: "Splitter", component: <DemoSplitter /> },
];

export const initialCase = "10";
