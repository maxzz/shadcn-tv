import { HTMLAttributes, forwardRef, useRef } from "react";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import Draggable, { DraggableData, DraggableEvent, DraggableProps } from 'react-draggable';
import { mergeRefs } from "@/utils/merge-refs";

const boxClasses = "inline-block m-2 p-4 border-muted-foreground border rounded select-none cursor-default";

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
            console.log(`translate(${x}px, ${y}px)`);
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
        <div className="h-96 relative bg-muted overflow-hidden">
            <Xwrapper>
                <DraggableBox
                    ref={box1Ref}
                    label={'elem1'}
                    dragOptions={{ defaultPosition: { x: -44, y: -40 } }}
                />
                <DraggableBox
                    ref={box2Ref}
                    label={'elem2'}
                    dragOptions={{ defaultPosition: { x: 10, y: 30 } }}
                />
                <Xarrow
                    start={box1Ref}
                    end={box2Ref}
                />
            </Xwrapper>
        </div >
    );
}
