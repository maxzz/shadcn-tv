export const startTime = Date.now();

function now(): number {
    const timeNow = Date.now();
    const last = (now as any).last || timeNow;
    return (now as any).last = timeNow > last ? timeNow : last + 1;
}

function asNumber(): number {
    return now();
}

function asRelativeNumber(): number {
    return now() - startTime;
}

export function uuid(short?: boolean): string {
    let n = now();
    if (short) {
        n -= startTime;
    }
    return n.toString(36);
}

uuid.asNumber = asNumber;
uuid.asRelativeNumber = asRelativeNumber;
