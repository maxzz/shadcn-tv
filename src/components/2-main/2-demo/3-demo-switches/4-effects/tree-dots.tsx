// https://ui-snippets.dev
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/ThreeDotsLoader.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/index.js <- all snippets
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGrid.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGridItem.js

import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import styles from "./tree-dots.module.css";

export function ThreeDotsLoader({ className }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(styles.wrapper, className)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
