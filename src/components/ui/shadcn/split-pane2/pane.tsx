import { CSSProperties, RefObject, ReactNode, useMemo } from "react";
import { classNames } from "@/utils";

export interface PaneProps { // Based on react-split-pane package. See https://github.com/tomkp/react-split-pane
    className?: string;
    size?: string | number;
    split?: "vertical" | "horizontal";
    style?: CSSProperties;
    eleRef: RefObject<HTMLDivElement>;
    children?: ReactNode;
}

function selectStyle(size: string | number | undefined, split: "vertical" | "horizontal" | undefined, style: CSSProperties | undefined) {
    const baseStyle: Partial<CSSProperties> = {
        flex: 1,
        position: "relative",
        outline: "none",
    };

    if (size !== undefined) {
        if (split === "vertical") {
            baseStyle.width = size;
        } else {
            baseStyle.height = size;
            baseStyle.display = "flex";
        }
        baseStyle.flex = "none";
    }

    return { ...style, ...baseStyle, } as CSSProperties;
}

export function Pane({ children, className, split, style, size, eleRef }: PaneProps) {
    const paneClasses = useMemo(() => classNames("Pane", split, className), [split, className]);
    const paneStyle = useMemo(() => selectStyle(size, split, style), [size, split, style]);
    return (
        <div ref={eleRef} className={paneClasses} style={paneStyle}>
            {children}
        </div>
    );
}
