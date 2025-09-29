// app/[locale]/(catalog)/components/IntroSection.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useTranslations, useLocale } from "next-intl";

export default function IntroSection({
  // Metinler
  title,
  intro,
  title2,
  intro2,
  span,

  // Görseller (export varyantında sadece heroSrc kullanacağız)
  heroSrc = "/images/homepage/kesim.webp",
  bgMobile = "/images/homepage/mermer.jpg",
  bgDesktop = "/images/homepage/antikarkaplan2.webp",
  bgPanel = "/images/homepage/antikarkaplan4.webp",
  imageAlt = "Hero image",

  // Breadcrumb
  crumbHomeLabel,
  crumbHomeHref,
  crumbSectionLabel,
  crumbSectionHref,
  showBreadcrumb = true,

  // Schema
  schemaId = "breadcrumb-schema",
  className = "relative mt-12 lg:mt-20 mb-10 overflow-hidden",

  // 🔹 Yeni: export sayfası için sade varyant
  variant = "default", // "default" | "export"
}) {
  const t = useTranslations("TravertinePage");
  const locale = useLocale();

  // Props yoksa i18n fallback
  const _title = title ?? t("title");
  const _intro = intro ?? t("intro");
  const _title2 = title2 ?? t("title2");
  const _intro2 = intro2 ?? t("intro2");

  const _crumbHomeLabel = crumbHomeLabel ?? (locale === "tr" ? "Ana Sayfa" : "Home");
  const _crumbHomeHref  = crumbHomeHref  ?? `/${locale}`;
  const _crumbSectionLabel =
    crumbSectionLabel ?? (locale === "tr" ? "Traverten" : "Travertine");
  const _crumbSectionHref =
    crumbSectionHref ?? `/${locale}/${locale === "tr" ? "traverten" : "travertine"}`;

  // JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: _crumbHomeLabel, item: _crumbHomeHref },
      { "@type": "ListItem", position: 2, name: _crumbSectionLabel, item: _crumbSectionHref },
    ],
  };

  // ====== 🔹 EXPORT VARYANTI (tek hero, ortalanmış içerik) ======
  if (variant === "export") {
    return (
      <section
        className={`relative overflow-hidden w-full h-[520px] md:h-[560px] lg:h-[600px] ${className}`}
        aria-labelledby="intro-heading"
      >
        {/* Hero arka plan */}
        <Image
          src={heroSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Koyu overlay okunabilirlik için */}
        <div className="absolute inset-0 bg-black/45" />

        {/* İçerik */}
        <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col items-center justify-center px-5 text-center text-white">
          <h1 id="intro-heading" className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold leading-[110%]">
            {_title}
          </h1>

          {_intro && (
            <p className="mt-3 max-w-3xl text-[13px] md:text-[15px] lg:text-[17px] leading-[150%] opacity-95">
              {_intro}
            </p>
          )}

          {_title2 && (
            <h2 className="mt-6 text-[20px] md:text-[24px] lg:text-[28px] font-semibold leading-tight">
              {_title2}
            </h2>
          )}

          {_intro2 && (
            <p className="mt-2 max-w-3xl text-[13px] md:text-[15px] lg:text-[17px] leading-[150%] opacity-95">
              {_intro2}
            </p>
          )}

          {showBreadcrumb && (
            <nav
              className="mt-6 inline-flex items-center rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs sm:text-sm"
              aria-label="breadcrumb"
            >
              <ol className="flex items-center gap-x-2">
                <li><Link href={_crumbHomeHref} className="hover:underline">{_crumbHomeLabel}</Link></li>
                <li className="text-white/70">/</li>
                <li><Link href={_crumbSectionHref} className="hover:underline">{_crumbSectionLabel}</Link></li>
              </ol>
            </nav>
          )}
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

  // ====== Eski (default) varyant – diğer sayfalar için korunur ======
 return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      aria-labelledby="intro-heading"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Sol: Hero görsel (stabil yükseklik, soft radius) */}
          <div className="lg:col-span-7">
            <div className="relative h-[280px] sm:h-[360px] lg:h-[560px] rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-2xl">
              <Image
                src={heroSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 56vw, 100vw"
              />
              {/* Üstte küçük badge şeridi */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[12px] font-medium shadow">
                  FOB / CIF
                </span>
                <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[12px] font-medium shadow">
                  Worldwide
                </span>
                <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[12px] font-medium shadow">
                  Docs Included
                </span>
              </div>
            </div>
          </div>

          {/* Sağ: Cam efektli içerik kartı */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] p-5 sm:p-7">
              <h1
                id="intro-heading"
                className="text-[28px] sm:text-[30px] lg:text-[34px] font-semibold leading-tight text-neutral-900"
              >
                {title}
              </h1>

              {intro && (
                <p className="mt-3 text-[12px] sm:text-[14px] leading-[135%] text-neutral-700">
                  {intro}
                </p>
              )}

              {title2 && (
                <h2 className="mt-5 text-[18px] sm:text-[20px] lg:text-[22px] font-semibold text-neutral-900">
                  {title2}
                </h2>
              )}

              {intro2 && (
                <p className="mt-2 text-[12px] sm:text-[14px] leading-[135%] text-neutral-700">
                  {intro2}
                </p>
              )}

              {/* CTA’lar */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={crumbHomeHref?.includes('/en') ? '/en/contactus' : '/tr/iletisim'}
                  className="inline-flex items-center rounded-xl bg-black text-white px-4 py-2.5 text-sm font-semibold shadow hover:bg-neutral-800 transition"
                >
                  Contact Sales
                </Link>
                <Link
                  href="#export-details"
                  className="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 transition"
                >
                  Learn more →
                </Link>
              </div>

              {/* Breadcrumb */}
              {showBreadcrumb && (
                <nav
                  className="mt-5 text-[12px] text-neutral-500"
                  aria-label="breadcrumb"
                >
                  <ol className="flex items-center gap-2">
                    <li>
                      <Link href={crumbHomeHref ?? "/"} className="hover:underline">
                        {crumbHomeLabel ?? "Home"}
                      </Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link
                        href={crumbSectionHref ?? "/"}
                        className="hover:underline"
                      >
                        {crumbSectionLabel ?? "Export Methods"}
                      </Link>
                    </li>
                  </ol>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Structured data (BreadcrumbList) */}
      <Script
        id={schemaId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: crumbHomeLabel ?? "Home",
                item: crumbHomeHref ?? "/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: crumbSectionLabel ?? "Export Methods",
                item: crumbSectionHref ?? "/howweexport",
              },
            ],
          }),
        }}
      />
    </section>
  );
}