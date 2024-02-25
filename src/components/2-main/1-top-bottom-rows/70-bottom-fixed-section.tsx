import { DemoTreeWithOptions } from '../2-demo/20-demo-tree';
import { sectionBackgroundClasses } from './02-general/10-convert-form';

export function ButtomFixedSection() {
    return (
        <div className={`px-4 py-2 ${sectionBackgroundClasses}`}>
            <div className="mb-1">
                Fixed height non-scrollable area
            </div>

            <div className="h-[160px] overflow-hidden">
                <DemoTreeWithOptions />
            </div>
        </div>
    );
}
