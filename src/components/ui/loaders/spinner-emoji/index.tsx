import { classNames } from "@/utils";
import { HTMLAttributes } from "react";

export function SpinnerEmoji({ className, ...rest }: HTMLAttributes<HTMLDivElement>) { // https://tanstack.com/router/v1/docs/examples/react/location-masking
    return (
        <div className={classNames("px-3 flex items-center justify-center animate-spin", className)} {...rest}>
            ⍥
        </div>
    );
}
