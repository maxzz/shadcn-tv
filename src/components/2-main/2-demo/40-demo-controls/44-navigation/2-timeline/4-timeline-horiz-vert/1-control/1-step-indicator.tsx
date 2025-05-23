import { type ReactNode } from "react";
import { atom, type PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { classNames } from "@/utils";
import "./step-indicator.css";
import { Button } from "@/components/ui/shadcn";

const horizontalAtom = atom<boolean>(true);
const stepAtom = atom(0);

const nSteps = 5;

type StepIndicatorCtx = {
    items: ReactNode[];                     // Array of labels for each step
    stepAtom: PrimitiveAtom<number>;        // Current step
    horizontalAtom: PrimitiveAtom<boolean>; // orientation of the step indicator (horizontal or vertical)
};

const stepItems: ReactNode[] = [
    <div className="">About You</div>,
    <div className="flex flex-col items-center text-xs"><div className="font-semibold">About Book</div> <div className="text-[.65rem]">Second line</div></div>,
    "Review",
    "Signing",
    "Contract",
];

export function StepIndicator4() {
    const horizontal = useAtomValue(horizontalAtom);
    return (
        <div className="my-4 p-4 bg-muted/50 border border-border">
            <div className={classNames("@container/form", horizontal ? "max-w-xl" : "max-w-48")}>
                <StepIndicatorBody stepAtom={stepAtom} />
            </div>
            <NavButtons stepAtom={stepAtom} horizontalAtom={horizontalAtom} />
        </div>
    );
}

function StepIndicatorBody({ stepAtom }: { stepAtom: PrimitiveAtom<number>; }) {
    return (
        <div className="steps">
            {stepItems.map(
                (label, idx) => {
                    return (<>
                        <Step stepNumber={idx} label={label} stepAtom={stepAtom} key={idx} />
                        {idx < stepItems.length - 1 && <div className="steps__connector" />}
                    </>);
                })
            }
        </div>
    );
}

function Step({ stepNumber, label, stepAtom }: { stepNumber: number; label: ReactNode; stepAtom: PrimitiveAtom<number>; }) {
    const [step, setStep] = useAtom(stepAtom);
    const completedClasses = step > stepNumber && "steps__step--done";
    const currentClasses = step === stepNumber && "steps__step--current";
    return (
        <div
            data-step={stepNumber}
            className={classNames("steps__step cursor-pointer", completedClasses, currentClasses)}
            onClick={() => setStep(stepNumber)}
        >
            <div className="steps__step-number">{stepNumber + 1}</div>
            <div className="steps__step-name">{label}</div>
        </div>
    );
}

function NavButtons({ stepAtom, horizontalAtom }: { stepAtom: PrimitiveAtom<number>; horizontalAtom: PrimitiveAtom<boolean>; }) {
    const [horizontal, setHorizontal] = useAtom(horizontalAtom);
    const [step, setStep] = useAtom(stepAtom);
    return (
        <div className="mt-4 grid grid-cols-[1fr,auto,auto] gap-2">

            <Button variant="outline" className="justify-self-start" onClick={() => setHorizontal(h => !h)}>
                {horizontal ? "Prefer Horizontal" : "Vertical"}
            </Button>

            <Button
                variant="outline"
                onClick={() => setStep((step) => step > 0 ? step - 1 : 0)}
                disabled={step === 0}
            >
                Prev
            </Button>

            <Button
                variant="outline"
                onClick={() => setStep((step) => (step + 1) % nSteps)}
                disabled={step === nSteps - 1}
            >
                Next
            </Button>
        </div>
    );
}
