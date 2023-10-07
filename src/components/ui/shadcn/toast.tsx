import { forwardRef, ElementRef, ComponentPropsWithoutRef, ReactElement } from "react";
import * as Prim from "@radix-ui/react-toast";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const ToastProvider = Prim.Provider;

const ToastViewportClasses = "\
fixed p-4 top-0 w-full max-h-screen z-[100] \
\
sm:right-0 \
sm:top-auto \
sm:bottom-0 \
sm:flex-col \
md:max-w-[420px] \
\
flex flex-col-reverse";

const ToastViewport = forwardRef<ElementRef<typeof Prim.Viewport>, ComponentPropsWithoutRef<typeof Prim.Viewport>>(
    ({ className, ...rest }, ref) => (
        <Prim.Viewport ref={ref} className={cn(ToastViewportClasses, className)} {...rest} />
    )
);
ToastViewport.displayName = Prim.Viewport.displayName;

const toastVariantsDefClasses = "\
group relative p-4 pr-6 w-full \
\
data-[state=open]:animate-in \
data-[state=open]:slide-in-from-top-full \
data-[state=open]:sm:slide-in-from-bottom-full \
\
data-[state=closed]:animate-out \
data-[state=closed]:fade-out-80 \
data-[state=closed]:slide-out-to-right-full \
\
data-[swipe=end]:animate-out \
data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] \
data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] \
data-[swipe=move]:transition-none \
data-[swipe=cancel]:translate-x-0 \
\
overflow-hidden \
pointer-events-auto \
transition-all \
border rounded-md shadow-lg \
flex items-center justify-between space-x-2";

const toastVariantsClasses = cva(toastVariantsDefClasses, {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive:
                "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
    },
    defaultVariants: {
        variant: "default",
    },
}
);

const Toast = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root> & VariantProps<typeof toastVariantsClasses>>(
    ({ className, variant, ...rest }, ref) => {
        return (
            <Prim.Root ref={ref} className={cn(toastVariantsClasses({ variant }), className)} {...rest} />
        );
    }
);
Toast.displayName = Prim.Root.displayName;

const ToastActionClasses = "\
px-3 h-8 shrink-0 text-sm font-medium \
\
bg-transparent \
\
hover:bg-secondary \
\
focus:ring-1 \
focus:ring-ring \
focus:outline-none \
\
disabled:opacity-50 \
disabled:pointer-events-none \
\
group-[.destructive]:border-muted/40 \
group-[.destructive]:hover:border-destructive/30 \
group-[.destructive]:hover:bg-destructive \
group-[.destructive]:hover:text-destructive-foreground \
group-[.destructive]:focus:ring-destructive \
\
transition-colors \
border rounded-md \
inline-flex items-center justify-center";

const ToastAction = forwardRef<ElementRef<typeof Prim.Action>, ComponentPropsWithoutRef<typeof Prim.Action>>(
    ({ className, ...rest }, ref) => (
        <Prim.Action ref={ref} className={cn(ToastActionClasses, className)} {...rest} />
    )
);
ToastAction.displayName = Prim.Action.displayName;

const ToastCloseClasses = "\
absolute p-1 right-1 top-1 \
\
text-foreground/50 \
\
opacity-0 \
group-hover:opacity-100 \
hover:text-foreground \
\
focus:opacity-100 \
focus:ring-1 \
focus:outline-none \
\
group-[.destructive]:text-red-300 \
group-[.destructive]:hover:text-red-50 \
group-[.destructive]:focus:ring-red-400 \
group-[.destructive]:focus:ring-offset-red-600 \
\
transition-opacity \
rounded-md";

const ToastClose = forwardRef<ElementRef<typeof Prim.Close>, ComponentPropsWithoutRef<typeof Prim.Close>>(
    ({ className, ...rest }, ref) => (
        <Prim.Close ref={ref} className={cn(ToastCloseClasses, className)} toast-close="" {...rest}>
            <Cross2Icon className="h-4 w-4" />
        </Prim.Close>
    )
);
ToastClose.displayName = Prim.Close.displayName;

const ToastTitle = forwardRef<ElementRef<typeof Prim.Title>, ComponentPropsWithoutRef<typeof Prim.Title>>(
    ({ className, ...rest }, ref) => (
        <Prim.Title ref={ref} className={cn("text-sm font-semibold [&+div]:text-xs", className)} {...rest} />
    )
);
ToastTitle.displayName = Prim.Title.displayName;

const ToastDescription = forwardRef<ElementRef<typeof Prim.Description>, ComponentPropsWithoutRef<typeof Prim.Description>>(
    ({ className, ...rest }, ref) => (
        <Prim.Description ref={ref} className={cn("text-sm opacity-90", className)} {...rest} />
    )
);
ToastDescription.displayName = Prim.Description.displayName;

type ToastProps = ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = ReactElement<typeof ToastAction>;

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
};
