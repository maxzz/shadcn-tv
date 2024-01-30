import { z } from "zod";

const HslSchema = z.object({
    h: z.number(),
    s: z.number(),
    l: z.number(),
});

export type Hsl = z.infer<typeof HslSchema>;

export const ThemeS5Schema = z.object({
    background: HslSchema,
    foreground: HslSchema,
    card: HslSchema,
    cardForeground: HslSchema,
    popover: HslSchema,
    popoverForeground: HslSchema,
    primary: HslSchema,
    primaryForeground: HslSchema,
    secondary: HslSchema,
    secondaryForeground: HslSchema,
    muted: HslSchema,
    mutedForeground: HslSchema,
    accent: HslSchema,
    accentForeground: HslSchema,
    destructive: HslSchema,
    destructiveForeground: HslSchema,
    border: HslSchema,
    input: HslSchema,
    ring: HslSchema,
});

export type ThemeS5 = z.infer<typeof ThemeS5Schema>;

export const ThemeS52ConfigSchema = z.object({
    light: ThemeS5Schema,
    dark: ThemeS5Schema,
});

export type ThemeS52Config = z.infer<typeof ThemeS52ConfigSchema>;
