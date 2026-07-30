import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type EmblaApi = UseEmblaCarouselType[1];

type ProfileGalleryProps = {
  images: string[];
  alt: string;
  className?: string;
};

/**
 * Full-bleed multimedia carousel for a profile card: swipeable slides, hover
 * arrows, and dot indicators. Designed to sit inside the card's aspect-[3/4]
 * box, below the gradient overlay and badges the Catalog renders on top.
 */
export function ProfileGallery({ images, alt, className }: ProfileGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(images.length);

  const onSelect = useCallback((api: EmblaApi) => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  if (images.length <= 1) {
    return (
      <img
        src={images[0] ?? ""}
        alt={alt}
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <div className={cn("group/gallery relative h-full w-full", className)}>
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <img
                src={src}
                alt={`${alt} · foto ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — fade in on hover */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollPrev();
        }}
        aria-label="Foto anterior"
        className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-background/40 backdrop-blur-sm text-white/90 opacity-0 transition-opacity duration-300 hover:bg-background/60 group-hover/gallery:opacity-100 focus-visible:opacity-100"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollNext();
        }}
        aria-label="Foto siguiente"
        className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-background/40 backdrop-blur-sm text-white/90 opacity-0 transition-opacity duration-300 hover:bg-background/60 group-hover/gallery:opacity-100 focus-visible:opacity-100"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {Array.from({ length: snapCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              scrollTo(i);
            }}
            aria-label={`Ir a la foto ${i + 1}`}
            aria-current={i === selected}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === selected
                ? "w-6 bg-gold"
                : "w-1.5 bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}
