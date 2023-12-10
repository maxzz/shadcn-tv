import { ThemeSwitch } from "../ui/shadcn";
import { IconAppLogo } from "../ui/icons/normal";

export function Section0_Header() {
    return (
        <div className="px-2 py-3 flex items-center justify-between bg-primary-foreground">
            <div className="flex items-center gap-x-1">
                <div className="ml-2 pt-1.5">
                    <IconAppLogo className="w-7 h-7 stroke-none fill-slate-600 -rotate-90" />
                </div>

                <div className="text-2xl font-extralight tracking-tighter text-blue-600">
                    shradcn
                </div>
                <div className="text-2xl font-extralight tracking-tighter text-slate-600">
                    components template
                </div>
            </div>

            <div className="flex items-center justify-end gap-x-1">
                <ThemeSwitch />
            </div>

        </div>
    );
}
