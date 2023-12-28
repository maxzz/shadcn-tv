import { CSSProperties, Children, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pane } from "./pane";
import { Resizer } from "./resizer";
import { classNames } from "@/utils";

// `SplitPane` from `react-split-pane` package since that package is not regularly maintained
// and has no TypeScript. See https://github.com/tomkp/react-split-pane

export interface SplitPaneProps {
    allowResize?: boolean;                              // Pass false to disable resizing.
    children: ReactNode[];                              // The array of two react nodes, one for each pane.
    primary?: "first" | "second";                       // Determines which pane maintains its size when browser window is resized.

    /** You can limit the maximal size of the 'fixed' pane using the maxSize parameter with a positive value
     * (measured in pixels but state just a number). If you wrap the SplitPane into a container component
     * (yes you can, just remember the container has to have the relative or absolute positioning), then you'll need to limit
     *  the movement of the splitter (resizer) at the end of the SplitPane (otherwise it can be dragged outside the SplitPane
     * and you don't catch it never more). For this purpose use the maxSize parameter with value 0. When dragged the splitter/resizer
     * will stop at the border of the SplitPane component and think this you'll be able to pick it again and drag it back then.
     *  And more: if you set the maxSize to negative value (e.g. -200), then the splitter stops 200px before the border
     * (in other words it sets the minimal size of the 'resizable' pane in this case). This can be useful also in the
     * full-screen case of use.
     */
    maxSize?: string | number;
    minSize?: string | number;
    defaultSize?: string | number;                      // Default initial size of primary pane.
    size?: string | number;                             // Size of primary pane.
    step?: number;                                      // You can use the step prop to only allow resizing in fixed increments..
    split?: "vertical" | "horizontal";

    onDragStarted?: () => void;                         // This callback is invoked when a drag start..
    onDragFinished?: (newSize: number) => void;         // This callback is invoked when a drag ends..
    onChange?: (newSize: number) => void;               // Callback is invoked with the current drag during a drag event.
    onResizerClick?: (event: MouseEvent) => void;       // Callback is invoked if user clicks on Resizer..
    onResizerDoubleClick?: (event: MouseEvent) => void; // Callback is invoked if user double clicks on Resizer.

    style?: CSSProperties;                              // Styling to be applied to the main container.
    paneStyle?: CSSProperties;                          // Styling to be applied to both panes.
    pane1Style?: CSSProperties;                         // Styling to be applied to the first pane, with precedence over paneStyle.
    pane2Style?: CSSProperties;                         // Styling to be applied to the second pane, with precedence over paneStyle.
    resizerStyle?: CSSProperties;                       // Styling to be applied to the resizer bar.

    className?: string;                                 // Class name to be added to the SplitPane div.
    paneClassName?: string;                             // Class name to be added to each Pane's div.
    pane1ClassName?: string;                            // Class name to be added to Pane1's div.
    pane2ClassName?: string;                            // Class name to be added to Pane2's div.
}

function unselect(ownerDoc: Document | undefined) {
    if (!ownerDoc) return;

    const docSelection = ownerDoc.getSelection();
    if (docSelection) {
        docSelection.empty();
    } else {
        try {
            const winSelection = ownerDoc.defaultView?.getSelection();
            winSelection?.removeAllRanges();
        } catch (error) { }
    }
}

function selectDefaultSize(defaultSize?: number | string, minSize?: string | number, maxSize?: string | number, draggedSize?: number) {
    if (typeof draggedSize === "number") {
        const min = typeof minSize === "number" ? minSize : 0;
        const max = typeof maxSize === "number" && maxSize >= 0 ? maxSize : Infinity;
        return Math.max(min, Math.min(max, draggedSize));
    }
    if (defaultSize !== undefined) {
        return defaultSize;
    }
    return minSize;
}

function removeNullChildren(children: ReactNode[]) {
    return Children.toArray(children).filter((child) => child);
}

function getSplitPaneStyle(splitVertical: boolean, style: CSSProperties | undefined) {
    const directionSpecificParts =
        splitVertical
            ? {
                flexDirection: "row",
                left: 0,
                right: 0,
            }
            : {
                flexDirection: "column",
                top: 0,
                bottom: 0,
                width: "100%",
                minHeight: "100%",
            };
    return {
        flex: 1,
        position: "absolute",
        height: "100%",
        display: "flex",
        outline: "none",
        userSelect: "text",
        overflow: "hidden",
        ...style,
        ...directionSpecificParts,
    } as CSSProperties;
}

export function SplitPane(props: SplitPaneProps) {
    const {
        size,
        defaultSize,
        maxSize,
        step,
        children,

        style,
        paneStyle,
        pane1Style,
        pane2Style,

        className,
        paneClassName,
        pane1ClassName,
        pane2ClassName,

        onDragStarted,
        onDragFinished,
        onChange,
        onResizerClick,
        onResizerDoubleClick,
    } = props;

    // honor same defaults as react-split-pane
    const split = useMemo(() => (props.split === "horizontal" ? props.split : "vertical"), [props.split]);
    const splitVertical = useMemo(() => (props.split !== "horizontal"), [props.split]);

    const allowResize = useMemo(() => (props.allowResize !== undefined ? props.allowResize : true), [props.allowResize]);

    const minSize = useMemo(() => (props.minSize !== undefined ? props.minSize : 50), [props.minSize]);
    const initialSize = size !== undefined ? size : selectDefaultSize(defaultSize, minSize, maxSize);

    const [position, setPosition] = useState(0);
    const [draggedSize, setDraggedSize] = useState<number | undefined>();
    const [active, setActive] = useState(false);

    const isPrimaryFirst = useMemo(() => props.primary !== "second", [props.primary]);
    const [pane1Size, setPane1Size] = useState(() => isPrimaryFirst ? initialSize : undefined);
    const [pane2Size, setPane2Size] = useState(() => !isPrimaryFirst ? initialSize : undefined);

    const splitPaneRef = useRef<HTMLDivElement>(null);
    const pane1Ref = useRef<HTMLDivElement>(null);
    const pane2Ref = useRef<HTMLDivElement>(null);

    const notNullChildren = useMemo(() => removeNullChildren(children), [children]);

    useEffect(
        () => {
            setPane1Size(isPrimaryFirst ? initialSize : undefined);
            setPane2Size(isPrimaryFirst ? undefined : initialSize);
        }, [initialSize, isPrimaryFirst]
    );

    const splitPaneStyle = useMemo(() => getSplitPaneStyle(splitVertical, style), [splitVertical, style]);
    const pane1DivStyle = { ...paneStyle, ...pane1Style };
    const pane2DivStyle = { ...paneStyle, ...pane2Style };
    const resizerStyle = useMemo(() => props.resizerStyle ?? {}, [props.resizerStyle]);

    const resizerClasses = useMemo(() => classNames("resizer", !allowResize && "disabled"), [allowResize]);
    const splitPaneClasses = useMemo(() => classNames("SplitPane", className, split, !allowResize && "disabled"), [className, split, allowResize]);
    const pane1Classes = useMemo(() => classNames("Pane1", paneClassName, pane1ClassName), [paneClassName, pane1ClassName]);
    const pane2Classes = useMemo(() => classNames("Pane2", paneClassName, pane2ClassName), [paneClassName, pane2ClassName]);

    const initializeDrag = useCallback(
        (x: number, y: number) => {
            unselect(splitPaneRef.current?.ownerDocument);

            const newPosition = splitVertical ? x : y;
            onDragStarted?.();
            setActive(true);
            setPosition(newPosition);
        },
        [onDragStarted, splitVertical]
    );

    const onTouchStart = useCallback(
        (event: TouchEvent) => {
            if (allowResize) {
                initializeDrag(event.touches[0].clientX, event.touches[0].clientY);
            }
        },
        [allowResize, initializeDrag]
    );

    const processMove = useCallback(
        (x: number, y: number) => {
            unselect(splitPaneRef.current?.ownerDocument);

            const ref = isPrimaryFirst ? pane1Ref.current : pane2Ref.current;
            const ref2 = isPrimaryFirst ? pane2Ref.current : pane1Ref.current;
            const splitPaneDiv = splitPaneRef.current;

            if (ref && ref2 && splitPaneDiv) {
                const node = ref;
                const node2 = ref2;

                if (!node.getBoundingClientRect) {
                    return;
                }
                const width = node.getBoundingClientRect().width;
                const height = node.getBoundingClientRect().height;

                const current = splitVertical ? x : y;
                const oldSize = splitVertical ? width : height;
                let positionDelta = position - current;
                if (step) {
                    if (Math.abs(positionDelta) < step) {
                        return;
                    }
                    positionDelta = ~~(positionDelta / step) * step; // Integer division
                }
                let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

                const pane1Order = parseInt(node.ownerDocument?.defaultView?.getComputedStyle(node).order ?? "0", 10);
                const pane2Order = parseInt(node2.ownerDocument?.defaultView?.getComputedStyle(node2).order ?? "0", 10);
                if (pane1Order > pane2Order) {
                    sizeDelta = -sizeDelta;
                }

                let newMaxSize = maxSize;
                if (typeof maxSize === "number" && maxSize !== undefined && maxSize <= 0) {
                    if (splitVertical) {
                        newMaxSize = splitPaneDiv.getBoundingClientRect().width + maxSize;
                    } else {
                        newMaxSize = splitPaneDiv.getBoundingClientRect().height + maxSize;
                    }
                }

                let newSize = oldSize - sizeDelta;
                const newPosition = position - positionDelta;

                if (typeof minSize === "number" && newSize < minSize) {
                    newSize = minSize;
                } else if (typeof newMaxSize === "number" && newMaxSize !== undefined && newSize > newMaxSize) {
                    newSize = newMaxSize;
                } else {
                    setPosition(newPosition);
                }

                onChange?.(newSize);
                setDraggedSize(newSize);
                isPrimaryFirst ? setPane1Size(newSize) : setPane2Size(newSize);
            }
        },
        [maxSize, minSize, onChange, position, isPrimaryFirst, splitVertical, step]
    );

    const onTouchMove = useCallback(
        (event: TouchEvent) => {
            if (!allowResize || !active) return;
            processMove(event.touches[0].clientX, event.touches[0].clientY);
        },
        [active, allowResize, processMove]
    );

    const onMouseMove = useCallback(
        (event: MouseEvent) => {
            if (!allowResize || !active) return;
            processMove(event.clientX, event.clientY);
        },
        [active, allowResize, processMove]
    );

    const onMouseDown = useCallback(
        (event: MouseEvent) => {
            if (allowResize) {
                event.preventDefault();
                initializeDrag(event.clientX, event.clientY);
            }
        },
        [allowResize, initializeDrag]
    );

    const processResizeFinished = useCallback(() => {
        if (draggedSize !== undefined && allowResize && active) {
            onDragFinished?.(draggedSize);
        }
        setActive(false);
    }, [draggedSize, allowResize, active, onDragFinished]);

    const onMouseUp = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            processResizeFinished();
        },
        [processResizeFinished]
    );

    useEffect(() => {
        const doc = splitPaneRef.current?.ownerDocument;
        if (!doc) return;

        doc.addEventListener("mouseup", onMouseUp);
        doc.addEventListener("mousemove", onMouseMove);
        doc.addEventListener("touchmove", onTouchMove);
        return () => {
            doc.removeEventListener("mouseup", onMouseUp);
            doc.removeEventListener("mousemove", onMouseMove);
            doc.removeEventListener("touchmove", onTouchMove);
        };
    }, [onMouseMove, onMouseUp, onTouchMove]);

    return (
        <div className={splitPaneClasses} ref={splitPaneRef} style={splitPaneStyle}>
            <Pane
                className={pane1Classes}
                key="pane1"
                eleRef={pane1Ref}
                size={pane1Size}
                split={split}
                style={pane1DivStyle}
            >
                {notNullChildren[0]}
            </Pane>

            <Resizer
                className={resizerClasses}
                onClick={onResizerClick}
                onDoubleClick={onResizerDoubleClick}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onTouchEnd={processResizeFinished}
                key="resizer"
                split={split}
                style={resizerStyle}
            />

            <Pane
                className={pane2Classes}
                key="pane2"
                eleRef={pane2Ref}
                size={pane2Size}
                split={split}
                style={pane2DivStyle}
            >
                {notNullChildren[1]}
            </Pane>
        </div>
    );
}
