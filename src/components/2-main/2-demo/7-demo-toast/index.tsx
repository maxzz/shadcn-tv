// Inspired by react-hot-toast library
// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/customizable/use-toast.ts
// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/customizable/toaster.tsx

import { Button } from '@/components/ui/shadcn';
import { toast } from '../../../ui/shadcn/radix-toast/use-radix-toast';

export default function RadixToastDemo() {
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
