import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import css from "./flickup.module.css";

// https://ui-snippets.dev
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/FlickUp.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/index.js <- all snippets
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGrid.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGridItem.js

export function Flickup({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(css.wrapper, className)} {...rest}>

            <span className={classNames(css.mainText, "text-sm")}>
                Hover over me 1
            </span>

            <span className={classNames(css.hoverText, "text-sm")}>
                Hover over me 2
            </span>

        </div>
    );
}
