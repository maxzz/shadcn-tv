import { DrawerDemo, MenubarDemo, RadixToastDemo, SonnerDemo } from "../../2-demo/52-demo-toasts";
import { MenuDropdownDemo } from "../../2-demo/52-demo-toasts/5-menu-popup/inidex";
import { DialogDemoWoTrigger } from "../../2-demo/52-demo-toasts/6-dialog/1-dialog-wo-trigger";

const rootClasses = "relative text-[.5rem]";
const ulClasses = "absolute px-1 py-1 border-border border rounded overflow-hidden flex gap-1";
const liClasses = "px-2 py-1 bg-muted hover:bg-foreground/20 border-border/70 border rounded cursor-pointer";

function VerticalMenu() { // https://codepen.io/Prakash286/pen/dyRXNKG 'Exploring UI Animation #1'
    return (
        <div className={rootClasses}>
            <ul className={`rotate-90 origin-top-left ${ulClasses}`}>
                <li className={liClasses}>Apple</li>
                <li className={liClasses}>Plum</li>
                <li className={liClasses}>Peach</li>
            </ul>
        </div>
    );
}

function VerticalMenu2() { // https://codepen.io/Prakash286/pen/OJoLQav 'Carousel with drag and wheel'
    return (
        <div className={`${rootClasses} left-4 top-32 -rotate-90 origin-top-right`}>
            <div className={ulClasses}>
                <div className={liClasses}>Apple</div>
                <div className={liClasses}>Plum</div>
                <div className={liClasses}>Peach</div>
            </div>
        </div>
    );
}

export function ToastsInTabs() {
    return (
        <div className="mb-4 flex justify-between">

            <div className="1w-full 1mr-40 flex flex-col gap-4">
                <div className="px-4 pt-4 pb-8 bg-muted rounded-md flex items-center gap-2">
                    <SonnerDemo />
                    <RadixToastDemo />
                    <DrawerDemo />
                </div>

                <div className="px-4 pt-4 pb-8 bg-muted rounded-md flex items-center gap-2">
                    <MenubarDemo />
                    <MenuDropdownDemo />
                </div>

                <div className="p-4 bg-muted rounded-md flex items-center gap-2">
                    <DialogDemoWoTrigger />
                </div>
            </div>
            
            <VerticalMenu2 />
            <VerticalMenu />
        </div>
    );
}
