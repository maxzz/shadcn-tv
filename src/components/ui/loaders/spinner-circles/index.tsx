import css from "./circles.module.css"; // https://codepen.io/yoksel/pen/KKqeyj 'Thinking about SVG-preloaders'

export function SpinnerCircles() {
    return (
        <div className="p-4 text-green-950 flex items-center justify-center">
            <div className="relative w-64 flex items-center gap-4">

                <CircleDef />
                <Demo1 />
                <Demo2 />
                <Demo3 />
                <Demo4 />

                <Circle className={css["g-circles--v1"]} />
                <Circle className={css["g-circles--v2"]} />
                <Circle className={css["g-circles--v3"]} />
                <Circle className={css["g-circles--v4"]} />

            </div>
        </div>
    );
}

function CircleDef() {
    return (
        <svg viewBox="0 0 120 120">
            <symbol id="symbol--circle">
                <circle r={10} cx={20} cy={20} />
            </symbol>
        </svg>
    );
}

function Circle({className}: {className: string}) {
    return (
        <svg viewBox="0 0 120 120">
            <g className={`${css["g-circles"]} ${className}`}>
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
            </g>
        </svg>
    );
}

function Demo1() {
    return (
        <svg viewBox="0 0 120 120">
            <g className={`${css["g-circles"]} ${css["g-circles--v1"]}`}>
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
            </g>
        </svg>
    );
}

function Demo2() {
    return (
        <svg viewBox="0 0 120 120">
            <g className={`${css["g-circles"]} ${css["g-circles--v2"]}`}>
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
            </g>
        </svg>
    );
}

function Demo3() {
    return (
        <svg viewBox="0 0 120 120">
            <g className={`${css["g-circles"]} ${css["g-circles--v3"]}`}>
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
            </g>
        </svg>
    );
}

function Demo4() {
    return (
        <svg viewBox="0 0 120 120">
            <g className={`${css["g-circles"]} ${css["g-circles--v4"]}`}>
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
            </g>
        </svg>
    );
}
