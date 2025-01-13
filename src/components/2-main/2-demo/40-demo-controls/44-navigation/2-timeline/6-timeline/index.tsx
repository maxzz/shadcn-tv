import { type ReactNode, type SVGAttributes } from "react"; //Y: "tailwind css timeline" //https://www.youtube.com/watch?v=9iXKv5A5E9E //https://codepen.io/mfg888/pen/qBozZvj
import { classNames } from "@/utils";

export function Timeline6Codepen() {
    return (
        <div className="my-4 p-4 bg-muted flex flex-col items-start gap-4">

            <section className="flex justify-center">
                <div className="max-w-80 [--size:35px] [--linew:2px]">
                    <h2 className="mb-4 text-xl text-gray-700">Recent Updates</h2>
                    <ul>
                        <li className={liClasses}>
                            <Circle />
                            <div className={textClasses}>
                                <p className={titleClasses}>18-8-2022</p>
                                <p className={explanationClasses}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.</p>
                            </div>
                        </li>
                        <li className={liClasses}>
                            <Circle />
                            <div className={textClasses}>
                                <p className={titleClasses}>18-8-2022</p>
                                <p className={explanationClasses}>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </li>
                        <li className={liClasses}>
                            <Circle isLast />
                            <div className={textClasses}>
                                <p className={titleClasses}>18-8-2022</p>
                                <p className={explanationClasses}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est?</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

        </div>
    );
}

const liClasses = "relative pb-5 flex 1items-baseline items-top gap-4";

const lineClasses = "\
[line-height:var(--size)] \
before:absolute \
before:left-[calc(var(--size)/2-calc(var(--linew)/2))] \
before:top-[calc(var(--size))] \
before:h-[calc(100%-var(--size))] \
before:1h-full \
before:w-[var(--linew)] \
before:bg-gray-400 \
";

//const textClasses = "-mt-[calc(var(--size)/2)]";
const textClasses = "";
// const titleClasses = "text-sm font-bold text-gray-600";
// const titleClasses = "mt-[calc(var(--size)/2)] text-sm font-bold text-gray-600"; // There should be also a half of the font size to make it look good.
const titleClasses = "mt-[calc(var(--size)/2)] -translate-y-1/2 text-sm font-bold text-gray-600"; // OK but not perfect; explanation should be shifted

const explanationClasses = "-mt-2 text-gray-600 text-sm";

function Circle({ isLast, ...rest }: SVGAttributes<SVGElement> & { isLast?: boolean; }) {
    const circleClasses = isLast ? "" : lineClasses;
    return (
        <div className={circleClasses}>
            {/* <CircleIcon {...rest} /> */}
            {/* <CheckIcon className="size-[var(--size)] border border-foreground rounded-full" {...rest} /> */}
            <LoaderIcon className="p-1 size-[var(--size)] border border-foreground rounded-full 1animate-spin [animation-duration:20s]" {...rest} />
        </div>
    );
}

function CircleIcon({ className, ...rest }: SVGAttributes<SVGElement>) {
    return (
        <svg className="size-[var(--size)] fill-gray-400/50" viewBox="0 0 24 24" {...rest}>
            <circle cx="12" cy="12" r="12" />
        </svg>
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
