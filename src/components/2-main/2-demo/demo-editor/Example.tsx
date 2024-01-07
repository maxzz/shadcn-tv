import { ReactNode, useLayoutEffect } from "react";
import { Code, Language } from "@/components/ui/editor";

import styles from "./example.module.css";

type ExampleProps = {
    code: string;
    exampleNode: ReactNode;
    headerNode: ReactNode;
    language?: Language;
    title: string;
};

export function Example({ code, exampleNode, headerNode, language = "jsx", title }: ExampleProps) {
    // useLayoutEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    return (
        <div className={styles.Route}>
            <h1 className={styles.Header}>
                {/* <Link className={styles.HomeLink} to="/">Home</Link> */}
                <span className={styles.Title}>
                    {title}
                </span>
            </h1>

            {headerNode}

            <div className={styles.ExampleContainer}>
                {exampleNode}
            </div>

            <Code
                className={styles.Code}
                code={code.trim()}
                language={language}
                showLineNumbers
            />
        </div>
    );
}
