import React from "react"; // https://github.com/shadcn-ui/ui/issues/355#issuecomment-1703767574 'G: shadcn tree'
import useResizeObserver from "use-resize-observer";
import * as A from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { ChevronRight, type LucideIcon as LucideIconType } from "lucide-react";
import { cn } from "@/utils";

type TreeDataItem = {
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
    folderIcon?: LucideIconType,
    itemIcon?: LucideIconType;
};

const Tree = React.forwardRef<HTMLDivElement, TreeProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ data, initialSlelectedItemId, onSelectChange, expandAll, folderIcon, itemIcon, className, ...rest }, ref) => {
        const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(initialSlelectedItemId);

        const handleSelectChange = React.useCallback((item: TreeDataItem | undefined) => {
            setSelectedItemId(item?.id);
            if (onSelectChange) {
                onSelectChange(item);
            }
        }, [onSelectChange]);

        const expandedItemIds = React.useMemo((): string[] => {
            if (!initialSlelectedItemId) {
                return [];
            }

            const rv: string[] = [];

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

            walkTreeItems(data, initialSlelectedItemId);

            return rv;
        }, [data, initialSlelectedItemId]);

        const { ref: refRoot, width, height } = useResizeObserver();

        return (
            <div ref={refRoot} className={cn("overflow-hidden", className)}>
                <ScrollArea style={{ width, height }}>
                    <div className="relative p-2">
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

type TreeItemProps =
    & TreeProps
    & {
        selectedItemId?: string,
        handleSelectChange: (item: TreeDataItem | undefined) => void,
        expandedItemIds: string[],
        FolderIcon?: LucideIconType,
        ItemIcon?: LucideIconType;
    };

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ className, data, selectedItemId, handleSelectChange, expandedItemIds, FolderIcon, ItemIcon, ...rest }, ref) => {
        return (
            <div ref={ref} role="tree" className={className} {...rest}>
                <ul>
                    {data instanceof Array
                        ? data.map(
                            (item) => (
                                <li key={item.id}>
                                    {item.children ? (
                                        <A.Root type="multiple" defaultValue={expandedItemIds}>
                                            <A.Item value={item.id}>
                                                <AccordionTrigger
                                                    className={cn(
                                                        "px-2 hover:before:opacity-100 before:absolute before:left-0 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
                                                        selectedItemId === item.id && "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
                                                    )}
                                                    onClick={() => handleSelectChange(item)}
                                                >
                                                    {item.icon &&
                                                        <item.icon
                                                            className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50"
                                                            aria-hidden="true"
                                                        />
                                                    }
                                                    {!item.icon && FolderIcon &&
                                                        <FolderIcon
                                                            className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50"
                                                            aria-hidden="true"
                                                        />
                                                    }
                                                    <span className="text-sm truncate">{item.name}</span>
                                                </AccordionTrigger>
                                                <AccordionContent className="pl-6">
                                                    <TreeItem
                                                        data={item.children ? item.children : item}
                                                        selectedItemId={selectedItemId}
                                                        handleSelectChange={handleSelectChange}
                                                        expandedItemIds={expandedItemIds}
                                                        FolderIcon={FolderIcon}
                                                        ItemIcon={ItemIcon}
                                                    />
                                                </AccordionContent>
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

const Leaf = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { item: TreeDataItem, isSelected?: boolean, Icon?: LucideIconType; }>(
    ({ className, item, isSelected, Icon, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex items-center py-2 px-2 cursor-pointer \
                hover:before:opacity-100 before:absolute before:left-0 before:right-1 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
                    className,
                    isSelected && "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
                )}
                {...props}
            >
                {item.icon && <item.icon className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50" aria-hidden="true" />}
                {!item.icon && Icon && <Icon className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50" aria-hidden="true" />}
                <span className="flex-grow text-sm truncate">{item.name}</span>
            </div>
        );
    }
);

const AccordionTrigger = React.forwardRef<React.ElementRef<typeof A.Trigger>, React.ComponentPropsWithoutRef<typeof A.Trigger>>(
    ({ className, children, ...props }, ref) => (
        <A.Header>
            <A.Trigger
                ref={ref}
                className={cn(
                    "flex flex-1 w-full items-center py-2 transition-all last:[&[data-state=open]>svg]:rotate-90",
                    className
                )}
                {...props}
            >
                {children}
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 ml-auto" />
            </A.Trigger>
        </A.Header>
    )
);
AccordionTrigger.displayName = A.Trigger.displayName;

const AccordionContent = React.forwardRef<React.ElementRef<typeof A.Content>, React.ComponentPropsWithoutRef<typeof A.Content>>(
    ({ className, children, ...props }, ref) => (
        <A.Content
            ref={ref}
            className={cn(
                "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
                className
            )}
            {...props}
        >
            <div className="pb-1 pt-0">{children}</div>
        </A.Content>
    )
);
AccordionContent.displayName = A.Content.displayName;

export { Tree, type TreeDataItem };