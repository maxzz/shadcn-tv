import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { CardsMetric, ChartsOverview } from "../../2-demo/demo-charts";

export function ChartsInTabs() {
    return (
        <Tabs defaultValue="charts2">
            <TabsList>
                <TabsTrigger value="charts1">Overview</TabsTrigger>
                <TabsTrigger value="charts2">Metric</TabsTrigger>
            </TabsList>

            <TabsContent value="charts1">
                <ChartsOverview />
            </TabsContent>

            <TabsContent value="charts2">
                <CardsMetric />
            </TabsContent>

        </Tabs>
    );
}
