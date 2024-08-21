import { Button } from "@/components/ui/shadcn";
import { Flickup } from "./1-text-flip";
import { BorderRun } from "./2-border-run";
import { FlipBtn } from "./3-flip-btn";

export function Effects() {
    return (
        <div className="py-4 flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <Flickup className="cursor-pointer" />
                </Button>

                <BorderRun />

                <FlipBtn />
            </div>

            <div className="px-4">
                <Flickup className="cursor-pointer" />
            </div>
        </div>
    );
}
