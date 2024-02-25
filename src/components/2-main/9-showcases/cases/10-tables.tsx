import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { SimpleTableDemo, DataTableDemo, TablesWithStyckyHeaderModules, SkewTable } from "../../2-demo/10-demo-tables";

export function TableInTabs() {
    return (
        <Tabs defaultValue="table4">
            <TabsList>
                <TabsTrigger value="table1">Simple table</TabsTrigger>
                <TabsTrigger value="table2">Data table</TabsTrigger>
                <TabsTrigger value="table3">Sticky headers table</TabsTrigger>
                <TabsTrigger value="table4">Skew table</TabsTrigger>
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
        </Tabs>
    );
}
