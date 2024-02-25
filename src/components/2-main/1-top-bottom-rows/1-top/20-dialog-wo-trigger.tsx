import { useState } from "react";
import { Button, Input, Label } from "@/components/ui/shadcn";
import * as D from "@/components/ui/shadcn";

export function DialogDemoWoTrigger() {
    const [isOpen, setIsOpen] = useState(false);
    return (<>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Demo dialog</Button>

        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            {/* <D.DialogTrigger asChild> <Button variant="outline">Demo dialog</Button> </D.DialogTrigger> */}

            <D.DialogContent className="sm:max-w-[425px]">

                <D.DialogHeader>
                    <D.DialogTitle>
                        Demo dialog
                    </D.DialogTitle>
                    
                    <D.DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </D.DialogDescription>
                </D.DialogHeader>

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

                <D.DialogFooter>
                    <Button type="submit" onClick={() => setIsOpen(false)}>
                        Save changes
                    </Button>
                </D.DialogFooter>

            </D.DialogContent>
        </D.Dialog>
    </>);
}
