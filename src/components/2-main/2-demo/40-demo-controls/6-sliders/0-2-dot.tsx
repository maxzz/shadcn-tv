export function Dot() {
    return (
        <div className="size-5 bg-white rounded-full shadow-md grid place-items-center">
            <div
                className="rounded-full"
                style={{
                    width: "14px",
                    height: "14px",
                    background: "var(--gauge-value)",
                }} />
        </div>
    );
}
