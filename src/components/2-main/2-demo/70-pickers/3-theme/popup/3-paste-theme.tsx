import { useCallback, useEffect } from "react";
import { useSetThemeConfigAtom } from "../lib/use-theme-atoms";
import { cssToTheme } from "../lib/utils-theme2styles";
import { toast } from "sonner";
import { isMac } from "../lib/utils-is-mac";

export function PasteTheme() {
    const setThemeConfig = useSetThemeConfigAtom();

    const handlePaste = useCallback(
        (text: string) => {
            const theme = cssToTheme(text);

            setThemeConfig((prev) => ({
                dark: { ...prev.dark, ...theme.dark, },
                light: { ...prev.light, ...theme.light, },
            }));

            if (theme.errors > 0) {
                toast.warning("Some values were invalid and were not pasted.");
            } else {
                toast.success("Theme pasted successfully! 🎉");
            }
        },
        [setThemeConfig]
    );

    useEffect(() => {
        const handler = (e: ClipboardEvent) => {
            const pastedData = e?.clipboardData?.getData("text");
            if (!pastedData) {
                return;
            }
            handlePaste(pastedData);
        };

        window.addEventListener("paste", handler);

        return () => {
            window.removeEventListener("paste", handler);
        };
    }, [handlePaste]);

    return (
        <div className="flex flex-col items-center border border-dotted px-2 py-4 text-center">
            <p className="text-sm">Paste existing theme</p>
            <p className="mx-auto flex rounded-pill font-mono text-sm text-muted-foreground">
                {isMac() ? "⌘" : "Ctrl"} + V
            </p>
        </div>
    );
}
