import { useCallback } from 'react';
import { useSnapshot } from 'valtio';
import { SimpleSplitPaneBody, SplitPaneProps } from './SimpleSplitPane';
import { appSettings } from '@/store';
import { debounce } from '@/utils';

/**
 * Position is really the size (width or height) of the first (left or top) panel,
 * as percentage of the parent containers size. The remaining elements are
 * sized and layed out through flexbox.
 */
export function SimpleSplitPane(props: SplitPaneProps) {
    const { splitterPos } = useSnapshot(appSettings.treeState);
    const setPosition = useCallback(debounce((value: number) => appSettings.treeState.splitterPos = value, 50), []);

    return (
        <SimpleSplitPaneBody position={splitterPos} setPosition={setPosition} {...props} />
    );
}
