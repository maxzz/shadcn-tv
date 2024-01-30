import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { classNames } from "@/utils";
import { hslaToHsva, hsvaToHex, type ColorResult, type HslColor, HslaColor } from "@uiw/react-color";
import ChromeColorPicker, { ChromeInputType } from "@uiw/react-color-chrome";
import { HTMLAttributes } from "react";

// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/color-picker.tsx

export const contentClasses = "mx-1 p-0 w-auto rounded-md overflow-hidden ring-muted-foreground ring-1 ring-offset-1 ring-offset-background isolate z-50";
export const fixArrowClasses = "![--github-border:none] [&>div]:[--github-background-color:green] [&>div]:[--github-arrow-border-color:red]";
export const fixPointeClasses = "[&_.w-color-saturation-fill]:!size-4 [&_.w-color-saturation-fill]:!-translate-x-2 [&_.w-color-saturation-fill]:!-translate-y-2";

type SolidColorPickerProps =
    & Omit<HTMLAttributes<HTMLButtonElement>, "color">
    & {
        color: HslaColor;
        onColorChange: (color: ColorResult) => void;
    };

export function SolidColorPicker({ className, color, onColorChange, ...rest }: SolidColorPickerProps) {
    const hsva = hslaToHsva(color);
    return (
        <Popover>

            <PopoverTrigger asChild>
                <button className={classNames("size-12 flex-shrink-0 rounded border", className)} style={{ backgroundColor: hsvaToHex(hsva), }} {...rest} />
            </PopoverTrigger>

            <PopoverContent className={contentClasses}>
                <ChromeColorPicker
                    color={hsva}
                    onChange={onColorChange}
                    inputType={ChromeInputType.HEXA}
                    className={`${fixArrowClasses} ${fixPointeClasses}`}
                />
            </PopoverContent>

        </Popover>
    );
}
