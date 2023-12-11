import { LoaderP11, LoaderP12, LoaderP13 } from '@/components/ui/loaders';

export function LoadersTest() {
    return (
        <div className="flex items-center gap-2">
            <LoaderP11 className="w-6 h-6 [--hue1:53]" />
            <LoaderP12 className="w-6 h-6" />
            <LoaderP13 className="w-6 h-6" />
        </div>
    );
}
