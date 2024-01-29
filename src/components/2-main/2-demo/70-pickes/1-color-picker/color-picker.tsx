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

            <PopoverContent className="p-0 w-auto rounded-lg overflow-hidden isolate z-50">
                <ChromeColorPicker
                className="[&>div]:[--github-background-color:transparent] [&>div]:[--github-arrow-border-color:transparent]"
                    color={hsva}
                    onChange={onColorChange}
                    inputType={ChromeInputType.HEXA}
                />
            </PopoverContent>

        </Popover>
    );
}
