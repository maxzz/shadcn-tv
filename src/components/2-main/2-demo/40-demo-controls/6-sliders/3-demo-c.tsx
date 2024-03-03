import { ChangeEvent, useState } from 'react';
import { Dot } from './0-2-dot';
import { LineForDot2 } from './0-3-line-for-dot';

function Marker({ value }: { value: number; }) {
    return (
        <div
            className="absolute size-6 grid place-items-center"
            style={{
                top: "-40px",
                left: `${value * 3}px`,
            }}
        >
            <div className="relative w-full h-full text-sm">
                <div
                    className="absolute grid place-items-center text-white font-semibold rounded-md"
                    style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "var(--gauge-value)",
                        width: "50px",
                        height: "30px",
                    }}
                >
                    ${value * 10}
                </div>

                <div
                    className="absolute"
                    style={{
                        left: "50%",
                        top: "150%",
                        transform: "translate(-50%, -50%)",
                        width: "15px",
                        height: "30px",
                    }}
                >
                    <svg className="w-full" viewBox="0 0 22 30" fill="none">
                        <path
                            d="M12.874 26.6557C12.3017 28.5519 9.61685 28.5519 9.04458 26.6557L0.999992 0H20.9186L12.874 26.6557Z"
                            fill="var(--gauge-value)" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export function DemoC() {
    const [valueA, setValueA] = useState(25);
    const [valueB, setValueB] = useState(75);

    const start = Math.min(valueA, valueB) * 3;
    const diff = Math.abs(valueA - valueB) * 3;
    return (<>
        <div style={{ padding: "0px 12px" }}>
            <div style={{ width: "300px", height: "100px" }} />
        </div>
        <div className="relative " style={{ width: "324px", height: "24px" }}>

            <LineForDot2 start={start} diff={diff} />

            <div className="absolute size-6 grid place-items-center" style={{ top: 0, left: `${valueA * 3}px`, }}>
                <Dot />
            </div>

            <div className="absolute size-6 grid place-items-center" style={{ top: 0, left: `${valueB * 3}px`, }}>
                <Dot />
            </div>

            <Marker value={valueA} />
            <Marker value={valueB} />

            <input
                type="range"
                id="rangeInput"
                name="rangeInput"
                min={0}
                max={100}
                step={1}
                value={valueA}
                onChange={(event) => setValueA(parseInt(event.target.value, 10))}
            />
            <input
                type="range"
                id="rangeInput"
                name="rangeInput"
                min="0"
                max="100"
                step="1"
                value={valueB}
                onChange={(event) => setValueB(parseInt(event.target.value, 10))}
            />
        </div>

        <div className="flex items-center justify-between px-3 font-semibold h-8">
            <div> $0 </div>
            <div> $1000 </div>
        </div>
    </>);
}
