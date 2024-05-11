import { DrawerDemo, MenubarDemo, RadixToastDemo, SonnerDemo } from "../../2-demo/52-demo-toasts";
import { MenuDropdownDemo } from "../../2-demo/52-demo-toasts/5-menu-popup/inidex";
import { DialogDemoWoTrigger } from "../../2-demo/52-demo-toasts/6-dialog/1-dialog-wo-trigger";

function VerticalMenu() { // https://codepen.io/Prakash286/pen/dyRXNKG 'Exploring UI Animation #1'
    return (
        <div className="relative text-[.5rem]">
            <ul className="absolute px-1 py-1 rotate-90 origin-top-left border-border border rounded overflow-hidden flex gap-1">
                <li className="px-2 py-1 bg-muted hover:bg-foreground/20 border-border/70 border rounded cursor-pointer">Apple</li>
                <li className="px-2 py-1 bg-muted hover:bg-foreground/20 border-border/70 border rounded cursor-pointer">Plum</li>
                <li className="px-2 py-1 bg-muted hover:bg-foreground/20 border-border/70 border rounded cursor-pointer">Peach</li>
            </ul>
        </div>
    );
}

function VerticalMenu2() { // https://codepen.io/Prakash286/pen/OJoLQav 'Carousel with drag and wheel'
    return (
        <div className="relative left-4 top-32 -rotate-90 origin-top-right text-[.5rem]">
            <div className="absolute px-1 py-1 border-border border rounded overflow-hidden flex gap-1">
                <div className="px-2 py-1 bg-muted hover:bg-foreground/20 border-border/70 border rounded cursor-pointer">Apple</div>
                <div className="px-2 py-1 bg-muted hover:bg-foreground/20 border-border/70 border rounded cursor-pointer">Plum</div>
                <div className="px-2 py-1 bg-muted hover:bg-foreground/20 border-border/70 border rounded cursor-pointer">Peach</div>
            </div>
        </div>
    );
}

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
            
            <VerticalMenu2 />
            <VerticalMenu />
        </div>
    );
}
