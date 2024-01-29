import { Card, CardContent } from "@/components/ui/shadcn/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrev,
} from "@/components/ui/shadcn/carousel";

function Items() {
    return (<>
        {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
                <div className="p-1 flex justify-center">
                    <Card className="w-24 h-24">
                        <CardContent className="p-6 aspect-square flex items-center justify-center">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                        </CardContent>
                    </Card>
                </div>
            </CarouselItem>
        ))}
    </>);
}

export function CarouselDemo() {
    return (
        <div className="flex justify-center">
            <Carousel className="w-full max-w-xs">

                <CarouselContent>
                    <Items />
                </CarouselContent>

                <CarouselPrev />
                <CarouselNext />

            </Carousel>
        </div>
    );
}
