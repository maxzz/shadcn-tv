import { useState } from "react";
import { FlipClock } from "./flip-clock";

// https://codepen.io/shshaw/pen/BzObXp 'Flip clock & countdown, Vue'
// https://codepen.io/shshaw/pen/NBgWLW 'Splitting: 3D Clock' Splitting.js

export * from "./flip-clock";

export function FlipClockDemo() {
    const [initialTime] = useState(
        () => {
            let d = (new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000) % (24 * 60 * 60 * 1000);
            return d; // current local time without days
        }
    );
    return (
        <div className="flex items-center justify-center">
            <FlipClock initialTime={initialTime} />
        </div>
    );
}
