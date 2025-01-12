import { Card } from './0-1-card';
import { DemoA } from './1-demo-a';
import { DemoB } from './2-demo-b';
import { DemoC } from './3-demo-c';
import { DemoD } from './4-demo-d';
import { DemoE } from './5-demo-e';
import { DemoF } from './6-demo-f';
import { classNames } from '@/utils';
import css from './sliders.module.css';

export function SlidersDemo() {
    return (
        <div className={classNames(css["sliders-demo"], "w-full flex justify-center flex-wrap")}>
            <Card title="A: Volume">
                <DemoA />
            </Card>
            <Card title="B: Range">
                <DemoB />
            </Card>
            <Card title="C: Price">
                <DemoC />
            </Card>
            <Card title="D: Volume">
                <DemoD />
            </Card>
            <Card title="E: Precentage">
                <DemoE />
            </Card>
            <Card title="F: Gauge">
                <DemoF />
            </Card>
        </div>
    );
}
