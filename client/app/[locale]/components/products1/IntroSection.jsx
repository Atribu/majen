// app/[locale]/(catalog)/components/IntroSection.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import mermer from "@/public/images/homepage/mermer.jpg";

const IntroSection = () => {
  // JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://majen.com.tr/tr" },
      { "@type": "ListItem", position: 2, name: "Travertine", item: "https://majen.com.tr/tr/travertine" },
    ],
  };

  return (
    <section className="relative mt-12 overflow-hidden" aria-labelledby="intro-heading">
      {/* === Mobile & Tablet === */}
      <div className="lg:hidden relative w-full h-[500px] flex items-center justify-center">
        {/* Arka plan */}
        <Image
          src={mermer}
          alt="Majen background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-5 text-center text-white max-w-[90%]">
          <h1 id="intro-heading" className="text-2xl sm:text-3xl font-semibold">
            Travertine From Turkey – Majen
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed">
            Majen olarak, Türkiye’nin seçkin ocaklarından projelerinize uygun traverten
            tedarik ediyoruz. Blok, slab ve karo seçenekleriyle proje odaklı üretim sağlıyoruz.
          </p>

          {/* Breadcrumbs */}
          <nav
            className="mt-5 inline-flex items-center rounded-lg bg-white/20 backdrop-blur px-3 py-1.5 text-xs sm:text-sm"
            aria-label="breadcrumb"
          >
            <ol className="flex items-center gap-x-2">
              <li>
                <Link href="/" className="hover:underline">Ana Sayfa</Link>
              </li>
              <li className="text-white/60">/</li>
              <li>
                <Link href="/travertine" className="hover:underline">Travertine</Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* === Desktop === */}
      <div className="hidden lg:flex flex-row items-center justify-center h-[700px] relative overflow-hidden">
        {/* Arka plan div */}
        <div
          className="flex w-screen rounded-2xl h-[400px]"
          style={{
            backgroundImage: "url('/images/homepage/mermer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* İçerik div */}
        <div
          className="absolute rounded-sm h-[500px] 2xl:h-[520px] w-[860px] 2xl:w-[50%] 2xl:max-w-[1000px] text-black flex flex-col justify-between left-1/2 -translate-x-1/2"
          style={{
            backgroundImage: "url('/images/homepage/mermer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Üst kısım: Başlık + Açıklama */}
          <header className="px-5 pt-5 w-[540px]">
            <h1 className="text-3xl font-semibold">Travertine From Turkey – Majen</h1>
            <p className="mt-3">
              Majen olarak, Türkiye’nin seçkin ocaklarından projelerinize uygun
              traverten tedarik ediyoruz. Blok, slab ve karo seçenekleriyle proje
              odaklı üretim sağlıyoruz.
            </p>
          </header>

          {/* Alt kısım: Breadcrumbs */}
          <nav
            className="px-4 py-3 rounded-sm"
            aria-label="breadcrumb"
            style={{
              backgroundImage: "url('/images/homepage/mermer.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <ol className="flex flex-wrap items-center gap-x-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">Ana Sayfa</Link>
              </li>
              <li>
                <span className="mx-2 text-white/50">/</span>
                <Link href="/travertine" className="hover:underline">Travertine</Link>
              </li>
            </ol>
          </nav>

          {/* Resim */}
          <div className="absolute right-[-500px] top-1/2 -translate-y-1/2 w-[800px] h-[400px]">
            <Image
              src="/images/traverterDeskt.webp"
              alt="Travertine slabs with polished surface from Majen"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  );
};

export default IntroSection;
