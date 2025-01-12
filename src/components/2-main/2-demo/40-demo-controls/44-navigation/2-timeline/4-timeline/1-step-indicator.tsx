import { type ReactNode } from "react";
import { classNames } from "@/utils";
import "./step-indicator.css";

export function StepIndicator4() {
    return (
        <div className="my-4 p-4 bg-muted">

            <form>
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

                    {/* <div className="steps__step" data-step="0">
                        <div className="steps__step-number">1</div>
                        <div className="steps__step-name">About You</div>
                    </div>
                    <div className="steps__connector"></div>

                    <div className="steps__step" data-step="1">
                        <div className="steps__step-number">2</div>
                        <div className="steps__step-name">About Book</div>
                    </div>
                    <div className="steps__connector"></div>

                    <div className="steps__step" data-step="2">
                        <div className="steps__step-number">3</div>
                        <div className="steps__step-name">Review</div>
                    </div>
                    <div className="steps__connector"></div>

                    <div className="steps__step" data-step="3">
                        <div className="steps__step-number">4</div>
                        <div className="steps__step-name">Signing</div>
                    </div>
                    <div className="steps__connector"></div>

                    <div className="steps__step" data-step="4">
                        <div className="steps__step-number">5</div>
                        <div className="steps__step-name">Contract</div>
                    </div> */}
                </div>

                <div className="btn-group">
                    <button className="btn" type="button" data-action="prev" disabled>Previous</button>
                    <button className="btn" type="button" data-action="next">Next</button>
                </div>
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
