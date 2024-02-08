import { useSnapshot } from "valtio";
import { Button, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Slider } from "@/components/ui/shadcn";
import { cPaths } from "react-xarrows";
import { appSettings } from "@/store";
import { uuid } from "@/utils";

type SelectOption = {
    label: string;
    value: string;
};

function SelectWithValues<T extends string>({ value, defaultValue, onValueChange, options }: { value: T, defaultValue: T, onValueChange: (v: T) => void; options: SelectOption[]; }) {
    return (
        <Select value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
            <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem className="text-xs" value={option.value} key={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

/* TODO: path=straight initially has Nan warning in console */

export function DemoControls() {
    const snap = useSnapshot(appSettings.xArrowsState);
    return (
        <div className="absolute right-2 top-1 w-40 text-xs text-muted-foreground flex flex-col gap-2">
            <div className="pt-2 flex items-center gap-2">
                <div className="text-nowrap">
                    Path style
                </div>

                <SelectWithValues
                    defaultValue={cPaths[0]}
                    value={snap.path}
                    onValueChange={(v) => appSettings.xArrowsState.path = v}
                    options={[
                        { label: "grid", value: "grid" },
                        { label: "smooth", value: "smooth" },
                        { label: "straight", value: "straight" },
                    ]}
                />

                {/* <Select value={snap.path} onValueChange={(v: pathType) => appSettings.xArrowsState.path = v} defaultValue="smooth">
                    <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="text-xs" value="grid">grid</SelectItem>
                        <SelectItem className="text-xs" value="smooth">smooth</SelectItem>
                        <SelectItem className="text-xs" value="straight">straight</SelectItem>
                    </SelectContent>
                </Select> */}

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

            <div className="">
                <Button
                    variant="outline"
                    onClick={() => appSettings.xArrowsState.boxes.push({ label: `elem${snap.boxes.length + 1}`, x: 0, y: 0, id: uuid.asRelativeNumber() })}
                >
                    Add item
                </Button>
            </div>
        </div>
    );
}
