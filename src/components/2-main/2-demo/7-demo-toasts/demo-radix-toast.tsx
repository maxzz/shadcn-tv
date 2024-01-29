// Inspired by react-hot-toast library
// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/customizable/use-toast.ts
// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/customizable/toaster.tsx

import { toast } from '@/components/ui/shadcn/radix-toast/use-radix-toast';
import { Button } from '@/components/ui/shadcn';

export function RadixToastDemo() {
    return (
        <div>
            <Button variant="outline"
                onClick={() => {
                    toast({ title: "Too many requests, please try again later" });
                }}
            >
                Radix toast
            </Button>
        </div>
    );
}
