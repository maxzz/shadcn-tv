import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn";
import { Input } from "@/components/ui/shadcn";
import { Label } from "@/components/ui/shadcn";
import { Button } from "@/components/ui/shadcn";

export function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>
                        Edit profile
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
                    <Button type="submit">
                        Save changes
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
