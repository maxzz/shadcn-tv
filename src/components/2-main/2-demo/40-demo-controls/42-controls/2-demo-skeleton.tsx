import { Skeleton } from "@/components/ui/shadcn/skeleton";

export function SkeletonDemo() {
    return (
        <div className="my-4 px-4 py-6 max-w-80 bg-muted/50 rounded-md flex items-center space-x-4">
            <Skeleton className="flex-none size-14 rounded-full" />

            <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}
