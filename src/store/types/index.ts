export * from './svg-font';

export type TextValueFields<TData> = {
    [K in keyof TData as TData[K] extends string ? K : never ]: TData[K];
}

export type TextValueKeys<TData> = keyof TextValueFields<TData>;
