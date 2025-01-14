import { type ReactNode, type SVGAttributes } from "react";
import { classNames } from "@/utils";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k3pVcsueP80
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 * Prompt: A multi-step loading screen, where the steps are arranged vertically. Each step has a small circle on the left, followed by a one-line description of the text, and a status indicator on the right. The left-hand circles are connected by a thin line that becomes colored-in once the step is complete. Display the loading indicator with 4 steps, where the first is complete, the second is in-progress, and the third and fourth haven't started.
 * tm: https://v0.dev/chat/custom-loading-screen-UzCA6zSiGUB
 * Prompt tm: A multi-step loading screen, where the steps are arranged vertically if there is enough height in the parent container otherwise horizontally. Each step has a small circle on the left, followed by a one-line description of the text, and a status indicator on the right. The left-hand circles are connected by a thin line that becomes colored-in once the step is complete. Display the loading indicator with 4 steps, where the first is complete, the second is in-progress, and the third and fourth haven't started. Make each step as a component customized by params.
 */
export function Timeline5WithAIHardcoded() {
    return (
        <div className="my-4 p-4 bg-muted flex flex-col items-start gap-4 1debug">
            <Step1 label="Fetching inspiration" isActive={true} status="Completed" />
            <Step2 label="Applying your styles" isActive={true} status="In Progress" />
            <Step3 label="Making modifications" isActive={false} status="Not Started" />
            <Step4 label="Final touches" isActive={false} isLast={true} status="Not Started" />
        </div>
    );
}

type StepProps = {
    label: ReactNode;
    isActive: boolean;
    isLast?: boolean;
    status: ReactNode;
};

function Step1({ label, isActive, isLast, status }: StepProps) {
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

function Step2({ label, isActive, isLast, status }: StepProps) {
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

function Step3({ label, isActive, isLast, status }: StepProps) {
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

function Step4({ label, isActive, isLast, status }: StepProps) {
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
