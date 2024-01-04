import { Theme, themeApply } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { TreeState, defaultTreeState } from "./case-tree-state";
import { ResizablesState } from "./case-resizables";

export type AppSettings = {
    theme: Theme;
    treeState: TreeState;
    resisablesState: ResizablesState;
};

const defaultSettings: AppSettings = {
    theme: 'light',
    treeState: defaultTreeState,
    resisablesState: {
        positions: new Map(),
    }
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
    if (!rv.resisablesState?.positions) {
        rv.resisablesState = defaultSettings.resisablesState;
    } else {
        rv.resisablesState.positions = new Map(rv.resisablesState.positions);
    }
    return rv;
}

themeApply(appSettings.theme);

subscribe(appSettings, () => {
    themeApply(appSettings.theme);
});

subscribe(appSettings, () => {
    const newSettings = appSettings;
    if (newSettings.resisablesState) {
        newSettings.resisablesState.positions = Object.fromEntries(newSettings.resisablesState.positions.entries()) as any;
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(appSettings));
});
