import css from './sliders.module.css';
import { Card } from './0-1-card';
import { DemoA } from './1-demo-a';
import { DemoB } from './2-demo-b';
import { DemoC } from './3-demo-c';
import { DemoD } from './4-demo-d';
import { DemoE } from './5-demo-e';
import { DemoF } from './6-demo-f';
import { classNames } from '@/utils';

export function SlidersDemo() {
    return (
        <div className={classNames(css["sliders-demo"], "w-full flex justify-center flex-wrap")}>
            <Card title="Volume">
                <DemoA />
            </Card>
            <Card title="Range">
                <DemoB />
            </Card>
            <DemoC />
            <DemoD />
            <DemoE />
            <DemoF />
        </div>
    );
}