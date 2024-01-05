import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import * as C from "@/components/ui/shadcn/card";

// https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/new-york/example/cards/metric.tsx

const data = [
    {
        average: 400,
        today: 240,
    },
    {
        average: 300,
        today: 139,
    },
    {
        average: 200,
        today: 980,
    },
    {
        average: 278,
        today: 390,
    },
    {
        average: 189,
        today: 480,
    },
    {
        average: 239,
        today: 380,
    },
    {
        average: 349,
        today: 430,
    },
];

function Charts() {
    return (
        <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">

                <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                    <Tooltip
                        content={
                            ({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Average
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {payload[0].value}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Today
                                                    </span>
                                                    <span className="font-bold">
                                                        {payload[1].value}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }
                        }
                    />

                    <Line
                        type="monotone"
                        strokeWidth={2}
                        dataKey="average"
                        activeDot={{ r: 6, style: { fill: "var(--theme-primary)", opacity: 0.25 } }}
                        className="stroke-primary opacity-25"
                    />

                    <Line
                        type="monotone"
                        dataKey="today"
                        strokeWidth={2}
                        activeDot={{ r: 8, style: { fill: "var(--theme-primary)" } }}
                        className="stroke-primary"
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function CardsMetric() {
    return (
        <C.Card>
            <C.CardHeader>
                <C.CardTitle>
                    Exercise Minutes
                </C.CardTitle>
                <C.CardDescription>
                    Your exercise minutes are ahead of where you normally are.
                </C.CardDescription>
            </C.CardHeader>

            <C.CardContent className="pb-4">
                <Charts />
            </C.CardContent>
        </C.Card>
    );
}