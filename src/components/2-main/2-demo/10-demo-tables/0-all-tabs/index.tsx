import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { SimpleTableDemo } from "../1-simple-table";
import { DataTableDemo } from "../2-data-table";
import { TablesWithStyckyHeaderModules } from "../3-sticky-headers";
import { SkewTable } from "../4-skew-table";
import { RotaingBooksDemo } from "../41-books";
import { CartoonsDemo } from "../42-cartoons";

export function Tabs_Table() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="table6" value={activeTabs.table} onValueChange={(v) => appSettings.demosState.activeTabs.table = v}>
            <TabsList className="mb-2">
                <TabsTrigger value="table1">Simple</TabsTrigger>
                <TabsTrigger value="table2">Data</TabsTrigger>
                <TabsTrigger value="table3">Sticky headers</TabsTrigger>
                <TabsTrigger value="table4">Skew</TabsTrigger>
                <TabsTrigger value="table5">Books</TabsTrigger>
                <TabsTrigger value="table6">Cartoons</TabsTrigger>
            </TabsList>

            <TabsContent value="table1">
                <SimpleTableDemo className="m-auto max-w-sm" />
            </TabsContent>

            <TabsContent value="table2">
                <DataTableDemo />
            </TabsContent>

            <TabsContent value="table3">
                <TablesWithStyckyHeaderModules />
            </TabsContent>

            <TabsContent value="table4">
                <SkewTable />
            </TabsContent>

            <TabsContent value="table5">
                <RotaingBooksDemo />
            </TabsContent>

            <TabsContent value="table6">
                <CartoonsDemo />
            </TabsContent>
        </Tabs>
    );
}
