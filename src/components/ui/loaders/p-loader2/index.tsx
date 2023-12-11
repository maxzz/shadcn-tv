import { SVGAttributes } from "react";
import "./p-loaders-p2.css";
import { classNames } from "@/utils";
import { GradientMask } from "../p-loader1";

/**
 * hsl(223,90%,90%)
 * hsl(283,90%,50%)
 *
 * [--bg:hsl(var(--hue1),90%,90%)] \
 * [--fg:hsl(var(--hue1),90%,10%)] \
 * \ 
 * dark:[--bg:hsl(var(--hue1),90%,10%)] \
 * dark:[--fg:hsl(var(--hue1),90%,90%)] \
 */
const rootClasses = "\
[--hue1:223] \
[--hue2:283] \
\
[--primary:hsl(var(--hue1),90%,50%)] \
[--secondary:hsl(var(--hue2),90%,50%)] \
";

export function LoaderP12({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames(rootClasses, className)} viewBox="0 0 128 128" {...rest}>
            <GradientMask />
            
            <g fill="var(--primary)">
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} y={128} width={40} height={24} transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} x={44} y={128} width={40} height={24} transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} x={88} y={128} width={40} height={24} transform="rotate(180)" />
                </g>
            </g>

            <g fill="var(--secondary)" mask="url(#p1loader-mask)">
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} y={128} width={40} height={24} transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} x={44} y={128} width={40} height={24} transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} x={88} y={128} width={40} height={24} transform="rotate(180)" />
                </g>
            </g>
        </svg>
    );
}
