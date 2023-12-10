import { LoaderP11, LoaderP12, LoaderP13 } from '@/components/ui/loaders';

export function LoadersTest() {
    return (
        <div className="flex items-center gap-2">
            <LoaderP11 />
            <LoaderP12 />
            <LoaderP13 />
        </div>
    );
}
