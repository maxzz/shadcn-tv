import { Button } from "@/components/ui/shadcn";
import * as D from "@/components/ui/shadcn/dialog";
import { DialogBody } from "./2-dialog-body";

export function DialogDemo() {
    return (
        <D.Dialog>
            <D.DialogTrigger asChild>
                <Button variant="outline">Demo dialog</Button>
            </D.DialogTrigger>

            <D.DialogContent className="sm:max-w-[425px]">

                <DialogBody />

                <D.DialogFooter>
                    <Button type="submit">
                        Save changes
                    </Button>
                </D.DialogFooter>

            </D.DialogContent>
        </D.Dialog>
    );
}
