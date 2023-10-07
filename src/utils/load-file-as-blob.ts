export function loadFileData(file: Blob, { asArrayBuffer }: { asArrayBuffer: boolean; }): Promise<string | ArrayBuffer | null> {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to load file'));
        asArrayBuffer
            ? reader.readAsArrayBuffer(file)
            : reader.readAsDataURL(file); // or reader.readAsText(file);
    });
}
