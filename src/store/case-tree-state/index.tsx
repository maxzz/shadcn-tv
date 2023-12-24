import { proxy } from "valtio";

export type TreeState = {
    splitterPos: number;
};

export const treeState = proxy<TreeState>({
    splitterPos: 30,
});
