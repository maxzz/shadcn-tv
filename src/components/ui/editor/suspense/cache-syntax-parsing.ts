import { LanguageName, ParsedTokens } from "./types";
import { createCache } from "suspense";
import { getLanguageExtension } from "./cache-imports";
import { codeToTokens } from "./code-to-tokens";

export const syntaxParsingCache = createCache<[code: string, language: LanguageName], ParsedTokens[]>({
    config: { immutable: true },
    debugLabel: "syntaxParsingCache",
    getKey: ([code, language]) => `${code}-${language}`,
    load: async ([code, language]) => {
        const languageExtension = await getLanguageExtension(language);
        const rv: ParsedTokens[] = codeToTokens(code, languageExtension);
        return rv;
    },
});
