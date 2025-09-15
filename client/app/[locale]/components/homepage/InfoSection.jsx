// app/components/InfoSection.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import antik from "@/public/images/slabs/antik.webp"

import block from "@/public/images/homepage/Ivoryblok.webp";
import slabs from "@/public/images/homepage/slabs.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/homepage/masa.webp";

import { baseFor, productSlugFor, getLang } from "@/lib/travertine";

function Card({ t, img, href, tKey }) {
  return (
    <div className="group rounded-md bg-white z-[999]">
      <Link href={href} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={img}
          alt={t(`products.${tKey}.alt`)}
          fill
          sizes="100vw"
          className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
      </Link>
      <div className="w-full p-4 items-center justify-center text-center">
        <h4 className="text-[16px] md:text-[20px] font-semibold text-[#0C1A13]">
          {t(`products.${tKey}.title`)}
        </h4>
        <p className="mt-2 text-[12px] md:text-[14px] text-[#2a2a2a]">
          {t(`products.${tKey}.description`)}
        </p>
        <div className="mt-4 flex gap-2 items-center justify-center">
          <Link
            href={href}
            className="items-center justify-center bg-black text-white text-[13px] md:text-[15px] px-3 py-2 rounded-sm  hover:bg-white hover:text-black transition font-bold" style={{
    backgroundImage: "url('/images/slabs/antik.webp')",
    backgroundSize: "cover",       // resmi kırpmadan kaplar
    backgroundPosition: "center",  // ortalar
    backgroundRepeat: "no-repeat", // tekrar etmez
  }}
          >
            {t("explore")}
          </Link>
        
        </div>
      </div>
    </div>
  );
}

export default function InfoSection() {
  const t = useTranslations("InfoSection");
  const locale = useLocale();
  const lang = getLang(locale);
  const prefix = `/${locale}`;
  const base = baseFor(locale); // "tr" → "traverten"
  const contactPath = `${prefix}/${lang === "tr" ? "iletisim" : "contact"}`;

  const items = [
    { key: "product1", img: block,   href: `${prefix}/${base}/${productSlugFor(locale, "block")}` },
    { key: "product2", img: slabs,   href: `${prefix}/${base}/${productSlugFor(locale, "slabs")}` },
    { key: "product3", img: tiles,   href: `${prefix}/${base}/${productSlugFor(locale, "tiles")}` },
    { key: "product4", img: special, href: `${prefix}/${base}/${productSlugFor(locale, "special")}` },
  ];

  // t("__contactPath") hilesi: Card içinde contactPath'e erişmek için geçici key
  const tProxy = (k) => (k === "__contactPath" ? contactPath : t(k));

  // Embla (yalnızca mobilde görünür)
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
      slidesToScroll: 1,

    },
    [Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  return (
    <section className="flex w-screen items-center justify-center py-8 md:py-12 lg:py-20 xl:py-32 z-[999] mb-10">
      <div className="w-[100%] md:w-[80%] lg:w-[75%] lg:min-w-[1000px] items-center justify-center text-center gap-7 md:gap-9 lg:gap-12 flex flex-col">
        <div className="flex flex-col">
          <span className="text-[#6b7177] font-medium text-[12px] md:text-[14px] lg:text-[16px] uppercase">
            {t("subtitle")}
          </span>
          <h3 className="mt-2 text-[16px] font-bold md:text-[36px] lg:text-[48px] text-[#0C1A13] leading-[110%]">
            {t("heading")}
          </h3>
          <p className="mt-3 text-black text-[12px] md:text-[16px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        {/* Mobil: Embla Carousel */}
        {/* Mobil: Embla Carousel */}
<div className="mt-8 block md:hidden">
  <div ref={emblaRef} className="overflow-hidden w-full">
    <div className="flex">
      {items.map(({ key, img, href }) => (
        <div
          key={key}
          className="flex-[0_0_80%] shrink-0 items-center justify-center" // ✅ her slide %100 genişlik + kaymayı önle
        >
          <Card t={tProxy} img={img} href={href} tKey={key} />
        </div>
      ))}
    </div>
  </div>
</div>

        {/* Tablet & Desktop: Grid */}
        <div className="mt-8 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ key, img, href }) => (
            <Card key={key} t={tProxy} img={img} href={href} tKey={key} />
          ))}
        </div>
      </div>
    </section>
  );
}