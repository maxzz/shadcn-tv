import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { BreadcrumbDemo, PaginationDemo } from "../1-rest";
import { SubTab_Timeline } from "../2-timeline";

export function SubTab_Navigation() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="nav1" value={activeTabs.navigation} onValueChange={(v) => appSettings.demosState.activeTabs.navigation = v}>
            <TabsList>
                <TabsTrigger value="nav1">Breadcrumb</TabsTrigger>
                <TabsTrigger value="nav2">Pagination</TabsTrigger>
                <TabsTrigger value="nav3">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="nav1">
                <BreadcrumbDemo />
            </TabsContent>

            <TabsContent value="nav2">
                <PaginationDemo />
            </TabsContent>

            <TabsContent value="nav3">
                <SubTab_Timeline />
            </TabsContent>
        </Tabs>
    );
}
