import { Showcase } from "./cases/types";
import { TableInTabs } from "./cases/1-tables";
import { LoadersInTab } from "./cases/2-loaders";
import { SwitchInTabs } from "./cases/3-switches";
import { DemoTreeWithOptions } from "../2-demo/4-demo-tree";
import { ResizableDemo } from "../2-demo/5-demo-resizable";
import { ChartsInTabs } from "./cases/4-charts";
import { CarouselDemo } from "../2-demo/7-demo-carousel";
import { DrawerDemo } from "../2-demo/demo-drawer";
import { SonnerDemo } from "../2-demo/demo-sonner";
import { EditorDemo } from "../2-demo/demo-editor";

export * from "./cases/types";
export * from "./showcases-view";

export const showcasesData: Showcase[] = [
    { id: '10', name: "Tables", component: <TableInTabs /> },
    { id: '20', name: "Loaders", component: <LoadersInTab /> },
    { id: '30', name: "Switches", component: <SwitchInTabs /> },
    { id: '41', name: "Tree", component: <DemoTreeWithOptions /> },
    { id: '51', name: "Resizable", component: <ResizableDemo /> },
    { id: '52', name: "Charts", component: <ChartsInTabs /> },
    { id: '53', name: "Carousel", component: <CarouselDemo /> },
    { id: '54', name: "Drawer", component: <DrawerDemo /> },
    { id: '55', name: "Sonner", component: <SonnerDemo /> },
    { id: '56', name: "Editor", component: <EditorDemo /> },
    
    // { id: '63', name: "Splitter", component: <DemoSplitter /> },
];

export const initialCase = "56";
