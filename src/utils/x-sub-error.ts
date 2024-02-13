/**
 * Get from error message
 * "'get-saw-content' Error invoking remote method 'invoke-main': >>>Too many controls"
 * string 'Too many controls'.
 */
export function getSubError(error: unknown) {
    const msg = error instanceof Error ? error.message : `${error}`;
    return msg.split('>>>').at(-1) || msg;
}
