import { type Hsl } from "../types-theme-config";

export function hslToVariableValue(hsl: Hsl) {
    return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
}

export function hslToCssValue(hsl: Hsl) {
    return `hsl(${hslToVariableValue(hsl)})`;
}