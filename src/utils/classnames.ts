export function classNames(...classes: (string | undefined | false | null | 0)[]): string {
    return classes.filter(Boolean).join(' ');
}
