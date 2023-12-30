import { TabsContent } from '../../tabs';

const solids = [
    '#e2e2e2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
];

export function TabSolid({ background, setBackground }: { background: string; setBackground: (background: string) => void; }) {
    return (
        <TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => (
                <div
                    key={s}
                    style={{ background: s }}
                    className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                    onClick={() => setBackground(s)}
                />
            ))}
        </TabsContent>
    );
}
