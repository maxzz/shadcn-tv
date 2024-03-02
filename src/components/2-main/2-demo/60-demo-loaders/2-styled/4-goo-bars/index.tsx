import { HTMLAttributes } from "react";
import css from "./goo-bars.module.css"; // https://codepen.io/jh3y/pen/BabVPVd 'Masked SVG Loader'
import { classNames } from "@/utils";

const totalSpheres = 360 * 3;

function Bars({ className, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 700 350" className={classNames(css["goo-bars"], "w-24", className)} {...rest}>
            <defs>
                <filter id="goo">
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

                <linearGradient id="g" x1="100%" x2={0} y1={0} y2="80%" gradientTransform="rotate(10)">
                    <stop offset="10%" stopColor="hsl(10, 90%, 50%)" />
                    <stop offset="22%" stopColor="hsl(35, 90%, 50%)" />
                    <stop offset="38%" stopColor="hsl(45, 90%, 50%)" />
                    <stop offset="50%" stopColor="hsl(180, 90%, 50%)" />
                    <stop offset="70%" stopColor="hsl(210, 90%, 50%)" />
                    <stop offset="84%" stopColor="hsl(280, 90%, 50%)" />
                    <stop offset="100%" stopColor="hsl(320, 90%, 50%)" />
                </linearGradient>

                <mask id="mask">
                    <g>
                        <circle cx={50} cy={25} r={25} fill="white" />
                        <line
                            x1={50}
                            x2={50}
                            y1={100}
                            y2={250}
                            strokeWidth={50}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <circle cx={50} cy={325} r={25} fill="white" />
                    </g>
                    <g>
                        <circle cx={150} cy={25} r={25} fill="white" />
                        <line
                            x1={150}
                            x2={150}
                            y1={100}
                            y2={250}
                            strokeWidth={50}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <circle cx={150} cy={325} r={25} fill="white" />
                    </g>
                    <g>
                        <circle cx={250} cy={25} r={25} fill="white" />
                        <line
                            x1={250}
                            x2={250}
                            y1={100}
                            y2={250}
                            strokeWidth={50}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <circle cx={250} cy={325} r={25} fill="white" />
                    </g>
                    <g>
                        <circle cx={350} cy={25} r={25} fill="white" />
                        <line
                            x1={350}
                            x2={350}
                            y1={100}
                            y2={250}
                            strokeWidth={50}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <circle cx={350} cy={325} r={25} fill="white" />
                    </g>
                    <g>
                        <circle cx={450} cy={25} r={25} fill="white" />
                        <line
                            x1={450}
                            x2={450}
                            y1={100}
                            y2={250}
                            strokeWidth={50}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <circle cx={450} cy={325} r={25} fill="white" />
                    </g>
                    <g>
                        <circle cx={550} cy={25} r={25} fill="white" />
                        <line
                            x1={550}
                            x2={550}
                            y1={100}
                            y2={250}
                            strokeWidth={50}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <circle cx={550} cy={325} r={25} fill="white" />
                    </g>
                    <g>
                        <circle cx={650} cy={25} r={25} fill="white" />
                        <line
                            x1={650}
                            x2={650}
                            y1={100}
                            y2={250}
                            strokeWidth={50}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <circle cx={650} cy={325} r={25} fill="white" />
                    </g>
                </mask>
            </defs>
            <g filter="url(#goo)">
                <rect x={0} y={0} width="100%" height="100%" fill="url(#g)" mask="url(#mask)" />
            </g>
        </svg>
    );
}

export function GooBars() {
    return (
        <div className={`p-4 text-green-950 flex items-center justify-center`}>
            <Bars />
        </div>
    );
}
