import { type ReactNode } from "react";
import { atom, PrimitiveAtom, useAtom } from "jotai";
import { classNames } from "@/utils";
import "./step-indicator.css";
import { Button } from "@/components/ui/shadcn";

const orientationAtom = atom<"horizontal" | "vertical">("horizontal");
const stepAtom = atom(0);

export function StepIndicator4() {
    const [orientation, setOrientation] = useAtom(orientationAtom);
    const [step, setStep] = useAtom(stepAtom);
    return (
        <div className="my-4 p-4 bg-muted/50 border border-border">

            <form className={orientation === "horizontal" ? "max-w-xl" : "max-w-lg"}>
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

                <NavButtons stepAtom={stepAtom} orientationAtom={orientationAtom} />
            </form>

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

function NavButtons({ stepAtom, orientationAtom }: { stepAtom: PrimitiveAtom<number>; orientationAtom: PrimitiveAtom<"horizontal" | "vertical">; }) {
    const [orientation, setOrientation] = useAtom(orientationAtom);
    const [step, setStep] = useAtom(stepAtom);
    return (
        <div className="btn-group">
            <Button variant="outline" onClick={() => setOrientation(orientation === "horizontal" ? "vertical" : "horizontal")}>
                {orientation === "horizontal" ? "Vertical" : "Horizontal"}
            </Button>
            
            <button className="btn" type="button" data-action="prev" disabled>Previous</button>
            <button className="btn" type="button" data-action="next">Next</button>
        </div>
    );
}
