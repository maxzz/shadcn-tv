import { useState, useEffect } from "react";
import css from "./flip-clock.module.css";
import { Button } from "@/components/ui/shadcn";

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
                <span className={css["flip-clock__piece"]} style={{}}>
                    <Tracker newNumber={count} />
                    <span className={css["flip-clock__slot"]}>Days</span>
                </span>
                <span className={`${css["flip-clock__piece"]} ${css["flip"]}`} style={{}}>
                    <Tracker newNumber={7} />
                    <span className={css["flip-clock__slot"]}>Hours</span>
                </span>
                <span className={`${css["flip-clock__piece"]} ${css["flip"]}`} style={{}}>
                    <Tracker newNumber={46} />
                    <span className={css["flip-clock__slot"]}>Minutes</span>
                </span>
                <span className={`${css["flip-clock__piece"]} ${css["flip"]}`} style={{}}>
                    <Tracker newNumber={20} />
                    <span className={css["flip-clock__slot"]}>Seconds</span>
                </span>
            </div>

        </div>
    );
}

function Tracker({ newNumber }: { newNumber: number; }) {

    const [currentNumber, setCurrentNumber] = useState(newNumber);
    const [previousNumber, setPreviousNumber] = useState(newNumber);

    useEffect(() => {
        if (currentNumber === newNumber) {
            return;
        }

        setPreviousNumber(currentNumber);
        setCurrentNumber(newNumber);
    }, [newNumber]);

    return <span className={`${css["flip-clock__card"]} ${css["flip-card"]}`}>
        <b className={css["flip-card__top"]}>{currentNumber}</b>
        <b className={css["flip-card__bottom"]} data-value={currentNumber} />
        <b className={css["flip-card__back"]} data-value={previousNumber} />
        <b className={css["flip-card__back-bottom"]} data-value={previousNumber} />
    </span>;
}
