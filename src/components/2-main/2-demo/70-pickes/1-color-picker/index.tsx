import { useState } from "react";
import { SolidColorPicker } from "./color-picker";
import { color, type HslaColor } from "@uiw/react-color";

export function SolidColorPickerDemo() {
    const [color2, setColor2] = useState<HslaColor>(color("#217EFF").hsla);
    const [color3, setColor3] = useState<HslaColor>(color("#FFA121").hsla);
    return (
        <div>
            <div className="flex flex-col gap-2">
                <SolidColorPicker color={color2} onColorChange={(color2) => {
                    setColor2(color2.hsla);
                }} />
                <SolidColorPicker color={color3} onColorChange={(color3) => {
                    setColor3(color3.hsla);
                }} />
            </div>
        </div>
    );
}
