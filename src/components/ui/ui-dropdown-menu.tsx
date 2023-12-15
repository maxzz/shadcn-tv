import { ReactNode } from "react";
import * as M from "@radix-ui/react-dropdown-menu";
import { popupAnimatonClasses } from "./shadcn/shared";
import { classNames } from "@/utils";

export interface MenuItemType {
    readonly id: string;
    readonly icon?: ReactNode;
    readonly label: string;
    readonly shortcut?: string;
}

interface DropdownMenuProps {
    trigger: ReactNode;
    onCommand: (id: string) => void;
    items: readonly MenuItemType[];
    containerClasses: string;
    menuContentProps?: M.MenuContentProps;
}

// radix-side-top:animate-slide-up \
// radix-side-bottom:animate-slide-down \

// export const popupAnimatonClasses = " \
// data-[state=open]:animate-in \
// data-[state=open]:fade-in-0 \
// data-[state=open]:zoom-in-95 \
// \
// data-[state=closed]:animate-out \
// data-[state=closed]:fade-out-0 \
// data-[state=closed]:zoom-out-95 \
// \
// data-[side=bottom]:slide-in-from-top-2 \
// data-[side=left]:slide-in-from-right-2 \
// data-[side=right]:slide-in-from-left-2 \
// data-[side=top]:slide-in-from-bottom-2 \
// ";

const contentClasses = `${" \
p-1 \
bg-background \
\
border rounded-md shadow-md \
"} ${popupAnimatonClasses}`;

const itemClasses = " \
px-2 py-2 text-xs  \
focus:bg-accent \
focus:text-accent-foreground \
outline-none rounded-md select-none cursor-default flex items-center \
";

export const DropdownMenu = ({ trigger, onCommand, items, containerClasses, menuContentProps }: DropdownMenuProps) => {
    return (
        <div className="relative inline-block text-left">
            <M.Root>
                <M.Trigger asChild>
                    {trigger}
                </M.Trigger>

                <M.Portal>
                    <M.Content align="end" {...menuContentProps} className={classNames(contentClasses, containerClasses)}>
                        {items.map(({ id, label, icon, shortcut }, idx) => (
                            <M.Item key={id} className={itemClasses} onClick={() => onCommand(id)}>
                                {icon}
                                <span className="flex-grow">
                                    {label}
                                </span>
                                {shortcut && <span className="text-xs">{shortcut}</span>}
                            </M.Item>
                        ))}
                    </M.Content>
                </M.Portal>
            </M.Root>
        </div>
    );
};
