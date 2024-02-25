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
                <Button asChild variant="outline" className={classNames(className)}>

                    <button
                        onClick={async () => {
                            const createThemeConfig = (await import("../lib/utils-create-theme")).createThemeConfig;
                            const newTheme = createThemeConfig();
                            setThemeConfig(newTheme);
                            // setSelectedThemeId(undefined);
                        }}
                        className="flex items-center gap-2"
                    >
                        <Dices className="size-4" />
                        Random Theme
                    </button>

                </Button>
            </TooltipTrigger>

            <TooltipContent>
                Generate Random theme
            </TooltipContent>
        </Tooltip>
    );
};
