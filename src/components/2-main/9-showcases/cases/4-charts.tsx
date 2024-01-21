import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CardsMetric, ChartsOverview, Sparkline } from "../../2-demo/demo-charts";
import { nivoLineData } from "../../2-demo/demo-charts/nivo/line-data";

export function ChartsInTabs() {
    return (
        <Tabs defaultValue="charts2">
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
                <Sparkline data={nivoLineData} />
            </TabsContent>

        </Tabs>
    );
}
