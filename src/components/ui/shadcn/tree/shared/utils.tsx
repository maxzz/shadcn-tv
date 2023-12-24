import { KeyboardEvent } from "react";
import { AttrTreeFolderTrigger, AttrTreeId, DataItemNav } from "./types";

export function walkItems<T extends DataItemNav>(items: T[] | T | undefined, cb: (item: T) => void): void {
    if (items) {
        if (items instanceof Array) {
            for (let i = 0; i < items.length; i++) {
                cb(items[i]);
                walkItems(items[i], cb);
            }
        } else if (items.children) {
            walkItems(items.children, cb);
        }
    }
}

export function duplicateTree<T extends DataItemNav>(data: T[]): T[] {
    return data.map((item) => {
        return {
            ...item,
            children: item.children ? duplicateTree(item.children) : undefined,
        };
    });
}

export function findTreeItemById<T extends DataItemNav>(items: T[] | T | undefined | null, id: string | undefined): T | undefined {
    if (id && items) {
        !Array.isArray(items) && (items = [items]);
        for (const item of items) {
            if (item.id === id) {
                return item;
            }
            if (item.children) {
                const found = findTreeItemById(item.children, id);
                if (found) {
                    return found;
                }
            }
        }
    }
}

export function collectExpandedItemIds(data: DataItemNav[] | DataItemNav, initialSlelectedItemId: string | undefined, expandAll: boolean | undefined): string[] {
    const rv: string[] = [];

    if (initialSlelectedItemId) {
        walkTreeItems(data, initialSlelectedItemId);
    }
    // console.log('collectExpandedItemIds1', rv);
    // console.log('collectExpandedItemIds2', data);

    return rv;

    function walkTreeItems(items: DataItemNav[] | DataItemNav, targetId: string): true | undefined { // Returns true if item expanded
        if (items) {
            if (items instanceof Array) {
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < items.length; i++) {
                    rv.push(items[i].id);

                    if (walkTreeItems(items[i], targetId) && !expandAll) {
                        // if ('state' in items[i]) {
                        //     items[i].state.expanded = true;
                        // }
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

export function getNextId(root: HTMLDivElement, e: KeyboardEvent<HTMLDivElement>, selectedItemId: string | undefined): string | undefined {
    const keys = ["ArrowDown", "ArrowUp", "End", "Home", "Enter"];
    if (!keys.includes(e.key)) {
        return;
    }

    // Get the id/el of visible and expanded tree items.
    const expandedNow = [...root.querySelectorAll<HTMLDivElement>(`[${AttrTreeId}]`)].map((el) => ({ id: el.dataset.treeId!, el }));
    if (!expandedNow.length) {
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (!selectedItemId) {
        return expandedNow[0].id;
    }

    const selectedIdx = expandedNow.findIndex((item) => item.id === selectedItemId);
    if (selectedIdx !== -1) {
        switch (e.key) {
            case "ArrowDown":
            case "ArrowUp": {
                const nextIndex = e.key === "ArrowDown" ? selectedIdx + 1 : selectedIdx - 1;
                if (nextIndex >= 0 && nextIndex < expandedNow.length) {
                    return expandedNow[nextIndex].id;
                }
                break;
            }
            case "Enter": {
                const isFolder = expandedNow[selectedIdx]?.el.dataset.state !== undefined;
                isFolder && expandedNow[selectedIdx]?.el.querySelector<HTMLElement>(`[${AttrTreeFolderTrigger}]`)?.click();
                break;
            }
            case "End":
                return expandedNow[expandedNow.length - 1].id;
            case "Home":
                return expandedNow[0].id;
        }
    }
}

