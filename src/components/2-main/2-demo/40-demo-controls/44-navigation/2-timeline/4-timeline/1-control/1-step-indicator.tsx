import { type ReactNode } from "react";
import { atom, type PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { classNames } from "@/utils";
import "./step-indicator.css";
import { Button } from "@/components/ui/shadcn";

const horizontalAtom = atom<boolean>(true);
const stepAtom = atom(0);

const nSteps = 5;

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
            <Step stepNumber={0} stepAtom={stepAtom} label="About You" />
            <div className="steps__connector"></div>

            <Step stepNumber={1} stepAtom={stepAtom} label="About Book" />
            <div className="steps__connector"></div>

            <Step stepNumber={2} stepAtom={stepAtom} label="Review" />
            <div className="steps__connector"></div>

            <Step stepNumber={3} stepAtom={stepAtom} label="Signing" />
            <div className="steps__connector"></div>

            <Step stepNumber={4} stepAtom={stepAtom} label="Contract" />
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
