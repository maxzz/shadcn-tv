import { DialogDemoWoTrigger } from './20-dialog-wo-trigger';

export const sectionBackgroundClasses = 'bg-muted/30 border-muted-foreground/30 border-t border-b';

export function ConvertForm() {
    return (
        <div className={`p-4 flex flex-col space-y-4 ${sectionBackgroundClasses}`}>
            <div className="flex items-center gap-2">
                <DialogDemoWoTrigger />
            </div>
        </div>
    );
}
