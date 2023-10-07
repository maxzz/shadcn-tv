import { FontInputTitleBar } from './top-title-menu';
import { Button } from '@/components/ui/shadcn';
import { DialogDemo } from './font-svg-view';

function FontInput() {
    return (
        <div className="">
            <FontInputTitleBar />
        </div>
    );
}

function ConvertForm() {
    return (
        <div className="flex flex-col space-y-2">
            <FontInput />

            <Button variant={'outline'}>OK</Button>

            <DialogDemo />
        </div>
    );
}

export function Main() {
    return (
        <div className="p-4">
            <ConvertForm />
        </div>
    );
}
