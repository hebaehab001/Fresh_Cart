"use client";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ImgCarousel({ images }) {
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const handleThumbClick = useCallback(
        (index) => {
            api?.scrollTo(index);
        },
        [api],
    );

    return (
      <div className="mx-auto max-w-[90%]">
        <Carousel className="w-full " setApi={setApi}>
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image} className="flex justify-center">
                <Image
                  alt="dddepth-248"
                  className="h-[55vh] rounded-xl object-center"
                  src={image}
                  width={300}
                  height={400}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Carousel className="mt-4 mx-auto max-w-[80%] ">
          <CarouselContent className="my-1 flex">
            {images.map((image, index) => (
              <CarouselItem
                className={cn(
                  "basis-1/4 cursor-pointer transition-opacity",
                  current === index + 1 ? "opacity-100" : "opacity-60 ",
                )}
                key={image}
                onClick={() => handleThumbClick(index)}
              >
                <Image
                  alt="dddepth-248"
                  className={cn(
                    "size-full rounded-xl object-cover",
                    current === index + 1 ? "border border-sky-900" : "",
                  )}
                  src={image}
                  width={80}
                  height={100}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer" />
          <CarouselNext className="cursor-pointer" />
        </Carousel>
      </div>
    );
}
