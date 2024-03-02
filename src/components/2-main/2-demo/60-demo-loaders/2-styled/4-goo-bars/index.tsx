import { HTMLAttributes } from "react";
import css from "./goo-bars.module.css"; // https://codepen.io/jh3y/pen/BabVPVd 'Masked SVG Loader'
import { classNames } from "@/utils";

function GooBarsFilter() {
    return (
        <filter id="goo-bars-filter">
            <feGaussianBlur
                id="SvgjsFeGaussianBlur1000"
                result="SvgjsFeGaussianBlur1000"
                in="SourceGraphic"
                stdDeviation={10}
            ></feGaussianBlur>

            <feColorMatrix
                id="SvgjsFeColorMatrix1001"
                result="SvgjsFeColorMatrix1001"
                in="SvgjsFeGaussianBlur1000"
                values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 30 -10"
                type="matrix"
            />

            <feComposite
                id="SvgjsFeComposite1002"
                result="SvgjsFeComposite1002"
                in="SvgjsFeColorMatrix1001"
                operator="atop"
            ></feComposite>
        </filter>
    );
}

function BarGradients() {
    return (
        <linearGradient id="g" x1="100%" x2={0} y1={0} y2="80%" gradientTransform="rotate(10)">
            <stop offset="10%" stopColor="hsl(10, 90%, 50%)" />
            <stop offset="22%" stopColor="hsl(35, 90%, 50%)" />
            <stop offset="38%" stopColor="hsl(45, 90%, 50%)" />
            <stop offset="50%" stopColor="hsl(180, 90%, 50%)" />
            <stop offset="70%" stopColor="hsl(210, 90%, 50%)" />
            <stop offset="84%" stopColor="hsl(280, 90%, 50%)" />
            <stop offset="100%" stopColor="hsl(320, 90%, 50%)" />
        </linearGradient>
    );
}

function SingleBar({ idx }: { idx: number; }) {
    const x = 50 + idx * 100;
    const y = 100 + idx * 100;
    return (
        <g>
            <circle cx={x} cy={25} r={25} fill="white" />
            <line
                x1={x}
                x2={x}
                y1={100}
                y2={250}
                strokeWidth={50}
                stroke="white"
                strokeLinecap="round"
            />
            <circle cx={x} cy={325} r={25} fill="white" />
        </g>
    );
}

function Bars({ className, totalSpheres = 7, ...rest }: HTMLAttributes<SVGSVGElement> & { totalSpheres?: number; }) {
    return (
        <svg viewBox="0 0 700 350" className={classNames(css["goo-bars"], "", className)} {...rest}>
            <defs>
                <GooBarsFilter />
                <BarGradients />

                <mask id="mask">
                    {[...Array(totalSpheres)].map(
                        (_, idx) => {
                            return (
                                <SingleBar key={idx} idx={idx} />
                            );
                        }
                    )}
                </mask>
            </defs>
            <g filter="url(#goo-bars-filter)">
                <rect x={0} y={0} width="100%" height="100%" fill="url(#g)" mask="url(#mask)" />
            </g>
        </svg>
    );
}

export function GooBars() {
    return (
        <div className={`bg-sky-600`}>
            <Bars className="w-32" totalSpheres={7} />
        </div>
    );
}
