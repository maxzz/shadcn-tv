import { Button } from "@/components/ui/shadcn";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/shadcn/popover";
import { Paintbrush } from "lucide-react";
import { ThemeList } from "./2-theme-list";
import { ButtonPasteTheme } from "./3-btn-paste-theme";
import { ButtonGenerateTheme } from "./4-btn-generate-theme";
//import { ThemeSwitch } from "@/client/components/theme-switch";

function Content() {
    return (<>
        <p className="text-lg font-semibold leading-none tracking-tight">
            Customize Theme
        </p>
        <div className="flex justify-center py-6">
            {/* <ThemeSwitch /> */}
            ThemeSwitch
        </div>

        <ThemeList />

        <div>
            <ButtonPasteTheme />
        </div>

        <div className="pt-8">
            <ButtonGenerateTheme />
        </div>
    </>);
}

export function CustomizeButton() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Paintbrush className="size-4" />
                    <span className="sr-only">Customize</span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto min-w-96 max-h-[500px] overflow-auto smallscroll"> {/* scrollbar-thin */}
                <Content />
            </PopoverContent>
        </Popover>
    );
}
