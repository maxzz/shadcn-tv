import { useState, useEffect, HTMLAttributes, useRef } from "react";
import css from "./flip-clock.module.css";
import { Button } from "@/components/ui/shadcn";
import { classNames } from "@/utils";

export function FlipClock() {
    const [count, setCount] = useState(0);
    const [isActivated, setIsActivated] = useState(true);

    const currentTime = Date.now();
    const time = {
        days: Math.floor(currentTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((currentTime / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((currentTime / 1000 / 60) % 60),
        seconds: Math.floor((currentTime / 1000) % 60)
    };

    useEffect(() => {
        if (!isActivated) {
            return;
        }

        const interval = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isActivated]);

    return (
        <div className="flex flex-col gap-4">
            <Button variant="outline" size="sm" onClick={() => setIsActivated(!isActivated)}>{isActivated ? "Stop" : "Start"}</Button>
            {/* <div className="flip-clock" data-date="2017-02-11"
            // @click="update"
            >
                <tracker v-for="tracker in trackers" :property="tracker" :time="time" v-ref:trackers />
            </div> */}

            <div className={css["flip-clock"]} data-date="2017-02-11">
                <Tracker label={trackers[0]} newNumber={time.days} />
                <Tracker label={trackers[1]} newNumber={time.hours} />
                <Tracker label={trackers[2]} newNumber={time.minutes} />
                <Tracker label={trackers[3]} newNumber={time.seconds} />
            </div>

        </div>
    );
}

const trackers = ["Days", "Hours", "Minutes", "Seconds"];

function Tracker({ newNumber, label, className, ...rest }: { newNumber: number; label: string; } & HTMLAttributes<HTMLSpanElement>) {
    const ref = useRef<HTMLSpanElement>(null);

    const [currentNumber, setCurrentNumber] = useState(newNumber);
    const [previousNumber, setPreviousNumber] = useState(newNumber);

    useEffect(() => {
        if (currentNumber === newNumber) {
            return;
        }

        setPreviousNumber(currentNumber);
        setCurrentNumber(newNumber);

        ref.current?.classList.remove(css["flip"]);
        ref.current?.offsetHeight;
        ref.current?.classList.add(css["flip"]);
    }, [newNumber]);

    return (
        <span ref={ref} className={classNames(css["flip-clock__piece"], css["flip"], className)} {...rest}>
            <Two currentNumber={currentNumber} previousNumber={previousNumber} />
            <span className={css["flip-clock__slot"]}>{label}</span>
        </span>
    );
}

function Two({ currentNumber, previousNumber }: { currentNumber: number; previousNumber: number; }) {

    return <span className={`${css["flip-clock__card"]} ${css["flip-card"]}`}>
        <b className={css["flip-card__top"]}>{currentNumber}</b>
        <b className={css["flip-card__bottom"]} data-value={currentNumber} />
        <b className={css["flip-card__back"]} data-value={previousNumber} />
        <b className={css["flip-card__back-bottom"]} data-value={previousNumber} />
    </span>;
}
