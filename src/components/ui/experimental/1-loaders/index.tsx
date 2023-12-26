import { HTMLAttributes } from 'react';
import { LoaderDotsRing, LoaderP11, LoaderP12, LoaderP13 } from '@/components/ui/loaders';
import { classNames } from '@/utils';

export function LoadersTest({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("flex items-center gap-2", className)} {...rest}>
            <LoaderP11 className="w-6 h-6 [--hue1:53] [--hue2:253]" />
            <LoaderP12 className="w-6 h-6 [--hue2:253]" />
            <LoaderP13 className="w-6 h-6 [--hue2:153]" />
            <LoaderDotsRing />
        </div>
    );
}
