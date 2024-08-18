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
        {Array.from({ length: 5 }).map(
            (_, index) => (
                <CarouselItem key={index}>
                    <div className="p-1 flex justify-center">

                        <Card className="size-24">
                            <CardContent className="p-6 aspect-square flex items-center justify-center">
                                <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>

                    </div>
                </CarouselItem>
            )
        )}
    </>);
}

export function CarouselDemo() {
    return (
        <div className="p-4 flex justify-center">
            <Carousel className="py-5 w-full max-w-40 bg-muted/50 rounded-md">

                <CarouselContent>
                    <Items />
                </CarouselContent>

                <CarouselPrev />
                <CarouselNext />

            </Carousel>
        </div>
    );
}
