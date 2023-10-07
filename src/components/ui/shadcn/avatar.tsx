import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as Prim from "@radix-ui/react-avatar";
import { cn } from "@/utils";

const Avatar = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn("relative w-10 h-10 shrink-0 overflow-hidden rounded-full flex", className)} {...rest} />
    )
);
Avatar.displayName = Prim.Root.displayName;

const AvatarImage = forwardRef<ElementRef<typeof Prim.Image>, ComponentPropsWithoutRef<typeof Prim.Image>>(
    ({ className, ...rest }, ref) => (
        <Prim.Image ref={ref} className={cn("h-full w-full aspect-square", className)} {...rest} />
    )
);
AvatarImage.displayName = Prim.Image.displayName;

const AvatarFallback = forwardRef<ElementRef<typeof Prim.Fallback>, ComponentPropsWithoutRef<typeof Prim.Fallback>>(
    ({ className, ...rest }, ref) => (
        <Prim.Fallback ref={ref} className={cn("w-full h-full bg-muted rounded-full flex items-center justify-center", className)} {...rest} />
    )
);
AvatarFallback.displayName = Prim.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
