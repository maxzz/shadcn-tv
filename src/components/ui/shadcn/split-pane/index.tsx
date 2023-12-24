
import { treeState } from '@/store/case-tree-state';
import { SimpleSplitPaneBody, SplitPaneProps } from './SimpleSplitPane';
import { useSnapshot } from 'valtio';
import { useCallback } from 'react';

export function SimpleSplitPane(props: SplitPaneProps) {
    const { splitterPos: position } = useSnapshot(treeState);
    const setPosition = useCallback((value: number) => treeState.splitterPos = value, []);

    console.log('SimpleSplitPane', position);
    

    // Position is really the size (width or height) of the first (left or top) panel,
    // as percentage of the parent containers size. The remaining elements are
    // sized and layed out through flexbox.
    // const [position, setPosition] = useAtom(splitPaneAtom);
    return (
        <SimpleSplitPaneBody position={position} setPosition={setPosition} {...props} />
    );
}

//TODO: styles - done
//TODO: highlight moving bar by timer - done
