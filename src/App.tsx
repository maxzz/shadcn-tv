import { Section0_Header } from "./components/1-header";
import { Section2_Main } from "./components/2-main";
import { Section3_Footer } from "./components/3-footer";
import { DropArea, UIToaster } from "./components/ui";
import { Toaster } from "./components/ui/shadcn";

export function App() {
    return (<>
        <UIToaster />

        <div className="h-screen grid grid-rows-[auto,1fr,auto]">
            <Section0_Header />
            <Section2_Main />
            <Section3_Footer />
        </div>

        <DropArea />
        <Toaster
            // toastOptions={{
            //     unstyled: true,
            //     // classNames: {
            //     //     error: 'bg-red-400',
            //     //     success: 'text-green-400',
            //     //     warning: 'text-yellow-400',
            //     //     info: 'bg-blue-400',
            //     // },
            //     // classNames: {
            //     //     toast: 'bg-blue-400',
            //     //     title: 'text-red-400 text-2xl',
            //     //     description: 'text-red-400',
            //     //     actionButton: 'bg-zinc-400',
            //     //     cancelButton: 'bg-orange-400',
            //     //     closeButton: 'bg-lime-400',
            //     // },
            // }}
        />
    </>);
}
