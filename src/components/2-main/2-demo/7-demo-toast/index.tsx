// Inspired by react-hot-toast library
// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/customizable/use-toast.ts
// https://github.com/jln13x/ui.jln.dev/blob/main/src/client/components/customizable/toaster.tsx

import { Button } from '@/components/ui';
import React from 'react';
import { toast } from './use-toast';

export default function OrgToastDemo() {
    return (
        <div>
            <Button
                onClick={() => {
                    toast({ title: "Too many requests, please try again later" });
                }}
            >
                Toast
            </Button>
        </div>
    );
}
