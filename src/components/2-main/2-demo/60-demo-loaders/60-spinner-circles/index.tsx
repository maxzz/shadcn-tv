import { HTMLAttributes } from "react";
import css from "./circles.module.css"; // https://codepen.io/yoksel/pen/KKqeyj 'Thinking about SVG-preloaders'

function CircleDef() {
    return (
        <svg viewBox="0 0 120 120" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
            <symbol id="symbol--circle">
                <circle r={10} cx={20} cy={20} />
            </symbol>
        </svg>
    );
}

function Circle({ className, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 120 120" {...rest}>
            <g className={`${css["g-circles"]} ${className}`}>
                
                {Array.from({ length: 12 }).map((_, i) => (
                    <g key={i} className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                ))}

                {/* 
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                <g className={css["g--circle"]}> <use xlinkHref="#symbol--circle" className={css["u--circle"]} /> </g>
                */}
            </g>
        </svg>
    );
}

const c1 = "rgba(255,_255,_255,_0)";
const c2 = "rgba(255,_255,_255,_0.05)";
const g1 = `linear-gradient(45deg,_${c1}_48%,_${c2}_50%,_${c1}_52%)`;
const g2 = `linear-gradient(-45deg,_${c1}_48%,_${c2}_50%,_${c1}_52%)`;

const rombClasses = `[background:${g1},_${g2}] [background-size:_1em_1em]`;

export function SpinnerCircles() {
    return (
        <div className={`p-4 text-green-950 flex items-center justify-center ${rombClasses}`}>
            <div className="relative w-96 flex items-center gap-4">

                <CircleDef />
                <Circle className={css["g-circles--v1"]} />
                <Circle className={css["g-circles--v2"]} />
                <Circle className={css["g-circles--v3"]} />
                <Circle className={css["g-circles--v4"]} />

            </div>
        </div>
    );
}
