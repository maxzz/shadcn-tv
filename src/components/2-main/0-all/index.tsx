import { ScrollArea } from '@/components/ui/shadcn';
import { ShowcasesView, showcasesData } from '../9-showcases';
import { QuickAccessArea } from './1-top-quick-access-area';
import { ButtomFixedSection } from './2-bottom-fixed-section';

export function Section2_Main() {
    return (
        <div className="min-h-0 grid grid-rows-[auto,1fr,auto]">
            <QuickAccessArea />

            <ScrollArea className="flex-1 p-4 min-w-0 overflow-hidden" fixedWidth>
                <ShowcasesView cases={showcasesData} />
            </ScrollArea>

            <ButtomFixedSection />
        </div>
    );
}
