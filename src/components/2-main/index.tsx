import { FontInputTitleBar } from './1-top-row';
import { DialogDemo } from './2-dialog-demo';
import { Showcases } from './4-showcases';
import { showcases } from './4-showcases/cases';
import { Button } from '@/components/ui/shadcn';

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
                <DialogDemo />
            </div>

            <div className="">
                <Showcases cases={showcases} />
            </div>
        </div>
    );
}

export function Section2_Main() {
    return (
        <div className="p-4">
            <ConvertForm />
        </div>
    );
}
