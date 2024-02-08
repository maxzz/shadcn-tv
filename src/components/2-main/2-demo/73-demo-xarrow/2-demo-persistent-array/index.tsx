import { MutableRefObject, RefObject, createRef, useMemo, useRef } from "react";
import { Xwrapper } from "react-xarrows";
import { DemoControls } from "../3-controls";
import { Arrow } from "../4-arrow";
import { DraggableBox } from "./box";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";

export function XArrowsDemo2() {
    // const box1Ref = useRef(null);
    // const box2Ref = useRef(null);

    const { boxes } = useSnapshot(appSettings.xArrowsState);

    // const refs = useRef<MutableRefObject<null>[]>([box1Ref, box2Ref]);

    const itemsRef = useMemo<RefObject<HTMLDivElement>[]>(() => Array(boxes.length).fill(0).map(() => createRef()), [boxes.length]);

    return (
        <div className="h-[240px] relative bg-muted rounded overflow-hidden">
            <DemoControls />

            <Xwrapper>
                {boxes.map(
                    (box, idx) => (
                        <DraggableBox
                            ref={itemsRef[idx]}
                            label={box.label}
                            dragOptions={{ defaultPosition: { x: boxes[idx].x, y: boxes[idx].y } }}
                            key={box.id}
                        />
                    ))
                }

                {/* <DraggableBox
                    ref={box1Ref}
                    label={'elem1'}
                    dragOptions={{ defaultPosition: { x: 0, y: 0 } }}
                />

                <DraggableBox
                    ref={box2Ref}
                    label={'elem2'}
                    dragOptions={{ defaultPosition: { x: 140, y: 160 } }}
                /> */}

                {/* <Arrow box1Ref={box1Ref} box2Ref={box2Ref} /> */}
                <Arrow box1Ref={itemsRef[1]} box2Ref={itemsRef[0]} />
            </Xwrapper>
        </div >
    );
}
