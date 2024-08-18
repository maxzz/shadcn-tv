import { Showcase } from "./cases/types";
import { Tabs_Table } from "./cases/10-tabs-tables";
import { DemoTreeWithOptions } from "../2-demo/20-demo-tree";
import { ResizableDemo } from "../2-demo/30-demo-resizable";
import { Tabs_Controls } from "./cases/40-tabs-controls";
import { Tabs_Toasts } from "./cases/50-tabs-toasts";
import { Tabs_Pickers } from "./cases/70-tabs-pickers";
import { Tabs_Loaders } from "./cases/60-tabs-loaders";

export * from "./cases/types";
export * from "./view";

export const showcasesData: Showcase[] = [
    { id: '10', name: "Tables", component: <Tabs_Table /> },
    { id: '20', name: "Tree", component: <DemoTreeWithOptions /> },
    { id: '30', name: "Resizable", component: <ResizableDemo /> },
    { id: '40', name: "Switches, Carousel, Pagination, Skeleton, Charts, Sliders", component: <Tabs_Controls /> },
    { id: '50', name: "Toasts, Drawer, Menus, Dialog", component: <Tabs_Toasts /> },
    { id: '60', name: "Loaders, Effects", component: <Tabs_Loaders /> },
    { id: '70', name: "Pickers: Color, Theme, Flow, Time", component: <Tabs_Pickers /> },
];
