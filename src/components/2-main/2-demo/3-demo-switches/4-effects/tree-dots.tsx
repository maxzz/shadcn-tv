// https://ui-snippets.dev
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/ThreeDotsLoader.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/index.js <- all snippets
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGrid.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGridItem.js

import { classNames } from "@/utils";
import styles from "./tree-dots.module.css";

export function ThreeDotsLoader() {
    return (
        <div className={classNames("text-sky-700", styles.wrapper)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
