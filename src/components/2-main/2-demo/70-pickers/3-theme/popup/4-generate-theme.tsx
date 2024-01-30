import { Button } from "@/components/ui/shadcn/button";
import { useActiveTheme, useSetThemeConfigAtom, } from "../lib/use-theme-atoms";
import { createThemeConfig } from "../lib/utils-create-theme";
import { ThemeValue } from "./1-theme-value";

export function GenerateTheme() {
    const theme = useActiveTheme();
    const setThemeConfig = useSetThemeConfigAtom();

    if (!theme) {
        return null;
    }

    return (
        <div className="border border-dotted px-2 py-4">
            <p className="text-sm font-medium">Generate theme</p>
            <p className="text-xs text-muted-foreground">
                Based on the primary color
            </p>
            <div className="flex items-center justify-between gap-1 py-2">
                <ThemeValue label="Primary" themeKey="primary" />
                <Button
                    className="h-auto px-4 py-1 text-sm"
                    onClick={() => {
                        setThemeConfig(createThemeConfig(theme.primary));
                    } }
                >
                    Generate
                </Button>
            </div>
        </div>
    );
}
