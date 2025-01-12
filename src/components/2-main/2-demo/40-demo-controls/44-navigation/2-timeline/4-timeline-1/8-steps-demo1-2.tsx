import { useState } from "react";
import { Step } from "./1-steps-dot";
import { StepConnector } from "./2-steps-line";

export function StepsDemo12() {
    let [step, setStep] = useState(1);
    return (
        <div className={containerClasses}>

            <div className="px-8 rounded flex items-center justify-between">
                <Step step={1} currentStep={step} /> <StepConnector step={1} currentStep={step} />
                <Step step={2} currentStep={step} /> <StepConnector step={2} currentStep={step} />
                <Step step={3} currentStep={step} /> <StepConnector step={3} currentStep={step} />
                <Step step={4} currentStep={step} />
            </div>

            <div className="flex items-center justify-between gap-2">
                <button
                    onClick={() => setStep(step < 2 ? step : step - 1)}
                    className={`${step === 1 ? buttonDisabledClasses : ""} ${buttonClasses}`}
                >
                    Back
                </button>

                <button
                    onClick={() => setStep(step > 4 ? step : step + 1)}
                    className={`${step > 4 ? buttonDisabledClasses : ""} ${buttonClasses}`}
                >
                    Continue
                </button>
            </div>

        </div>
    );
}

const containerClasses = "\
flex-1 \
my-4 p-4 min-w-96 min-h-full \
\
bg-muted \
1backdrop-blur-xl \
1sm:aspect-[4/3] \
1md:aspect-[2/1] \
\
flex flex-col items-center justify-center gap-4 \
";

const buttonDisabledClasses = "pointer-events-none opacity-50";

const buttonClasses = "\
px-3.5 py-1.5 \
font-medium tracking-tight \
text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 \
rounded-full transition duration-350 \
";
