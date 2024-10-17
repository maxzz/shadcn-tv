import { forwardRef, InputHTMLAttributes } from "react";

export type InputFileAsDlgProps = InputHTMLAttributes<HTMLInputElement> & {
    openAsFolder?: boolean; // folder mode: open folder
    multiple?: boolean;     // files mode only: open multiple files
};

export const InputFileAsDlg = forwardRef<HTMLInputElement, InputFileAsDlgProps>(({ openAsFolder, multiple = true, ...rest }, ref) => {

    const options = {
        ...(openAsFolder && { webkitdirectory: '' }),
    };

    return (
        <input
            ref={ref}
            className="hidden"
            type="file"
            multiple={multiple}
            {...options}
            {...rest}
        />
    );
});
