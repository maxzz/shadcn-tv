export function base64ToArrayBuffer(base64: string) {
    try {
        const binaryString = atob(base64);

        const bytes = new Uint8Array(binaryString.length);
    
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
    
        return bytes;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to convert base64 to array buffer.`);
    }
}
