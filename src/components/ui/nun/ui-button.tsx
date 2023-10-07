import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { classNames } from '@/utils';
import { inputFocusClasses } from '../shared-styles';

export const Button = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
    ({ children, className, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                className={classNames('bg-primary border-primary-foreground border rounded select-none', inputFocusClasses, className)}
                {...rest}
            >
                {children}
            </button>
        );
    }
);

// export function Button({ children, className, ...rest }: { children: ReactNode; } & HTMLAttributes<HTMLButtonElement>) {
//     return (
//         <button
//             className={classNames('bg-primary-200 border-primary-400 border rounded', inputFocusClasses, className)}
//             {...rest}
//         >
//             {children}
//         </button>
//     );
// }
