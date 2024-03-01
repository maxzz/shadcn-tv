import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import css from "./two-circles.module.css";

export function TwoCircles({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("size-8", className)} {...rest}>

            <svg viewBox="0 0 100 100">
                <circle className={css["bg"]} cx={50} cy={50} r={46} />
                <circle className={css["loader"]} cx={50} cy={50} r={46} />
            </svg>

        </div>
    );
}
