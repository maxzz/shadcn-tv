import { FontInputTitleBar } from './1-top-row';
import { Button } from '@/components/ui/shadcn';
import { DialogDemo } from './2-dialog-demo';
import { LoadersTest } from './3-loaders';
import { NeonSwitch } from '../ui/experimental';
import { TableDemo } from '../ui/shadcn/demo/demo-table';
import { Showcases } from './4-showcases';
import { DataTableDemo } from '../ui/shadcn/demo/demo-data-table';

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
                <Showcases cases={[
                    { id: '1', name: "Table", component: <TableDemo className="m-auto max-w-xs" /> },
                    { id: '2', name: "Loaders", component: <LoadersTest className="m-auto max-w-sm flex items-center justify-between" /> },
                    { id: '3', name: "Neon switch", component: <NeonSwitch /> },
                    { id: '4', name: "Data table", component: <DataTableDemo /> },
                ]} />
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
