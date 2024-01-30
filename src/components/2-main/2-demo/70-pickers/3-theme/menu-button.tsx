import { forwardRef } from "react";
import { Button, type ButtonProps } from "@/components/ui/shadcn/button";
import { classNames } from "@/utils";

export const MenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                variant="ghost"
                className={classNames("h-full border bg-accent", className)}
                {...props}
            />
        );
    },
);

MenuButton.displayName = "MenuButton";
