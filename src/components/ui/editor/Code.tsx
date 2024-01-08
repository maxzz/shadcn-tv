import { Suspense, useMemo } from "react";
import { LanguageName, ParsedTokens, escapeHtmlEntities, lineTokensToHtml, syntaxParsingCache } from "./suspense";
import styles from "./code.module.css";

type CodeProps = {
    code: string;
    showLineNumbers?: boolean;
    language: LanguageName;
    className?: string;
};

export function Code({ className = "", code, language = "jsx", showLineNumbers = false, }: CodeProps) {
    return (
        <Suspense fallback={<Fallback code={code} showLineNumbers={showLineNumbers} className={className} />} >
            <Parser
                code={code}
                showLineNumbers={showLineNumbers}
                language={language}
                className={className}
            />
        </Suspense>
    );
}

function Fallback({ code, showLineNumbers, className }: { code: string; showLineNumbers: boolean; className: string; }) {

    const htmlLines = useMemo<string[]>(() => {
        return code
            .split("\n")
            .map((line, index) => {
                const escaped = escapeHtmlEntities(line);
                return showLineNumbers ? `<span class="${styles.LineNumber}">${index + 1}</span> ${escaped}` : escaped;
            });
    }, [code, showLineNumbers]);

    const maxLineNumberLength = `${htmlLines.length + 1}`.length;

    return (
        <code
            dangerouslySetInnerHTML={{ __html: htmlLines.join("<br/>") }}
            className={[styles.Code, className].join(" ")}
            style={{ "--max-line-number-length": `${maxLineNumberLength}ch`, }}
        />
    );
}

function Parser({ code, showLineNumbers, language, className }: { code: string; showLineNumbers: boolean; language: LanguageName; className: string; }) {
    const tokens = syntaxParsingCache.read(code, language);
    return (
        <TokenRenderer tokens={tokens} showLineNumbers={showLineNumbers} className={className} />
    );
}

function TokenRenderer({ tokens, showLineNumbers, className }: { tokens: ParsedTokens[]; showLineNumbers: boolean; className: string; }) {

    const html = useMemo<string>(() => {
        return tokens
            .map((lineTokens, index) => {
                const html = lineTokensToHtml(lineTokens);
                return showLineNumbers ? `<span class="${styles.LineNumber}">${index + 1}</span> ${html}` : html;
            }).join("<br/>");
    }, [tokens, showLineNumbers]);

    const maxLineNumberLength = `${tokens.length + 1}`.length;

    return (
        <code
            dangerouslySetInnerHTML={{ __html: html }}
            className={[styles.Code, className].join(" ")}
            style={{ "--max-line-number-length": `${maxLineNumberLength}ch`, }}
        />
    );
}
