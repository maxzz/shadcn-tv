// https://ui-snippets.dev
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/FlickUp.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/index.js <- all snippets
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGrid.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGridItem.js

import styles from "./flickup.module.css";

export function Flickup() {
    return (
        <div className={styles.wrapper}>
            <span className={styles.mainText}>Hover over me 1</span>
            <span className={styles.hoverText}>Hover over me 2</span>
        </div>
    );
}
