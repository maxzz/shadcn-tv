import type { ControlPosition } from "react-draggable";
import { pathType } from "react-xarrows";

export type XArrowsState = {
    positions: ControlPosition[];
    animate: boolean; // animate on initial draw
    strokeWidth: number;
    path: pathType;
};

export const defaultXArrowsState: XArrowsState = {
    positions: [],
    animate: true,
    strokeWidth: 2,
    path: "smooth",
};
