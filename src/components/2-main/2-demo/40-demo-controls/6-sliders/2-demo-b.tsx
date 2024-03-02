import { ChangeEvent, useState } from 'react';
import { Card } from './0-card';

function DemoBGraph({ start, diff }: { start: number; diff: number; }) {
    return (
        <svg width="300" height="100" viewBox="0 0 300 100" fill="none">
            <g id="background">
                <path
                    d="M300 100H0C0 100 20.121 79.019 30 68C40.127 56.704 49.453 34.101 60 33C69.551 32.003 80 56 90 56C100 56 110.08 40.931 120 33C130.083 24.939 140.16 7.63699 150 7.99999C160.171 8.37499 169.563 28.791 180 37C189.628 44.573 199.889 55.623 210 56C219.894 56.369 230.323 39.006 240 40C250.371 41.066 260.381 55.514 270 65C280.45 75.306 300 100 300 100Z"
                    fill="#E8EBF9" />
            </g>
            <g id="foreground" clipPath="url(#highlight2)">
                <path
                    d="M300 100H0C0 100 20.121 79.019 30 68C40.127 56.704 49.453 34.101 60 33C69.551 32.003 80 56 90 56C100 56 110.08 40.931 120 33C130.083 24.939 140.16 7.63699 150 7.99999C160.171 8.37499 169.563 28.791 180 37C189.628 44.573 199.889 55.623 210 56C219.894 56.369 230.323 39.006 240 40C250.371 41.066 260.381 55.514 270 65C280.45 75.306 300 100 300 100Z"
                    fill="#424E82" />
            </g>
            <defs>
                <clipPath id="highlight2">
                    <rect x={start} width={diff} height="100" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function DemoB() {
    const [valueA, setValueA] = useState(25);
    const [valueB, setValueB] = useState(75);

    const handleChangeA = (event: ChangeEvent<HTMLInputElement>) => {
        setValueA(parseInt(event.target.value, 10));
    };
    const handleChangeB = (event: ChangeEvent<HTMLInputElement>) => {
        setValueB(parseInt(event.target.value, 10));
    };

    const start = Math.min(valueA, valueB) * 3;
    const diff = Math.abs(valueA - valueB) * 3;
    return (
        <Card title="Range">
            <div className="px-3">
                <div style={{ width: "300px" }}>
                    <DemoBGraph start={start} diff={diff} />
                </div>
            </div>
            <div className="relative " style={{ width: "324px", height: "24px" }}>
                <div
                    className="absolute rounded-full bg-[#e8ebf9]"
                    style={{
                        left: "12px",
                        right: "12px",
                        height: "8px",
                        top: "50%",
                        transform: "translate(0, -50%)",
                    }}
                ></div>
                <div
                    className="absolute rounded-full bg-[#424E82]"
                    style={{
                        left: `${12 + start}px`,
                        width: `${diff}px`,
                        height: "8px",
                        top: "50%",
                        transform: "translate(0, -50%)",
                    }}
                ></div>
                <div
                    className="absolute size-6 grid place-items-center top-0"
                    style={{
                        left: `${valueA * 3}px`,
                    }}
                >
                    <div className="size-5 bg-white shadow-md rounded-full grid place-items-center">
                        <div
                            className="rounded-full"
                            style={{
                                width: "14px",
                                height: "14px",
                                background: "#424e82",
                            }}
                        ></div>
                    </div>
                </div>
                <div
                    className="absolute size-6 grid place-items-center"
                    style={{
                        top: 0,
                        left: `${valueB * 3}px`,
                    }}
                >
                    <div className="size-5 bg-white shadow-md rounded-full grid place-items-center">
                        <div
                            className="rounded-full"
                            style={{
                                width: "14px",
                                height: "14px",
                                background: "#424e82",
                            }}
                        ></div>
                    </div>
                </div>
                <input
                    type="range"
                    id="demoBInputA"
                    name="demoBInputA"
                    min={0}
                    max={100}
                    step={1}
                    value={valueA}
                    onChange={handleChangeA} />
                <input
                    type="range"
                    id="demoBInputB"
                    name="demoBInputB"
                    min="0"
                    max="100"
                    step="1"
                    value={valueB}
                    onChange={handleChangeB} />
            </div>
            <div className="flex items-center justify-between px-3 font-semibold h-8">
                <div> 0 </div>
                <div>
                    {Math.min(valueA, valueB)} - {Math.max(valueA, valueB)}
                </div>
                <div> 100 </div>
            </div>
        </Card>
    );
}
