/**
 * @param maskId - Document scope unique id (not selector) for the mask. default: "p1loader".
 * @returns 
 */
export function GradientMask({ maskId = "p1loader" }: { maskId?: string; } = {}) {
    return (
        <defs>
            <linearGradient id={`${maskId}-grad`} x1={0} y1={0} x2={1} y2={1}>
                <stop offset="0%" />
                <stop offset="100%" stopColor="#fff" />
            </linearGradient>

            <mask id={`${maskId}`}>
                <path fill={`url(#${maskId}-grad)`} d="M0 0H128V128H0z" />
            </mask>
        </defs>
    );
}
