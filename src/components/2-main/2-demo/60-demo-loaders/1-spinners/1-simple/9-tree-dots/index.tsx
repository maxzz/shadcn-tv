import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import css from "./tree-dots.module.css";

// https://ui-snippets.dev
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/ThreeDotsLoader.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/index.js <- all snippets
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGrid.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGridItem.js

export function ThreeDotsLoader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(css.wrapper, className)} {...rest}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
