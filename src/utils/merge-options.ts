export function mergeDefaultAndLoaded<T extends Record<string, unknown>>({ defaults, loaded }: { defaults: T; loaded: any | undefined | null; }): T {
    if (!loaded) {
        return defaults;
    }
    const entries = Object.entries(defaults);
    const res = entries.map(([key, defaultValue]) => [key, loaded[key] !== undefined ? loaded[key] : defaultValue]);
    return Object.fromEntries(res);
}

/**
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/node/utils.ts
 */
export function mergeConfigRecursively<T extends Record<string, any>>(defaults: T, overrides: Record<string, any> | undefined | null, rootPath: string = ''): T {
    if (!overrides) {
        return defaults;
    }

    const rv: Record<string, any> = { ...defaults };

    for (const key in overrides) {

        const value = overrides[key];
        if (value == null) {
            continue;
        }

        const existing = rv[key];
        if (existing == null) {
            rv[key] = value;
            continue;
        }

        if (Array.isArray(existing) || Array.isArray(value)) {
            rv[key] = [...arraify(existing ?? []), ...arraify(value ?? [])];
            continue;
        }

        if (isObject(existing) && isObject(value)) {
            rv[key] = mergeConfigRecursively(existing, value, rootPath ? `${rootPath}.${key}` : key);
            continue;
        }

        rv[key] = value;
    }

    return rv as T;
}

export function isObject(value: unknown): value is Record<string, any> {
    return Object.prototype.toString.call(value) === '[object Object]';
}

export function arraify<T>(target: T | T[]): T[] {
    return Array.isArray(target) ? target : [target];
}
