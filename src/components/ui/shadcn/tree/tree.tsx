import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, SyntheticEvent, forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import * as A from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import useResizeObserver from "use-resize-observer";
import { ChevronRight } from "lucide-react";
import { classNames, cn } from "@/utils";
import { DataItemNavigation, DataItemCore, TypeTreeFolder, TypeTreeFolderTrigger, DataItem, TreenIconType } from "./shared/types";
import { collectExpandedItemIds, findTreeItemById, getNextId } from "./shared/utils";
import { treeItemBaseClasses, treeItemSelectedClasses, treeItemIconClasses, leafBaseClasses, leafSelectedClasses, leafIconClasses } from "./shared/classes";

export type ItemState = {
    state: {
        selected: boolean;
    };
};

export type DataItemWState = DataItemNavigation<DataItemCore & ItemState>;

type TreeProps = Prettify<
    & {
        data: DataItemWState[] | DataItemWState;

        onSelectChange?: (item: DataItemWState | undefined) => void;
        initialSelectedItemId?: string;
        expandAll?: boolean;

        IconForFolder?: TreenIconType;
        IconForItem?: TreenIconType;
    }
    & TreeOptions
>;

type TreeOptions = { arrowFirst?: boolean; hideFolderIcon?: boolean; };
type TreeState = {
    selectedId: string | undefined;
};

export const Tree = forwardRef<HTMLDivElement, TreeProps & HTMLAttributes<HTMLDivElement>>(
    ({ data, initialSelectedItemId, onSelectChange, expandAll, IconForFolder, IconForItem, arrowFirst, hideFolderIcon, className, ...rest }, ref) => {

        const [treeState] = useState(() => {
            const uiState = proxy<TreeState>({
                selectedId: undefined,
            });
            return uiState;
        });

        const expandedItemIds = useMemo(
            () => {
                const rv = collectExpandedItemIds(data, initialSelectedItemId, expandAll);

                const selectedNow = findTreeItemById(data, treeState.selectedId);
                selectedNow && (selectedNow.state.selected = false);

                const last = findTreeItemById(data, rv[rv.length - 1]);
                if (last) {
                    last.state.selected = true;
                    treeState.selectedId = last.id;
                }
                return rv;
            }, [data, initialSelectedItemId, expandAll]
        );

        const handleSelectChange = useCallback(
            (event: SyntheticEvent<any>, item: DataItemWState | undefined) => {
                event.stopPropagation();

                if (treeState.selectedId) {
                    const prevItem = findTreeItemById(data, treeState.selectedId);
                    prevItem && (prevItem.state.selected = false);
                }

                if (item) {
                    item.state.selected = !item.state.selected;
                    treeState.selectedId = item.id;
                } else {
                    treeState.selectedId = undefined;
                }

                onSelectChange?.(item);
            }, [treeState, onSelectChange]
        );

        const refRoot = useRef<HTMLDivElement | null>(null);
        const { ref: refRootCb, width, height } = useResizeObserver();

        return (
            <div
                ref={(r) => { refRootCb(r); refRoot.current = r; }}
                className={cn("_overflow-hidden", className)}
                tabIndex={0}
                onKeyDown={(e) => {
                    const nextId = getNextId(refRoot.current!, e, treeState.selectedId);
                    nextId && handleSelectChange(e, findTreeItemById(data, nextId));
                }}
            >
                <ScrollArea className="tree-scroll" style={{ width, height }} onClick={(e) => handleSelectChange(e, undefined)}>
                    <div className="relative z-0 px-2 py-1" >
                        <TreeItem
                            ref={ref}
                            data={data}
                            handleSelectChange={handleSelectChange}
                            expandedItemIds={expandedItemIds}
                            IconForFolder={IconForFolder}
                            IconForItem={IconForItem}
                            arrowFirst={arrowFirst}
                            hideFolderIcon={hideFolderIcon}
                            {...rest}
                        />
                    </div>
                </ScrollArea>
            </div>
        );
    }
);

type HandleSelectChange = (event: SyntheticEvent<any>, item: DataItemWState | undefined) => void;

type TreeItemProps = Prettify<
    & Pick<TreeProps, 'data' | 'IconForFolder' | 'IconForItem'>
    & {
        handleSelectChange: HandleSelectChange;
        expandedItemIds: string[];
    }
    & TreeOptions
>;

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps & HTMLAttributes<HTMLDivElement>>(
    ({ className, data, handleSelectChange, expandedItemIds, IconForFolder, IconForItem, arrowFirst, hideFolderIcon, ...rest }, ref) => {
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
                                                    Icon={IconForFolder}
                                                    arrowFirst={arrowFirst}
                                                    hideFolderIcon={hideFolderIcon}
                                                    onClick={(e) => handleSelectChange(e, item)}
                                                />

                                                <FolderContent className="pl-6">
                                                    <TreeItem
                                                        data={item.children}
                                                        handleSelectChange={handleSelectChange}
                                                        expandedItemIds={expandedItemIds}
                                                        IconForFolder={IconForFolder}
                                                        IconForItem={IconForItem}
                                                        arrowFirst={arrowFirst}
                                                        hideFolderIcon={hideFolderIcon}
                                                    />
                                                </FolderContent>
                                            </A.Item>
                                        </A.Root>
                                    ) : (
                                        <Leaf
                                            item={item}
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

const Leaf = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { item: DataItemWState, Icon?: TreenIconType; }>(
    ({ className, item, Icon, ...rest }, ref) => {
        const { selected } = useSnapshot(item.state);
        return (
            <div
                ref={ref}
                className={cn(leafBaseClasses, className, selected && leafSelectedClasses)}
                data-tree-id={item.id}
                {...rest}
            >
                <TreeIconAndText item={item} Icon={Icon} classes={leafIconClasses} hideFolderIcon={false} />
            </div>
        );
    }
);
Leaf.displayName = 'Tree.Leaf';

const Folder = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & { item: DataItemWState, Icon?: TreenIconType; } & TreeOptions>(
    ({ className, item, Icon, arrowFirst = true, hideFolderIcon, ...rest }, ref) => {
        const { selected } = useSnapshot(item.state);
        return (
            <FolderTrigger
                className={cn(treeItemBaseClasses, selected && treeItemSelectedClasses)}
                data-tree-folder-trigger={TypeTreeFolderTrigger}
                arrowFirst={arrowFirst}
                ref={ref}
                {...rest}
            >
                <TreeIconAndText item={item} Icon={Icon} hideFolderIcon={hideFolderIcon} classes={treeItemIconClasses} />
            </FolderTrigger>
        );
    }
);
Folder.displayName = 'Tree.Folder';

const FolderTrigger = forwardRef<ElementRef<typeof A.Trigger>, ComponentPropsWithoutRef<typeof A.Trigger> & Pick<TreeOptions, 'arrowFirst'>>(
    ({ className, children, arrowFirst, ...rest }, ref) => {
        const ArrowIcon = <ChevronRight className={classNames("shrink-0 ml-auto h-4 w-4 text-accent-foreground/50 transition-transform duration-200", arrowFirst && "mr-2")} />;
        return (
            <A.Header>
                <A.Trigger
                    asChild
                    className={cn("flex-1 py-1 w-full transition-all outline-none cursor-pointer flex items-center", arrowFirst ? "first:[&[data-state=open]>svg]:rotate-90" : "last:[&[data-state=open]>svg]:rotate-90", className)}
                    ref={ref}
                    {...rest}
                >
                    <div>
                        {arrowFirst && <>{ArrowIcon}</>}
                        {children}
                        {!arrowFirst && <>{ArrowIcon}</>}
                    </div>
                </A.Trigger>
            </A.Header>
        );
    }
);
FolderTrigger.displayName = 'Tree.Folder.Trigger';

const FolderContent = forwardRef<ElementRef<typeof A.Content>, ComponentPropsWithoutRef<typeof A.Content>>(
    ({ className, children, ...rest }, ref) => (
        <A.Content
            ref={ref}
            className={cn("text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down transition-all overflow-hidden", className)}
            {...rest}
        >
            <div>
                {children}
            </div>
        </A.Content>
    )
);
FolderContent.displayName = 'Tree.Folder.Content';

function TreeIconAndText({ item, Icon, classes, hideFolderIcon }: { item: DataItem; Icon?: TreenIconType; classes: string; } & Pick<TreeOptions, 'hideFolderIcon'>) {
    return (<>
        {item.icon && <item.icon className={classes} aria-hidden="true" />}
        {!item.icon && Icon && !hideFolderIcon && <Icon className={classes} aria-hidden="true" />}

        <span className="flex-grow text-sm truncate">
            {item.name}
        </span>
    </>);
}
