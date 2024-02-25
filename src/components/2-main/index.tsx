import { ShowcasesView, showcasesData } from './9-showcases';
import { ScrollArea } from '@/components/ui/shadcn';
import { ButtomFixedSection, ConvertForm } from './1-top-bottom-rows';

export function Section2_Main() {
    return (
        <div className="min-h-0 grid grid-rows-[auto,1fr,auto]">
            <ConvertForm />

            <ScrollArea className="flex-1 p-4 min-w-0 overflow-hidden" data-fixed-width>
                <ShowcasesView cases={showcasesData} />
            </ScrollArea>

            <ButtomFixedSection />
        </div>
    );
}
