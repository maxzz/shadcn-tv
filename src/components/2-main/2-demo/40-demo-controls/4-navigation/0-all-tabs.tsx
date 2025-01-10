import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { BreadcrumbDemo } from "./3-demo-breadcrumb";
import { PaginationDemo } from "./3-demo-pagination";
import { TimelineDemo2 } from "./5-timeline-2";

export function SubTab_Navigation() {
    return (
        <Tabs defaultValue="nav1">
            <TabsList>
                <TabsTrigger value="nav1">Breadcrumb</TabsTrigger>
                <TabsTrigger value="nav2">Pagination</TabsTrigger>
                <TabsTrigger value="nav4">Timeline2</TabsTrigger>
            </TabsList>

            <TabsContent value="nav1">
                <BreadcrumbDemo />
            </TabsContent>

            <TabsContent value="nav2">
                <PaginationDemo />
            </TabsContent>

            <TabsContent value="nav4">
                <TimelineDemo2 />
            </TabsContent>
        </Tabs>
    );
}
