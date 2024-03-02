import { ChangeEvent, useState } from 'react';
import { Card } from './Card';


export function DemoE() {
    const [value, setValue] = useState(20);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(event.target.value, 10));
    };
    return (
        <Card title="Precentage">
            <div style={{ height: "30px" }}></div>
            <div style={{ padding: "0px 12px" }}>
                <div className="relative" style={{ width: "300px" }}>
                    <svg width="300" height="150" viewBox="0 0 300 150" fill="none">
                        <path
                            d="M12 150C12 131.878 15.5695 113.933 22.5046 97.1897C29.4398 80.4467 39.6048 65.2337 52.4193 52.4193C65.2338 39.6048 80.4468 29.4398 97.1897 22.5046C113.933 15.5695 131.878 12 150 12C168.122 12 186.067 15.5695 202.81 22.5046C219.553 29.4398 234.766 39.6048 247.581 52.4193C260.395 65.2338 270.56 80.4468 277.495 97.1897C284.431 113.933 288 131.878 288 150"
                            stroke="#E8EBF9"
                            strokeWidth="22" />
                        <path
                            strokeDasharray="434"
                            strokeDashoffset={`${434 - 4.34 * value}`}
                            d="M12 150C12 131.878 15.5695 113.933 22.5046 97.1897C29.4398 80.4467 39.6048 65.2337 52.4193 52.4193C65.2338 39.6048 80.4468 29.4398 97.1897 22.5046C113.933 15.5695 131.878 12 150 12C168.122 12 186.067 15.5695 202.81 22.5046C219.553 29.4398 234.766 39.6048 247.581 52.4193C260.395 65.2338 270.56 80.4468 277.495 97.1897C284.431 113.933 288 131.878 288 150"
                            stroke="#424E82"
                            strokeWidth="22"
                            strokeLinecap="round" />
                    </svg>
                    <div
                        className="absolute text-4xl font-bold"
                        style={{
                            left: "50%",
                            top: "75%",
                            transform: "translate(-50%, -50%)",
                            color: "#424E82",
                        }}
                    >
                        {value}%
                    </div>
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
                    className="absolute grid place-items-center"
                    style={{
                        width: "24px",
                        height: "24px",
                        top: 0,
                        left: `${value * 3}px`,
                    }}
                >
                    <div
                        className="bg-white shadow-md rounded-full grid place-items-center"
                        style={{
                            width: "20px",
                            height: "20px",
                        }}
                    >
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
                <div> 100 </div>
            </div>
        </Card>
    );
}
