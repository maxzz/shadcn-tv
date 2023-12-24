import React from 'react';
import { classNames, withDigits } from '@/utils';
import './SimpleSplitPane.css';
import { el } from 'date-fns/locale';

const baseStyle: React.CSSProperties = {
    flex: '1',
    display: 'flex',
};

const styleB: React.CSSProperties = {
    ...baseStyle,
    minWidth: 0,
    minHeight: 0,
};

export type SplitPaneProps = {
    vertical?: boolean;
    minPersent?: number,
    maxPersent?: number,
    className?: string;
    children: React.ReactNode;
    onResize?: (position: number) => void;
};

type SplitPaneDataProps = {
    position: number;
    setPosition: (value: number) => void,
};

export function SimpleSplitPaneBody(props: SplitPaneProps & SplitPaneDataProps) {
    const { vertical = true, minPersent = 1, maxPersent = 99, className, children, position, setPosition, onResize } = props;

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

            const newPosition = ((vertical ? event.pageY : event.pageX) - offset) / size * 100;
            const rounded = +withDigits(Math.min(Math.max(minPersent, newPosition), maxPersent));
            // Using 99% as the max value prevents the divider from disappearing
            setPosition(rounded);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMoveMove);
            document.removeEventListener('mouseup', onMouseUp);
            onResize?.(position);
        };

        document.addEventListener('mousemove', onMoveMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [vertical, position, container]);

    let childrenArr = React.Children.toArray(children);
    if (childrenArr.length < 2) {
        return (
            <div className={className} style={{ display: 'flex' }}>
                {childrenArr}
            </div>
        );
    }

    const styleA = { ...baseStyle };
    if (vertical) {
        styleA.minHeight = styleA.maxHeight = position + '%'; // top
    } else {
        styleA.minWidth = styleA.maxWidth = position + '%'; // left
    }

    return (
        <div ref={container} className={className} style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row' }}>
            <div style={styleA}>
                {childrenArr[0]}
            </div>
            <div className={classNames('splitpane-divider', vertical ? 'vertical' : 'horizontal')} onMouseDown={onMouseDown} />
            <div style={styleB}>
                {childrenArr[1]}
            </div>
        </div>
    );
}

//TODO: styles - done
//TODO: highlight moving bar by timer - done
