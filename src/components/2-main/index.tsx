import { FontInputTitleBar } from './1-top-row';
import { DialogDemoWoTrigger } from './2-demo/demo-dialog-wo-trigger';
import { ShowcasesView, initialCase, showcasesData } from './9-showcases';
import { Button, ScrollArea } from '@/components/ui/shadcn';
import { DemoTreeWithOptions } from './2-demo/4-demo-tree';

function FontInput() {
    return (
        <div className="">
            <FontInputTitleBar />
        </div>
    );
}

const sectionBackgroundClasses = 'bg-muted/30 border-muted-foreground/30 border-t border-b';

function ConvertForm() {
    return (
        <div className={`p-4 flex flex-col space-y-4 ${sectionBackgroundClasses}`}>
            <div className="border-muted border-b">
                <FontInput />
            </div>

            <div className="flex items-center gap-2">
                <Button variant={'outline'}>
                    OK
                </Button>
                <DialogDemoWoTrigger />
            </div>
        </div>
    );
}

function ButtomFixedSection() {
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

export function Section2_Main() {
    return (
        <div className="min-h-0 grid grid-rows-[auto,1fr,auto]">
            <ConvertForm />

            <ScrollArea className="flex-1 p-4 min-w-0 overflow-hidden" data-fixed-width>
                <ShowcasesView cases={showcasesData} initialCase={initialCase} />
            </ScrollArea>

            <ButtomFixedSection />
        </div>
    );
}
