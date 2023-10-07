import { ComponentPropsWithoutRef, ElementRef, forwardRef, HTMLAttributes } from "react";
import * as Prim from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const Sheet = Prim.Root;
const SheetTrigger = Prim.Trigger;
const SheetClose = Prim.Close;

const SheetPortal = Prim.Portal; // const SheetPortal = ({ className, ...rest }: Prim.DialogPortalProps) => (<Prim.Portal className={cn(className)} {...rest} />); //tm: has no className
SheetPortal.displayName = Prim.Portal.displayName;

const SheetOverlayClasses = "\
fixed \
inset-0 \
z-50 \
bg-background/80 \
backdrop-blur-sm \
\
data-[state=open]:animate-in \
data-[state=closed]:animate-out \
\
data-[state=closed]:fade-out-0 \
data-[state=open]:fade-in-0";

const SheetOverlay = forwardRef<ElementRef<typeof Prim.Overlay>, ComponentPropsWithoutRef<typeof Prim.Overlay>>(
    ({ className, ...rest }, ref) => (
        <Prim.Overlay ref={ref} className={cn(SheetOverlayClasses, className)} {...rest} />
    )
);
SheetOverlay.displayName = Prim.Overlay.displayName;

const sheetVariantsDefClasses = "\
fixed z-50 p-6 \
\
bg-background \
\
data-[state=open]:animate-in \
data-[state=open]:duration-500 \
\
data-[state=closed]:animate-out \
data-[state=closed]:duration-300 \
\
transition ease-in-out \
shadow-lg \
gap-4";

const tClasses = "inset-x-0 top-0 border-b \
data-[state=closed]:slide-out-to-top \
data-[state=open]:slide-in-from-top";
const bClasses = "inset-x-0 bottom-0 border-t \
data-[state=closed]:slide-out-to-bottom \
data-[state=open]:slide-in-from-bottom";
const lClasses = "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r \
data-[state=closed]:slide-out-to-left \
data-[state=open]:slide-in-from-left";
const rClasses = "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l \
data-[state=closed]:slide-out-to-right \
data-[state=open]:slide-in-from-right";

const sheetVariantsClasses = cva(sheetVariantsDefClasses, {
    variants: {
        side: {
            top: tClasses,
            bottom: bClasses,
            left: lClasses,
            right: rClasses,
        },
    },
    defaultVariants: {
        side: "right",
    },
});

interface SheetContentProps extends ComponentPropsWithoutRef<typeof Prim.Content>, VariantProps<typeof sheetVariantsClasses> { }

const SheetContentClasses = "\
absolute right-4 top-4 \
\
opacity-70 hover:opacity-100 \
\
focus:ring-2 \
focus:ring-ring \
focus:ring-offset-2 \
focus:outline-none \
\
disabled:pointer-events-none \
\
data-[state=open]:bg-secondary \
\
ring-offset-background \
transition-opacity \
rounded-sm";

const SheetContent = forwardRef<ElementRef<typeof Prim.Content>, SheetContentProps>(
    ({ side = "right", className, children, ...rest }, ref) => (
        <SheetPortal>
            <SheetOverlay />
            <Prim.Content ref={ref} className={cn(sheetVariantsClasses({ side }), className)} {...rest}>
                {children}
                <Prim.Close className={SheetContentClasses}>
                    <Cross2Icon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Prim.Close>
            </Prim.Content>
        </SheetPortal>
    )
);
SheetContent.displayName = Prim.Content.displayName;

const SheetHeader = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("text-center sm:text-left flex flex-col space-y-2", className)} {...rest} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...rest} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = forwardRef<ElementRef<typeof Prim.Title>, ComponentPropsWithoutRef<typeof Prim.Title>>(
    ({ className, ...rest }, ref) => (
        <Prim.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...rest} />
    )
);
SheetTitle.displayName = Prim.Title.displayName;

const SheetDescription = forwardRef<ElementRef<typeof Prim.Description>, ComponentPropsWithoutRef<typeof Prim.Description>>(
    ({ className, ...rest }, ref) => (
        <Prim.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...rest} />
    )
);
SheetDescription.displayName = Prim.Description.displayName;

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};
