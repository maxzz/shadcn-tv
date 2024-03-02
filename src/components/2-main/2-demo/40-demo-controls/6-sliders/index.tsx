import css from './sliders.module.css';
import { DemoA } from './DemoA';
import { DemoB } from './DemoB';
import { DemoC } from './DemoC';
import { DemoD } from './DemoD';
import { DemoE } from './DemoE';
import { DemoF } from './DemoF';

// https://codepen.io/Prakash286/pen/wvQozeV 'React Range Sliders'

export function SlidersDemo() {
    return (
        <div className={css["sliders-demo"]}>
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center">
                <DemoA />
                <DemoB />
                <DemoC />
            </div>
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center">
                <DemoD />
                <DemoE />
                <DemoF />
            </div>
        </div>
    );
}
