import { DrawerDemo, MenubarDemo, RadixToastDemo, SonnerDemo } from "../../2-demo/52-demo-toasts";
import { MenuDropdownDemo } from "../../2-demo/52-demo-toasts/5-menu-popup/inidex";
import { DialogDemoWoTrigger } from "../../2-demo/52-demo-toasts/6-dialog/1-dialog-wo-trigger";

const rootClasses = "relative";
const ulClasses = "1absolute px-1 py-1 border-border border rounded overflow-hidden flex gap-1";
const liClasses = "px-2 py-1 bg-muted hover:bg-foreground/20 border-border/70 border rounded cursor-pointer";

function VerticalMenu() { // https://codepen.io/Prakash286/pen/dyRXNKG 'Exploring UI Animation #1'
    return (
        <div className={rootClasses}>
            <ul className={`rotate-90 origin-top-left ${ulClasses}`}>
                <li className={liClasses}>Apple1</li>
                <li className={liClasses}>Plum</li>
                <li className={liClasses}>Peach</li>
            </ul>
        </div>
    );
}

function VerticalMenu2() { // https://codepen.io/Prakash286/pen/OJoLQav 'Carousel with drag and wheel'
    return (
        <div className={`${rootClasses} -left-24 top-2 -rotate-90 origin-top-right`}>
            <div className={ulClasses}>
                <div className={liClasses}>Apple2</div>
                <div className={liClasses}>Plum</div>
                <div className={liClasses}>Peach</div>
            </div>
        </div>
    );
}

export function ToastsInTabs() {
    return (
        <div className="mb-4 flex justify-between gap-4">

            <div className="flex flex-col gap-4">
                <div className="p-4 bg-muted rounded-md flex items-center flex-wrap gap-2">
                    <SonnerDemo />
                    <RadixToastDemo />
                    <DrawerDemo />
                    <DialogDemoWoTrigger />
                </div>

                <div className="p-4 pb-8 bg-muted rounded-md flex items-center gap-2">
                    <MenubarDemo />
                    <MenuDropdownDemo />
                </div>
            </div>

            <div className="min-w-32 text-[.5rem] flex justify-end">
                <VerticalMenu2 />
                {/* <VerticalMenu /> */}
            </div>
        </div>
    );
}
