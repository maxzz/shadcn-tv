import { useSnapshot } from "valtio";
import { appSettings } from "@/store/app-settings";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { Button } from "./button";
import { IconDark, IconLight, IconSystem } from "../icons/normal";
import { ChevronDown, CheckIcon } from 'lucide-react';
import { Theme } from "@/utils";

function Item({ label, theme, current }: { label: string; theme: Theme; current: Theme; }) {
    return (
        <DropdownMenuItem
            className="grid grid-cols-[16px,1fr] items-center gap-x-2"
            onClick={() => appSettings.theme = theme}
        >
            {current === theme && <CheckIcon className="w-4 h-4" />}

            <div className="col-start-2">
                {label}
            </div>
        </DropdownMenuItem>
    );
}

export function ThemeSwitch() {
    const { theme } = useSnapshot(appSettings);
    const isDark = theme === "dark";
    const isSystem = theme === "system";
    const isLight = !isDark && !isSystem;
    return (
        <div className="focus-within:ring-1 focus-within:ring-ring rounded-md flex items-center">
            <Button
                variant={'ghost'}
                size={'sm'}
                tabIndex={-1}
                className="py-0 border-y border-l border-input rounded-r-none"
                onClick={() => appSettings.theme = appSettings.theme === 'dark' ? 'light' : 'dark'}
            >
                {isSystem && <IconSystem className={"w-4 h-4"} />}
                {isLight && <IconLight className={"w-4 h-4"} />}
                {isDark && <IconDark className={"w-4 h-4 p-0.5"} />}
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className="px-1 py-0 border border-input rounded-l-none focus-visible:ring-0"
                        onClick={() => appSettings.theme = 'system'}
                    >
                        <ChevronDown className="w-3 h-3" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <Item label="Light" theme="light" current={theme} />
                    <Item label="Dark" theme="dark" current={theme} />
                    <Item label="System" theme="system" current={theme} />
                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    );
}
