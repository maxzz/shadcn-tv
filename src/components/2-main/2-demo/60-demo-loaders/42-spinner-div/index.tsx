import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import styles from "./spinner-div.module.css";

// https://github.com/emilkowalski/ui-snippets
// https://ui-snippets.dev

export function SpinnerDiv({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(styles.owner, "border-transparent border-l-sky-500 border-4 rounded-full", className)} {...rest} />
    );
}
