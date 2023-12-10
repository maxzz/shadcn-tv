import { HTMLAttributes, SVGAttributes } from 'react';

export function ChevronDownIcon({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 15 15" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"/>
        </svg>
    );
}
//node_modules/.pnpm/@radix-ui+react-icons@1.3.0_react@18.2.0/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js::ChevronDownIcon
