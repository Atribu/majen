// app/components/products/ProductIntroSection.jsx
"use client";
import React from "react";
import Image from "next/image";
import Script from "next/script";
import ShareButton from "../ShareButton";
import SampleBoardButton from "../generalcomponent/SampleBoardButton";

/**
 * IntroSection tasarımının aynısı, dinamik içerikle:
 * Props:
 * - title: string
 * - intro: string
 * - heroSrc: StaticImport | string
 * - alt: string
 * - prefix: string         // örn: "/tr" | "/en"
 * - baseHref: string       // örn: "/tr/traverten" | "/en/travertine"
 * - crumbHome?: string     // "Ana Sayfa" | "Home" (opsiyonel)
 * - crumbProducts?: string // "Travertine" | "Products" (opsiyonel)
 */
export default function ProductIntroSection({
  title,
  title2,
  intro,
  intro2,
  heroSrc,
  alt,
  prefix,
  baseHref,
  crumbHome = "Ana Sayfa",
  crumbProducts = "Travertines",
  depth = 1, 
  span
}) {

  // --- Görsel & alt güvenli hale getir ---
  const FALLBACK = "/images/homepage/antikoarkaplan.webp";
  const safeHeroSrc = React.useMemo(() => {
    if (!heroSrc) return FALLBACK;
    if (typeof heroSrc === "string") return heroSrc.trim() || FALLBACK;
    // StaticImport ise direkt dön
    return heroSrc;
  }, [heroSrc]);
  const safeAlt = (alt && String(alt).trim()) || "Travertine";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  // JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: crumbHome, item: `${siteUrl}${prefix}` },
      { "@type": "ListItem", position: 2, name: crumbProducts, item: `${siteUrl}${baseHref}` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <section className="relative mt-2 h-[520px] overflow-hidden text-center lg:h-[500px] lg:text-start" aria-labelledby="intro-heading">
      {/* Masaüstü dekoratif arka planı */}
      <div className="absolute left-0 top-1/2 hidden h-[400px] w-[70%] max-w-[1000px] -translate-y-1/2 overflow-hidden rounded-2xl lg:block">
        <Image
          src="/images/homepage/antikarkaplan2.webp"
          alt=""
          fill
          sizes="(max-width: 1023px) 0px, 70vw"
          quality={68}
          className="object-cover"
        />
      </div>

      {/* Mobilde arka plan, masaüstünde sağ ürün görseli */}
      <div className="absolute inset-0 lg:inset-y-0 lg:left-[calc(50%+240px)] lg:right-auto lg:z-[3] lg:w-[720px] lg:max-w-[690px] 2xl:left-[calc(75%-190px)]">
        <Image
          src={safeHeroSrc}
          alt={safeAlt}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 690px"
          className="object-cover lg:object-contain"
        />
      </div>
      <div className="absolute inset-0 z-[4] bg-black/40 lg:hidden" />

      {/* Masaüstü içerik paneli */}
      <div className="absolute left-1/2 top-0 hidden h-[500px] w-[860px] -translate-x-1/2 overflow-hidden rounded-sm shadow-2xl 2xl:h-[520px] 2xl:w-[50%] 2xl:max-w-[1000px] lg:block">
        <Image
          src="/images/homepage/antikarkaplan4.webp"
          alt=""
          fill
          sizes="(max-width: 1023px) 0px, 50vw"
          quality={68}
          className="object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-[1000px] bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[500px] bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Tek içerik ağacı; yalnızca yerleşim breakpoint ile değişir */}
      <header className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center text-white lg:left-1/2 lg:right-auto lg:w-[860px] lg:-translate-x-1/2 lg:items-start lg:justify-start lg:px-5 lg:pt-10 lg:text-left lg:text-black 2xl:w-[50%] 2xl:max-w-[1000px]">
        <div className="w-full max-w-[95%] lg:w-[80%] lg:max-w-none">
          <h1 id="intro-heading" className="text-[24px] font-semibold leading-[120%] lg:text-[26px]">
            {title} <span>{span}</span>
          </h1>
          <p className="mt-2 text-[12px] leading-tight lg:mb-10 lg:text-[14px] lg:leading-[140%]">{intro}</p>

          {title2 ? <h2 className="mt-2 text-[22px] font-semibold leading-[110%] md:text-[24px] lg:mt-3">{title2}</h2> : null}
          {intro2 ? <p className="mt-2 text-[12px] leading-tight md:text-[14px] lg:mt-3 lg:leading-[140%]">{intro2}</p> : null}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 lg:ml-2 lg:mt-4 lg:justify-start">
            <ShareButton label="Share" />
            <SampleBoardButton productTitle={title} />
          </div>
        </div>
      </header>

      {/* Breadcrumb Schema */}
      <Script
        id="product-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  );
}
