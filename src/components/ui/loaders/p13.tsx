import { SVGAttributes } from "react";

export function LoaderP13(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className="pl3" viewBox="0 0 128 128" width="256px" height="256px" {...props}>
            <g fill="var(--primary)">
                <rect
                    className="pl3__rect"
                    rx={8}
                    ry={8}
                    width={64}
                    height={64}
                    transform="translate(64)"
                />
                <g className="pl3__rect-g" transform="scale(-1)">
                    <rect
                        className="pl3__rect"
                        rx={8}
                        ry={8}
                        width={64}
                        height={64}
                        transform="translate(64)"
                    />
                </g>
            </g>
            
            <g fill="hsl(163,90%,50%)" mask="url(#pl-mask)">
                <rect
                    className="pl3__rect"
                    rx={8}
                    ry={8}
                    width={64}
                    height={64}
                    transform="translate(64)"
                />
                <g className="pl3__rect-g" transform="scale(-1)">
                    <rect
                        className="pl3__rect"
                        rx={8}
                        ry={8}
                        width={64}
                        height={64}
                        transform="translate(64)"
                    />
                </g>
            </g>
        </svg>
    );
}
