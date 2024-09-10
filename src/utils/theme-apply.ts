export type ThemeMode = "dark" | "light" | "system";

export function themeApplyMode(themeMode: ThemeMode): void {

    const root = window.document.documentElement;

    const newMode =
        themeMode === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : ""
            : themeMode === "dark"
                ? "dark"
                : "";

    root.classList[!!newMode ? "add" : "remove"]("dark");

    // root.classList.remove("light", "dark");

    // if (themeMode === "system") {
    //     const isDarkNow = window.matchMedia("(prefers-color-scheme: dark)").matches;
    //     const systemTheme = isDarkNow ? "dark" : "light";
    //     root.classList.add(systemTheme);
    //     return;
    // }
    // root.classList.add(themeMode);
}

export function isDarkTheme(): boolean {
    const root = window.document.documentElement;
    return root.classList.contains("dark");
}

// export function setAppDarkMode(setDark: boolean) {
//     document.getElementsByTagName('body')[0].classList[setDark ? 'add' : 'remove']('dark');
// }
