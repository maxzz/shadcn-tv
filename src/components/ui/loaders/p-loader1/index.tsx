import { SVGAttributes } from "react";
import "./p-loaders-p1.css";
import { classNames } from "@/utils";

/**
 * hsl(223,90%,90%)
 * hsl(343,90%,50%)
 *
 * [--bg:hsl(var(--hue1),90%,90%)] \
 * [--fg:hsl(var(--hue1),90%,10%)] \
 * \ 
 * dark:[--bg:hsl(var(--hue1),90%,10%)] \
 * dark:[--fg:hsl(var(--hue1),90%,90%)] \
 */
const rootClasses = "\
[--hue1:223] \
[--hue2:343] \
\
[--primary:hsl(var(--hue1),90%,50%)] \
[--secondary:hsl(var(--hue2),90%,50%)] \
\
";

/**
 * @param maskId - Document scope unique id (not selector) for the mask. default: "p1loader".
 * @returns 
 */
export function GradientMask({ maskId = "p1loader" }: { maskId?: string; } = {}) {
    return (
        <defs>
            <linearGradient id={`${maskId}-grad`} x1={0} y1={0} x2={1} y2={1}>
                <stop offset="0%" />
                <stop offset="100%" stopColor="#fff" />
            </linearGradient>

            <mask id={`${maskId}`}>
                <path fill={`url(#${maskId}-grad)`} d="M0 0H128V128H0z" />
            </mask>
        </defs>
    );
}

export function LoaderP11({ className, ...rest }: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames(rootClasses, className)} viewBox="0 0 128 128" {...rest}>
            <GradientMask />

            <g className="pl1__g" fill="var(--primary)">
                <g className="pl1__rect-g" transform="translate(20 20)">
                    <rect className="pl1__rect" rx={8} ry={8} width={40} height={40} />
                    <rect className="pl1__rect" rx={8} ry={8} width={40} height={40} transform="translate(0 48)" />
                </g>
                <g className="pl1__rect-g" transform="translate(20 20) rotate(180 44 44)">
                    <rect className="pl1__rect" rx={8} ry={8} width={40} height={40} />
                    <rect className="pl1__rect" rx={8} ry={8} width={40} height={40} transform="translate(0 48)" />
                </g>
            </g>

            <g className="pl1__g" fill="var(--secondary)" mask="url(#p1loader-mask)">
                <g className="pl1__rect-g" transform="translate(20 20)">
                    <rect className="pl1__rect" rx={8} ry={8} width={40} height={40} />
                    <rect className="pl1__rect" rx={8} ry={8} width={40} height={40} transform="translate(0 48)" />
                </g>
                <g className="pl1__rect-g" transform="translate(20 20) rotate(180 44 44)">
                    <rect className="pl1__rect" rx={8} ry={8} width={40} height={40} />
                    <rect className="pl1__rect" rx={8} ry={8} width={40} height={40} transform="translate(0 48)" />
                </g>
            </g>
        </svg>
    );
}
