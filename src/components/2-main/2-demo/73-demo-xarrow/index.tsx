import { HTMLAttributes, forwardRef, useRef } from "react";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import Draggable, { DraggableData, DraggableEvent, DraggableProps } from 'react-draggable';
import { mergeRefs } from "@/utils/merge-refs";

const boxClasses = "inline-block m-2 p-4 bg-muted-foreground/20 border-muted-foreground border rounded select-none cursor-default";

// function XArrowsDemo1() {
//     const box1Ref = useRef(null);
//     return (
//         <div className="relative">
//             <div ref={box1Ref} className={boxClasses}>
//                 hey1
//             </div>
//             <p id="elem2" className={boxClasses}>
//                 hey2
//             </p>
//             <Xarrow
//                 start={box1Ref}     // can be react ref
//                 end="elem2"         // or an id
//             />
//         </div>
//     );
// }

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

export function XArrowsDemo() {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    return (
        <div className="h-[240px] relative bg-muted rounded overflow-hidden">
            <div className="absolute right-2 top-1 text-xs text-muted-foreground">You can drag items within the designated area.</div>
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
                <Xarrow
                    start={box1Ref}
                    end={box2Ref}

                    color="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    dashness={{ strokeLen: 8, nonStrokeLen: 3}}
                    animateDrawing={true}
                />
            </Xwrapper>
        </div >
    );
}
