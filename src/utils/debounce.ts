export default function debounce<T extends (...args: any[]) => any>(f: T, timeout = 100) {
    let timer: any;
    let lastArgs: any;
    let lastThis: any;

    return function (this: any, ...args: Parameters<T>) {
        lastThis = this;
        lastArgs = args;
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            timer = null;
            f.apply(lastThis, lastArgs);
        }, timeout);
    };
}
