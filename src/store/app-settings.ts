import { Theme, themeApply } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { TreeState, defaultTreeState } from "./case-tree-state";

export type AppSettings = {
    theme: Theme;
    treeState: TreeState;
};

const defaultSettings: AppSettings = {
    theme: 'light',
    treeState: defaultTreeState,
};

const STORE_KEY = "shadcn-tv-app-settings";

export const appSettings = proxy<AppSettings>(initialSettings());

function initialSettings(): AppSettings {
    const savedSettings = localStorage.getItem(STORE_KEY);
    if (savedSettings) {
        try {
            return JSON.parse(savedSettings);
        } catch (error) {
        }
    }
    return defaultSettings;
}

themeApply(appSettings.theme);

subscribe(appSettings, () => {
    themeApply(appSettings.theme);
});

subscribe(appSettings, () => {
    localStorage.setItem(STORE_KEY, JSON.stringify(appSettings));
});
