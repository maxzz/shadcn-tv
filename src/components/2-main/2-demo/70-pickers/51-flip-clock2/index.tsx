import { useEffect, useRef, useState } from "react";
import { FlipClock2 } from "./flip-clock2";
import { classNames } from "@/utils";

export function FlipClock2Demo() {
    return (
        <div className="flex items-center justify-center">
        </div>
    );
}

interface TimerCharProps {
    char: string;
}

const TimerChar: React.FC<TimerCharProps> = (props: TimerCharProps) => {
    const ref: React.MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const colon: boolean = props.char === ":";

    if (colon) {
        return (
            <h1 className="timer-char colon">:</h1>
        );
    }

    const number: number = parseInt(props.char);

    function getCharSlider(): JSX.Element[] {
        let options: JSX.Element[] = [];

        for (let i: number = 0; i <= 9; i++) {
            const classes: string = classNames("timer-char-slider-option", number === i && 'active');

            options.push(<span key={i} className={classes}>{i}</span>);
        }

        const height: number = ref.current ? ref.current.offsetHeight : 0, top: string = `${number * height * -1}px`;

        return (
            <div className="timer-char-slider" style={{ top }}>
                {options}
            </div>
        );
    }

    return (
        <div ref={ref} className="timer-char number">{getCharSlider()}</div>
    );
};

function Timer() {
    const [date, setDateTo] = useState<Date>(new Date());

    useEffect(
        () => {
            const interval: NodeJS.Timeout = setInterval(() => {
                const update: Date = new Date();

                if (update.getSeconds() !== date.getSeconds()) {
                    setDateTo(update);
                }
            }, 100);

            return () => {
                clearInterval(interval);
            };
        }, [date]
    );

    const formatSegment = (segment: number): string => {
        return segment < 10 ? `0${segment}` : `${segment}`;
    };

    const getHours = (hours: number): string => {
        return hours % 12 === 0 ? 12 : hours % 12;
    };

    const getTime = (): string => {
        const hours: string = getHours(date.getHours()), minutes: string = date.getMinutes(), seconds: string = date.getSeconds();

        return `${formatSegment(hours)}:${formatSegment(minutes)}:${formatSegment(seconds)}`;
    };

    const getChars = (): JSX.Element[] => {
        return getTime().split("").map((char: string, index: number) => (
            <TimerChar key={index} char={char} />
        ));
    };

    return (
        <div id="timer">
            <div id="timer-text">{getChars()}</div>
        </div>
    );
}

function App2() {
    return (
        <div id="app">
            <Timer />
        </div>
    );
}
