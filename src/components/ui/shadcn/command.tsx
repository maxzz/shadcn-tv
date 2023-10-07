import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "./dialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/utils";

const CommandClasses = "\
w-full h-full \
\
text-popover-foreground \
bg-popover \
\
overflow-hidden \
rounded-md \
flex flex-col";

const Command = forwardRef<ElementRef<typeof CommandPrimitive>, ComponentPropsWithoutRef<typeof CommandPrimitive>>(
    ({ className, ...rest }, ref) => (
        <CommandPrimitive ref={ref} className={cn(CommandClasses, className)} {...rest} />
    )
);
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps { }

const CommandDialogClasses = "\
[&_[cmdk-group]]:px-2 \
\
[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 \
\
[&_[cmdk-group-heading]]:px-2 \
[&_[cmdk-group-heading]]:font-medium \
[&_[cmdk-group-heading]]:text-muted-foreground \
\
[&_[cmdk-input]]:h-12 \
[&_[cmdk-input-wrapper]_svg]:w-5 \
[&_[cmdk-input-wrapper]_svg]:h-5 \
\
[&_[cmdk-item]]:px-2 \
[&_[cmdk-item]]:py-3 \
[&_[cmdk-item]_svg]:w-5 \
[&_[cmdk-item]_svg]:h-5";

const CommandDialog = ({ children, ...rest }: CommandDialogProps) => {
    return (
        <Dialog {...rest}>
            <DialogContent className="overflow-hidden p-0">
                <Command className={CommandDialogClasses}>
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
};

const CommandInputClasses = "\
py-3 w-full h-10 text-sm \
\
bg-transparent \
\
placeholder:text-muted-foreground \
\
disabled:opacity-50 \
disabled:cursor-not-allowed \
\
rounded-md outline-none \
flex";

const CommandInput = forwardRef<ElementRef<typeof CommandPrimitive.Input>, ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>(
    ({ className, ...rest }, ref) => (
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input ref={ref} className={cn(CommandInputClasses, className)} {...rest} />
        </div>
    )
);
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = forwardRef<ElementRef<typeof CommandPrimitive.List>, ComponentPropsWithoutRef<typeof CommandPrimitive.List>>(
    ({ className, ...rest }, ref) => (
        <CommandPrimitive.List
            ref={ref}
            className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
            {...rest}
        />
    )
);
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = forwardRef<ElementRef<typeof CommandPrimitive.Empty>, ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>(
    (rest, ref) => (
        <CommandPrimitive.Empty ref={ref} className="py-6 text-sm text-center" {...rest} />
    )
);
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroupClasses = "\
p-1 \
\
text-foreground \
\
[&_[cmdk-group-heading]]:px-2 \
[&_[cmdk-group-heading]]:py-1.5 \
[&_[cmdk-group-heading]]:text-xs \
[&_[cmdk-group-heading]]:font-medium \
[&_[cmdk-group-heading]]:text-muted-foreground \
\
overflow-hidden \
";
const CommandGroup = forwardRef<ElementRef<typeof CommandPrimitive.Group>, ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(
    ({ className, ...rest }, ref) => (
        <CommandPrimitive.Group ref={ref} className={cn(CommandGroupClasses, className)} {...rest} />
    )
);
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = forwardRef<ElementRef<typeof CommandPrimitive.Separator>, ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>>(
    ({ className, ...rest }, ref) => (
        <CommandPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 h-px bg-border", className)}
            {...rest}
        />
    )
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItemClasses = "\
relative px-2 py-1.5 text-sm \
\
aria-selected:text-accent-foreground \
aria-selected:bg-accent \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
rounded-sm outline-none select-none cursor-default \
flex items-center";

const CommandItem = forwardRef<ElementRef<typeof CommandPrimitive.Item>, ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>(
    ({ className, ...rest }, ref) => (
        <CommandPrimitive.Item ref={ref} className={cn(CommandItemClasses, className)} {...rest} />
    )
);
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...rest} />
    );
};
CommandShortcut.displayName = "CommandShortcut";

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
