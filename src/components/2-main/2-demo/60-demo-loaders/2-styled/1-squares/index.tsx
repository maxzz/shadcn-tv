import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import css from "./squares.module.css";

export function FourSquares({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(css["preloader-squares"], "relative size-6", className)} {...rest}>
            <ul className="size-6">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}
