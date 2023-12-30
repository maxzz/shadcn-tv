import { TabsContent } from '../../tabs';
import { SelectButton } from '../select-button';

const gradients = [
    'linear-gradient(to bottom right,#accbee,#e7f0fd)',
    'linear-gradient(to bottom right,#d5d4d0,#d5d4d0,#eeeeec)',
    'linear-gradient(to bottom right,#000000,#434343)',
    'linear-gradient(to bottom right,#09203f,#537895)',
    'linear-gradient(to bottom right,#ac32e4,#7918f2,#4801FF)',
    'linear-gradient(to bottom right,#f953c6,#b91d73)',
    'linear-gradient(to bottom right,#ee0979,#ff6a00)',
    'linear-gradient(to bottom right,#f00000,#dc281e)',
    'linear-gradient(to bottom right,#00c6ff,#0072ff)',
    'linear-gradient(to bottom right,#4facfe,#00f2fe)',
    'linear-gradient(to bottom right,#0ba360,#3cba92)',
    'linear-gradient(to bottom right,#fdfc47,#24fe41)',
    'linear-gradient(to bottom right,#8a2be2,#0000cd,#228b22,#ccff00)',
    'linear-gradient(to bottom right,#40e0d0,#ff8c00,#ff0080)',
    'linear-gradient(to bottom right,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)',
    'linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
];

export function TabGradient({ background, setBackground }: { background: string; setBackground: (background: string) => void; }) {
    return (
        <TabsContent value="gradient" className="mt-0">
            <div className="mb-2 flex flex-wrap gap-1">
                {gradients.map((s) => (
                    <div
                        key={s}
                        style={{ background: s }}
                        className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                        onClick={() => setBackground(s)}
                    />
                ))}
            </div>

            <SelectButton background={background}>
                💡 Get more at{' '}
                <a href="https://gradient.page/css/ui-gradients" className="font-bold hover:underline" target="_blank">
                    GradientPage
                </a>
            </SelectButton>
        </TabsContent>
    );
}
