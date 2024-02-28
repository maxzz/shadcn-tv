import { DrawerDemo, MenubarDemo, RadixToastDemo, SonnerDemo } from "../../2-demo/52-demo-toasts";
import { MenuDropdownDemo } from "../../2-demo/52-demo-toasts/5-menu-popup/inidex";

export function ToastsInTabs() {
    return (
        <div className="flex flex-col  gap-4">
            <div className="flex items-center gap-2">
                <SonnerDemo />
                <RadixToastDemo />
                <DrawerDemo />
            </div>
            <div className="flex items-center gap-2">
                <MenubarDemo />
                <MenuDropdownDemo />
            </div>
        </div>
    );
}
