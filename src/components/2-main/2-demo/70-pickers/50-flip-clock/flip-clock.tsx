import { useState, useEffect, HTMLAttributes, useRef, useMemo } from "react";
import { Button } from "@/components/ui/shadcn";
import { classNames } from "@/utils";
import css from "./flip-clock.module.css";

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
    const currStr = currentNumber.toString().padStart(2, "0");
    const prevStr = previousNumber.toString().padStart(2, "0");
    return <span className={`${css["flip-clock__card"]} ${css["flip-card"]}`}>
        <b className={css["flip-card__top"]}>{currStr}</b>
        <b className={css["flip-card__bottom"]} data-value={currStr} />
        <b className={css["flip-card__back"]} data-value={prevStr} />
        <b className={css["flip-card__back-bottom"]} data-value={prevStr} />
    </span>;
}

const trackers = ["Days", "Hours", "Minutes", "Seconds"];

function getTimeArray(time: number): number[] {
    return [
        Math.floor(time / (1000 * 60 * 60 * 24)),    // days
        Math.floor((time / (1000 * 60 * 60)) % 24),  // hours
        Math.floor((time / 1000 / 60) % 60),         // minutes
        Math.floor((time / 1000) % 60),              // seconds
    ];
}

export function FlipClock({initialTime, add = false}: {initialTime: number; add?: boolean;}) {
    const [count, setCount] = useState(initialTime);
    const [isActivated, setIsActivated] = useState(true);
    const timeArr = useMemo(() => getTimeArray(count), [count]);

    useEffect(() => {
        if (!isActivated) {
            return;
        }
        const interval = setInterval(() => setCount((count) => count + (add ? 1: -1) * 1000), 1000);
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
                <Tracker label={trackers[0]} newNumber={timeArr[0]} />
                <Tracker label={trackers[1]} newNumber={timeArr[1]} />
                <Tracker label={trackers[2]} newNumber={timeArr[2]} />
                <Tracker label={trackers[3]} newNumber={timeArr[3]} />
            </div>

        </div>
    );
}
