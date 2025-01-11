import { useState } from "react";
import { Step } from "./1-steps-dot";

export function StepsDemo2() {
    let [step, setStep] = useState(1);
    return (
        <div className={containerClasses}>
            <div className={container2Classes}>

                <div className="flex justify-between rounded p-8">
                    <Step step={1} currentStep={step} />
                    <Step step={2} currentStep={step} />
                    <Step step={3} currentStep={step} />
                    <Step step={4} currentStep={step} />
                </div>

                {/* Dynamic content based on `step` */}
                <div className="space-y-2 px-8">
                    <div className="h-4 w-5/6 rounded bg-neutral-100" />
                    <div className="h-4 rounded bg-neutral-100" />
                    <div className="h-4 w-4/6 rounded bg-neutral-100" />
                </div>

                <div className="px-8 pb-8">
                    <div className="mt-10 flex justify-between gap-4">
                        <button
                            onClick={() => setStep(step < 2 ? step : step - 1)}
                            className={`${step === 1 ? "pointer-events-none opacity-50" : ""} ${prevButtonClasses}`}
                        >
                            Back
                        </button>

                        <button
                            onClick={() => setStep(step > 4 ? step : step + 1)}
                            className={`${step > 4 ? "pointer-events-none opacity-50" : ""} ${nextButtonClasses}`}
                        >
                            Continue
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

const containerClasses = "\
flex-1 \
p-4 \
min-w-96 \
min-h-full \
\
bg-green-500/40 \
1backdrop-blur-xl \
1sm:aspect-[4/3] \
1md:aspect-[2/1] \
\
flex flex-col items-center justify-center \
";

const container2Classes = "mx-auto w-full max-w-md rounded-lg bg-white shadow-xl";

const prevButtonClasses = "\
px-2 py-1 \
text-neutral-400 \
hover:text-neutral-700 \
transition \
duration-350 \
rounded \
";

const nextButtonClasses = "\
px-3.5 py-1.5 \
rounded-full \
bg-blue-500 \
font-medium \
tracking-tight \
text-white \
hover:bg-blue-600 \
active:bg-blue-700 \
transition \
duration-350 \
flex items-center justify-center \
";
