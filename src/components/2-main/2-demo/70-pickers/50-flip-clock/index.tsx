// https://codepen.io/shshaw/pen/BzObXp 'Flip clock & countdown, Vue'
// https://codepen.io/shshaw/pen/NBgWLW 'Splitting: 3D Clock' Splitting.js

import { FlipClock } from "./flip-clock";

export * from "./flip-clock";

export function FlipClockDemo() {
    return (
        <div className="flex items-center justify-center">
            <FlipClock />
        </div>
    );
}
