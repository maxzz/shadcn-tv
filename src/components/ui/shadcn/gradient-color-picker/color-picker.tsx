import { useMemo } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Popover, PopoverContent, PopoverTrigger, } from '../popover';
import { Tabs, TabsList, TabsTrigger } from '../tabs';
import { TabSolid, TabGradient, TabImage } from './tab-pages';
import { cn } from '@/utils';
import { Paintbrush } from 'lucide-react';

function Trigger({ background, className, }: { background: string; className?: string; }) {
    return (
        <PopoverTrigger asChild>
            <Button variant={'outline'} className={cn('w-[220px] justify-start text-left font-normal', !background && 'text-muted-foreground', className)}>
                <div className="flex w-full items-center gap-2">
                    {background
                        ? (
                            <div className="h-4 w-4 rounded !bg-cover !bg-center transition-all" style={{ background }} />
                        ) : (
                            <Paintbrush className="h-4 w-4" />
                        )}
                    <div className="flex-1 truncate">
                        {background ? background : 'Pick a color'}
                    </div>
                </div>
            </Button>
        </PopoverTrigger>
    );
}

export function GradientPicker({ background, setBackground, className, }: { background: string; setBackground: (background: string) => void; className?: string; }) {

    const defaultTab = useMemo(() => {
        if (background.includes('url')) return 'image';
        if (background.includes('gradient')) return 'gradient';
        return 'solid';
    }, [background]);

    return (
        <Popover>
            <Trigger className={className} background={background} />

            <PopoverContent className="w-64">
                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="mb-4 w-full">
                        <TabsTrigger className="flex-1" value="solid">Solid</TabsTrigger>
                        <TabsTrigger className="flex-1" value="gradient">Gradient</TabsTrigger>
                        <TabsTrigger className="flex-1" value="image">Image</TabsTrigger>
                    </TabsList>

                    <TabSolid background={background} setBackground={setBackground}/>
                    <TabGradient background={background} setBackground={setBackground}/>
                    <TabImage background={background} setBackground={setBackground}/>
                </Tabs>

                <Input
                    id="custom"
                    value={background}
                    className="col-span-2 mt-4 h-8"
                    onChange={(e) => setBackground(e.currentTarget.value)}
                />

            </PopoverContent>
        </Popover>
    );
}
