import { DemoTreeWithOptions } from '../../2-demo/20-demo-tree';
import { sectionBackgroundClasses } from '../../2-demo/52-demo-toasts/6-dialog';

export function ButtomFixedSection() {
    return (
        <div className={`px-4 py-2 ${sectionBackgroundClasses}`}>
            <div className="mb-1 px-1 text-sm">
                Tree inside fixed height, non-scrollable area
            </div>

            <div className="h-[160px] overflow-hidden">
                <DemoTreeWithOptions />
            </div>
        </div>
    );
}
