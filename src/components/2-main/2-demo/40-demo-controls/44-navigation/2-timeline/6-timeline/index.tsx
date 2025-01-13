import { type ReactNode, type SVGAttributes } from "react"; //Y: "tailwind css timeline" //https://www.youtube.com/watch?v=9iXKv5A5E9E //https://codepen.io/mfg888/pen/qBozZvj
import { classNames } from "@/utils";

export function Timeline6Codepen() {
    return (
        <div className="my-4 p-4 bg-muted flex flex-col items-start gap-4">

            <section className="flex justify-center">
                <div className="max-w-80">
                    <h2 className="text-xl text-gray-700 mb-7">Recent Updates</h2>
                    <ul>
                        <li className="relative pb-5 flex items-baseline gap-6">
                            <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
                                <Circle />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">18-8-2022</p>
                                <p className="mt-2 text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.</p>
                            </div>
                        </li>
                        <li className="relative flex items-baseline gap-6 pb-5">
                            <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
                                <Circle />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">18-8-2022</p>
                                <p className="mt-2 text-gray-600 text-sm">Lorem ipsum dolor sit amet.</p>
                            </div>
                        </li>
                        <li className="relative flex items-baseline gap-6 pb-5">
                            <div>
                                <Circle />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">18-8-2022</p>
                                <p className="mt-2 text-gray-600 text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est?</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

        </div>
    );
}

function Circle({ className, isLast, ...rest }: SVGAttributes<SVGElement> & { isLast?: boolean }) {
    return (
        <svg className="size-3 fill-gray-400" viewBox="0 0 16 16" {...rest}>
            <circle cx="8" cy="8" r="8" />
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
