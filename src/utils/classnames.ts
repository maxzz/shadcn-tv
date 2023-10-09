import { twMerge } from "tailwind-merge";

type classNamesArg = string | undefined | false | null | 0;

export function classNames(...inputs: classNamesArg[]): string {
    return inputs.filter(Boolean).join(' ');
}

export function cn(...inputs: Parameters<typeof classNames>) {
    return twMerge(classNames(...inputs));
}
