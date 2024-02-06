import { HTMLAttributes, forwardRef, useRef } from "react";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import Draggable from 'react-draggable';
import { mergeRefs } from "@/utils/merge-refs";

const boxClasses = "inline-block m-12 p-4 border-muted-foreground border rounded select-none cursor-default";

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

const DraggableBox = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ id }: HTMLAttributes<HTMLDivElement>, ref) => {
    const updateXarrow = useXarrow();
    const boxRef = useRef(null);
    return (
        <Draggable
            onDrag={updateXarrow}
            onStop={updateXarrow}
            nodeRef={boxRef}
        >
            <div ref={mergeRefs([ref, boxRef])} className={boxClasses}>
                {id}
            </div>
        </Draggable>
    );
}
);

export function XArrowsDemo() {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    return (
        <div>
            <Xwrapper>
                <DraggableBox ref={box1Ref} id={'elem1'} />
                <DraggableBox ref={box2Ref} id={'elem2'} />
                <Xarrow
                    start={box1Ref}
                    end={box2Ref}
                />
            </Xwrapper>
        </div >
    );
}
