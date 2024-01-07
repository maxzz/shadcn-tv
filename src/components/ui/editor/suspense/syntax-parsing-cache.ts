import { ensureSyntaxTree } from "@codemirror/language";
import { EditorState, Extension } from "@codemirror/state";
import { classHighlighter, highlightTree } from "@lezer/highlight";
import { createCache } from "suspense";
import { importCache } from "./import-cache";

export type Language =
    | "css"
    | "html"
    | "javascript"
    | "jsx"
    | "markdown"
    | "tsx"
    | "typescript";

export type ParsedToken = {
    columnIndex: number;
    type: string | null;
    value: string;
};

export type ParsedTokens = ParsedToken[];

export type ParserData = {
    parsedTokensByLine: ParsedTokens[];
    parsedTokensPercentage: number;
    rawTextByLine: string[];
    rawTextPercentage: number;
};

type CurrentLineState = {
    parsedTokens: ParsedTokens;
    rawString: string;
};

export const DEFAULT_MAX_CHARACTERS = 500_000;
export const DEFAULT_MAX_TIME = 5_000;

export const syntaxParsingCache = createCache<[code: string, language: Language], ParsedTokens[]>({
    config: { immutable: true },
    debugLabel: "syntaxParsingCache",
    getKey: ([code, language]) => `${code}-${language}`,

    load: async ([code, language]) => {
        const languageExtension = await getLanguageExtension(language);

        // The logic below to trim code sections only works with "\n"
        code = code.replace(/\r\n?|\n|\u2028|\u2029/g, "\n");

        if (code.length > DEFAULT_MAX_CHARACTERS) {
            let index = DEFAULT_MAX_CHARACTERS - 1;
            while (index > 0 && code.charAt(index) !== "\n") {
                index--;
            }
            if (index === 0) {
                while (index < code.length && code.charAt(index) !== "\n") {
                    index++;
                }
            }
            code = code.slice(0, index + 1);
        }

        const state = EditorState.create({ doc: code, extensions: [languageExtension], });

        const tree = ensureSyntaxTree(state!, DEFAULT_MAX_CHARACTERS, DEFAULT_MAX_TIME);
        if (!tree) {
            return [];
        }

        const rv: ParsedTokens[] = [];
        const currentLineState: CurrentLineState = {
            parsedTokens: [],
            rawString: "",
        };

        let characterIndex = 0;

        highlightTree(tree, classHighlighter,
            (from: number, to: number, tokenClassName: string) => {
                if (from > characterIndex) {
                    // No style applied to the token between position and from.
                    // This typically indicates whitespace or newline characters.
                    const whitespace = code.slice(characterIndex, from);
                    processSection(currentLineState, rv, whitespace, "");
                }
                const token = code.slice(from, to);
                processSection(currentLineState, rv, token, tokenClassName);
                characterIndex = to;
            }
        );

        const maxPosition = code.length - 1;
        if (characterIndex < maxPosition) {
            // No style applied on the trailing text.
            // This typically indicates white space or newline characters.
            processSection(currentLineState, rv, code.slice(characterIndex, maxPosition), "");
        }

        if (currentLineState.parsedTokens.length) {
            rv.push(currentLineState.parsedTokens);
        }

        let parsedCharacterIndex = 0;
        parsedCharacterIndex += characterIndex + 1;

        // Anything that's left should de-opt to plain text.
        if (parsedCharacterIndex < code.length) {
            let nextIndex = code.indexOf("\n", parsedCharacterIndex);

            let parsedLineTokens: ParsedToken[] = [];

            while (true) {
                const line = nextIndex >= 0
                    ? code.substring(parsedCharacterIndex, nextIndex)
                    : code.substring(parsedCharacterIndex);

                parsedLineTokens.push({
                    columnIndex: 0,
                    type: null,
                    value: line,
                });

                if (nextIndex >= 0) {
                    rv.push(parsedLineTokens);

                    parsedLineTokens = [];
                }
                else if (nextIndex === -1) {
                    break;
                }

                parsedCharacterIndex = nextIndex + 1;
                nextIndex = code.indexOf("\n", parsedCharacterIndex);
            }

            if (parsedLineTokens.length) {
                rv.push(parsedLineTokens);
            }
        }

        return rv;
    },
});

function processSection(currentLineState: CurrentLineState, parsedTokens: ParsedTokens[], section: string, className: string) {
    const tokenType = className?.substring(4) ?? null; // Remove "tok-" prefix;

    let index = 0;
    let nextIndex = section.indexOf("\n");

    while (true) {
        const substring = nextIndex >= 0
            ? section.substring(index, nextIndex)
            : section.substring(index);

        const token: ParsedToken = {
            columnIndex: currentLineState.rawString.length,
            type: tokenType,
            value: substring,
        };

        currentLineState.parsedTokens.push(token);
        currentLineState.rawString += substring;

        if (nextIndex === -1) {
            break;
        }

        if (nextIndex >= 0) {
            parsedTokens.push(currentLineState.parsedTokens);

            currentLineState.parsedTokens = [];
            currentLineState.rawString = "";
        }

        index = nextIndex + 1;
        nextIndex = section.indexOf("\n", index);
    }
}

export function parsedTokensToHtml(tokens: ParsedToken[]): string {
    return tokens
        .map((token) => {
            const className = token.type ? `tok-${token.type}` : "";
            const escapedValue = escapeHtmlEntities(token.value);
            return `<span class="${className}">${escapedValue}</span>`;
        })
        .join("");
}

export function escapeHtmlEntities(rawString: string): string {
    return rawString.replace(
        /[\u00A0-\u9999<>\&]/g,
        (substring) => "&#" + substring.charCodeAt(0) + ";"
    );
}

async function getLanguageExtension(language: Language): Promise<Extension> {
    switch (language) {
        case "css":
            const { cssLanguage } = await importCache.readAsync("@codemirror/lang-css");
            return cssLanguage.extension;
        case "html":
            const { htmlLanguage } = await importCache.readAsync("@codemirror/lang-html");
            return htmlLanguage.extension;
        case "javascript":
            const { javascriptLanguage } = await importCache.readAsync("@codemirror/lang-javascript");
            return javascriptLanguage.extension;
        case "jsx":
            const { jsxLanguage } = await importCache.readAsync("@codemirror/lang-javascript");
            return jsxLanguage.extension;
        case "markdown":
            const { markdownLanguage } = await importCache.readAsync("@codemirror/lang-markdown");
            return markdownLanguage.extension;
        case "tsx":
            const { tsxLanguage } = await importCache.readAsync("@codemirror/lang-javascript");
            return tsxLanguage.extension;
        case "typescript":
            const { typescriptLanguage } = await importCache.readAsync("@codemirror/lang-javascript");
            return typescriptLanguage.extension;
        default:
            throw Error(`Unsupported language: "${language}"`);
    }
}
