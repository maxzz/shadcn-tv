import { HTMLAttributes, SVGAttributes } from 'react';

export function IconMenuHamburger({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 21 21" strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={1.2} {...rest}>
            {title && <title>{title}</title>}
            <path d="M4.5 6.5h12"></path>
            <path d="M4.498 10.5h11.997"></path>
            <path d="M4.5 14.5h11.995"></path>
        </svg>
    );
}
