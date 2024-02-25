import type { ControlPosition } from "react-draggable";
import { pathType } from "react-xarrows";
import { uuid } from "@/utils";

export type DraggableBoxPos = {
    id: number;
    label: string;
    x: number;
    y: number;
};

export type XArrowsState = {
    positions: ControlPosition[];
    animate: boolean; // animate on initial draw
    strokeWidth: number;
    path: pathType;
    boxes: DraggableBoxPos[];
};

export const defaultXArrowsState: XArrowsState = {
    positions: [],
    animate: true,
    strokeWidth: 2,
    path: "smooth",
    boxes: [],
};

export function initXArrowsState(state: XArrowsState) {
    if (!state.boxes.length) {
        state.boxes = [
            { id: uuid.asRelativeNumber(), label: "elem1", x: 0, y: 0 },
            { id: uuid.asRelativeNumber(), label: "elem2", x: 140, y: 160 },
        ];
    }
}
