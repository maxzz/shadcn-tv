import { SVGAttributes } from "react";
import { classNames } from "@/utils";
import styles from "./spinner-svg.module.css";

// https://codepen.io/supah/pen/BjYLdW

export function SvgSpinner({className, ...rest}: SVGAttributes<SVGElement>) {
    return (
        <svg className={classNames(styles.spinner, className)} viewBox="0 0 50 50" {...rest}>
            <circle className={styles.path} cx={25} cy={25} r={20} fill="none" />
        </svg>
    );
}
