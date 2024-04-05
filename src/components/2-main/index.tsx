import { ScrollArea } from '@/components/ui/shadcn';
import { ButtomFixedSection, QuickAccessArea } from './1-top-bottom-rows';
import { ShowcasesView, showcasesData } from './9-showcases';

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
