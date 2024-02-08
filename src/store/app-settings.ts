import { ThemeMode, themeApplyMode } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { mergeConfigRecursively } from "@/utils/merge-options";
import { debounce } from "@/utils";
import { TreeState, defaultTreeState } from "./case-tree-state";
import { ResizablesState, defaultResizablesState } from "./case-resizables";
import { XArrowsState, defaultXArrowsState, initXArrowsState } from "./case-xarrows";

export type AppSettings = {
    theme: ThemeMode;
    treeState: TreeState;
    resisablesState: ResizablesState;
    xArrowsState: XArrowsState;
};

const defaultSettings: AppSettings = {
    theme: 'light',
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
