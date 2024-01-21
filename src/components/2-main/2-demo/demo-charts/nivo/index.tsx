import { ResponsiveLine, Serie } from "@nivo/line";
import { LegendProps } from "@nivo/legends";
import React from "react";

// https://github.com/plouc/nivo
// https://nivo.rocks/line
// https://github.com/open-sauced/app/blob/beta/components/atoms/Sparkline/sparkline.tsx 

interface SparklineProps {
    width?: string | number;
    height?: string | number;
    data?: Serie[];
}

const legends: LegendProps[] = [
    {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
            {
                on: 'hover',
                style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                }
            }
        ]
    }
];

export const Sparkline: React.FC<SparklineProps> = ({ width = 440, height = 240, data = [] }) => {
    return (
        <div style={{ height: height, width: width }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve="cardinal"
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                enableGridX={false}
                enableGridY={false}
                enablePoints={false}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                isInteractive={false}
                legends={legends}
            />
        </div>
    );
};
