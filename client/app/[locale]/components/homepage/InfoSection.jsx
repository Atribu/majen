// app/components/InfoSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import block from "@/public/images/traverterBlock.jpeg";
import slabs from "@/public/images/traverterSlabs.jpeg";
import tiles from "@/public/images/traverterFayans.jpeg";
import special from "@/public/images/traverterDeskt.webp";

import { baseFor, productSlugFor, getLang } from "@/lib/travertine";

export default function InfoSection() {
  const t = useTranslations("InfoSection");
  const locale = useLocale();
  const lang = getLang(locale);

  const prefix = `/${locale}`;
  const base = baseFor(locale); // "tr" → "traverten"
  const contactPath = `${prefix}/${lang === "tr" ? "iletisim" : "contact"}`;

  const items = [
    { key: "block",   img: block,   tKey: "product1" },
    { key: "slabs",   img: slabs,   tKey: "product2" },
    { key: "tiles",   img: tiles,   tKey: "product3" },
    { key: "special", img: special, tKey: "product4" },
  ];

  const products = items.map(({ key, img, tKey }) => ({
    key: tKey,
    img,
    href: `${prefix}/${base}/${productSlugFor(locale, key)}`, // TR: /tr/traverten/blok
  }));

  // --- Embla (mobil)
  const autoplayRef = useRef(
    Autoplay(
      { delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true },
      // Root'u dış sarmalayıcıya bağla
      (emblaRoot) => emblaRoot
    )
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, containScroll: "trimSnaps" },
    [autoplayRef.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
 const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="flex w-screen items-center justify-center py-8 md:py-12 lg:py-16 text-center">
      <div className="w-[95%] md:w-[80%] lg:w-[75%] text-center items-center justify-center flex flex-col">
        {/* Üst metinler */}
        <div className="max-w-3xl text-center items-center justify-center flex flex-col">
          <span className="text-[#6b7177] font-medium text-[12px] md:text-[14px] lg:text-[16px] uppercase">
            {t("subtitle")}
          </span>
          <h3 className="mt-2 text-[26px] md:text-[36px] lg:text-[48px] text-[#0C1A13] leading-[110%]">
            {t("heading")}
          </h3>
          <p className="mt-3 text-black text-[14px] md:text-[16px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        {/* --- Mobil: Embla Carousel --- */}
        <div
          className="mt-8 md:hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label={t("heading")}
        >
          <div className="relative">
            {/* Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              {/* Container */}
              <div className="flex touch-pan-x">
                {products.map(({ key, img, href }, idx) => (
                  <div
                    key={key}
                    className="relative mr-4 last:mr-0 flex-[0_0_85%]" // 85% genişlikte kart
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} / ${products.length}`}
                  >
                    <div className="group rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                      <Link href={href} className="block relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={img}
                          alt={t(`products.${key}.alt`)}
                          fill
                          sizes="(max-width: 768px) 85vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          priority={idx === 0}
                        />
                      </Link>
                      <div className="p-4">
                        <h4 className="text-[18px] font-semibold text-[#0C1A13]">
                          {t(`products.${key}.title`)}
                        </h4>
                        <p className="mt-2 text-[13px] text-[#2a2a2a]">
                          {t(`products.${key}.description`)}
                        </p>
                        <div className="mt-4 flex gap-2">
                          <Link
                            href={href}
                            className="inline-flex items-center justify-center bg-black text-white text-[13px] px-3 py-2 rounded-md border-2 border-black hover:bg-white hover:text-black transition"
                          >
                            {t("explore")}
                          </Link>
                          <Link
                            href={contactPath}
                            className="inline-flex items-center justify-center bg-white text-black text-[13px] px-3 py-2 rounded-md border-2 border-black hover:bg-black hover:text-white transition"
                          >
                            {t("contact")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev/Next butonları */}
            <button
              type="button"
              aria-label="Previous"
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow p-2 active:scale-95"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow p-2 active:scale-95"
            >
              ›
            </button>

            {/* Dots */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    selectedIndex === i ? "bg-black" : "bg-black/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- Tablet/Desktop: Grid --- */}
        <div className="mt-8 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 ">
          {products.map(({ key, img, href }) => (
            <div
              key={key}
              className="group "
            >
              <Link href={href} className="block relative aspect-[4/3] overflow-hidden ">
                <Image
                  src={img}
                  alt={t(`products.${key}.alt`)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#0C1A13]">
                  {t(`products.${key}.title`)}
                </h4>
                <p className="mt-2 text-[13px] md:text-[14px] text-[#2a2a2a]">
                  {t(`products.${key}.description`)}
                </p>

                <div className="mt-4 flex gap-2 items-center justify-center">
                  <Link
                    href={href}
                    className="inline-flex items-center justify-center bg-black text-white text-[13px] md:text-[14px] px-3 py-2 rounded-md border-2 border-black hover:bg-white hover:text-black transition"
                  >
                    {t("explore")}
                  </Link>
                  <Link
                    href={contactPath}
                    className="inline-flex items-center justify-center bg-white text-black text-[13px] md:text-[14px] px-3 py-2 rounded-md border-2 border-black hover:bg-black hover:text-white transition"
                  >
                    {t("contact")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
