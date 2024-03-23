import { ComponentProps, forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { Drawer as D } from "vaul";
import { cn } from "@/utils";

export function Drawer({ shouldScaleBackground = true, ...rest }: ComponentProps<typeof D.Root>) {
    return (
        <D.Root shouldScaleBackground={shouldScaleBackground} {...rest} />
    );
}

export const DrawerTrigger = D.Trigger;
export const DrawerPortal = D.Portal;
export const DrawerClose = D.Close;

export const DrawerOverlay = forwardRef<ElementRef<typeof D.Overlay>, ComponentPropsWithoutRef<typeof D.Overlay>>(
    ({ className, ...rest }, ref) => (
        <D.Overlay ref={ref} className={cn("fixed inset-0 bg-black/80 z-50", className)} {...rest} />
    )
);
DrawerOverlay.displayName = D.Overlay.displayName;

export const DrawerContent = forwardRef<ElementRef<typeof D.Content>, ComponentPropsWithoutRef<typeof D.Content> & { noTopBar?: boolean; }>(
    ({ className, children, noTopBar, ...rest }, ref) => (
        <DrawerPortal>
            <DrawerOverlay />
            <D.Content ref={ref} className={cn("fixed mt-24 inset-x-0 bottom-0 h-auto bg-background z-50 border rounded-t-[10px] flex flex-col", className)} {...rest}>
                {!noTopBar && <div className="mx-auto mt-4 w-[100px] h-2 bg-muted rounded-full" />}
                {children}
            </D.Content>
        </DrawerPortal>
    )
);
DrawerContent.displayName = "DrawerContent";

export function DrawerHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-4 text-center sm:text-left grid gap-1.5", className)} {...rest} />
    );
}

export function DrawerFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("mt-auto p-4 flex flex-col gap-2", className)} {...rest} />
    );
}

export const DrawerTitle = forwardRef<ElementRef<typeof D.Title>, ComponentPropsWithoutRef<typeof D.Title>>(
    ({ className, ...rest }, ref) => (
        <D.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...rest} />
    )
);
DrawerTitle.displayName = D.Title.displayName;

export const DrawerDescription = forwardRef<ElementRef<typeof D.Description>, ComponentPropsWithoutRef<typeof D.Description>>(
    ({ className, ...rest }, ref) => (
        <D.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...rest} />
    )
);
DrawerDescription.displayName = D.Description.displayName;
