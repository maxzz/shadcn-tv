import { DrawerDemo, MenubarDemo, RadixToastDemo, SonnerDemo } from "../../2-demo/52-demo-toasts";

export function ToastsInTabs() {
    return (
        <div className="flex flex-col  gap-4">
            <div className="flex items-center gap-2">
                <SonnerDemo />
                <RadixToastDemo />
                <DrawerDemo />
            </div>
            <div className="flex">
                <MenubarDemo />
            </div>
        </div>
    );
}
