import { Theme, themeApply } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { TreeState, defaultTreeState } from "./case-tree-state";
import { ResizablesState, defaultResizablesState } from "./case-resizables";
import { debounce } from "@/utils";
import { mergeConfigRecursively } from "@/utils/merge-options";

export type AppSettings = {
    theme: Theme;
    treeState: TreeState;
    resisablesState: ResizablesState;
};

const defaultSettings: AppSettings = {
    theme: 'light',
    treeState: defaultTreeState,
    resisablesState: defaultResizablesState,
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
    return mergeConfigRecursively(defaultSettings, rv);
}

themeApply(appSettings.theme);
subscribe(appSettings, () => {
    themeApply(appSettings.theme);
});

const saveDebounced = debounce(() => localStorage.setItem(STORE_KEY, JSON.stringify(appSettings)), 400);
subscribe(appSettings, saveDebounced);
