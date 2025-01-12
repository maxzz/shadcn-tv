import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CardsMetric } from "../cards-metric";
import { ChartsOverview } from "../cards-overview";
import { Sparkline } from "../nivo";
import { nivoLineData1 } from "../nivo/line-data1";
import { nivoLineData2 } from "../nivo/line-data2";

export function SubTab_Charts() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="charts1" value={activeTabs.charts} onValueChange={(v) => appSettings.demosState.activeTabs.charts = v}>
            <TabsList>
                <TabsTrigger value="charts1">Overview</TabsTrigger>
                <TabsTrigger value="charts2">Metric</TabsTrigger>
                <TabsTrigger value="charts3">Nivo line</TabsTrigger>
            </TabsList>

            <TabsContent value="charts1">
                <ChartsOverview />
            </TabsContent>

            <TabsContent value="charts2">
                <CardsMetric />
            </TabsContent>

            <TabsContent value="charts3">
                <Sparkline data={nivoLineData1} />
            </TabsContent>
        </Tabs>
    );
}
