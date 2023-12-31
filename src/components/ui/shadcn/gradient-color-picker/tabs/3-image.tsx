import { TabsContent } from '../../tabs';
import { SelectButton } from '../select-button';

import img1 from '@/assets/test-images/samples/1,beautiful-blue-001.jpg';
import img2 from '@/assets/test-images/samples/2,pretty-in-pink-005.jpg';
import img3 from '@/assets/test-images/samples/3,vibrant-vista-004.jpg';
import img4 from '@/assets/test-images/samples/4,deep-dusk-003.jpg';
const images = [
    `url(${img1})`,
    `url(${img2})`,
    `url(${img3})`,
    `url(${img4})`,
];
// import img1 from '@/assets/test-images/1,beautiful-blue-004.jpg';
// import img2 from '@/assets/test-images/2,pretty-in-pink-005.jpg';
// import img3 from '@/assets/test-images/3,vibrant-vista-023.jpg';
// import img4 from '@/assets/test-images/4,deep-dusk-009.jpg';
// const images = [
//     `url(${img1})`,
//     `url(${img2})`,
//     `url(${img3})`,
//     `url(${img4})`,
// ];
// const images = [
//     'url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
//     'url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
//     'url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
//     'url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
// ];
// const images = [
//     'url(https://gradient.page/samples/beautiful-blue/beautiful-blue-001.jpg)',
//     'url(https://gradient.page/samples/pretty-in-pink/pretty-in-pink-005.jpg)',
//     'url(https://gradient.page/samples/vibrant-vista/vibrant-vista-004.jpg)',
//     'url(https://gradient.page/samples/deep-dusk/deep-dusk-003.jpg)',
// ];

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
