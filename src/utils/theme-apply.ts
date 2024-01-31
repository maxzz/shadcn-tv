export type ThemeMode = "dark" | "light" | "system";

export function themeApplyMode(themeMode: ThemeMode): void {

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (themeMode === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
        return;
    }

    root.classList.add(themeMode);
}
