import { useState } from "react";
import { Button } from "@/components/ui/shadcn";
import * as D from "@/components/ui/shadcn/dialog";
import { DialogBody } from "./2-dialog-body";

export function DialogDemoWoTrigger() {
    const [isOpen, setIsOpen] = useState(false);
    return (<>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Demo dialog</Button>

        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            {/* <D.DialogTrigger asChild> <Button variant="outline">Demo dialog</Button> </D.DialogTrigger> */}

            <D.DialogContent className="sm:max-w-[425px]">

                <DialogBody />
                
                <D.DialogFooter>
                    <Button type="submit" onClick={() => setIsOpen(false)}>
                        Save changes
                    </Button>
                </D.DialogFooter>

            </D.DialogContent>
        </D.Dialog>
    </>);
}
