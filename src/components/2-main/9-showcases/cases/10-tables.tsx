import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { SimpleTableDemo, DataTableDemo, TablesWithStyckyHeaderModules, SkewTable, RotaingBooksDemo } from "../../2-demo/10-demo-tables";

export function TableInTabs() {
    return (
        <Tabs defaultValue="table5">
            <TabsList>
                <TabsTrigger value="table1">Simple</TabsTrigger>
                <TabsTrigger value="table2">Data</TabsTrigger>
                <TabsTrigger value="table3">Sticky headers</TabsTrigger>
                <TabsTrigger value="table4">Skew</TabsTrigger>
                <TabsTrigger value="table5">Books</TabsTrigger>
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
        </Tabs>
    );
}
