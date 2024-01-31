import { useSetThemeConfigAtom } from "../lib/atoms-theme";
import { Button, Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/shadcn";
import { Dices } from "lucide-react";
import { classNames } from "@/utils";
//import { useSetThemeConfig } from "@/client/components/use-theme-config";
//import { useSelectedThemeId } from "@/client/lib/use-selected-theme";
// import Link from "next/link";

export const ButtonRandom = ({ className }: { className?: string; }) => {
    const setThemeConfig = useSetThemeConfigAtom();
    // const [, setSelectedThemeId] = useSelectedThemeId();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button asChild className={classNames(className)}>

                    <a
                        href="/"
                        onClick={async () => {
                            const createThemeConfig = (await import("../lib/utils-create-theme")).createThemeConfig;

                            const newTheme = createThemeConfig();
                            console.log('newTheme', newTheme);
                            
                            setThemeConfig(newTheme);
                            // setSelectedThemeId(undefined);
                        }}
                        className="flex items-center gap-2"
                        // scroll={false}
                    >
                        <Dices className="size-4" />
                        Random Theme
                    </a>

                </Button>
            </TooltipTrigger>
            <TooltipContent>Generate Random theme</TooltipContent>
        </Tooltip>
    );
};
