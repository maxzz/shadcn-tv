import { MutableRefObject, RefObject, createRef, useMemo, useRef } from "react";
import { Xwrapper } from "react-xarrows";
import { DemoControls } from "../3-controls";
import { Arrow } from "../4-arrow";
import { DraggableBox } from "./box";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";

export function XArrowsDemo3() {
    const { boxes } = useSnapshot(appSettings.xArrowsState);

    // const refs = useRef<MutableRefObject<null>[]>([box1Ref, box2Ref]);

    const itemsRef = useRef<Map<number, MutableRefObject<HTMLDivElement>>>();

    function getMap() {
        if (!itemsRef.current) {
            // Initialize the Map on first usage.
            itemsRef.current = new Map();
        }
        // console.log('getMap', itemsRef.current);
        return itemsRef.current;
    }

    function setElm(node: HTMLDivElement | null, id: number) {
        console.log('setElm', id, itemsRef.current, {node});

        const map = getMap();
        if (node) {
            const newRef = createRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
            newRef.current = node;
            map.set(id, newRef);
        } else {
            map.delete(id);
        }
    }

    //const itemsRef = useMemo<RefObject<HTMLDivElement>[]>(() => Array(boxes.length).fill(0).map(() => createRef()), [boxes.length]);

    return (
        <div className="h-[240px] relative bg-muted rounded overflow-hidden">
            <DemoControls />
            <Xwrapper>
                {boxes.map(
                    (box, idx) => (
                        <DraggableBox
                            ref={(node) => setElm(node, idx)}
                            label={box.label}
                            dragOptions={{ defaultPosition: { x: boxes[idx].x, y: boxes[idx].y } }}
                            key={box.id}
                        />
                    ))
                }

                {console.log('-------------', getMap())}

                {getMap().get(1) && getMap().get(0) &&
                    <Arrow box1Ref={getMap().get(1)!} box2Ref={getMap().get(0)!} />
                }
            </Xwrapper>
        </div >
    );
}
