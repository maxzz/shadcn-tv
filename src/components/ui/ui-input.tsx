import { InputHTMLAttributes } from 'react';
import { useSnapshot } from 'valtio';
import { classNames } from '@/utils';
import { inputClasses, inputFocusClasses } from '../ui/shared-styles';
import { TextValueKeys } from '@/store/types';

export function Input<TStore extends object>({ store, name, label, className, ...rest }: {
    store: TStore;
    name: TextValueKeys<TStore>;
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>
) {
    const snap = useSnapshot(store as any, { sync: true });
    return (
        <div className="">
            {label && (
                <div className="">
                    {label}
                </div>
            )}

            <input
                className={classNames(inputClasses, inputFocusClasses, className)}
                value={snap[name]}
                onChange={(e) => { (store as any)[name] = e.target.value; }}
                {...rest}
            />
        </div>
    );
}
