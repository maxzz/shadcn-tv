import { createContext, useContext, useEffect, useState } from "react";
import { ThemeMode, themeApplyMode } from "@/utils/theme-apply";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: ThemeMode;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "webfont-tools-ui-theme", ...props }: ThemeProviderProps) {

    const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem(storageKey) as ThemeMode) || defaultTheme);

    useEffect(() => themeApplyMode(theme), [theme]);

    const value = {
        theme,
        setTheme: (theme: ThemeMode) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};
