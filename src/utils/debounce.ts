export function debounce<T extends (...args: any[]) => any>(f: T, timeout = 100) {
    let timeoutId: any;
    let lastArgs: any;
    let lastThis: any;

    function debounced(this: any, ...args: Parameters<T>) {
        lastThis = this;
        lastArgs = args;

        if (timeoutId) {
            return;
        }

        timeoutId = setTimeout(() => {
            timeoutId = null;
            f.apply(lastThis, lastArgs);
        }, timeout);
    };

    return debounced;
}

// or simplified version wo/ 'this' and args: https://github.com/ChromeDevTools/devtools-frontend/blob/main/front_end/core/common/Debouncer.ts
/**
 * Debounce utility function, ensures that the function passed in is only called once the function stops being called and the delay has expired.
 */
export const debounceDevTools = function (func: () => void, delay: number): () => void {
    let timer = 0;

    const debounced = (): void => {
        clearTimeout(timer);            // this will extend the delay each time the function is called vs. keeping constant delay as in the above implementation
        timer = window.setTimeout(() => func(), delay);
    };

    return debounced;
};
