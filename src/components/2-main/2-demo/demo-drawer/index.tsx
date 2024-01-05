import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import * as D from "@/components/ui/shadcn/drawer";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
];

function DrawerItems() {
    const [goal, setGoal] = useState(350);

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)));
    }

    return (
        <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
                <Button
                    variant="outline" size="icon" className="shrink-0 w-8 h-8 rounded-full" disabled={goal <= 200} onClick={() => onClick(-10)}>
                    <MinusIcon className="w-4 h-4" />
                    <span className="sr-only">Decrease</span>
                </Button>

                <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                        {goal}
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Calories/day
                    </div>
                </div>

                <Button
                    variant="outline" size="icon" className="shrink-0 w-8 h-8 rounded-full" disabled={goal >= 400} onClick={() => onClick(10)}>
                    <PlusIcon className="w-4 h-4" />
                    <span className="sr-only">Increase</span>
                </Button>
            </div>

            <div className="mt-3 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <Bar dataKey="goal" style={{ fill: "hsl(var(--foreground))", opacity: 0.9, }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function DrawerDemo() {
    return (
        <D.Drawer>
            <D.DrawerTrigger asChild>
                <Button variant="outline">
                    Open Drawer
                </Button>
            </D.DrawerTrigger>

            <D.DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <D.DrawerHeader>
                        <D.DrawerTitle>Move Goal</D.DrawerTitle>
                        <D.DrawerDescription>Set your daily activity goal.</D.DrawerDescription>
                    </D.DrawerHeader>

                    <DrawerItems />

                    <D.DrawerFooter>
                        <Button>Submit</Button>
                        <D.DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </D.DrawerClose>
                    </D.DrawerFooter>
                </div>
            </D.DrawerContent>
        </D.Drawer>
    );
}
