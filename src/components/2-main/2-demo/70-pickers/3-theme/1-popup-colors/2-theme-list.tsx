import { type ThemeS5 } from "../lib/types-theme-zod";
import { ThemeValue } from "./1-theme-value";

export function ThemeList() {
    return (
        <div className="flex flex-col gap-3 py-4">
            {changeableThemeValues.map(({ label, themeKey }) => (
                <ThemeValue label={label} themeKey={themeKey} key={themeKey} />
            ))}
        </div>
    );
}

const changeableThemeValues: Array<{ label: string; themeKey: keyof ThemeS5; }> = [
    {
        label: "Background",
        themeKey: "background",
    },
    {
        label: "Foreground",
        themeKey: "foreground",
    },
    {
        label: "Card",
        themeKey: "card",
    },
    {
        label: "Card Foreground",
        themeKey: "cardForeground",
    },
    {
        label: "Popover",
        themeKey: "popover",
    },
    {
        label: "Popover Foreground",
        themeKey: "popoverForeground",
    },
    {
        label: "Primary",
        themeKey: "primary",
    },
    {
        label: "Primary Foreground",
        themeKey: "primaryForeground",
    },
    {
        label: "Secondary",
        themeKey: "secondary",
    },
    {
        label: "Secondary Foreground",
        themeKey: "secondaryForeground",
    },
    {
        label: "Muted",
        themeKey: "muted",
    },
    {
        label: "Muted Foreground",
        themeKey: "mutedForeground",
    },
    {
        label: "Accent",
        themeKey: "accent",
    },
    {
        label: "Accent Foreground",
        themeKey: "accentForeground",
    },
    {
        label: "Destructive",
        themeKey: "destructive",
    },
    {
        label: "Destructive Foreground",
        themeKey: "destructiveForeground",
    },
    {
        label: "Border",
        themeKey: "border",
    },
    {
        label: "Input",
        themeKey: "input",
    },
    {
        label: "Ring",
        themeKey: "ring",
    },
];
