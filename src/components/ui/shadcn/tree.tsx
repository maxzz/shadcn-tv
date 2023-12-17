import React from "react"; // https://github.com/shadcn-ui/ui/issues/355#issuecomment-1703767574 'G: shadcn tree'
import * as A from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import useResizeObserver from "use-resize-observer";
import { ChevronRight, type LucideIcon as LucideIconType } from "lucide-react";
import { cn } from "@/utils";
import { inputFocusClasses } from "../shared-styles";

export type TreeDataItem = {
    id: string;
    name: string;
    icon?: LucideIconType,
    children?: TreeDataItem[];
};

type TreeProps = {
    data: TreeDataItem[] | TreeDataItem,
    initialSlelectedItemId?: string,
    onSelectChange?: (item: TreeDataItem | undefined) => void,
    expandAll?: boolean,
    iconFolder?: LucideIconType,
    iconItem?: LucideIconType;
};

export const Tree = React.forwardRef<HTMLDivElement, TreeProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ data, initialSlelectedItemId, onSelectChange, expandAll, iconFolder: folderIcon, iconItem: itemIcon, className, ...rest }, ref) => {
        const [selectedItemId, setSelectedItemId] = React.useState(initialSlelectedItemId);

        const handleSelectChange = React.useCallback(
            (item: TreeDataItem | undefined) => {
                setSelectedItemId(item?.id);
                onSelectChange?.(item);
            }, [onSelectChange]
        );

        const expandedItemIds = React.useMemo(() => collectExpandedItemIds(data, initialSlelectedItemId, expandAll), [data, initialSlelectedItemId, expandAll]);

        const { ref: refRoot, width, height } = useResizeObserver();

        return (
            <div ref={refRoot} className={cn("overflow-hidden", className)}>
                <ScrollArea style={{ width, height }}>
                    <div className="relative z-0 px-2 py-1">
                        <TreeItem
                            ref={ref}
                            data={data}
                            selectedItemId={selectedItemId}
                            handleSelectChange={handleSelectChange}
                            expandedItemIds={expandedItemIds}
                            FolderIcon={folderIcon}
                            ItemIcon={itemIcon}
                            {...rest}
                        />
                    </div>
                </ScrollArea>
            </div>
        );
    }
);

function collectExpandedItemIds(data: TreeDataItem[] | TreeDataItem, initialSlelectedItemId: string | undefined, expandAll: boolean | undefined): string[] {
    const rv: string[] = [];

    if (initialSlelectedItemId) {
        walkTreeItems(data, initialSlelectedItemId);
    }

    return rv;

    function walkTreeItems(items: TreeDataItem[] | TreeDataItem, targetId: string) {
        if (items instanceof Array) {
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < items.length; i++) {
                rv.push(items[i]!.id);

                if (walkTreeItems(items[i]!, targetId) && !expandAll) {
                    return true;
                }

                if (!expandAll) {
                    rv.pop();
                }
            }
        } else if (!expandAll && items.id === targetId) {
            return true;
        } else if (items.children) {
            return walkTreeItems(items.children, targetId);
        }
    }
}

type TreeItemProps =
    & TreeProps
    & {
        selectedItemId?: string,
        handleSelectChange: (item: TreeDataItem | undefined) => void,
        expandedItemIds: string[],
        FolderIcon?: LucideIconType,
        ItemIcon?: LucideIconType;
    };

const treeItemBaseClasses = "\
px-2 \
before:absolute \
before:left-0 \
before:w-full \
before:h-[1.75rem] \
before:bg-muted/80 before:opacity-0 hover:before:opacity-100 \
before:-z-10 \
";
const treeItemSelectedClasses = "\
text-accent-foreground \
dark:before:border-0 \
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
";
const treeItemIconClasses = "h-4 w-4 shrink-0 mr-2 text-accent-foreground/50";

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ className, data, selectedItemId, handleSelectChange, expandedItemIds, FolderIcon, ItemIcon, ...rest }, ref) => {
        return (
            <div ref={ref} role="tree" className={className} {...rest}>
                <ul>
                    {data instanceof Array
                        ? data.map(
                            (item) => (
                                <li key={item.id}>
                                    {item.children
                                        ? (
                                            <A.Root type="multiple" defaultValue={expandedItemIds}>
                                                <A.Item value={item.id}>
                                                    <TreeItemTrigger
                                                        className={cn(treeItemBaseClasses, selectedItemId === item.id && treeItemSelectedClasses)}
                                                        onClick={() => handleSelectChange(item)}
                                                    >
                                                        {item.icon && <item.icon className={treeItemIconClasses} aria-hidden="true" />}
                                                        {!item.icon && FolderIcon && <FolderIcon className={treeItemIconClasses} aria-hidden="true" />}
                                                        <span className="text-sm truncate">{item.name}</span>
                                                    </TreeItemTrigger>

                                                    <TreeItemContent className="pl-6">
                                                        <TreeItem
                                                            data={item.children ? item.children : item}
                                                            selectedItemId={selectedItemId}
                                                            handleSelectChange={handleSelectChange}
                                                            expandedItemIds={expandedItemIds}
                                                            FolderIcon={FolderIcon}
                                                            ItemIcon={ItemIcon}
                                                        />
                                                    </TreeItemContent>
                                                </A.Item>
                                            </A.Root>
                                        ) : (
                                            <Leaf
                                                item={item}
                                                isSelected={selectedItemId === item.id}
                                                onClick={() => handleSelectChange(item)}
                                                Icon={ItemIcon}
                                            />
                                        )}
                                </li>
                            )
                        )
                        : (
                            <li>
                                <Leaf
                                    item={data}
                                    isSelected={selectedItemId === data.id}
                                    onClick={() => handleSelectChange(data)}
                                    Icon={ItemIcon}
                                />
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
);

const leafBaseClasses = "\
px-2 py-1 r1elative \
\
before:absolute \
before:left-0 \
before:right-1 \
before:w-full \
before:h-[1.75rem] \
before:bg-muted/80 before:opacity-0 hover:before:opacity-100 \
before:!b1g-red-800 \
_z-20 \
before:_z-10 \
before:-z-10 \
\
cursor-pointer \
flex items-center \
";
const leafSelectedClasses = "\
text-accent-foreground \
dark:before:border-0 \
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
";
const leafIconClasses = "shrink-0 mr-2 w-4 h-4 text-accent-foreground/50";

const Leaf = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { item: TreeDataItem, isSelected?: boolean, Icon?: LucideIconType; }>(
    ({ className, item, isSelected, Icon, ...rest }, ref) => {
        return (
            <div ref={ref} className={cn(leafBaseClasses, className, isSelected && leafSelectedClasses)} {...rest}>

                {item.icon && <item.icon className={leafIconClasses} aria-hidden="true" />}
                {!item.icon && Icon && <Icon className={leafIconClasses} aria-hidden="true" />}

                <span className="flex-grow text-sm truncate">
                    {item.name}
                </span>
            </div>
        );
    }
);

const TreeItemTrigger = React.forwardRef<React.ElementRef<typeof A.Trigger>, React.ComponentPropsWithoutRef<typeof A.Trigger>>(
    ({ className, children, ...rest }, ref) => (
        <A.Header>
            <A.Trigger
                ref={ref}
                // className={cn("flex-1 py-1 w-full transition-all last:[&[data-state=open]>svg]:rotate-90 flex items-center", "border border-red-500", className)}
                // className={cn("flex-1 py-1 w-full transition-all last:[&[data-state=open]>svg]:rotate-90 flex items-center", inputFocusClasses, "focus:rounded", className)}
                className={cn("flex-1 py-1 w-full transition-all last:[&[data-state=open]>svg]:rotate-90 flex items-center", className)}
                // className={cn("flex-1 py-1 w-full transition-all last:[&[data-state=open]>svg]:rotate-90 flex items-center", className)} tabIndex={-1}
                // className={cn("flex-1 py-1 !mr-8 w-full transition-all last:[&[data-state=open]>svg]:rotate-90 flex items-center", className)}
                // className={cn("flex-1 py-1 w-full transition-all last:[&[data-state=open]>svg]:rotate-90 flex items-center", className)}
                {...rest}
            >
                {children}
                <ChevronRight className="shrink-0 ml-auto h-4 w-4 text-accent-foreground/50 transition-transform duration-200" />
            </A.Trigger>
        </A.Header>
    )
);
TreeItemTrigger.displayName = A.Trigger.displayName;

const TreeItemContent = React.forwardRef<React.ElementRef<typeof A.Content>, React.ComponentPropsWithoutRef<typeof A.Content>>(
    ({ className, children, ...rest }, ref) => (
        <A.Content
            ref={ref}
            className={cn("text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down transition-all overflow-hidden", className)}
            {...rest}
        >
            <div>{children}</div>
        </A.Content>
    )
);
TreeItemContent.displayName = A.Content.displayName;
