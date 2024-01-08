export type LanguageName =
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
