"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

/**
 * images: (string | StaticImport)[]
 * altPrefix: string (örn: "Ivory Travertine Blocks")
 */
export default function EmblaCarousel({
  images = [],
  altPrefix = "gallery image",
  className = "",
}) {
  const safeImages = Array.isArray(images) ? images : [images];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "keepSnaps",
    align: "start",
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    if (thumbsApi) thumbsApi.scrollTo(idx);
  }, [emblaApi, thumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className={`w-full max-w-[600px] ${className}`}>
      {/* Ana büyük görsel */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden rounded-xl">
          <div className="flex">
            {safeImages.map((src, i) => (
              <div key={i} className="min-w-0 flex-[0_0_100%]">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={src}
                    alt={`${altPrefix} ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="(min-width:1024px) 400px,"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sol/sağ oklar */}
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous"
          className="group absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-black/50 hover:bg-black/70 text-white h-9 w-9"
        >
          <MdKeyboardArrowLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next"
          className="group absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-black/50 hover:bg-black/70 text-white h-9 w-9"
        >
          <MdKeyboardArrowRight className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnail şerit */}
      <div ref={thumbsRef} className="mt-3 overflow-hidden">
        <div className="flex gap-2">
          {safeImages.map((src, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`relative h-20 w-28 flex-[0_0_auto] overflow-hidden rounded-lg ring-2 transition
                  ${isActive ? "ring-teal-700" : "ring-transparent hover:ring-neutral-300"}`}
                title={`${altPrefix} ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`${altPrefix} thumb ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="52px"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
