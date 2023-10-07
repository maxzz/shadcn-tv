import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconLight({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-[1.5] stroke-current", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
    );
}

export function IconDark({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-[1.5] stroke-current", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}

export function IconSystem({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-[1.5] stroke-current", className)} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.9 4.9 1.4 1.4" />
            <path d="m17.7 17.7 1.4 1.4" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.3 17.7-1.4 1.4" />
            <path d="m19.1 4.9-1.4 1.4" />
        </svg>
    );
}
