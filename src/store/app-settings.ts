import { ThemeMode, themeApplyMode } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { mergeConfigRecursively } from "@/utils/merge-options";
import { debounce } from "@/utils";
import { TreeState, defaultTreeState } from "./20-tree-state";
import { ResizablesState, defaultResizablesState } from "./30-resizables";
import { XArrowsState, defaultXArrowsState, initXArrowsState } from "./40-xarrows";
import { DemosState, defaultDemosState } from "./10-demos";

export type AppSettings = {
    theme: ThemeMode;
    demosState: DemosState;
    treeState: TreeState;
    resisablesState: ResizablesState;
    xArrowsState: XArrowsState;
};

const defaultSettings: AppSettings = {
    theme: 'light',
    demosState: defaultDemosState,
    treeState: defaultTreeState,
    resisablesState: defaultResizablesState,
    xArrowsState: defaultXArrowsState,
};

const STORE_KEY = "shadcn-tv-app-settings";

export const appSettings = proxy<AppSettings>(initialSettings());

function initialSettings(): AppSettings {
    const savedSettings = localStorage.getItem(STORE_KEY);
    let rv = defaultSettings;
    if (savedSettings) {
        try {
            rv = JSON.parse(savedSettings);
        } catch (error) {
        }
    }
    const merged = mergeConfigRecursively(defaultSettings, rv);
    initXArrowsState(merged.xArrowsState);
    return merged;
}

themeApplyMode(appSettings.theme);
subscribe(appSettings, () => {
    themeApplyMode(appSettings.theme);
});

const saveDebounced = debounce(() => localStorage.setItem(STORE_KEY, JSON.stringify(appSettings)), 400);
subscribe(appSettings, saveDebounced);
