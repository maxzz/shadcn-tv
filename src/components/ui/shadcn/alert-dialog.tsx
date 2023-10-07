import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from "react";
import * as Prim from "@radix-ui/react-alert-dialog";
import { buttonVariants } from "./button";
import { cn } from "@/utils";

const AlertDialog = Prim.Root;
const AlertDialogTrigger = Prim.Trigger;
const AlertDialogPortal = Prim.Portal;

const AlertDialogOverlayClasses = "\
fixed inset-0 z-50 \
\
bg-background/80 backdrop-blur-sm \
\
data-[state=open]:animate-in \
data-[state=open]:fade-in-0 \
data-[state=closed]:animate-out \
data-[state=closed]:fade-out-0";

const AlertDialogOverlay = forwardRef<ElementRef<typeof Prim.Overlay>, ComponentPropsWithoutRef<typeof Prim.Overlay>>(
    ({ className, ...rest }, ref) => (
        <Prim.Overlay ref={ref} className={cn(AlertDialogOverlayClasses, className)} {...rest} />
    )
);
AlertDialogOverlay.displayName = Prim.Overlay.displayName;

const AlertDialogContentClasses = "\
fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full md:w-full max-w-lg p-6 z-50 \
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
duration-200 \
border sm:rounded-lg shadow-lg \
grid gap-4";

const AlertDialogContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, ...rest }, ref) => (
        <AlertDialogPortal>
            <AlertDialogOverlay />

            <Prim.Content ref={ref} className={cn(AlertDialogContentClasses, className)} {...rest} />
        </AlertDialogPortal>
    )
);
AlertDialogContent.displayName = Prim.Content.displayName;

const AlertDialogHeader = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...rest} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...rest} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = forwardRef<ElementRef<typeof Prim.Title>, ComponentPropsWithoutRef<typeof Prim.Title>>(
    ({ className, ...rest }, ref) => (
        <Prim.Title ref={ref} className={cn("text-lg font-semibold", className)} {...rest} />
    )
);
AlertDialogTitle.displayName = Prim.Title.displayName;

const AlertDialogDescription = forwardRef<ElementRef<typeof Prim.Description>, ComponentPropsWithoutRef<typeof Prim.Description>>(
    ({ className, ...rest }, ref) => (
        <Prim.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...rest} />
    )
);
AlertDialogDescription.displayName = Prim.Description.displayName;

const AlertDialogAction = forwardRef<ElementRef<typeof Prim.Action>, ComponentPropsWithoutRef<typeof Prim.Action>>(
    ({ className, ...rest }, ref) => (
        <Prim.Action ref={ref} className={cn(buttonVariants(), className)} {...rest} />
    )
);
AlertDialogAction.displayName = Prim.Action.displayName;

const AlertDialogCancel = forwardRef<ElementRef<typeof Prim.Cancel>, ComponentPropsWithoutRef<typeof Prim.Cancel>>(
    ({ className, ...rest }, ref) => (
        <Prim.Cancel ref={ref} className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)} {...rest} />
    )
);
AlertDialogCancel.displayName = Prim.Cancel.displayName;

export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
};
