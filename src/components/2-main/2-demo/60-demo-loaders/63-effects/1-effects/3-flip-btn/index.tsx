import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import css from "./flip-btn.module.css";

export function FlipBtn({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="relative">
            <div className={classNames(css.container, "p-0.5 w-32 h-12", className)} {...rest}>

                <input type="checkbox" name="cb" id="cb" />

                <label htmlFor="cb" className={css["button"]}>
                    <span className={css["front"]}>send</span>
                    <span className={css["back"]}>done</span>
                </label>
            </div>
        </div>
    );
}
