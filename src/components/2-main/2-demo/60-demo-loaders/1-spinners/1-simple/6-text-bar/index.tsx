import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import css from "./text-bar.module.css";

export function TextBar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(css.preloader, "", className)} {...rest}>
            <div className={css["preloader-content"]}>
                <div className={css["loading-text"]}>
                    <p>Loading</p>
                </div>
            </div>
        </div>
    );
}
