import { Menubar } from "@/components/ui/shadcn/menubar";
import { FileMenu } from "./1-menu-file";
import { EditMenu } from "./2-menu-edit";
import { ViewMenu } from "./3-menu-view";
import { ProfilesMenu } from "./4-menu-profiles";

export function MenubarDemo() {
    return (
        <Menubar>
            <FileMenu />
            <EditMenu />
            <ViewMenu />
            <ProfilesMenu />
        </Menubar>
    );
}
