import { Header } from "./components/1-header";
import { Main } from "./components/2-main";
import { Footer } from "./components/3-footer";
import { DropArea, UIToaster } from "./components/ui";

export function App() {
    return (<>
        <UIToaster />

        <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
            <Header />
            <Main />
            <Footer />
        </div>

        <DropArea />
    </>);
}
