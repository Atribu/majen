// app/components/products/ProductIntroSection.jsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

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
  intro,
  heroSrc,
  alt,
  prefix,
  baseHref,
  crumbHome = "Ana Sayfa",
  crumbProducts = "Travertine",
}) {
  // JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: crumbHome, item: `${typeof window !== "undefined" ? location.origin : ""}${prefix}` },
      { "@type": "ListItem", position: 2, name: crumbProducts, item: `${typeof window !== "undefined" ? location.origin : ""}${baseHref}` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <section className="relative mt-2 overflow-hidden" aria-labelledby="intro-heading">
      {/* === Mobile & Tablet === */}
      <div className="lg:hidden relative w-full h-[500px] flex items-center justify-center">
        {/* Background */}
        <Image
          src={heroSrc}
          alt={alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-5 text-center text-white max-w-[90%]">
          <h1 id="intro-heading" className="text-2xl sm:text-3xl font-semibold">
            {title}
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed">{intro}</p>

          {/* Breadcrumbs */}
          <nav
            className="mt-5 inline-flex items-center rounded-lg bg-white/20 backdrop-blur px-3 py-1.5 text-xs sm:text-sm"
            aria-label="breadcrumb"
          >
            <ol className="flex items-center gap-x-2">
              <li>
                <Link href={prefix} className="hover:underline">{crumbHome}</Link>
              </li>
              <li className="text-white/60">/</li>
              <li>
                <Link href={baseHref} className="hover:underline">{crumbProducts}</Link>
              </li>
              <li className="text-white/60">/</li>
              <li className="text-white/90">{title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* === Desktop === */}
      <div className="hidden lg:flex flex-row items-center justify-center h-[500px] relative">
        {/* Arka plan */}
        <div className="flex w-screen bg-black rounded-2xl h-[400px]" />

        {/* İçerik kutusu */}
        <div className="absolute rounded-sm bg-black h-[500px] 2xl:h-[520px] w-[860px] 2xl:w-[50%] 2xl:max-w-[1000px] text-white flex flex-col justify-between left-1/2 -translate-x-1/2">
          {/* Üst: Başlık + Açıklama */}
          <header className="px-5 pt-5 w-[540px]">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="mt-3">{intro}</p>
          </header>

          {/* Alt: Breadcrumbs */}
          <nav className="bg-black px-4 py-3 rounded-sm" aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 text-sm">
              <li>
                <Link href={prefix} className="hover:underline">{crumbHome}</Link>
              </li>
              <li>
                <span className="mx-2 text-white/50">/</span>
                <Link href={baseHref} className="hover:underline">{crumbProducts}</Link>
              </li>
              <li>
                <span className="mx-2 text-white/50">/</span>
                <span className="text-white/90">{title}</span>
              </li>
            </ol>
          </nav>

          {/* Sağdaki görsel */}
          <div className="absolute right-[-500px] top-1/2 -translate-y-1/2 w-[800px] h-[400px]">
            <Image
              src={heroSrc}
              alt={alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Breadcrumb Schema */}
      <Script
        id="product-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  );
}
