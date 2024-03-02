import { DrawerDemo, MenubarDemo, RadixToastDemo, SonnerDemo } from "../../2-demo/52-demo-toasts";
import { MenuDropdownDemo } from "../../2-demo/52-demo-toasts/5-menu-popup/inidex";
import { DialogDemoWoTrigger } from "../../2-demo/52-demo-toasts/6-dialog/20-dialog-wo-trigger";

export function ToastsInTabs() {
    return (
        <div className="flex justify-between">
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
                <div className="flex items-center gap-2">
                    <DialogDemoWoTrigger />
                </div>
            </div>

            {/* https://codepen.io/Prakash286/pen/dyRXNKG 'Exploring UI Animation #1' */}
            <div className="relative text-[.5rem]">
                <ul className="absolute w-96 rotate-90 origin-top-left text-foreground bg-sky-800/30 overflow-hidden">
                    <li className="float-left mx-2">1-menu</li>
                    <li className="float-left mx-2">2-menu</li>
                    <li className="float-left mx-2">3-menu</li>
                </ul>
            </div>
        </div>
    );
}
