import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import css from "./text-bar.module.css";

export function TextBar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("text-xl text-foreground uppercase", className)} {...rest}>
            <div className={classNames(css["loading-text"], "after:bg-current after:h-px")}>
                <p>Loading</p>
            </div>
        </div>
    );
}
