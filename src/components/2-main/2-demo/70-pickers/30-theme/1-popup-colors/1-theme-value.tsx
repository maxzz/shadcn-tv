import { Label } from "@/components/ui/shadcn/label";
import { type ThemeS5 } from "../lib/types-theme-zod";
import { useActiveTheme, useSetThemeConfigAtom, useTheme, } from "../lib/atoms-theme";
import { SolidColorPicker } from "../../10-color-picker/1-color-picker";

export function ThemeValue({ label, themeKey, }: { themeKey: keyof ThemeS5; label: string; }) {
    const appTheme = useTheme();
    const setConfig = useSetThemeConfigAtom();
    const activeTheme = useActiveTheme();
    if (!activeTheme) {
        return null;
    }

    const color = activeTheme[themeKey];

    function changeThemeValue<TKey extends keyof ThemeS5>(key: TKey, value: ThemeS5[TKey]) {
        if (!appTheme) {
            return;
        }
        const newActiveThemeConfig = { ...activeTheme, [key]: value, };
        setConfig((prev) => ({ ...prev, [appTheme]: newActiveThemeConfig, }));
    }

    return (
        <div className="flex items-center gap-2">
            <SolidColorPicker
                color={{ ...color, a: 1 }}
                onColorChange={(color) => {
                    const hsl = color.hsl;
                    const h = Number(hsl.h.toFixed(2));
                    const s = Number(hsl.s.toFixed(2));
                    const l = Number(hsl.l.toFixed(2));

                    changeThemeValue(themeKey, { h, s, l });
                }}
                className="size-6"
            />
            <Label className="flex-shrink-0">{label}</Label>
        </div>
    );
}
