import { useState } from "react";
import { SolidColorPicker } from "./1-color-picker";
import { color, type HslaColor } from "@uiw/react-color";

export function SolidColorPickerDemo() {
    const [color2, setColor2] = useState<HslaColor>(color("#2719D5").hsla);
    const [color3, setColor3] = useState<HslaColor>(color("#FFA121").hsla);
    return (
        <div>
            <div className="pb-4 flex flex-col gap-1">

                <SolidColorPicker
                    color={color2}
                    onColorChange={(color2) => {
                        setColor2(color2.hsla);
                    }}
                />

                <SolidColorPicker
                    color={color3}
                    onColorChange={(color3) => {
                        setColor3(color3.hsla);
                    }}
                />
                
            </div>
        </div>
    );
}
