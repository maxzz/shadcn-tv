import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";

export type StringValueChangeProps = {
    value: string;
    onValueChange: (value: string) => void;
};

export type ItemDisplayText = string | readonly [label: string, value: string];

type InputSelectUiProps = StringValueChangeProps & {
    items: ItemDisplayText[];
};

const popupColorClasses = "\
h-6 \
bg-primary-100 dark:bg-primary-900 \
text-primary-900 dark:text-primary-300";

export function InputSelectUi({ items, value, onValueChange }: InputSelectUiProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>

            <SelectTrigger className="px-2 py-1 w-max 1h-7 1text-xs gap-1">
                <SelectValue placeholder="Select key" />
            </SelectTrigger>

            <SelectContent align="start" buttonClasses={popupColorClasses} position="item-aligned">
                {items.map(
                    (item, idx) => {
                        const isString = typeof item === 'string';
                        const label = isString ? item : item[0];
                        const value = isString ? item : item[1];
                        return (
                            <SelectItem className="text-xs" value={value} indicatorFirst key={idx}>
                                {label}
                            </SelectItem>
                        );
                    })
                }
            </SelectContent>

        </Select>
    );
}

const items: ItemDisplayText[] = [
    "One",
    "Two",
    "Three",
    ["Four", "4"],
    ["Five", "5"],
    ["Six", "6"],
    ["Seven", "7"],
    ["Eight", "8"],
    ["Nine", "9"],
    ["Ten", "10"],
    ["Eleven", "11"],
    ["Twelve", "12"],
    ["Thirteen", "13"],
    ["Fourteen", "14"],
    ["Fifteen", "15"],
    ["Sixteen", "16"],
    ["Seventeen", "17"],
    ["Eighteen", "18"],
    ["Nineteen", "19"],
    ["Twenty", "20"],
];

export function SelectDemo() {
    const [value, setValue] = useState<string>("");
    return (
        <div className="p-4 flex justify-center">
            <InputSelectUi items={items} value={value} onValueChange={setValue} />
        </div>
    );
}
