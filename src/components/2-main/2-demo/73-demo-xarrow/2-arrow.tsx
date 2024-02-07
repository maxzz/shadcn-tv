import { RefObject } from "react";
import { useSnapshot } from "valtio";
import Xarrow from "react-xarrows";
import { appSettings } from "@/store";

export function Arrow({ box1Ref, box2Ref }: { box1Ref: RefObject<HTMLDivElement>; box2Ref: RefObject<HTMLDivElement>; }) {
    const snap = useSnapshot(appSettings.xArrowsState);
    return (
        <Xarrow
            start={box1Ref}
            end={box2Ref}

            color="hsl(var(--muted-foreground))"
            strokeWidth={snap.strokeWidth}
            dashness={{ strokeLen: 8, nonStrokeLen: 3 }}
            animateDrawing={snap.animate}
            path={snap.path}
        />
    );
}
