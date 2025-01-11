export type DemosState = {
    activeDemoAccordion: string;
    activeTabs: Record<string, string>;
};

export const defaultDemosState: DemosState ={
    activeDemoAccordion: '60',
    activeTabs: {},
};
