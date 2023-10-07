import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger, } from "./popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "./command";
import { Button } from "./button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils";

type ComboboxItem = { // const frameworks = [ { value: "remix", label: "Remix", }, { value: "astro", label: "Astro", }, ];
    value: string;
    label: string;
};

type ComboboxProps = {
    placeholderSelect: string;
    placeholderSearch: string;
    items: ComboboxItem[];
};

export function Combobox(props: ComboboxProps) {
    const { placeholderSelect = "Select one...", placeholderSearch = "Search...", items } = props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    return (
        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between" role="combobox" aria-expanded={open}>
                    {value ? items.find((framework) => framework.value === value)?.label : placeholderSelect}
                    <ChevronsUpDown className="ml-2 w-4 h-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-[200px]">
                <Command>
                    <CommandInput placeholder={placeholderSearch} />
                    <CommandEmpty>No framework found.</CommandEmpty>

                    <CommandGroup>
                        {items.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>

                </Command>
            </PopoverContent>
        </Popover>
    );
}
