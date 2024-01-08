import { LanguageName } from "./types";
import { Extension } from "@codemirror/state";
import { createCache } from "suspense";

type Module = any;

export const importCache = createCache<[string], Module>({
    config: { immutable: true },
    debugLabel: "importCache",
    getKey: ([path]) => path,
    load: async ([path]) => {
        switch (path) {
            case "@codemirror/lang-css": return await import("@codemirror/lang-css");
            case "@codemirror/lang-html": return await import("@codemirror/lang-html");
            case "@codemirror/lang-javascript": return await import("@codemirror/lang-javascript");
            case "@codemirror/lang-markdown": return await import("@codemirror/lang-markdown");
            default: throw Error(`Unknown path: ${path}`);
        }
    },
});

export async function getLanguageExtension(language: LanguageName): Promise<Extension> {
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
