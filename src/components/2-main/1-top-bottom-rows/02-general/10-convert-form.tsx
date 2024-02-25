import { FontInputTitleBar } from '..';
import { DialogDemoWoTrigger } from './20-dialog-wo-trigger';
import { Button } from '@/components/ui/shadcn';

function FontInput() {
    return (
        <div className="">
            <FontInputTitleBar />
        </div>
    );
}

export const sectionBackgroundClasses = 'bg-muted/30 border-muted-foreground/30 border-t border-b';
export function ConvertForm() {
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
