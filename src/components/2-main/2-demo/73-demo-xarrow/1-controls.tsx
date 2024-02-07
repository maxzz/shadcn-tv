import { useSnapshot } from "valtio";
import { Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Slider } from "@/components/ui/shadcn";
import { cPaths, pathType } from "react-xarrows";
import { appSettings } from "@/store";

export function DemoControls() {
    const snap = useSnapshot(appSettings.xArrowsState);
    return (
        <div className="absolute right-2 top-1 w-40 text-xs text-muted-foreground flex flex-col gap-2">
            <div className="pt-2 flex items-center gap-2">
                <div className="text-nowrap">
                    Path style
                </div>
                <Select value={snap.path} onValueChange={(v: pathType) => appSettings.xArrowsState.path = v} defaultValue="smooth"> {/* TODO: path=straight initially has Nan warning in console */}
                    <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="text-xs" value="grid">grid</SelectItem>
                        <SelectItem className="text-xs" value="smooth">smooth</SelectItem>
                        <SelectItem className="text-xs" value="straight">straight</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <div className="text-nowrap">
                    Stroke width
                </div>
                <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[snap.strokeWidth]}
                    className="[&>.track]:h-px"
                    onValueChange={(value) => appSettings.xArrowsState.strokeWidth = value[0]}
                />
                <div className="text-[.65rem]">
                    {snap.strokeWidth}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Checkbox checked={snap.animate} onCheckedChange={(value) => appSettings.xArrowsState.animate = !!value} />
                Animate on initial draw
            </div>

            <div className="mt-2">
                You can drag items within the designated area
            </div>

        </div>
    );
}
