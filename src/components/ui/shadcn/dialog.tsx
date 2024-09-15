//"use client"; // rollup does not like this
import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from "react";
import * as Prim from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/utils";
import { DialogPortalProps } from "@radix-ui/react-dialog";

const Dialog = Prim.Root;
const DialogClose = Prim.Close;
const DialogTrigger = Prim.Trigger;
const DialogPortal = Prim.Portal;

const dialogOverlayClasses = "\
fixed inset-0 z-50 \
\
bg-background/80 \
backdrop-blur-sm \
\
data-[state=open]:animate-in \
data-[state=closed]:animate-out \
data-[state=closed]:fade-out-0 \
data-[state=open]:fade-in-0";

const DialogOverlay = forwardRef<ElementRef<typeof Prim.Overlay>, ComponentPropsWithoutRef<typeof Prim.Overlay>>(
    ({ className, ...rest }, ref) => (
        <Prim.Overlay ref={ref} className={cn(dialogOverlayClasses, className)} {...rest} />
    )
);
DialogOverlay.displayName = Prim.Overlay.displayName;

const DialogOverlayWithScroll = forwardRef<ElementRef<typeof Prim.Overlay>, ComponentPropsWithoutRef<typeof Prim.Overlay>>(
    ({ className, ...rest }, ref) => (
        <div ref={ref} className={cn(dialogOverlayClasses, className)} {...rest} />
    )
);
DialogOverlayWithScroll.displayName = `${Prim.Overlay.displayName}WithScroll`;

export const DialogContentClasses = "\
fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 \
p-6 w-full md:w-full max-w-lg \
\
bg-background \
\
data-[state=open]:animate-in \
data-[state=open]:fade-in-0 \
data-[state=open]:zoom-in-95 \
data-[state=open]:slide-in-from-left-1/2 \
data-[state=open]:slide-in-from-top-[48%] \
\
data-[state=closed]:animate-out \
data-[state=closed]:fade-out-0 \
data-[state=closed]:zoom-out-95 \
data-[state=closed]:slide-out-to-left-1/2 \
data-[state=closed]:slide-out-to-top-[48%] \
\
border sm:rounded-lg shadow-lg \
duration-200 \
grid gap-4";

type DialogContentProps = ComponentPropsWithoutRef<typeof Prim.Content> & {
    modal?: boolean;
    container?: DialogPortalProps['container'];
    noClose?: boolean;
    withScroll?: boolean; // by default DialogContent has no scroll for popups
    hiddenTitle?: string; // If headenTitle is not provided, then parent component should provide own Prim.Title (same for aria-describedby)
    overlayClasses?: string;
};

const preventClose = (e: Event) => e.preventDefault();

const DialogContent = forwardRef<ElementRef<typeof Prim.Content>, DialogContentProps>(
    ({ className, children, noClose, container, withScroll, modal, overlayClasses, onPointerDownOutside, hiddenTitle, ...rest }, ref) => (
        <DialogPortal container={container}>
            {withScroll ? <DialogOverlayWithScroll className={overlayClasses} /> : <DialogOverlay className={overlayClasses} />}

            <Prim.Content
                ref={ref}
                className={cn(DialogContentClasses, className)}
                onPointerDownOutside={modal ? preventClose : onPointerDownOutside}
                aria-describedby={undefined}
                {...rest}
            >
                {hiddenTitle && (
                    <Prim.Title className="sr-only">{hiddenTitle}</Prim.Title>
                )}
                
                {children}
                {!noClose && <DialogCloseButton />}
            </Prim.Content>
        </DialogPortal>
    )
);
DialogContent.displayName = Prim.Content.displayName;

const dialogCloseButtonClasses = "\
absolute right-4 top-4 \
opacity-70 transition-opacity\
\
hover:opacity-100 \
focus:outline-none \
focus:ring-2 \
focus:ring-ring \
focus:ring-offset-2 \
\
data-[state=open]:bg-accent \
data-[state=open]:text-muted-foreground \
\
ring-offset-background \
\
rounded-sm \
disabled:pointer-events-none";

function DialogCloseButton({ className, ...rest }: HTMLAttributes<HTMLButtonElement>) {
    return (
        <Prim.Close className={cn(dialogCloseButtonClasses, className)} {...rest}>
            <Cross2Icon className="size-4" />
            <span className="sr-only">Close</span>
        </Prim.Close>
    );
}

function DialogHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("text-center sm:text-left flex flex-col space-y-1.5", className)} {...rest} />
    );
}

function DialogFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...rest} />
    );
}

const DialogTitle = forwardRef<ElementRef<typeof Prim.Title>, ComponentPropsWithoutRef<typeof Prim.Title>>(
    ({ className, ...rest }, ref) => (
        <Prim.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...rest} />
    )
);
DialogTitle.displayName = Prim.Title.displayName;

const DialogDescription = forwardRef<ElementRef<typeof Prim.Description>, ComponentPropsWithoutRef<typeof Prim.Description>>(
    ({ className, ...rest }, ref) => (
        <Prim.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...rest} />
    )
);
DialogDescription.displayName = Prim.Description.displayName;

export {
    Dialog,
    DialogClose,
    DialogCloseButton,
    DialogPortal,
    DialogOverlay,
    DialogOverlayWithScroll,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
