import { Button } from "@/components/ui/shadcn";
import { Flickup } from "./1-text-flip";
import { BorderRun } from "./2-border-run";
import { FlipBtn } from "./3-flip-btn";

export function Effects() {
    return (
        <div className="py-8 flex gap-2">
            <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Flickup className="cursor-pointer" />
                    </Button>
                </div>

                <div className="px-4">
                    <Flickup className="cursor-pointer" />
                </div>
            </div>

            <BorderRun />

            <FlipBtn />
        </div>
    );
}
