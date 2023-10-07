import { atom } from "jotai";
import { loadFileData } from "@/utils";
import { toastWarning } from "@/components/ui";

function fileExt(filename: string = ''): string {
    return /[.]/.exec(filename) ? /([^.]+$)/.exec(filename)?.[0] || '' : '';
}

export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;
export const doDroppedFilesAtom = atom(
    null,
    async (get, set, files: FileList) => {
        try {
            if (files.length !== 1) {
                throw new Error('Only one file can be dropped');
            }

            const ext = fileExt(files[0].name);
            if (ext !== 'woff2') {
                throw new Error(`Dropped file "${files[0].name}".\nOnly .woff2 files are supported`);
            }

            const blob = await loadFileData(files[0], { asArrayBuffer: false });
            
            console.log('files', files);
            console.log('blob', blob);
            // const img: HTMLImageElement = await createImageFromBlob(blob);
            // set(orgImgAtom, img);
        } catch (error) {
            // set(orgImgAtom, null);
            toastWarning((error as Error)?.message || 'Failed to load image');
        }
    }
);
