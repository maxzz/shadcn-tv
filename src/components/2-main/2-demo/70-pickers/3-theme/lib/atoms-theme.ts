import { atom, useAtomValue, useSetAtom } from "jotai";
import { type ThemeS52Config } from "./types-theme-zod";
import { createThemeConfig } from "./utils-create-theme";
//import { useTheme } from "next-themes"; // https://github.com/pacocoursey/next-themes/blob/main/packages/next-themes/src/index.tsx
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";

// const useResolvedThemeName = () => {
//     const theme = useTheme();
//     return theme.resolvedTheme as "light" | "dark" | undefined;
// };

export function useTheme() {
    const { theme: snapTheme } = useSnapshot(appSettings);
    return snapTheme;
}

const useResolvedThemeName = () => {
    const snapTheme = useTheme();
    return snapTheme as "light" | "dark" | undefined;
};

export const themeConfigAtom = atom<ThemeS52Config>(createThemeConfig());

// function useThemeConfigAtom(): ThemeS52Config {
//     return useAtomValue(themeConfigAtom);
// }

export function useSetThemeConfigAtom() {
    return useSetAtom(themeConfigAtom);
}

export function useActiveTheme() {
    const appTheme = useResolvedThemeName();
    const config = useAtomValue(themeConfigAtom);

    if (!appTheme) {
        return null;
    }

    return config[appTheme];
}
