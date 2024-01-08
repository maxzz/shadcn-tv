import { ensureSyntaxTree } from "@codemirror/language";
import { EditorState, Extension } from "@codemirror/state";
import { Tree } from "@lezer/common";
import { classHighlighter, highlightTree } from "@lezer/highlight";
import { createCache } from "suspense";
import { LanguageName, getLanguageExtension } from "./import-cache";

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

export const syntaxParsingCache = createCache<[code: string, language: LanguageName], ParsedTokens[]>({
    config: { immutable: true },
    debugLabel: "syntaxParsingCache",
    getKey: ([code, language]) => `${code}-${language}`,

    load: async ([code, language]) => {
        const languageExtension = await getLanguageExtension(language);

        code = normilizeCodeLines(code);

        const state = EditorState.create({ doc: code, extensions: [languageExtension], });

        const tree = ensureSyntaxTree(state!, DEFAULT_MAX_CHARACTERS, DEFAULT_MAX_TIME);
        if (!tree) {
            return [];
        }

        const rv: ParsedTokens[] = [];
        const characterIndex = prepareParsedTokens(code, tree, rv);
        consumeEndignWitespace(code, characterIndex, rv);
        /*
        let parsedCharacterIndex = characterIndex + 1;

        // Anything that's left should de-opt to plain text.
        if (parsedCharacterIndex < code.length) {
            let nextIndex = code.indexOf("\n", parsedCharacterIndex);

            let parsedLineTokens: ParsedToken[] = [];

            while (true) {
                parsedLineTokens.push({
                    columnIndex: 0,
                    type: null,
                    value: code.substring(parsedCharacterIndex, nextIndex >= 0 ? nextIndex : undefined),
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
        */

        return rv;
    },
});

function consumeEndignWitespace(code: string, lastProcessedIndex: number, rv: ParsedTokens[]) {
    let parsedCharacterIndex = lastProcessedIndex + 1;

    // Anything that's left should de-opt to plain text.
    if (parsedCharacterIndex < code.length) {
        let nextIndex = code.indexOf("\n", parsedCharacterIndex);

        let parsedLineTokens: ParsedToken[] = [];

        while (true) {
            parsedLineTokens.push({
                columnIndex: 0,
                type: null,
                value: code.substring(parsedCharacterIndex, nextIndex >= 0 ? nextIndex : undefined),
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
}

function normilizeCodeLines(code: string): string {
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

    return code;
}

/**
 * @param code source code
 * @param tree AST
 * @param rv processed tokens
 * @returns returns index of the last processed character.
 */
function prepareParsedTokens(code: string, tree: Tree, rv: ParsedTokens[]): number {

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
        // This typically indicates whitespace or newline characters.
        processSection(currentLineState, rv, code.slice(characterIndex, maxPosition), "");
    }

    if (currentLineState.parsedTokens.length) {
        rv.push(currentLineState.parsedTokens);
    }

    return characterIndex;
}

function processSection(currentLineState: CurrentLineState, rv: ParsedTokens[], lineSection: string, tokenClassName: string) {
    const tokenType = tokenClassName?.substring(4) ?? null; // Remove "tok-" prefix;

    let index = 0;
    let nextIndex = lineSection.indexOf("\n");

    while (true) {
        const substring = lineSection.substring(index, nextIndex >= 0 ? nextIndex : undefined);

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
            rv.push(currentLineState.parsedTokens);

            currentLineState.parsedTokens = [];
            currentLineState.rawString = "";
        }

        index = nextIndex + 1;
        nextIndex = lineSection.indexOf("\n", index);
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
    return rawString.replace(/[\u00A0-\u9999<>\&]/g, (substring) => "&#" + substring.charCodeAt(0) + ";");
}
