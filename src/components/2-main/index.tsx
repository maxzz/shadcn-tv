import { FontInputTitleBar } from './1-top-row';
import { Button } from '@/components/ui/shadcn';
import { DialogDemo } from './2-dialog-demo';
import { LoadersTest } from './3-loaders';
import { NeonSwitch } from '../ui/experimental';
import { TableDemo } from '../ui/shadcn/demo/demo-table';
import { DifferentCases } from './4-different-cases';

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

                {/* <LoadersTest />
                <NeonSwitch /> */}
            </div>

            <div className="">
                {/* <TableDemo /> */}
                <DifferentCases />
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
