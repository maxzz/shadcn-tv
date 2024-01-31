import { Button, ScrollArea } from "@/components/ui/shadcn";
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
        {/* <div className="flex justify-center py-6">
            {/* <ThemeSwitch /> * /}
            ThemeSwitch
        </div> */}

        <ScrollArea className="my-4 h-72">
            <ThemeList />
        </ScrollArea>

        <div>
            <ButtonPasteTheme />
        </div>

        <div className="pt-8">
            <ButtonGenerateTheme />
        </div>
    </>);
}

export function ThemeColorsDemo() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Paintbrush className="size-4" />
                    <span className="sr-only">Customize</span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto min-w-96 ma1x-h-[720px] bg-muted overflow-auto smallscroll"> {/* scrollbar-thin */} {/* max-h-[500px] overflow-auto smallscroll */}
                <Content />
            </PopoverContent>
        </Popover>
    );
}
