import { RefObject, createRef, useMemo } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Xwrapper } from "react-xarrows";
import { DraggableBox } from "./box";
import { Arrow } from "../4-arrow";
import { DemoControls } from "../3-controls";

export function XArrowsDemo2() {
    const { boxes } = useSnapshot(appSettings.xArrowsState);
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
                            boxId={box.id}
                            dragOptions={{ defaultPosition: { x: boxes[idx].x, y: boxes[idx].y } }}
                            key={box.id}
                        />
                    ))
                }

                <Arrow box1Ref={itemsRef[1]} box2Ref={itemsRef[0]} />
            </Xwrapper>
        </div >
    );
}
