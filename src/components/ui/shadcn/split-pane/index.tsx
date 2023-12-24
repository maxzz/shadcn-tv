import { useAtom } from 'jotai';
import { splitPaneAtom } from '@/store';
import { SimpleSplitPaneBody, SplitPaneProps } from './SimpleSplitPane';

export function SimpleSplitPane(props: SplitPaneProps) {
    // Position is really the size (width or height) of the first (left or top) panel,
    // as percentage of the parent containers size. The remaining elements are
    // sized and layed out through flexbox.
    const [position, setPosition] = useAtom(splitPaneAtom);
    return (
        <SimpleSplitPaneBody position={position} setPosition={setPosition} {...props} />
    );
}

//TODO: styles - done
//TODO: highlight moving bar by timer - done
