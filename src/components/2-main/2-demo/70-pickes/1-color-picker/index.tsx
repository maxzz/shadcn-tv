import { useState } from "react";
import { SolidColorPicker } from "./color-picker";
import { color, type HslaColor } from "@uiw/react-color";

export function SolidColorPickerDemo() {
    const [color2, setColor2] = useState<HslaColor>(color("#ff0000").hsla);
    return (
        <div>
            SolidColorPicker
            <br />
            <SolidColorPicker color={color2} onColorChange={(color2) => {
                setColor2(color2.hsla);
            }} />
        </div>
    );
}
