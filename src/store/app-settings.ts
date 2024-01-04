import { Theme, themeApply } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { TreeState, defaultTreeState } from "./case-tree-state";
import { ResizablesState } from "./case-resizables";
import { proxyMap } from "valtio/utils";

export type AppSettings = {
    theme: Theme;
    treeState: TreeState;
    resisablesState: ResizablesState;
};

const defaultSettings: AppSettings = {
    theme: 'light',
    treeState: defaultTreeState,
    resisablesState: {
        positions: proxyMap(),
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
        console.log('restore positions', Object.entries(rv.resisablesState.positions));
        rv.resisablesState.positions = proxyMap(Object.entries(rv.resisablesState.positions));
    }
    console.log('initialSettings', rv);
    return rv;
}

themeApply(appSettings.theme);

subscribe(appSettings, () => {
    themeApply(appSettings.theme);
});

subscribe(appSettings, () => {
    
    const newSettings = Object.fromEntries(Object.entries(appSettings));
    console.log('save settings 1 newSettings', newSettings);
    console.log('save settings 2 appSettings', appSettings);
    console.log('save settings 3 fromEntries', Object.fromEntries(Object.entries(appSettings.resisablesState.positions)));

    // // const newSettings = appSettings;
    // if (appSettings.resisablesState?.positions) {
    //     newSettings.resisablesState.positions = Object.fromEntries(Object.entries(appSettings.resisablesState.positions)) as any;
    // }
    const str = JSON.stringify(newSettings);
    console.log('save settings 4', str);
    // localStorage.setItem(STORE_KEY, str);
});
