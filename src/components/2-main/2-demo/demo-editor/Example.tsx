import { ReactNode, useLayoutEffect } from "react";

import {Code} from "@/components/ui/editor";
import { Language } from "@/components/ui/editor/suspense/SyntaxParsingCache";

import styles from "./Example.module.css";

export default function Example({
  code,
  exampleNode,
  headerNode,
  language = "jsx",
  title,
}: {
  code: string;
  exampleNode: ReactNode;
  headerNode: ReactNode;
  language?: Language;
  title: string;
}) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.Route}>
      <h1 className={styles.Header}>
        {/* <Link className={styles.HomeLink} to="/">
          Home
        </Link> */}
        →<span className={styles.Title}>{title}</span>
      </h1>
      {headerNode}
      <div className={styles.ExampleContainer}>{exampleNode}</div>
      <Code
        className={styles.Code}
        code={code.trim()}
        language={language}
        showLineNumbers
      />
    </div>
  );
}
