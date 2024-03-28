import { useState } from "react";
import { Switch } from "@/components/ui/shadcn";
import { classNames } from "@/utils";

export function ChadcnSwitchDemo() {
    const [checked, setChecked] = useState(false);
    return (
        <div className="w-full min-h-24 flex items-center justify-center gap-8">

            <div className="text-[0.55rem] flex items-center gap-1">
                0
                <Switch
                    checked={checked}
                    onCheckedChange={setChecked}
                />
                1
            </div>

            <div className="text-[0.55rem] flex items-center gap-1">
                <div className={classNames(checked ? "text-muted-foreground/50" : "")}>0</div>
                <Switch
                    className="w-7 h-2"
                    thumbClasses="data-[state=checked]:translate-x-3"
                    checked={checked}
                    onCheckedChange={setChecked}
                />
                <div className={classNames(checked ? "text-green-500" : "text-muted-foreground/50")}>0</div>
            </div>

        </div>
    );
}
