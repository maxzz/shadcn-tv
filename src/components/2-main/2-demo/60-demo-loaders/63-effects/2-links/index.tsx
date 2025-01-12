import { HTMLAttributes } from "react"; //https://mon.gov.ua
import { classNames } from "@/utils";

const linkClasses = "\
relative inline-block px-1 py-4 \
\
1bg-red-500 \
cursor-pointer \
\
before:absolute \
before:w-0 \
before:h-0.5 \
before:bottom-3 \
before:right-1/2 \
\
before:bg-orange-300 \
before:[transition:0.2s_width_cubic-bezier(0.455,0.03,0.515,0.955)] \
\
before:hover:w-[47%] \
\
after:absolute \
after:w-0 \
after:h-0.5 \
after:bottom-3 \
after:left-1/2 \
\
after:bg-orange-400 \
after:[transition:0.2s_width_cubic-bezier(0.455,0.03,0.515,0.955)] \
\
after:hover:w-[47%] \
"; // after:hover:w-[47%] is related with px-1

export function LinksDemo({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("px-4 py-8", className)} {...rest}>

            <a className={linkClasses} href="#">
                Link to follow
            </a>

        </div>
    );
}
