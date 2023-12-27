import { FontInputTitleBar } from './1-top-row';
import { DialogDemoWoTrigger } from '../ui/shadcn/demo/demo-dialog-wo-trigger';
import { Showcases } from './9-showcases';
import { showcases } from './9-showcases/cases';
import { Button, ScrollArea } from '@/components/ui/shadcn';
import { DemoTreeOptimized } from '../ui/shadcn/demo/demo-tree';

function FontInput() {
    return (
        <div className="">
            <FontInputTitleBar />
        </div>
    );
}

function ConvertForm() {
    return (
        <div className="flex flex-col space-y-4">
            <div className="border-muted border-b">
                <FontInput />
            </div>

            <div className="flex items-center gap-2">
                <Button variant={'outline'}>OK</Button>
                <DialogDemoWoTrigger />
            </div>

            <div className="">
                <Showcases cases={showcases} />
            </div>
        </div>
    );
}

export function Section2_Main() {
    return (<>
        {/* <div className="m-4 _overflow-hidden">
            <DemoTreeOptimized />
        </div> */}

        <ScrollArea className="p-4">
            <ConvertForm />
        </ScrollArea>
    </>);
}
