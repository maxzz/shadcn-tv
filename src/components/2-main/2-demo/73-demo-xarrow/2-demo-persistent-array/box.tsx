import { HTMLAttributes, forwardRef, useRef } from "react";
import { appSettings } from "@/store";
import { useXarrow } from "react-xarrows";
import Draggable, { DraggableData, DraggableEvent, DraggableProps } from 'react-draggable';
import { mergeRefs } from "@/utils";

const boxClasses = "inline-block m-2 p-4 bg-muted-foreground/20 border-muted-foreground border rounded select-none cursor-default";

export const DraggableBox = forwardRef<HTMLDivElement, { label: string; boxId: number; dragOptions?: Partial<DraggableProps>; } & HTMLAttributes<HTMLDivElement>>(
    ({ label, boxId, dragOptions }, ref) => {
        const updateXarrow = useXarrow();
        const boxRef = useRef(null);

        function onStop(e: DraggableEvent, data: DraggableData): void {
            const { x, y } = data;
            console.log(`${label} uses translate(${x}px, ${y}px)`);
            updateXarrow();
        }
        
        return (
            <Draggable
                onDrag={updateXarrow}
                onStop={onStop}
                nodeRef={boxRef}
                bounds="parent"
                {...dragOptions}
            >
                <div
                    ref={mergeRefs([ref, boxRef])}
                    className={boxClasses}
                    onClick={(event) => {
                        if (event.ctrlKey) {
                            const idx = appSettings.xArrowsState.boxes.findIndex((box) => box.id === boxId);
                            if (idx > -1) {
                                appSettings.xArrowsState.boxes.splice(idx, 1);
                            }
                        }
                    }}
                >
                    {label}
                </div>
            </Draggable>
        );
    }
);
