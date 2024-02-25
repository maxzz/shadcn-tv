import { Button, Input, Label } from "@/components/ui/shadcn";
import * as D from "@/components/ui/shadcn";

export function DialogDemo() {
    return (
        <D.Dialog>
            <D.DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </D.DialogTrigger>

            <D.DialogContent className="sm:max-w-[425px]">

                <D.DialogHeader>
                    <D.DialogTitle>
                        Edit profile
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
                    <Button type="submit">
                        Save changes
                    </Button>
                </D.DialogFooter>

            </D.DialogContent>
        </D.Dialog>
    );
}
