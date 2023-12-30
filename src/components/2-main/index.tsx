import { FontInputTitleBar } from './1-top-row';
import { DialogDemoWoTrigger } from './2-demo/demo-dialog-wo-trigger';
import { Showcases, showcasesData } from './9-showcases';
import { Button, ScrollArea } from '@/components/ui/shadcn';
import { DemoTreeOptimized } from './2-demo/demo-tree';

function FontInput() {
    return (
        <div className="">
            <FontInputTitleBar />
        </div>
    );
}

function ConvertForm() {
    return (
        <div className="mx-4 flex flex-col space-y-4">
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

export function Section2_Main() {
    return (
        <div className="min-h-0 grid grid-rows-[1fr,auto,auto]">
            <ConvertForm />
            <ScrollArea className="flex-1 p-4 min-w-0 overflow-hidden" data-fixed-width>
                <Showcases cases={showcasesData} />
            </ScrollArea>

            <div className="mx-4">Non-scrollable area</div>
            <div className="mx-4 mb-12 h-[160px] overflow-hidden">
                <DemoTreeOptimized />
            </div>
        </div>
    );
}
