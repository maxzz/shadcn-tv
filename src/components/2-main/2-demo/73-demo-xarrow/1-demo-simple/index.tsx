import { useRef } from "react";
import { Xwrapper } from "react-xarrows";
import { DemoControls } from "../3-controls";
import { Arrow } from "../4-arrow";
import { DraggableBox } from "./box";

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

export function XArrowsDemo1() {
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
