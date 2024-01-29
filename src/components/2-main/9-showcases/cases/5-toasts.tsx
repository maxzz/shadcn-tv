import { DrawerDemo, RadixToastDemo, SonnerDemo } from "../../2-demo/7-demo-toasts";

export function ToastsInTabs() {
    return (
        <div className="flex items-center gap-2">
            <SonnerDemo />
            <RadixToastDemo />
            <DrawerDemo />
        </div>
    );
}
