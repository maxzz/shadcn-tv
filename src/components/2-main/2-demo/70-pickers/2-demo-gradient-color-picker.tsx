import { useState } from 'react';
import { GradientPicker } from '../../../ui/shadcn/gradient-color-picker/color-picker'; //https://gradientpicker.vercel.app

// const initialColor = 'linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)';
// const initialColor = 'linear-gradient(to bottom right,#00c6ff,#0072ff)';
const initialColor = 'linear-gradient(to right, #283048,#859398 )'; // https://gradient.page/css/ui-gradients/titanium

export function GradientColorPickerDemo() {
    const [background, setBackground] = useState(initialColor);
    return (
        <div className="preview flex items-center justify-center rounded !bg-cover !bg-center p-10 transition-all" style={{ background }}>
            <GradientPicker background={background} setBackground={setBackground} />
        </div>
    );
}
