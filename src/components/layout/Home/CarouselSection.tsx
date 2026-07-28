import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface CarouselSectionProps<T> {
  title: string;
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  itemClassName?: string;
  loop?: boolean;
}

export default function CarouselSection<T>({
  title,
  items,
  getKey,
  renderItem,
  itemClassName = " md:basis-1/3 lg:basis-1/5",
  loop = false,
}: CarouselSectionProps<T>) {
  return (
    <section className="w-full">
      <h3 className="text-4xl md:text-5xl text-shadow-md py-4 mb-4 text-center leading-16 tracking-wider capitalize font-extrabold text-sky-900">
        {title}
      </h3>
      <Carousel
        opts={{ align: "start", loop }}
        className="w-[70%] md:w-[85%] lg:w-[90%] mx-auto"
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={getKey(item)} className={itemClassName}>
              <div className="p-1">{renderItem(item)}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
