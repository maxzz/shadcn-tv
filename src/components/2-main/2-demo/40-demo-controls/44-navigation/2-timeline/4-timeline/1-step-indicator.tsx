import "./step-indicator.css";

export function StepIndicator4() {
    return (
        <div className="my-4 p-4 bg-muted">

            <form>
                <div className="steps">
                    <div className="steps__step" data-step="0">
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
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn" type="button" data-action="prev" disabled>Previous</button>
                    <button className="btn" type="button" data-action="next">Next</button>
                </div>
            </form>

        </div>
    );
}
