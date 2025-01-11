import { useState } from "react";
import { Step } from "./1-steps-dot";
import { StepConnector } from "./2-steps-line";

export function StepsDemo2() {
    let [step, setStep] = useState(1);
    return (
        <div className={containerClasses}>

            <div className="flex items-center justify-between rounded p-8">
                <Step step={1} currentStep={step} /> <StepConnector step={1} currentStep={step} />
                <Step step={2} currentStep={step} /> <StepConnector step={2} currentStep={step} />
                <Step step={3} currentStep={step} /> <StepConnector step={3} currentStep={step} />
                <Step step={4} currentStep={step} />
            </div>



            <div className="mt-10 flex justify-between">
                <button
                    onClick={() => setStep(step < 2 ? step : step - 1)}
                    className={`${step === 1 ? "pointer-events-none opacity-50" : ""} ${nextButtonClasses}`}
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
    );
}

const containerClasses = "\
flex-1 \
p-4 \
min-w-96 \
min-h-full \
\
bg-background \
1backdrop-blur-xl \
1sm:aspect-[4/3] \
1md:aspect-[2/1] \
\
flex flex-col items-center justify-center \
";

const container2Classes = "mx-auto w-full max-w-md rounded-lg bg-white shadow-xl";

const prevButtonClasses = "\
px-2 py-1 \
text-neutral-400 hover:text-neutral-700 \
rounded \
transition \
duration-350 \
";

const nextButtonClasses = "\
px-3.5 py-1.5 \
tracking-tight \
font-medium \
text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 \
rounded-full \
transition \
duration-350 \
";
