import { Showcase } from "./cases/types";
import { Tabs_Table } from "../2-demo/10-demo-tables";
import { DemoTreeWithOptions } from "../2-demo/20-demo-tree";
import { ResizableDemo } from "../2-demo/30-demo-resizable";
import { Tabs_Controls } from "../2-demo/40-demo-controls";
import { Tabs_Toasts } from "../2-demo/52-demo-toasts";
import { Tabs_Loaders } from "../2-demo/60-demo-loaders";
import { Tabs_Pickers } from "./cases/70-tabs-pickers";

export * from "./cases/types";
export * from "./view";

export const showcasesData: Showcase[] = [
    { id: '10', component: <Tabs_Table />            /**/, name: "Tables", },
    { id: '20', component: <DemoTreeWithOptions />   /**/, name: "Tree", },
    { id: '30', component: <ResizableDemo />         /**/, name: "Resizable", },
    { id: '40', component: <Tabs_Controls />         /**/, name: "Switches, Carousel, Pagination, Skeleton, Charts, Sliders", },
    { id: '50', component: <Tabs_Toasts />           /**/, name: "Toasts, Drawer, Menus, Dialog", },
    { id: '60', component: <Tabs_Loaders />          /**/, name: "Loaders, Effects", },
    { id: '70', component: <Tabs_Pickers />          /**/, name: "Pickers: Color, Theme, Flow, Time", },
];
