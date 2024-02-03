import { HTMLAttributes, useRef } from "react";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import Draggable from 'react-draggable';

export function XArrowsDemo1() {
    const box1Ref = useRef(null);
    return (
        <div className="relative">
            <div ref={box1Ref} className="inline-block m-12 p-4 border-muted-foreground border rounded">
                hey1
            </div>

            <p id="elem2" className="inline-block m-24 p-4 border-muted-foreground border rounded">
                hey2
            </p>

            <Xarrow
                start={box1Ref}     // can be react ref
                end="elem2"         // or an id
            />
        </div>
    );
}



const boxStyle = { border: 'grey solid 2px', borderRadius: '10px', padding: '5px' };

const DraggableBox = ({ id }: HTMLAttributes<HTMLDivElement>) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <div id={id} style={boxStyle}>
                {id}
            </div>
        </Draggable>
    );
};

export function XArrowsDemo() {
    return (
        <div>
            <Xwrapper>
                <DraggableBox id={'elem1'} />
                <DraggableBox id={'elem2'} />
                <Xarrow start={'elem1'} end="elem2" />
            </Xwrapper>
        </div >
    );
}
