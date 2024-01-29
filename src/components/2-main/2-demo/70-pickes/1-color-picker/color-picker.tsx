import { PopoverContent } from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { hslaToHsva, hsvaToHex, type ColorResult, type HslColor } from "@uiw/react-color";
import ChromeColorPicker from "@uiw/react-color-chrome";

// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/color-picker.tsx

export function SolidColorPicker({ color, onColorChange }: { color: HslColor; onColorChange: (color: ColorResult) => void; }) {
    const hsva = hslaToHsva({ ...color, a: 1, });
    return (
        <Popover>

            <PopoverTrigger asChild>
                <button className="size-6 flex-shrink-0 rounded border" style={{ backgroundColor: hsvaToHex(hsva), }} />
            </PopoverTrigger>

            <PopoverContent className="isolate z-50">
                <ChromeColorPicker color={hsva} onChange={onColorChange} />
            </PopoverContent>

        </Popover>
    );
}
