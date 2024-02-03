import { useRef } from "react";
import Xarrow from "react-xarrows";

export function XArrowsDemo() {
    const box1Ref = useRef(null);
    return (
        <div>
            <div ref={box1Ref} className="px-4 border-muted-foreground border rounded">
                hey1
            </div>

            <p id="elem2" className="px-4 border-muted-foreground border rounded">
                hey2
            </p>

            <Xarrow
                start={box1Ref}     // can be react ref
                end="elem2"         // or an id
            />
        </div>
    );
}
