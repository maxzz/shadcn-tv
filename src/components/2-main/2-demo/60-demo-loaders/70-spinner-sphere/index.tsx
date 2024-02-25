import { HTMLAttributes } from "react";
import css from "./sphere.module.css"; // https://codepen.io/giana/pen/LYaOdye 'Native CSS particle animation with sin() and cos()'

const totalSpheres = 360 * 3;

function Circles({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    var i = totalSpheres;
    return (
        <>
        <div className={css["center"]} style={{'--total': totalSpheres, '--dot-size': '4px'}} {...rest}>
            {Array.from({ length: totalSpheres }).map((_, idx) => (
                <div className={css["particle"]} style={{'--index': idx}} key={idx}>
                </div>
            ))}
        </div>
        </>
    );
}

export function SpinnerSpherees() {
    return (
        <div className={`p-4 text-green-950 flex items-center justify-center`}>
            <div className="relative w-96 h-[200px] flex items-center justify-center content-center gap-4">

                <Circles />

            </div>
        </div>
    );
}
