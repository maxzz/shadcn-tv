import { useState } from 'react';
import { Dot } from './0-2-dot';
import { LineForDot } from './0-3-line-for-dot';

const demoAGraphData = [
    { key: 0, path: "M7 95H5C2.23858 95 0 97.2386 0 100H12C12 97.2386 9.76142 95 7 95Z", },
    { key: 1, path: "M27 100V97C27 93.6863 24.3137 91 21 91C17.6863 91 15 93.6863 15 97V100H27Z", },
    { key: 2, path: "M42 100V92C42 88.6863 39.3137 86 36 86C32.6863 86 30 88.6863 30 92V100H42Z", },
    { key: 3, path: "M57 100V87C57 83.6863 54.3137 81 51 81C47.6863 81 45 83.6863 45 87V100H57Z", },
    { key: 4, path: "M72 100V82C72 78.6863 69.3137 76 66 76C62.6863 76 60 78.6863 60 82V100H72Z", },
    { key: 5, path: "M87 100V78C87 74.6863 84.3137 72 81 72C77.6863 72 75 74.6863 75 78V100H87Z", },
    { key: 6, path: "M102 100V73C102 69.6863 99.3137 67 96 67C92.6863 67 90 69.6863 90 73V100H102Z", },
    { key: 7, path: "M117 100V68C117 64.6863 114.314 62 111 62C107.686 62 105 64.6863 105 68V100H117Z", },
    { key: 8, path: "M132 100V63C132 59.6863 129.314 57 126 57C122.686 57 120 59.6863 120 63V100H132Z", },
    { key: 9, path: "M147 100V59C147 55.6863 144.314 53 141 53C137.686 53 135 55.6863 135 59V100H147Z", },
    { key: 10, path: "M162 100V54C162 50.6863 159.314 48 156 48C152.686 48 150 50.6863 150 54V100H162Z", },
    { key: 11, path: "M177 100V49C177 45.6863 174.314 43 171 43C167.686 43 165 45.6863 165 49V100H177Z", },
    { key: 12, path: "M192 100V44C192 40.6863 189.314 38 186 38C182.686 38 180 40.6863 180 44V100H192Z", },
    { key: 13, path: "M207 100V40C207 36.6863 204.314 34 201 34C197.686 34 195 36.6863 195 40V100H207Z", },
    { key: 14, path: "M222 100V35C222 31.6863 219.314 29 216 29C212.686 29 210 31.6863 210 35V100H222Z", },
    { key: 15, path: "M237 100V30C237 26.6863 234.314 24 231 24C227.686 24 225 26.6863 225 30V100H237Z", },
    { key: 16, path: "M252 100V25C252 21.6863 249.314 19 246 19C242.686 19 240 21.6863 240 25V100H252Z", },
    { key: 17, path: "M267 100V21C267 17.6863 264.314 15 261 15C257.686 15 255 17.6863 255 21V100H267Z", },
    { key: 18, path: "M282 100V16C282 12.6863 279.314 10 276 10C272.686 10 270 12.6863 270 16V100H282Z", },
    { key: 19, path: "M297 99V11C297 7.68629 294.314 5 291 5C287.686 5 285 7.68629 285 11V99C285 99.5523 285.448 100 286 100H296C296.552 100 297 99.5523 297 99Z", },
];

function DemoAGraph({ value }: { value: number; }) {
    return (
        <svg viewBox="0 0 300 100" fill="none">
            <defs>
                <clipPath id="highlight">
                    <rect width={value * 3} height="100" />
                </clipPath>
            </defs>

            <g id="background">
                {demoAGraphData.map(
                    ({ key, path }) => (
                        <path d={path} className="fill-[var(--gauge-empty)]" key={key} />
                    )
                )}
            </g>

            <g id="foreground" clipPath="url(#highlight)">
                {demoAGraphData.map(
                    ({ key, path }) => (
                        <path d={path} className="fill-[var(--gauge-value)]" key={key} />
                    )
                )}
            </g>
        </svg>
    );
}

export function DemoA() {
    const [value, setValue] = useState(37);
    return (<>
        <div className="px-3">
            <div style={{ width: "300px" }}>
                <DemoAGraph value={value} />
            </div>
        </div>

        <div className="relative" style={{ width: "324px", height: "24px" }}>
            
            <LineForDot value={value} />

            <div className="absolute size-6 grid place-items-center top-0" style={{ left: `${value * 3}px`, }}>
                <Dot />
            </div>

            <input
                type="range"
                id="demoAInput"
                name="demoAInput"
                min={0}
                max={100}
                step={1}
                value={value}
                onChange={(event) => setValue(parseInt(event.target.value, 10))}
            />
        </div>

        <div className="px-3 h-8 font-semibold flex items-center justify-between">
            <div> 0 </div>
            <div> {value} </div>
            <div> 100 </div>
        </div>
    </>);
}
