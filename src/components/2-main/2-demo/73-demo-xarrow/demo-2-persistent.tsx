import { HTMLAttributes, RefObject, forwardRef, useRef } from "react";
import { useSnapshot } from "valtio";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import Draggable, { DraggableData, DraggableEvent, DraggableProps } from 'react-draggable';
import { mergeRefs } from "@/utils";
import { appSettings } from "@/store";
import { DemoControls } from "./1-controls";

const boxClasses = "inline-block m-2 p-4 bg-muted-foreground/20 border-muted-foreground border rounded select-none cursor-default";

const DraggableBox = forwardRef<HTMLDivElement, { label: string; dragOptions?: Partial<DraggableProps>; } & HTMLAttributes<HTMLDivElement>>(
    ({ label, dragOptions }, ref) => {
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
                <div ref={mergeRefs([ref, boxRef])} className={boxClasses}>
                    {label}
                </div>
            </Draggable>
        );
    }
);

function Arrow({ box1Ref, box2Ref }: { box1Ref: RefObject<HTMLDivElement>; box2Ref: RefObject<HTMLDivElement>; }) {
    const snap = useSnapshot(appSettings.xArrowsState);
    return (
        <Xarrow
            start={box1Ref}
            end={box2Ref}

            color="hsl(var(--muted-foreground))"
            strokeWidth={snap.strokeWidth}
            dashness={{ strokeLen: 8, nonStrokeLen: 3 }}
            animateDrawing={snap.animate}
            path={snap.path}
        />
    );
}

export function XArrowsDemo2() {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    return (
        <div className="h-[240px] relative bg-muted rounded overflow-hidden">
            <DemoControls />
            <Xwrapper>
                <DraggableBox
                    ref={box1Ref}
                    label={'elem1'}
                    dragOptions={{ defaultPosition: { x: 0, y: 0 } }}
                />
                <DraggableBox
                    ref={box2Ref}
                    label={'elem2'}
                    dragOptions={{ defaultPosition: { x: 140, y: 160 } }}
                />
                <Arrow box1Ref={box1Ref} box2Ref={box2Ref} />
            </Xwrapper>
        </div >
    );
}
