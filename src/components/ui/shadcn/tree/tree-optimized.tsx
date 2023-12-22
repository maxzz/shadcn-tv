import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { proxy } from "valtio";
import * as A from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import useResizeObserver from "use-resize-observer";
import { ChevronRight, type LucideIcon as LucideIconType } from "lucide-react";
import { cn } from "@/utils";
import { DataItemNavigation, DataItemCore, DataItemNav, TypeTreeFolder, TypeTreeFolderTrigger } from "./shared/types";
import { collectExpandedItemIds, findTreeItemById, getNextId } from "./shared/utils";

export type ItemState = {
    state: {
        selected: boolean;
    };
};

export type DataItemWState = DataItemNavigation<DataItemCore & ItemState>;

type TreeProps = {
    data: DataItemWState[] | DataItemWState;
    initialSelectedItemId?: string;
    onSelectChange?: (item: DataItemWState | undefined) => void;
    expandAll?: boolean;

    iconFolder?: LucideIconType;
    iconItem?: LucideIconType;
};

type TreeState = {
    selectedId: string | undefined;
};

export const Tree = forwardRef<HTMLDivElement, TreeProps & HTMLAttributes<HTMLDivElement>>(
    ({ data, initialSelectedItemId, onSelectChange, expandAll, iconFolder, iconItem, className, ...rest }, ref) => {
        const [selectedItemId, setSelectedItemId] = useState(initialSelectedItemId);

        const [state] = useState(() => {
            const uiState = proxy<TreeState>({
                selectedId: undefined,
            });
            return uiState;
        });

        const handleSelectChange = useCallback(
            (item: DataItemWState | undefined) => {
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
                    nextId && handleSelectChange(findTreeItemById(data, nextId));
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
                            IconForFolder={iconFolder}
                            IconForItem={iconItem}
                            {...rest}
                        />
                    </div>
                </ScrollArea>
            </div>
        );
    }
);

type TreeItemProps = Prettify<
    & Pick<TreeProps, 'data'>
    & {
        selectedItemId?: string,
        handleSelectChange: (item: DataItemWState | undefined) => void,
        expandedItemIds: string[],

        IconForFolder?: LucideIconType,
        IconForItem?: LucideIconType;
    }>;

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
    ({ className, data, selectedItemId, handleSelectChange, expandedItemIds, IconForFolder, IconForItem, ...rest }, ref) => {
        return (
            <div ref={ref} role="tree" className={className} {...rest}>
                <ul>
                    {data instanceof Array
                        ? (
                            data.map(
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
                                                            {!item.icon && IconForFolder && <IconForFolder className={treeItemIconClasses} aria-hidden="true" />}
                                                            <span className="text-sm truncate">{item.name}</span>
                                                        </TreeItemTrigger>

                                                        <TreeItemContent className="pl-6">
                                                            <TreeItem
                                                                data={item.children}
                                                                selectedItemId={selectedItemId}
                                                                handleSelectChange={handleSelectChange}
                                                                expandedItemIds={expandedItemIds}
                                                                IconForFolder={IconForFolder}
                                                                IconForItem={IconForItem}
                                                            />
                                                        </TreeItemContent>
                                                    </A.Item>
                                                </A.Root>
                                            ) : (
                                                <Leaf
                                                    item={item}
                                                    isSelected={selectedItemId === item.id}
                                                    onClick={() => handleSelectChange(item)}
                                                    Icon={IconForItem}
                                                    data-tree-id={item.id}
                                                />
                                            )}
                                    </li>
                                )
                            )
                        )
                        : (
                            <li>
                                <Leaf
                                    item={data}
                                    isSelected={selectedItemId === data.id}
                                    onClick={() => handleSelectChange(data)}
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

const Leaf = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { item: DataItemWState, isSelected?: boolean, Icon?: LucideIconType; }>(
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
