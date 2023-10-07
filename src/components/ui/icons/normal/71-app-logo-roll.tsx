import { HTMLAttributes, SVGAttributes } from 'react';

export function IconAppLogo({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 422 422" strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={1.2} {...rest}>
            {title && <title>{title}</title>}
            <path d="M364.35 116.86h-32.97v-27a8 8 0 0 0-8-8h-22V8a8 8 0 0 0-8-8h-215a8 8 0 0 0-8 8v73.86h-22a8 8 0 0 0-8 8v27h-13.3a8 8 0 0 0 0 16h13.3v27a8 8 0 0 0 8 8h22V293a8 8 0 0 0 8 8h44.5v13a8 8 0 0 0 8 8h17v92a8 8 0 0 0 8 8h60a8 8 0 0 0 8-8v-92h17a8 8 0 0 0 8-8v-13h44.5a8 8 0 0 0 8-8v-64.05l69.28-11.48a38.45 38.45 0 0 0 32.26-38.06v-23.98a38.62 38.62 0 0 0-38.57-38.57zM86.38 16h199v65.86h-199V16zm121.5 390h-44v-84h44v84zm25-100h-94v-24h94v24zm52.5-21h-36.5v-11a8 8 0 0 0-8-8h-47v-.08a22.5 22.5 0 0 1 18.88-22.27l72.62-12.04V285zm0-69.61-75.23 12.48a38.45 38.45 0 0 0-32.27 38.05v.08h-47a8 8 0 0 0-8 8v11h-36.5V167.86h27.7v69.64a8 8 0 0 0 16 0v-69.64h39V201a8 8 0 0 0 16 0v-33.14h100.3v47.53zm-229-63.53v-54h259v54h-259zm330.54 27.55a22.5 22.5 0 0 1-18.88 22.27l-66.66 11.06v-44.88h22a8 8 0 0 0 8-8v-27h32.97a22.6 22.6 0 0 1 22.57 22.57v23.98z"/>
        </svg>
    );
}
