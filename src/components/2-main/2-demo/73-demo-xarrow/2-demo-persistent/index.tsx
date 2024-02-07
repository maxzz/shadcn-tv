import { useRef } from "react";
import { Xwrapper } from "react-xarrows";
import { DemoControls } from "../3-controls";
import { Arrow } from "../4-arrow";
import { DraggableBox } from "./box";

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
