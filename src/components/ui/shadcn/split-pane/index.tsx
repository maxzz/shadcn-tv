import { useCallback } from 'react';
import { useSnapshot } from 'valtio';
import { SimpleSplitPaneBody, SplitPaneProps } from './SimpleSplitPane';
import { appSettings } from '@/store';
import { debounce } from '@/utils';

export function SimpleSplitPane(props: SplitPaneProps) {
    const { splitterPos } = useSnapshot(appSettings.treeState);
    const setPosition = useCallback(debounce((value: number) => appSettings.treeState.splitterPos = value, 50), []);

    return (
        <SimpleSplitPaneBody position={splitterPos} setPosition={setPosition} {...props} />
    );
}
