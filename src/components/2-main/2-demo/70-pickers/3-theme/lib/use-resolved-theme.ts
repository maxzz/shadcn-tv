import { useTheme } from "next-themes"; // https://github.com/pacocoursey/next-themes/blob/main/packages/next-themes/src/index.tsx

export const useResolvedTheme = () => {
    const theme = useTheme();
    return theme.resolvedTheme as "light" | "dark" | undefined;
};
