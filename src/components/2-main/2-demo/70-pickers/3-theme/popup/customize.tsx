import { Fragment } from "react";

//import * as Icons from "@/client/components/icons";
import { Paintbrush } from "lucide-react";

import { MenuButton } from "./menu-button";
//import { ThemeSwitch } from "@/client/components/theme-switch";

import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/shadcn/popover";

import { ThemeList } from "./2-theme-list";
import { PasteTheme } from "./3-paste-theme";
import { GenerateTheme } from "./4-generate-theme";

function Content() {
    return (
        <Fragment>
            <p className="text-lg font-semibold leading-none tracking-tight">
                Customize Theme
            </p>
            <div className="flex justify-center py-6">
                {/* <ThemeSwitch /> */}
                ThemeSwitch
            </div>

            <ThemeList />

            <div>
                <PasteTheme />
            </div>

            <div className="pt-8">
                <GenerateTheme />
            </div>
        </Fragment>
    );
}

export function CustomizeButton() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <MenuButton variant="default" className="bg-primary">
                    <Paintbrush className="size-4" />
                    <span className="sr-only">Customize</span>
                </MenuButton>
            </PopoverTrigger>

            <PopoverContent className="max-h-[60svh] overflow-auto scrollbar-thin">
                <Content />
            </PopoverContent>
        </Popover>
    );
}
