import { SVGAttributes } from "react";
import "./p-loaders-p3.css";
import { classNames } from "@/utils";

// hsl(223,90%,90%)
// hsl(163,90%,50%)
const rootClasses = "\
[--hue1:223] \
[--hue2:163] \
\
[--bg:hsl(var(--hue1),90%,90%)] \
[--fg:hsl(var(--hue1),90%,10%)] \
\
[--primary:hsl(var(--hue1),90%,50%)] \
[--secondary:hsl(var(--hue2),90%,50%)] \
\
dark:[--bg:hsl(var(--hue1),90%,10%)] \
dark:[--fg:hsl(var(--hue1),90%,90%)] \
";

export function LoaderP13({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames(rootClasses, className)} viewBox="0 0 128 128" {...rest}>
            <g fill="var(--primary)">
                <rect className="pl3__rect" rx={8} ry={8} width={64} height={64} transform="translate(64)" />
                <g className="pl3__rect-g" transform="scale(-1)">
                    <rect className="pl3__rect" rx={8} ry={8} width={64} height={64} transform="translate(64)" />
                </g>
            </g>

            <g fill="var(--secondary)" mask="url(#pl-mask)">
                <rect className="pl3__rect" rx={8} ry={8} width={64} height={64} transform="translate(64)" />
                <g className="pl3__rect-g" transform="scale(-1)">
                    <rect className="pl3__rect" rx={8} ry={8} width={64} height={64} transform="translate(64)" />
                </g>
            </g>
        </svg>
    );
}
