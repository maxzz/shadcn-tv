import { SVGAttributes } from "react";
import "./p-loaders-p1.css";

export function LoaderP11(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 128 128" {...props}>
            <defs>
                <linearGradient id="a" x1={0} y1={0} x2={1} y2={1}>
                    <stop offset="0%" />
                    <stop offset="100%" stopColor="#fff" />
                </linearGradient>
                <mask id="b">
                    <path fill="url(#a)" d="M0 0H128V128H0z" />
                </mask>
            </defs>

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
            <g className="pl1__g" fill="hsl(343,90%,50%)" mask="url(#b)">
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
