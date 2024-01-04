import { proxy } from "valtio";
import { proxyMap } from "valtio/utils";

export type ResizablesState = {
    positions: Map<string, string>;
};

export const resizablesStorage = proxy<ResizablesState>({
    positions: proxyMap(),
});
