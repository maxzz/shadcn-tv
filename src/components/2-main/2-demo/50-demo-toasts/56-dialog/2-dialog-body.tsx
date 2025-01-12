import { useState } from "react";
import { atom, useAtom } from "jotai";
import * as D from "@/components/ui/shadcn/dialog";
import { Input, Label } from "@/components/ui/shadcn";
import { RadioGroup } from "./20-radio-group";

const buttonNames = ["Save changes", "Save and close", "Save and continue"];

export function DialogBody() {
    const selectAtom = useState(() => atom(0))[0];
    const [selected, setSelected] = useAtom(selectAtom);

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

            <RadioGroup
                items={buttonNames}
                groupName={`submit-form-${1}`}
                selected={selected}
                setSelected={setSelected}
            />

        </div>
    </>);
}
