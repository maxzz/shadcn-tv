// "use client";
import * as React from "react";
import { CalendarIcon, EnvelopeClosedIcon, FaceIcon, GearIcon, PersonIcon, RocketIcon, } from "@radix-ui/react-icons";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/shadcn/command";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const iconClasses = "h-4 w-4 mr-2";
const kbdClasses = "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100";

const ctrlKey = ~navigator.userAgent.indexOf("Mac") ? "⌘" : "Ctrl";

export function CommandDialogDemo() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    function onItemSelect(value: string) {
        console.log("Item selected", value);
    }

    return (<>
        <div className="h-full min-h-36 flex items-center justify-center">
            <p className="text-xs text-muted-foreground hover:bg-info cursor-pointer" onClick={() => setOpen((v) => !v)}>
                Press{" "}
                <kbd className={kbdClasses}>
                    <span>{ctrlKey}+J</span>
                </kbd>
                {" "}or click here to open the command dialog.
            </p>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />

            {/* https://www.radix-ui.com/primitives/docs/components/dialog#title */}
            <VisuallyHidden asChild>
                <DialogTitle className="text-lg font-semibold">Command Palette</DialogTitle>
            </VisuallyHidden>

            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={onItemSelect}>
                        <CalendarIcon className={iconClasses} />
                        <span>Calendar</span>
                    </CommandItem>
                    <CommandItem onSelect={onItemSelect}>
                        <FaceIcon className={iconClasses} />
                        <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem onSelect={onItemSelect}>
                        <RocketIcon className={iconClasses} />
                        <span>Launch</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Settings">
                    <CommandItem>
                        <PersonIcon className={iconClasses} />
                        <span>Profile</span>
                        <CommandShortcut>{ctrlKey}+P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <EnvelopeClosedIcon className={iconClasses} />
                        <span>Mail</span>
                        <CommandShortcut>{ctrlKey}+B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <GearIcon className={iconClasses} />
                        <span>Settings</span>
                        <CommandShortcut>{ctrlKey}+S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>

            </CommandList>
            <div className="p-4 text-xs">
                123
            </div>
        </CommandDialog>
    </>);
}
