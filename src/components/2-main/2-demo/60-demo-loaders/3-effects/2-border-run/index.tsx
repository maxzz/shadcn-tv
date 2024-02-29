import { HTMLAttributes } from "react";
import css from "./border-run.module.css";
import { classNames } from "@/utils";

export default function BorderRun({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <button className={classNames(css["btn"], "relative w-[180px] h-[60px]", className)} {...rest}>

            <svg viewBox="0 0 180 60" className={css["svg-border"]}>
                <polyline points="179,1 179,59 1,59 1,1 179,1" className={css["bg-line"]} />
                <polyline points="179,1 179,59 1,59 1,1 179,1" className={css["hl-line"]} />
            </svg>

            <span>
                HOVER ME
            </span>

        </button>
    );
}
