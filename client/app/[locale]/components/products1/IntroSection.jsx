// app/[locale]/(catalog)/components/IntroSection.jsx
"use client";

import React from "react";
import Image from "next/image";
import Script from "next/script";
import { useTranslations, useLocale } from "next-intl";
import ShareButton from "../ShareButton";

export default function IntroSection({
  // Metinler (opsiyonel: verilmezse i18n'den çekilir)
  title,
  intro,
  title2,
  intro2,
  // Görseller (opsiyonel)
  heroSrc = "/images/homepage/kesim.webp",
  bgMobile = "/images/homepage/kesim.webp",
  bgDesktop = "/images/homepage/antikarkaplan2.webp",
  bgPanel = "/images/homepage/antikarkaplan4.webp",
  imageAlt = "Hero image",

  // Breadcrumb (opsiyonel)
  crumbHomeLabel,
  crumbHomeHref,
  crumbSectionLabel,
  crumbSectionHref,
  showBreadcrumb = true,

  // Schema (opsiyonel)
  schemaId = "breadcrumb-schema",
  className = "relative mt-12 lg:mt-20 mb-10 overflow-hidden",
}) {
  const t = useTranslations("TravertinePage");
  const locale = useLocale();

  // Props yoksa i18n fallback
  const _title = title ?? t("title");
  const _intro = intro ?? t("intro");
  const _title2 = title2 ?? t("title2");
  const _intro2 = intro2 ?? t("intro2");

  const _crumbHomeLabel =
    crumbHomeLabel ?? (locale === "tr" ? "Ana Sayfa" : "Home");
  const _crumbHomeHref = crumbHomeHref ?? `/${locale}`;
  const _crumbSectionLabel =
    crumbSectionLabel ?? (locale === "tr" ? "Traverten" : "Travertine");
  const _crumbSectionHref =
    crumbSectionHref ??
    `/${locale}/${locale === "tr" ? "traverten" : "travertine"}`;

  // JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: _crumbHomeLabel,
        item: _crumbHomeHref,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: _crumbSectionLabel,
        item: _crumbSectionHref,
      },
    ],
  };

  return (
    <section className={className} aria-labelledby="intro-heading">
      {/* === Mobile & Tablet === */}
      <div className="lg:hidden relative w-full h-[550px] lg:h-[500px] flex items-center justify-center">
        <Image
          src={bgMobile}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-2 lg:px-5 text-center text-white max-w-[95%]">
          <h1
            id="intro-heading"
            className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold leading-[110%] md:leading-[130%]"
          >
            {_title}
          </h1>
          {_intro && (
            <p className="mt-1 lg:mt-3 text-[12px] md:text-[14px] leading-tight">
              {_intro}
            </p>
          )}
          {_title2 && (
            <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-semibold mt-3 leading-[120%] lg:leading-[140%]">
              {_title2}
            </h2>
          )}
          {_intro2 && (
            <p className="mt-1 lg:mt-3 text-[12px] md:text-[14px] leading-tight">
              {_intro2}
            </p>
          )}

          <div className="mt-3">
             <ShareButton label="Share" />
          </div>

          
        </div>
      </div>

      {/* === Desktop === */}
      <div className="hidden lg:flex flex-row items-center justify-start h-[500px] relative">
        <div className="flex w-[70%] rounded-2xl h-[400px] max-w-[1000px] relative overflow-hidden">
          <Image
            src={bgDesktop}
            alt="Why Choose Travertine From Turkey"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute rounded-sm h-[500px] 2xl:h-[520px] w-[860px] 2xl:w-[50%] 2xl:max-w-[1000px] text-black flex flex-col justify-between left-1/2 -translate-x-1/2 ">
          {/* Panel arka plan */}
          <div className="absolute inset-0 shadow-2xl">
            <Image
              src={bgPanel}
              alt="Travertine"
              fill
              className="object-cover"
            />
          </div>
          {/* Kenar geçişleri */}
          <div className="absolute inset-y-0 left-0 w-[1000px] bg-gradient-to-r from-white/100 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-[500px]  bg-gradient-to-l from-white/100 to-transparent pointer-events-none" />

          {/* İçerik */}
          <header className="relative px-5 pt-5 w-[80%] z-10">
            <h1 className="text-[28px] md:text-[36px] lg:text-[26px] font-semibold leading-[110%] mt-1 lg:mt-5">
              {_title} - <span>{t("span")}</span>
            </h1>
            {_intro && (
              <p className="text-[12px] md:text-[14px] lg:text-[14px] leading-tight mb-10 lg:leading-[140%]">
                {_intro}
              </p>
            )}
            {_title2 && (
              <h2 className="text-[24px] md:text-[32px] lg:text-[24px] font-semibold mt-3 ">
                {_title2}
              </h2>
            )}
            {_intro2 && (
              <p className="text-[12px] md:text-[14px] lg:text-[14px] leading-tight lg:leading-[140%]">
                {_intro2}
              </p>
            )}

             <div className="ml-2 mt-4">
            <ShareButton label="Share" />
          </div>

          </header>

          {/* Sağ görsel */}
          <div className="absolute right-[-500px] top-1/2 -translate-y-1/2 w-[800px] h-[500px] ">
            <Image
              src={heroSrc}
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
        id={schemaId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  );
}
