import { SVGAttributes } from "react";
import "./svg-spinner.css";
import { classNames } from "@/utils";

// https://codepen.io/supah/pen/BjYLdW

export function SvgSpinner({className, ...rest}: SVGAttributes<SVGElement>) {
    return (
        <svg className={classNames("spinner5", className)} viewBox="0 0 50 50" {...rest}>
            <circle className="path" cx={25} cy={25} r={20} fill="none" />
        </svg>
    );
}
