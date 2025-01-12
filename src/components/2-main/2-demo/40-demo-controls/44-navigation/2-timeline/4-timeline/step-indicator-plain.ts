//https://codepen.io/jkantner/pen/KKLXjbK

// window.addEventListener("DOMContentLoaded",() => {
// 	const steps = new StepIndicator(".steps");
// });

class StepIndicator {
    /** Element used for this step indicator */
    el: HTMLElement | null;
    /** Number of steps */
    steps = 5;

    private _step = 0;
    get step(): number {
        return this._step;
    }
    set step(value: number) {
        this.displayStep(value);
        this._step = value;
        this.checkExtremes();
    }
    /**
     * @param el CSS selector of the step indicator element
     */
    constructor(el: string) {
        this.el = document.querySelector(el);
        document.addEventListener("click", this.clickAction.bind(this));
        this.displayStep(this.step);
        this.checkExtremes();
    }
    /**
     * @param e Click event
     */
    clickAction(e: Event): void {
        const button = e.target as HTMLButtonElement;
        const actionName = button?.getAttribute("data-action");

        if (actionName === "prev") {
            this.prev();
        } else if (actionName === "next") {
            this.next();
        }
    }
    /** Go to the previous step. */
    prev(): void {
        if (this.step > 0) {
            --this.step;
        }
    }
    /** Go to the next step. */
    next(): void {
        if (this.step < this.steps - 1) {
            ++this.step;
        }
    }
    /** Disable the Previous or Next button if hitting the first or last step. */
    checkExtremes(): void {
        const prevBtnEl = document.querySelector(`[data-action="prev"]`) as HTMLButtonElement;
        const nextBtnEl = document.querySelector(`[data-action="next"]`) as HTMLButtonElement;

        if (prevBtnEl) {
            prevBtnEl.disabled = this.step <= 0;
        }
        if (nextBtnEl) {
            nextBtnEl.disabled = this.step >= this.steps - 1;
        }
    }
    /**
     * Update the indicator for a targeted step.
     * @param targetStep Index of the step
     */
    displayStep(targetStep: number) {
        const currentClass = "steps__step--current";
        const doneClass = "steps__step--done";

        for (let idx = 0; idx < this.steps; ++idx) {
            const stepEl = this.el?.querySelector(`[data-step="${idx}"]`);
            stepEl?.classList.remove(currentClass, doneClass);

            if (idx < targetStep) {
                stepEl?.classList.add(doneClass);
            } else if (idx === targetStep) {
                stepEl?.classList.add(currentClass);
            }
        }
    }
}
