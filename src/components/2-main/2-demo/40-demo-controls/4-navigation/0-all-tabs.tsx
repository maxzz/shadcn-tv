import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { BreadcrumbDemo } from "./3-demo-breadcrumb";
import { PaginationDemo } from "./3-demo-pagination";

export function SubTab_Navigation() {
    return (
        <Tabs defaultValue="nav1">
            <TabsList>
                <TabsTrigger value="nav1">Breadcrumb</TabsTrigger>
                <TabsTrigger value="nav2">Pagination</TabsTrigger>
            </TabsList>

            <TabsContent value="nav1">
                <BreadcrumbDemo />
            </TabsContent>

            <TabsContent value="nav2">
                <PaginationDemo />
            </TabsContent>
        </Tabs>
    );
}
