import { ParsedToken } from "./types";

export function lineTokensToHtml(lineTokens: ParsedToken[]): string {
    return lineTokens
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
