import { type ReactNode, type SVGAttributes } from "react";
import { classNames } from "@/utils";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k3pVcsueP80
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export function StepsDemo5() {
    return (
        <div className="flex flex-col items-start gap-4 p-16">
            <NewFunction1 label="Fetching inspiration" isActive={true} status="Completed" />
            <NewFunction2 label="Applying your styles" isActive={true} status="In Progress" />
            <NewFunction3 label="Making modifications" isActive={false} status="Not Started" />
            <NewFunction4 label="Final touches" isActive={false} isLast={true} status="Not Started" />
        </div>
    );
}

function NewFunction1({ label, isActive, isLast, status }: { label: ReactNode; isActive: boolean; isLast?: boolean; status: ReactNode }) {
    const circleClasses = isActive ? "bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900" : "bg-gray-300 dark:bg-gray-700";
    const circleFrameClasses = isActive ? "border-gray-900 dark:border-gray-50" : "border-gray-300 dark:border-gray-700";
    const lineClasses = isActive ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-300 dark:bg-gray-50";
    const textClasses = isActive ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400";
    return (
        <div className="flex items-start gap-4 w-96">
            <div className="flex flex-col items-center">
                <div className="relative size-6">
                    <div className={`absolute inset-0 flex items-center justify-center rounded-full ${circleClasses}`}>
                        <CheckIcon className="size-4" />
                    </div>
                    <div className={`absolute inset-0 rounded-full border-2 ${circleFrameClasses}`} />
                </div>
                {!isLast && <div className={`-mb-4 w-[2px] h-10 ${lineClasses}`} />}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
            </div>
            <div className={`text-sm font-medium ${textClasses}`}>{status}</div>
        </div>
    );
}

function NewFunction2({ label, isActive, isLast, status }: { label: ReactNode; isActive: boolean; isLast?: boolean; status: ReactNode }) {
    const circleClasses = isActive ? "bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900" : "bg-gray-300 dark:bg-gray-700";
    const circleFrameClasses = isActive ? "border-gray-900 dark:border-gray-50" : "border-gray-300 dark:border-gray-700";
    const lineClasses = isActive ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-300 dark:bg-gray-50";
    const textClasses = isActive ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400";
    return (
        <div className="flex items-start gap-4 w-96">
            <div className="flex flex-col items-center">
                <div className="relative size-6">
                    <div className={`absolute inset-0 flex items-center justify-center rounded-full ${circleClasses}`}>
                        <LoaderIcon className="size-4 animate-spin" />
                    </div>
                    <div className={`absolute inset-0 rounded-full border-2 ${circleFrameClasses}`} />
                </div>
                {!isLast && <div className={`-mb-4 w-[2px] h-10 ${lineClasses}`} />}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
            </div>
            <div className={`text-sm font-medium ${textClasses}`}>{status}</div>
        </div>
    );
}

function NewFunction3({ label, isActive, isLast, status }: { label: ReactNode; isActive: boolean; isLast?: boolean; status: ReactNode }) {
    const circleClasses = isActive ? "bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900" : "bg-gray-300 dark:bg-gray-700";
    const circleFrameClasses = isActive ? "border-gray-900 dark:border-gray-50" : "border-gray-300 dark:border-gray-700";
    const lineClasses = isActive ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-300 dark:bg-gray-50";
    const textClasses = isActive ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400";
    return (
        <div className="flex items-start gap-4 w-96">
            <div className="flex flex-col items-center">
                <div className="relative size-6">
                    <div className={`absolute inset-0 flex items-center justify-center rounded-full ${circleClasses}`}>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">3</span>
                    </div>
                    <div className={`absolute inset-0 rounded-full border-2 ${circleFrameClasses}`} />
                </div>
                {!isLast && <div className={`-mb-4 w-[2px] h-10 ${lineClasses}`} />}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
            </div>
            <div className={`text-sm font-medium ${textClasses}`}>{status}</div>
        </div>
    );
}

function NewFunction4({ label, isActive, isLast, status }: { label: ReactNode; isActive: boolean; isLast?: boolean; status: ReactNode }) {
    const circleClasses = isActive ? "bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900" : "bg-gray-300 dark:bg-gray-700";
    const circleFrameClasses = isActive ? "border-gray-900 dark:border-gray-50" : "border-gray-300 dark:border-gray-700";
    const lineClasses = isActive ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-300 dark:bg-gray-50";
    const textClasses = isActive ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400";
    return (
        <div className="flex items-start gap-4 w-96">
            <div className="flex flex-col items-center">
                <div className="relative size-6">
                    <div className={`absolute inset-0 flex items-center justify-center rounded-full ${circleClasses}`}>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4</span>
                    </div>
                    <div className={`absolute inset-0 rounded-full border-2 ${circleFrameClasses}`} />
                </div>
                {!isLast && <div className={`-mb-4 w-[2px] h-10 ${lineClasses}`} />}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
            </div>
            <div className={`text-sm font-medium ${textClasses}`}>{status}</div>
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
