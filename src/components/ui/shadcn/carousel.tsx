import { ComponentProps, HTMLAttributes, createContext, forwardRef, KeyboardEvent, useCallback, useContext, useEffect, useState } from "react";
import { type EmblaCarouselType, type EmblaOptionsType, type EmblaPluginType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/shadcn/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

/**
 * https://github.com/davidjerleke/embla-carousel/issues/647#issuecomment-1868273239 'EmblaOptionsType doesn't exists in React'
 */
export type CarouselApi = EmblaCarouselType;
export type CarouselOptions = EmblaOptionsType;
export type CarouselPlugin = EmblaPluginType;

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin[];
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps =
    & {
        carouselRef: ReturnType<typeof useEmblaCarousel>[0];
        api: ReturnType<typeof useEmblaCarousel>[1];
        scrollPrev: () => void;
        scrollNext: () => void;
        canScrollPrev: boolean;
        canScrollNext: boolean;
    }
    & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel(): CarouselContextProps {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }
    return context;
}

/**
 * https://github.com/davidjerleke/embla-carousel
 */
export const Carousel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & CarouselProps>(
    ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...rest }, ref) => {

        const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y", }, plugins);
        const [canScrollPrev, setCanScrollPrev] = useState(false);
        const [canScrollNext, setCanScrollNext] = useState(false);

        const onSelect = useCallback(
            (api: CarouselApi) => {
                if (!api) {
                    return;
                }

                setCanScrollPrev(api.canScrollPrev());
                setCanScrollNext(api.canScrollNext());
            }, []
        );

        const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
        const scrollNext = useCallback(() => api?.scrollNext(), [api]);

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLDivElement>) => {
                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    scrollPrev();
                }
                else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    scrollNext();
                }
            }, [scrollPrev, scrollNext]
        );

        useEffect(() => {
            if (!api || !setApi) {
                return;
            }
            setApi(api);
        }, [api, setApi]);

        useEffect(() => {
            if (!api) {
                return;
            }

            onSelect(api);
            api.on("reInit", onSelect);
            api.on("select", onSelect);

            return () => {
                api.off("select", onSelect);
            };
        }, [api, onSelect]);

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api: api,
                    opts,
                    orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                }}
            >
                <div
                    ref={ref}
                    onKeyDownCapture={handleKeyDown}
                    className={cn("relative", className)}
                    role="region"
                    aria-roledescription="carousel"
                    {...rest}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        );
    }
);
Carousel.displayName = "Carousel";

export const CarouselContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => {
        const { carouselRef, orientation } = useCarousel();
        return (
            <div ref={carouselRef} className="overflow-hidden">
                <div
                    ref={ref}
                    className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
                    {...rest}
                />
            </div>
        );
    }
);
CarouselContent.displayName = "Carousel.Content";

export const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => {
        const { orientation } = useCarousel();
        return (
            <div
                ref={ref}
                className={cn("shrink-0 grow-0 basis-full min-w-0", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
                role="group"
                aria-roledescription="slide"
                {...rest}
            />
        );
    }
);
CarouselItem.displayName = "Carousel.Item";

export const CarouselPrev = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
    ({ className, variant = "outline", size = "icon", ...rest }, ref) => {
        const { orientation, scrollPrev, canScrollPrev } = useCarousel();
        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    "absolute w-8 h-8 rounded-full",
                    orientation === "horizontal"
                        ? "-left-12 top-1/2 -translate-y-1/2"
                        : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                    className
                )}
                disabled={!canScrollPrev}
                onClick={scrollPrev}
                {...rest}
            >
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="sr-only">Previous slide</span>
            </Button>
        );
    }
);
CarouselPrev.displayName = "Carousel.Prev";

export const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
    ({ className, variant = "outline", size = "icon", ...rest }, ref) => {
        const { orientation, scrollNext, canScrollNext } = useCarousel();
        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    "absolute w-8 h-8 rounded-full",
                    orientation === "horizontal"
                        ? "-right-12 top-1/2 -translate-y-1/2"
                        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                    className
                )}
                disabled={!canScrollNext}
                onClick={scrollNext}
                {...rest}
            >
                <ArrowRightIcon className="h-4 w-4" />
                <span className="sr-only">Next slide</span>
            </Button>
        );
    }
);
CarouselNext.displayName = "Carousel.Next";
