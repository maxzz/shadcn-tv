import React from 'react';
import { clamp, classNames, withDigits } from '@/utils';
import './SimpleSplitPane.css';

/**
 * The position is actually the size (width or height) of the first (left or top)
 * panel as a percentage of the size of the parent container.
 * The size of the remaining elements is determined by flexbox.
 */
export type SplitPaneProps = {
    vertical?: boolean;
    min?: number,           // percent
    max?: number,           // percent
    className?: string;
    children: React.ReactNode;
    onResize?: () => void;
};

type SplitPaneDataProps = {
    position: number;
    setPosition: (value: number) => void,
};

const baseStyle: React.CSSProperties = { display: 'flex', flex: '1', };
const styleA = (vertical: boolean, position: number): React.CSSProperties => {
    const rv = { ...baseStyle };
    if (vertical) {
        rv.minHeight = rv.maxHeight = position + '%'; // top
    } else {
        rv.minWidth = rv.maxWidth = position + '%'; // left
    }
    return rv;
};
const styleR = (vertical: boolean, position: number): React.CSSProperties => {
    const rv = { ...baseStyle };
    if (vertical) {
        rv.minHeight = rv.maxHeight = 100 - position + '%'; // top
    } else {
        rv.minWidth = rv.maxWidth = 100 - position + '%'; // left
    }
    return rv;
};
const styleB: React.CSSProperties = { ...baseStyle, minWidth: 0, minHeight: 0, };

export function SimpleSplitPaneBody(props: SplitPaneProps & SplitPaneDataProps) {
    const { vertical = true, min = 1, max = 99, className, children, position, setPosition, onResize } = props;

    const container = React.useRef<HTMLDivElement | null>(null);

    const onMouseDown = React.useCallback((event: React.MouseEvent) => {
        if (!container.current) {
            return;
        }

        event.preventDefault(); // This will prevent text selection in Safari.

        const { current: containerElm } = container;

        const rect = containerElm.getBoundingClientRect();
        const offset = vertical ? window.scrollY + rect.y : window.scrollX + rect.x;
        const size = vertical ? containerElm.offsetHeight : containerElm.offsetWidth;

        const onMoveMove = (event: MouseEvent) => {
            event.preventDefault();

            const newPosition = (((vertical ? event.pageY : event.pageX) - offset) / size) * 100;
            const rounded = +withDigits(clamp(newPosition, min, max));
            // Using 99% as the max value prevents the divider from disappearing
            setPosition(rounded);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMoveMove);
            document.removeEventListener('mouseup', onMouseUp);
            onResize?.();
        };

        document.addEventListener('mousemove', onMoveMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [container, vertical]);

    let childrenArr = React.Children.toArray(children);
    if (childrenArr.length < 2) {
        return (
            <div className={className} style={{ display: 'flex' }}>
                {childrenArr}
            </div>
        );
    }

    return (
        <div ref={container} className={className} style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row' }}>
            <div style={styleA(vertical, position)}>
                {childrenArr[0]}
            </div>
            <div className={classNames('splitpane-divider', vertical ? 'vertical' : 'horizontal')} onMouseDown={onMouseDown} />
            {/* <div style={styleB}> */}
            <div style={styleR(vertical, position)}>
                {childrenArr[1]}
            </div>
        </div>
    );
}
