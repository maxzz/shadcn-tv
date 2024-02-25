export type TreeState = {
    splitterPos: number;
    arrowFirst: boolean;
    hideFolderIcon: boolean;
};

export const defaultTreeState: TreeState ={
    splitterPos: 30,
    arrowFirst: true,
    hideFolderIcon: true,
};
