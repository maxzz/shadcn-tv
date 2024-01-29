import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CardsMetric, ChartsOverview, Sparkline } from "./demo-charts";
import { nivoLineData1 } from "./demo-charts/nivo/line-data1";
import { nivoLineData2 } from "./demo-charts/nivo/line-data2";

export function ChartsInTabs() {
    return (
        <Tabs defaultValue="charts1">
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
