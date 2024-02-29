/**
 * @param maskId - Document scope unique id (not selector) for the mask. default: "p1loader".
 * @returns 
 */
export function GradientMaskDefs({ maskId = "p1loader" }: { maskId?: string; } = {}) {
    return (
        <defs>
            <linearGradient id={`${maskId}-grad`} x1={0} y1={0} x2={1} y2={1}>
                <stop offset="0%" />
                <stop offset="100%" stopColor="#fff" />
            </linearGradient>

            <mask id={`${maskId}`}>
                <rect x="0" y="0" width="128" height="128" fill={`url(#${maskId}-grad)`} />
            </mask>
        </defs>
    );
}
