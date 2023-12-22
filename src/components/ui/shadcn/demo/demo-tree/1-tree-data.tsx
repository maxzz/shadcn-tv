import { DataItem } from "@/components/ui/shadcn/tree";
import { Layout as IconLayout } from "lucide-react";

export const data: DataItem[] = [
    { id: "1", name: "Unread" },
    { id: "2", name: "Threads" },
    {
        id: "3",
        name: "Chat Rooms",
        children: [
            { id: "3.1", name: "General" },
            { id: "3.2", name: "Random" },
            { id: "3.3", name: "Open Source Projects" },
        ],
    },
    {
        id: "4",
        name: "Direct Messages",
        children: [
            {
                id: "4.1",
                name: "Alice",
                children: [
                    { id: "4.1.1", name: "Alice2", icon: IconLayout },
                    { id: "4.1.2", name: "Bob2" },
                    { id: "4.1.3", name: "Charlie2" },
                ],
            },
            { id: "4.2", name: "Bob", icon: IconLayout },
            { id: "4.3", name: "Charlie" },
        ],
    },
    {
        id: "5",
        name: "Direct Messages",
        children: [
            {
                id: "5.1",
                name: "Alice",
                children: [
                    { id: "5.1.1", name: "Alice2" },
                    { id: "5.1.2", name: "Bob2" },
                    { id: "5.1.3", name: "Charlie2" },
                ],
            },
            { id: "5.2", name: "Bob" },
            { id: "5.3", name: "Charlie" },
        ],
    },
    {
        id: "6",
        name: "Direct Messages",
        children: [
            {
                id: "6.1",
                name: "Alice",
                children: [
                    { id: "6.1.1", name: "Alice2" },
                    { id: "6.1.2", name: "Bob2" },
                    { id: "6.1.3", name: "Charlie2" },
                ],
            },
            { id: "6.2", name: "Bob" },
            { id: "6.3", name: "Charlie" },
        ],
    },
];
