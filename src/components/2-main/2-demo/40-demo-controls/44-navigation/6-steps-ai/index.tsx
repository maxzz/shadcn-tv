import { classNames } from "@/utils";
import { SVGAttributes } from "react";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k3pVcsueP80
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export function StepsDemo5() {
    return (
        <div className="flex flex-col items-start gap-4 p-16">

            {newFunction1()}

            {newFunction2()}

            {newFunction3()}

            {newFunction4()}

        </div>
    );
}

function newFunction1() {
    return (
        <div className="flex items-start gap-4 w-96">
            <div className="flex flex-col items-center">
                <div className="relative size-6">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900">
                        <CheckIcon className="size-4" />
                    </div>
                    <div className="absolute inset-0 -mb- rounded-full border-2 border-gray-900 dark:border-gray-50" />
                </div>
                <div className="h-10 w-[2px] bg-gray-900 dark:bg-gray-50 -mb-4" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">Fetching inspiration</p>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">Completed</div>
        </div>
    );
}

function newFunction2() {
    return (
        <div className="flex items-start gap-4 w-96">
            <div className="flex flex-col items-center">
                <div className="relative size-6">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900">
                        <LoaderIcon className="size-4 animate-spin" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-gray-900 dark:border-gray-50" />
                </div>
                <div className="h-10 w-[2px] bg-gray-300 dark:bg-gray-50 -mb-4" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">Applying your styles</p>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">In Progress</div>
        </div>
    );
}

function newFunction3() {
    return (
        <div className="flex items-start gap-4 w-96">
            <div className="flex flex-col items-center">
                <div className="relative size-6">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">3</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-700" />
                </div>
                <div className="h-10 w-[2px] bg-gray-300 dark:bg-gray-50 -mb-4" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">Making modifications</p>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Not Started</div>
        </div>
    );
}

function newFunction4() {
    return (
        <div className="flex items-start gap-4 w-96">
            <div className="flex flex-col items-center">
                <div className="relative size-6">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-700" />
                </div>
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">Final touches</p>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Not Started</div>
        </div>
    );
}

function CheckIcon({ className, ...rest }: SVGAttributes<SVGElement>) {
    return (
        <svg
            className={classNames("fill-none stroke-current stroke-2", className)}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}


function LoaderIcon({ className, ...rest }: SVGAttributes<SVGElement>) {
    return (
        <svg
            className={classNames("fill-none stroke-current stroke-2", className)}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
        </svg>
    );
}
