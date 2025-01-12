import { type ReactNode } from "react";
import { atom, PrimitiveAtom, useAtom } from "jotai";
import { classNames } from "@/utils";
import "./step-indicator.css";
import { Button } from "@/components/ui/shadcn";

const horizontalAtom = atom<boolean>(true);
const stepAtom = atom(0);

export function StepIndicator4() {
    const [horizontal, setHorizontal] = useAtom(horizontalAtom);
    const [step, setStep] = useAtom(stepAtom);
    return (
        <div className="my-4 p-4 bg-muted/50 border border-border">

            <div className={classNames("@container/form", horizontal ? "max-w-[96rem]" : "max-w-48")}>
                <div className="steps">
                    <Step step={0} label="About You" />
                    <div className="steps__connector"></div>

                    <Step step={1} label="About Book" />
                    <div className="steps__connector"></div>

                    <Step step={2} label="Review" />
                    <div className="steps__connector"></div>

                    <Step step={3} label="Signing" />
                    <div className="steps__connector"></div>

                    <Step step={4} label="Contract" />
                </div>

            </div>

            <NavButtons stepAtom={stepAtom} horizontalAtom={horizontalAtom} />
        </div>
    );
}

function Step({ step, label }: { step: number; label: ReactNode; }) {
    return (
        <div className="steps__step" data-step={step}>
            <div className="steps__step-number">{step}</div>
            <div className="steps__step-name">{label}</div>
        </div>
    );
}

function NavButtons({ stepAtom, horizontalAtom }: { stepAtom: PrimitiveAtom<number>; horizontalAtom: PrimitiveAtom<boolean>; }) {
    const [horizontal, setHorizontal] = useAtom(horizontalAtom);
    const [step, setStep] = useAtom(stepAtom);
    return (
        <div className="btn-group">
            <Button variant="outline" onClick={() => setHorizontal(h => !h)}>
                {horizontal ? "Horizontal" : "Vertical"}
            </Button>

            <button className="btn" type="button" data-action="prev" disabled>Previous</button>
            <button className="btn" type="button" data-action="next">Next</button>
        </div>
    );
}
