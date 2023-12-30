import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/shadcn";
import { Input } from "@/components/ui/shadcn";
import { Label } from "@/components/ui/shadcn";
import { Button } from "@/components/ui/shadcn";

export function DialogDemoWoTrigger() {
    const [isOpen, setIsOpen] = useState(false);
    return (<>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Demo dialog</Button>

        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            {/* <DialogTrigger asChild> <Button variant="outline">Demo dialog</Button> </DialogTrigger> */}

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>
                        Demo dialog
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" className="col-span-3" value="Pedro Duarte" onChange={(e) => { }} />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" className="col-span-3" value="@peduarte" onChange={(e) => { }} />
                    </div>

                </div>

                <DialogFooter>
                    <Button type="submit" onClick={() => setIsOpen(false)}>
                        Save changes
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    </>);
}
