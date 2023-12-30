import { TabsContent } from '../../tabs';
import { SelectButton } from '../select-button';

const images = [
    'url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90',
    'url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
];

export function TabImage({ background, setBackground }: { background: string; setBackground: (background: string) => void; }) {
    return (
        <TabsContent value="image" className="mt-0">
            <div className="mb-2 grid grid-cols-2 gap-1">
                {images.map((s) => (
                    <div
                        key={s}
                        style={{ backgroundImage: s }}
                        className="h-12 w-full cursor-pointer rounded-md bg-cover bg-center active:scale-105"
                        onClick={() => setBackground(s)}
                    />
                ))}
            </div>

            <SelectButton background={background}>
                🔓 Get more{' '}
                <a href="https://gradient.page/wallpapers" className="font-bold hover:underline" target="_blank">
                    wallpapers
                </a>
                <br />
                <div className='text-[10px]'>
                    App dev? Refer <a href="https://gradient.page/affiliate" className="font-bold hover:underline" target="_blank">
                        GradientPage
                    </a>, get 80%
                </div>
            </SelectButton>
        </TabsContent>
    );
}
