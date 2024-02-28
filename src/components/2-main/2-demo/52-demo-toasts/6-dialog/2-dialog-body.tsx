import * as D from "@/components/ui/shadcn/dialog";
import { Input, Label } from "@/components/ui/shadcn";

export function DialogBody() {
    return (<>
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
                <Input id="name" className="col-span-3" value="Pedro Duarte" onChange={() => { }} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                    Username
                </Label>
                <Input id="username" className="col-span-3" value="@peduarte" onChange={(e) => { }} />
            </div>

        </div>
    </>);
}
