// app/[locale]/(catalog)/components/IntroSection.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import mermer from "@/public/images/homepage/mermer.jpg";
import { useLocale, useTranslations } from "next-intl";

const IntroSection = () => {
  const t = useTranslations("TravertinePage");
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
    <section className="relative mt-12 lg:mt-20 mb-10 overflow-hidden" aria-labelledby="intro-heading">
      {/* === Mobile & Tablet === */}
      <div className="lg:hidden relative w-full h-[550px] lg:h-[500px] flex items-center justify-center">
        {/* Arka plan */}
        <Image
          src={mermer}
          alt="Majen background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-2 lg:px-5 text-center text-white max-w-[95%] ">
          <h1 id="intro-heading" className="text-2xl font-semibold leading-[110%] md:leading-[130%]">
            {t("title")}
          </h1>
          <p className="mt-1 lg:mt-3 text-[12px] leading-tight line">
          {t("intro")}
          </p>
           <h2 id="intro-heading" className="text-2xl sm:text-3xl font-semibold leading-[110%] md:leading-[130%] mt-3">
            {t("title2")}
          </h2>
          <p className="mt-1 lg:mt-3 text-[12px] leading-tight">
        {t("intro2")}
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

            <div className="hidden lg:flex flex-row items-center justify-start h-[500px] relative">
        {/* Arka plan */}
       <div
          className="flex w-[70%] rounded-2xl h-[400px] max-w-[1000px]"
          style={{
            backgroundImage: "url('/images/homepage/antikarkaplan2.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* İçerik kutusu */}
        <div
  className="absolute rounded-sm h-[500px] 2xl:h-[520px] w-[860px] 2xl:w-[50%] 2xl:max-w-[1000px] text-black flex flex-col justify-between left-1/2 -translate-x-1/2 "
>
  {/* Blur katmanı */}
  <div
    className="absolute inset-0  shadow-2xl"
    style={{
      backgroundImage: "url('/images/homepage/antikarkaplan4.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />
 <div className="absolute inset-y-0 left-0 w-[1000px] bg-gradient-to-r from-white/100 to-transparent pointer-events-none" />
 <div className="absolute inset-y-0 right-0 w-[500px] bg-gradient-to-l from-white/100 to-transparent pointer-events-none" />
  {/* İçerik (blur’dan etkilenmez) */}
  <header className="relative px-5 pt-5 w-[80%] z-10">
    <h1 className="text-3xl font-semibold"> {t("title")}</h1>
    <p>{t("intro")}</p>
     <h2 className="text-2xl font-semibold mt-3">{t("title2")}</h2>
    <p>{t("intro2")}</p>
  </header>

          {/* Alt: Breadcrumbs */}
          <nav className="bg-transparent px-4 py-3 rounded-sm text-black z-[999]" aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-1 text-sm">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <span className="mx-1 text-black/50">/</span>
                <Link href="travertine" className="hover:underline">Travertine</Link>
              </li>

            </ol>
          </nav>

          {/* Sağdaki görsel */}
          <div className="absolute right-[-500px] top-1/2 -translate-y-1/2 w-[800px] h-[500px] ">
            <Image
                 src="/images/homepage/kesim.webp"
              alt="Wholesale Travertine From Turkey"
              fill
              className="object-contain"
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
