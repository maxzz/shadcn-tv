export const sectionBackgroundClasses = 'bg-muted/30 border-muted-foreground/30 border-t border-b';

export function QuickAccessArea() {
    return (
        <div className={`p-0.5 flex flex-col space-y-4 ${sectionBackgroundClasses}`}>
            <div className="flex items-center gap-2">
            </div>
        </div>
    );
}
