import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { hslaToHsva, hsvaToHex, type ColorResult, type HslColor } from "@uiw/react-color";
import ChromeColorPicker, { ChromeInputType } from "@uiw/react-color-chrome";

// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/color-picker.tsx

export function SolidColorPicker({ color, onColorChange }: { color: HslColor; onColorChange: (color: ColorResult) => void; }) {
    const hsva = hslaToHsva({ ...color, a: 1, });
    return (
        <Popover>

            <PopoverTrigger asChild>
                <button className="size-12 flex-shrink-0 rounded border" style={{ backgroundColor: hsvaToHex(hsva), }} />
            </PopoverTrigger>

            <PopoverContent className="mx-1 p-0 w-auto rounded-md overflow-hidden ring-muted-foreground ring-1 ring-offset-1 ring-offset-background isolate z-50">
                <ChromeColorPicker
                    className="![--github-border:none] [&>div]:[--github-background-color:green] [&>div]:[--github-arrow-border-color:red]
                    [&_.w-color-saturation-fill]:!size-4 [&_.w-color-saturation-fill]:!-translate-x-2 [&_.w-color-saturation-fill]:!-translate-y-2
                    "
                    color={hsva}
                    onChange={onColorChange}
                    inputType={ChromeInputType.HEXA}
                />
            </PopoverContent>

        </Popover>
    );
}
