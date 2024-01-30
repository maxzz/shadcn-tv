import { atom, useAtomValue, useSetAtom } from "jotai";
import { type ThemeS52Config } from "./types-theme-zod";
import { createThemeConfig } from "./utils-create-theme";
import { useTheme } from "next-themes"; // https://github.com/pacocoursey/next-themes/blob/main/packages/next-themes/src/index.tsx

export const useResolvedTheme = () => {
    const theme = useTheme();
    return theme.resolvedTheme as "light" | "dark" | undefined;
};

export const themeConfigAtom = atom<ThemeS52Config>(createThemeConfig());

export function useThemeConfig(): ThemeS52Config {
    return useAtomValue(themeConfigAtom);
}

export function useSetThemeConfig() {
    return useSetAtom(themeConfigAtom);
}

export function useActiveTheme() {
    const appTheme = useResolvedTheme();
    const config = useThemeConfig();

    if (!appTheme) {
        return null;
    }

    return config[appTheme];
}
