import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, SyntheticEvent, forwardRef, useCallback, useMemo, useRef, useState } from "react";
import * as A from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import useResizeObserver from "use-resize-observer";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils";
import { DataItem, TreenIconType, TypeTreeFolder, TypeTreeFolderTrigger } from "./shared/types";
import { collectExpandedItemIds, findTreeItemById, getNextId } from "./shared/utils";
import { treeItemBaseClasses, treeItemSelectedClasses, treeItemIconClasses, leafBaseClasses, leafSelectedClasses, leafIconClasses } from "./shared/classes";

type TreeProps = {
    data: DataItem[] | DataItem;

    onSelectChange?: (item: DataItem | undefined) => void;
    initialSelectedItemId?: string;
    expandAll?: boolean;

    IconForFolder?: TreenIconType;
    IconForItem?: TreenIconType;
};

export const Tree = forwardRef<HTMLDivElement, TreeProps & HTMLAttributes<HTMLDivElement>>(
    ({ data, initialSelectedItemId, onSelectChange, expandAll, IconForFolder, IconForItem, className, ...rest }, ref) => {
        const [selectedItemId, setSelectedItemId] = useState<string | undefined>(initialSelectedItemId);

        const handleSelectChange = useCallback(
            (event: SyntheticEvent<any>, item: DataItem | undefined) => {
                event.stopPropagation();
                setSelectedItemId(item?.id);
                onSelectChange?.(item);
            }, [onSelectChange]
        );

        const expandedItemIds = useMemo(() => collectExpandedItemIds(data, initialSelectedItemId, expandAll), [data, initialSelectedItemId, expandAll]);

        const refRoot = useRef<HTMLDivElement | null>(null);
        const { ref: refRootCb, width, height } = useResizeObserver();

        return (
            <div
                ref={(r) => { refRootCb(r); refRoot.current = r; }}
                className={cn("overflow-hidden", className)}
                tabIndex={0}
                onKeyDown={(e) => {
                    const nextId = getNextId(refRoot.current!, e, selectedItemId);
                    nextId && handleSelectChange(e, findTreeItemById(data, nextId));
                }}
            >
                <ScrollArea style={{ width, height }} onClick={(e) => handleSelectChange(e, undefined)}>
                    <div className="relative z-0 px-2 py-1">
                        <TreeItem
                            ref={ref}
                            data={data}
                            selectedItemId={selectedItemId}
                            handleSelectChange={handleSelectChange}
                            expandedItemIds={expandedItemIds}
                            IconForFolder={IconForFolder}
                            IconForItem={IconForItem}
                            {...rest}
                        />
                    </div>
                </ScrollArea>
            </div>
        );
    }
);

type TreeItemProps = Prettify<
    & Pick<TreeProps, 'data' | 'IconForFolder' | 'IconForItem'>
    & {
        selectedItemId?: string,
        handleSelectChange: (event: SyntheticEvent<any>, item: DataItem | undefined) => void,
        expandedItemIds: string[],
    }>;

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps & HTMLAttributes<HTMLDivElement>>(
    ({ className, data, selectedItemId, handleSelectChange, expandedItemIds, IconForFolder, IconForItem, ...rest }, ref) => {
        return (
            <div ref={ref} role="tree" className={className} {...rest}>
                <ul>
                    {data instanceof Array
                        ? (data.map((item) => (
                            <li key={item.id}>
                                {item.children
                                    ? (
                                        <A.Root type="multiple" defaultValue={expandedItemIds}>
                                            <A.Item value={item.id} data-tree-id={item.id} data-tree-folder={TypeTreeFolder}>
                                                <Folder
                                                    item={item}
                                                    isSelected={selectedItemId === item.id}
                                                    Icon={IconForFolder}
                                                    onClick={(e) => handleSelectChange(e, item)}
                                                />

                                                <FolderContent className="pl-6">
                                                    <TreeItem
                                                        data={item.children}
                                                        selectedItemId={selectedItemId}
                                                        handleSelectChange={handleSelectChange}
                                                        expandedItemIds={expandedItemIds}
                                                        IconForFolder={IconForFolder}
                                                        IconForItem={IconForItem}
                                                    />
                                                </FolderContent>
                                            </A.Item>
                                        </A.Root>
                                    ) : (
                                        <Leaf
                                            item={item}
                                            isSelected={selectedItemId === item.id}
                                            onClick={(e) => handleSelectChange(e, item)}
                                            Icon={IconForItem}
                                        />
                                    )}
                            </li>
                        )))
                        : (
                            <li>
                                <Leaf
                                    item={data}
                                    isSelected={selectedItemId === data.id}
                                    onClick={(e) => handleSelectChange(e, data)}
                                    Icon={IconForItem}
                                />
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
);

const Leaf = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { item: DataItem, isSelected?: boolean, Icon?: TreenIconType; }>(
    ({ className, item, isSelected, Icon, ...rest }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(leafBaseClasses, className, isSelected && leafSelectedClasses)}
                data-tree-id={item.id}
                {...rest}
            >
                <TreeIconAndText item={item} Icon={Icon} classes={leafIconClasses} />
            </div>
        );
    }
);
Leaf.displayName = 'Tree.Leaf';

const Folder = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & { item: DataItem, isSelected?: boolean, Icon?: TreenIconType; }>(
    ({ className, item, isSelected, Icon, ...rest }, ref) => {
        return (
            <FolderTrigger
                className={cn(treeItemBaseClasses, isSelected && treeItemSelectedClasses)}
                data-tree-folder-trigger={TypeTreeFolderTrigger}
                ref={ref}
                {...rest}
            >
                <TreeIconAndText item={item} Icon={Icon} classes={treeItemIconClasses} />
            </FolderTrigger>
        );
    }
);
Folder.displayName = 'Tree.Folder';

const FolderTrigger = forwardRef<ElementRef<typeof A.Trigger>, ComponentPropsWithoutRef<typeof A.Trigger>>(
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
FolderTrigger.displayName = 'Tree.Folder.Trigger';

const FolderContent = forwardRef<ElementRef<typeof A.Content>, ComponentPropsWithoutRef<typeof A.Content>>(
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
FolderContent.displayName = 'Tree.Folder.Content';

function TreeIconAndText({ item, Icon, classes }: { item: DataItem; Icon?: TreenIconType; classes: string; }) {
    return (<>
        {item.icon && <item.icon className={classes} aria-hidden="true" />}
        {!item.icon && Icon && <Icon className={classes} aria-hidden="true" />}

        <span className="flex-grow text-sm truncate">
            {item.name}
        </span>
    </>);
}