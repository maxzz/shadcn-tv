import { useCallback, useEffect } from "react";
import { useSetThemeConfigAtom } from "../lib/atoms-theme";
import { cssToTheme } from "../lib/utils-theme2styles";
import { toast } from "sonner";
import { isMac } from "../lib/utils-is-mac";

export function ButtonPasteTheme() {
    const setThemeConfig = useSetThemeConfigAtom();

    const handlePaste = useCallback(
        (text: string) => {
            const newTheme = cssToTheme(text);

            setThemeConfig((prev) => ({
                dark: { ...prev.dark, ...newTheme.dark, },
                light: { ...prev.light, ...newTheme.light, },
            }));

            if (newTheme.errors > 0) {
                toast.warning("Some values were invalid and were not pasted.");
            } else {
                toast.success("Theme pasted successfully! 🎉");
            }
        }, [setThemeConfig]
    );

    useEffect(
        () => {
            function handler(e: ClipboardEvent) {
                const pastedData = e?.clipboardData?.getData("text");
                pastedData && handlePaste(pastedData);
            }

            window.addEventListener("paste", handler);

            return () => {
                window.removeEventListener("paste", handler);
            };
        }, [handlePaste]
    );

    return (
        <div className="flex flex-col items-center border border-dotted px-2 py-4 text-center">
            <p className="text-sm">Paste existing theme</p>
            <p className="mx-auto flex rounded-pill font-mono text-sm text-muted-foreground">
                {isMac() ? "⌘" : "Ctrl"} + V
            </p>
        </div>
    );
}
