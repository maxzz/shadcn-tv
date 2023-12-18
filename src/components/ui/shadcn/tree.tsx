import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef, KeyboardEvent, useCallback, useMemo, useRef, useState } from "react"; // https://github.com/shadcn-ui/ui/issues/355#issuecomment-1703767574 'G: shadcn tree'
import * as A from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import useResizeObserver from "use-resize-observer";
import { ChevronRight, type LucideIcon as LucideIconType } from "lucide-react";
import { cn } from "@/utils";

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

const AttrTreeId = "data-tree-id";
const AttrTreeFolder = "data-tree-folder";
const AttrTreeFolderTrigger = "data-tree-folder-trigger";
const TypeTreeFolder = "folder";
const TypeTreeFolderTrigger = "folder-trigger";

function getNextId(root: HTMLDivElement, e: KeyboardEvent<HTMLDivElement>, selectedItemId: string | undefined): string | undefined {
    console.log("TreeItem handleKeyDown", e.key);

    if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target as HTMLElement;
        const isFolder = target.dataset.state !== undefined;
        console.log("TreeItem handleKeyDown", isFolder, target.dataset.state);

        if (isFolder) {
            const trigger = target.querySelector<HTMLElement>(`[${AttrTreeFolderTrigger}]`);
            if (trigger) {
                trigger.click();
            }
        }
        return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();

        const expandedNow = [...root.querySelectorAll<HTMLDivElement>(`[${AttrTreeId}]`)].map((el) => {
            console.log("TreeItem handleKeyDown", el.dataset.treeId);
            return { id: el.dataset.treeId, el };
        });

        if (!expandedNow.length) {
            return;
        }

        if (!selectedItemId) {
            return expandedNow[0].id;
        }

        const index = expandedNow.findIndex((item) => item.id === selectedItemId);
        if (index !== -1) {
            const nextIndex = e.key === "ArrowDown" ? index + 1 : index - 1;
            if (nextIndex >= 0 && nextIndex < expandedNow.length) {
                return expandedNow[nextIndex].id;
            }
        }

        // const target = e.target as HTMLElement;
        // const folder = target.closest(`[${AttrTreeFolder}]`);
        // if (folder) {
        //     const trigger = folder.querySelector(`[${AttrTreeFolderTrigger}]`);
        //     if (trigger) {
        //         trigger.click();
        //     }
        // }
    }

    function getExpandedItems(root: HTMLDivElement): { expandedNow: { id: string; el: HTMLElement; }[]; index: string | undefined; } {
        const expandedNow = [...root.querySelectorAll<HTMLDivElement>(`[${AttrTreeId}]`)].map((el) => {
            console.log("TreeItem handleKeyDown", el.dataset.treeId);
            return { id: el.dataset.treeId!, el };
        });

        if (!expandedNow.length) {
            return { expandedNow, index: undefined };
        }

        if (!selectedItemId) {
            return { expandedNow, index: expandedNow[0].id};
        }

        const index = expandedNow.findIndex((item) => item.id === selectedItemId);

        return { expandedNow, index: index !== -1 ? expandedNow[index].id : undefined };
    }
}

export const Tree = forwardRef<HTMLDivElement, TreeProps & HTMLAttributes<HTMLDivElement>>(
    ({ data, initialSlelectedItemId, onSelectChange, expandAll, iconFolder: folderIcon, iconItem: itemIcon, className, ...rest }, ref) => {
        const [selectedItemId, setSelectedItemId] = useState(initialSlelectedItemId);

        const handleSelectChange = useCallback(
            (item: TreeDataItem | undefined) => {
                setSelectedItemId(item?.id);
                onSelectChange?.(item);
            }, [onSelectChange]
        );

        const expandedItemIds = useMemo(() => collectExpandedItemIds(data, initialSlelectedItemId, expandAll), [data, initialSlelectedItemId, expandAll]);

        const refRoot = useRef<HTMLDivElement | null>(null);
        const { ref: refRootCb, width, height } = useResizeObserver();

        return (
            <div
                ref={(r) => { refRootCb(r); refRoot.current = r; }}
                className={cn("overflow-hidden", className)}
                tabIndex={0}

                onKeyDown={(e) => {
                    console.log("Tree onKeyDown", e.key);

                    const nextId = getNextId(refRoot.current!, e, selectedItemId);
                    if (nextId) {
                        const newItem = findTreeItemById(nextId, data);
                        handleSelectChange(newItem);
                    }

                    // if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    //     e.preventDefault();
                    //     const items = data instanceof Array ? data : [data];
                    //     const index = items.findIndex((item) => item.id === selectedItemId);
                    //     if (index !== -1) {
                    //         const nextIndex = e.key === "ArrowDown" ? index + 1 : index - 1;
                    //         if (nextIndex >= 0 && nextIndex < items.length) {
                    //             handleSelectChange(items[nextIndex]);
                    //         }
                    //     }
                    // }
                }}
            >
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

    function walkTreeItems(items: TreeDataItem[] | TreeDataItem, targetId: string) { // Returns true if item expanded
        if (items) {
            if (items instanceof Array) {
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < items.length; i++) {
                    rv.push(items[i].id);

                    if (walkTreeItems(items[i], targetId) && !expandAll) {
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
}

export function findTreeItemById(id: string, items: TreeDataItem[] | TreeDataItem | undefined | null): TreeDataItem | undefined {
    if (id && items) {
        if (!Array.isArray(items)) {
            items = [items];
        }
        for (const item of items) {
            if (item.id === id) {
                return item;
            }
            if (item.children) {
                const found = findTreeItemById(id, item.children);
                if (found) {
                    return found;
                }
            }
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

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps & HTMLAttributes<HTMLDivElement>>(
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
                                                <A.Item value={item.id} data-tree-id={item.id} data-tree-folder={TypeTreeFolder}>
                                                    <TreeItemTrigger
                                                        className={cn(treeItemBaseClasses, selectedItemId === item.id && treeItemSelectedClasses)}
                                                        onClick={() => handleSelectChange(item)}
                                                        data-tree-folder-trigger={TypeTreeFolderTrigger}
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
                                                data-tree-id={item.id}
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

const Leaf = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { item: TreeDataItem, isSelected?: boolean, Icon?: LucideIconType; }>(
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

const TreeItemTrigger = forwardRef<ElementRef<typeof A.Trigger>, ComponentPropsWithoutRef<typeof A.Trigger>>(
    ({ className, children, ...rest }, ref) => (
        <A.Header>
            <A.Trigger
                ref={ref}
                asChild
                className={cn("flex-1 py-1 w-full transition-all last:[&[data-state=open]>svg]:rotate-90 outline-none cursor-pointer flex items-center", className)}
                {...rest}
            >
                <div>
                    {children}
                    <ChevronRight className="shrink-0 ml-auto h-4 w-4 text-accent-foreground/50 transition-transform duration-200" />
                </div>
            </A.Trigger>
        </A.Header>
    )
);
TreeItemTrigger.displayName = A.Trigger.displayName;

const TreeItemContent = forwardRef<ElementRef<typeof A.Content>, ComponentPropsWithoutRef<typeof A.Content>>(
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
