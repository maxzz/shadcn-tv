import { SVGAttributes } from "react";

export function LoaderP12(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className="pl2" viewBox="0 0 128 128" width="128px" height="128px" {...props}>
            <g fill="var(--primary)">
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} y={128} width={40} height={24} transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} x={44} y={128} width={40} height={24} transform="rotate(180)"
                    />
                </g>
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} x={88} y={128} width={40} height={24} transform="rotate(180)"
                    />
                </g>
            </g>

            <g fill="hsl(283,90%,50%)" mask="url(#pl-mask)">
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} y={128} width={40} height={24} transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} x={44} y={128} width={40} height={24} transform="rotate(180)"
                    />
                </g>
                <g className="pl2__rect-g">
                    <rect className="pl2__rect" rx={8} ry={8} x={88} y={128} width={40} height={24} transform="rotate(180)"
                    />
                </g>
            </g>
        </svg>
    );
}
