// https://ui-snippets.dev
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/FlickUp.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/index.js <- all snippets
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGrid.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGridItem.js

import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import styles from "./flickup.module.css";

export function Flickup({ className }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(styles.wrapper, className)}>
            <span className={styles.mainText}>Hover over me 1</span>
            <span className={styles.hoverText}>Hover over me 2</span>
        </div>
    );
}