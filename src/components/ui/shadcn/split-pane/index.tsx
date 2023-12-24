import { SimpleSplitPaneBody, SplitPaneProps } from './SimpleSplitPane';
import { useSnapshot } from 'valtio';
import { useCallback } from 'react';
import { appSettings } from '@/store';

export function SimpleSplitPane(props: SplitPaneProps) {
    const { splitterPos: position } = useSnapshot(appSettings.treeState, { sync: true });
    // const setPosition = useCallback((value: number) => appSettings.treeState.splitterPos = value, []);
    const setPosition = useCallback((value: number): void => {
        console.log(`SimpleSplitPane setPosition now:${appSettings.treeState.splitterPos} new:${value}`);
        
        appSettings.treeState.splitterPos = value;
    }, []);

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
