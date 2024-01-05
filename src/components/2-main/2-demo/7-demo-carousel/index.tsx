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
                <div className="p-1">
                    <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
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
