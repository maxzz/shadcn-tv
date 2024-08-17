import { Button } from '@/components/ui/shadcn';
import { DropdownMenu, MenuItemType } from '@/components/ui/ui-dropdown-menu';
import { IconMenuHamburger } from '@/components/ui/icons/normal';

const topMenuItems = [
    {
        id: "new-file",
        label: "New File",
    }, {
        id: "open-settings",
        label: "Settings",
    },
] as const satisfies readonly MenuItemType[];

type TopMenuItemId = (typeof topMenuItems)[number]['id'];

const containerClasses = "w-40";

export function MenuDropdownDemo() {

    function onCommand(id: string) {
        const idTyped = id as TopMenuItemId;
        switch (idTyped) {
            case "new-file":
                console.log(idTyped);
                break;
            case "open-settings":
                console.log(idTyped);
                break;
        }
    }

    return (
        <div className="py-1 select-none flex items-center justify-between">
            <div>
                <DropdownMenu
                    trigger={
                        <Button variant="outline" className="px-2 flex items-center gap-1" >
                            <IconMenuHamburger className="size-4 mt-0.5" />
                            Dropdown
                        </Button>
                    }
                    items={topMenuItems}
                    containerClasses={containerClasses}
                    menuContentProps={{ sideOffset: 4, align: "start" }}
                    onCommand={onCommand}
                />
            </div>
        </div>
    );
}
