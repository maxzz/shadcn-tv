import { type Hsl, type ThemeS5 } from "./types-theme-zod";
import { hslToVariableValue } from "./utils-hsl2cssvar";
import { fromEntries, invert, mapKeys, mapValues } from "remeda";

const themeS5variables: Record<keyof ThemeS5, string> = {
    background: "background",
    foreground: "foreground",
    muted: "muted",
    mutedForeground: "muted-foreground",
    popover: "popover",
    popoverForeground: "popover-foreground",
    card: "card",
    cardForeground: "card-foreground",
    border: "border",
    input: "input",
    primary: "primary",
    primaryForeground: "primary-foreground",
    secondary: "secondary",
    secondaryForeground: "secondary-foreground",
    accent: "accent",
    accentForeground: "accent-foreground",
    destructive: "destructive",
    destructiveForeground: "destructive-foreground",
    ring: "ring",
};

export const themeToStyles = (theme: ThemeS5) => {
    const withKeys = mapKeys(theme, (key) => {
        const variable = themeS5variables[key];
        return `--${variable}`;
    });

    const values = mapValues(withKeys, (value) => {
        return hslToVariableValue(value);
    });

    return values;
};

export const cssToTheme = (styles: string) => {
    const lines = styles.split(/\r?\n/);

    const invertedVariables = invert(themeS5variables);

    const lightThemeEntries: Array<[keyof ThemeS5, Hsl]> = [];
    const darkThemeEntries: Array<[keyof ThemeS5, Hsl]> = [];

    let errors = 0;

    let isDark = false;

    for (const line of lines) {
        if (line.includes('.dark')) {
            isDark = true;
        }

        if (line.includes('}')) {
            isDark = false;
        }

        const trimmed = line.trim();

        if (trimmed.startsWith('--')) {
            const [variable, value] = trimmed.split(':');
            if (!variable) {
                errors++;
                continue;
            }

            const themeKey = invertedVariables[variable.replace('--', '')];
            if (!themeKey) {
                continue;
            }
            if (!value) {
                errors++;
                continue;
            }

            const hsl = value.trim().replace(';', '').replaceAll('%', '').split(' ');
            if (hsl.length !== 3) {
                errors++;
                continue;
            }

            const [h, s, l] = hsl;
            if (!h || !s || !l) {
                errors++;
                continue;
            }

            const hAsNumber = Number(h);
            const sAsNumber = Number(s);
            const lAsNumber = Number(l);

            if (isNaN(hAsNumber) || isNaN(sAsNumber) || isNaN(lAsNumber)) {
                errors++;
                continue;
            }

            const hslColor: Hsl = {
                h: hAsNumber,
                s: sAsNumber,
                l: lAsNumber,
            };

            if (isDark) {
                darkThemeEntries.push([themeKey, hslColor]);
                continue;
            }

            lightThemeEntries.push([themeKey, hslColor]);
        }
    }

    return {
        light: fromEntries(lightThemeEntries),
        dark: fromEntries(darkThemeEntries),
        errors,
    };
};
