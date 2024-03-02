import { HTMLAttributes } from 'react';
import { LoaderP11 } from './p-loader1';
import { LoaderP12 } from './p-loader2';
import { LoaderP13 } from './p-loader3';
import { classNames } from '@/utils';
import { FourSquares } from '../1-squares';
import { GooBars } from '../4-goo-bars';

export function LoadersTest({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("flex items-center gap-2", className)} {...rest}>
            <LoaderP11 className="w-6 h-6 [--hue1:53] [--hue2:253]" />
            <LoaderP12 className="w-6 h-6 [--hue2:253]" />
            <LoaderP13 className="w-6 h-6 [--hue2:153]" />
            <FourSquares />
            <GooBars />
        </div>
    );
}
