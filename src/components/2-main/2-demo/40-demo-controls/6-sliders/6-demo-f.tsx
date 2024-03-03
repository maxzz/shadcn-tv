import { ChangeEvent, useState } from 'react';
import { Card } from './0-1-card';

function deriveData(index: number, value: number) {
    const r1 = 130;

    const r2 = 150;
    const r3 = 140;
    const delta = Math.PI / 40;
    const angle = delta * index - Math.PI;

    const ss = Math.sin(angle);
    const cc = Math.cos(angle);

    const rs = index % 5 === 0 ? r1 : r3;

    const x1 = rs * cc;
    const y1 = rs * ss;
    const x2 = r2 * cc;
    const y2 = r2 * ss;

    const color = Math.ceil(value * (41 / 100)) > index ? "#424E82" : "#E8EBF9";
    return { x1, y1, x2, y2, color };
}
function Tick({ index, value }: { index: number; value: number; }) {
    const { x1, y1, x2, y2, color } = deriveData(index, value);
    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round" />
    );
}

export function DemoF() {
    const [value, setValue] = useState(32);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(event.target.value, 10));
    };
    return (
        <Card title="Gauge">
            <div style={{ padding: "0px 12px" }}>
                <div className="relative" style={{ width: "300px" }}>
                    <svg width="300" height="180" viewBox="0 0 300 180" fill="none">
                        <rect width="300" height="180" fill="white" />

                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M152.991 34.67C152.706 30.9785 147.294 30.9785 147.009 34.67L138.696 142.139C136.395 144.776 135 148.225 135 152C135 160.284 141.716 167 150 167C158.284 167 165 160.284 165 152C165 148.225 163.606 144.776 161.304 142.139L152.991 34.67Z"
                            fill="#424E82"
                            transform={`rotate(${-90 + 1.8 * value}, 150, 152)`} />

                        <g transform="translate(150, 152)">
                            <circle r="8" fill="#FFF" />
                            {Array(41)
                                .fill(0)
                                .map((_, i) => (
                                    <Tick key={i} index={i} value={value} />
                                ))}
                        </g>
                    </svg>
                </div>
            </div>
            <div className="relative " style={{ width: "324px", height: "24px" }}>
                <div
                    className="absolute rounded-full"
                    style={{
                        left: "12px",
                        right: "12px",
                        height: "8px",
                        top: "50%",
                        transform: "translate(0, -50%)",
                        background: "#e8ebf9",
                    }}
                ></div>
                <div
                    className="absolute rounded-full"
                    style={{
                        left: "12px",
                        width: `${value * 3}px`,
                        height: "8px",
                        top: "50%",
                        transform: "translate(0, -50%)",
                        background: "#424E82",
                    }}
                ></div>
                <div
                    className="absolute size-6 grid place-items-center"
                    style={{
                        top: 0,
                        left: `${value * 3}px`,
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
                    id="rangeInput"
                    name="rangeInput"
                    min={0}
                    max={100}
                    step={1}
                    value={value}
                    onChange={handleChange} />
            </div>
            <div className="flex items-center justify-between px-3 font-semibold h-8">
                <div> 0 </div>
                <div> {value} </div>

                <div> 100 </div>
            </div>
        </Card>
    );
}
