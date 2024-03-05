import { HTMLAttributes } from "react"; // https://heroicons.com/outline/chevron-left
import { classNames } from "@/utils";

export function IconChevronLeft({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    );
}
