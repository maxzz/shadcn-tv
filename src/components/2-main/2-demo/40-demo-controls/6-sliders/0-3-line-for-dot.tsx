export function LineForDot({ value }: { value: number; }) {
    return (<>
        <div
            className="absolute rounded-full"
            style={{
                left: "12px",
                right: "12px",
                height: "8px",
                top: "50%",
                transform: "translate(0, -50%)",
                background: "var(--gauge-empty)",
            }}
        />
        <div
            className="absolute rounded-full"
            style={{
                left: "12px",
                width: `${value * 3}px`,
                height: "8px",
                top: "50%",
                transform: "translate(0, -50%)",
                background: "var(--gauge-value)",
            }}
        />
    </>);
}

export function LineForDot2({ start, diff }: { start: number; diff: number; }) {
    return (<>
        <div
            className="absolute rounded-full"
            style={{
                left: "12px",
                right: "12px",
                height: "8px",
                top: "50%",
                transform: "translate(0, -50%)",
                background: "var(--gauge-empty)",
            }}
        />

        <div
            className="absolute rounded-full"
            style={{
                left: `${12 + start}px`,
                width: `${diff}px`,
                height: "8px",
                top: "50%",
                transform: "translate(0, -50%)",
                background: "var(--gauge-value)",
            }}
        />
    </>);
}
