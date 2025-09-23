// app/components/products/ProductIntroSection.jsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { usePathname } from "next/navigation";
import ShareButton from "../ShareButton";

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

  const pathname = usePathname() || ""; // boş string fallback
  const segments = pathname.split("/").filter(Boolean); 
  const lastSegment = pathname.split("/").filter(Boolean).pop(); 
  const selectedSegments = segments.slice(-depth);

  return (
    <section className="relative mt-2 overflow-hidden" aria-labelledby="intro-heading">
      {/* === Mobile & Tablet === */}
      <div className="lg:hidden relative w-full h-[500px] flex items-center justify-center">
        {/* Background */}
        <Image
          src={heroSrc}
          alt="Travertine"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white max-w-[95%]">
          <h1 id="intro-heading" className="text-[24px] md:text-[24px] lg:text-[26px] font-semibold">
            {title} <span>Direct Quarry Supplier</span>
          </h1>
          <p className="mt-3 text-[12px] leading-tight lg:leading-relaxed">{intro}</p>

            <h2 id="intro-heading" className="text-[24px] md:text-[32px] lg:text-[36px] font-semibold">
            {title2}
          </h2>
          <p className="mt-3 text-[12px] md:text-[14px] leading-tight lg:leading-relaxed">{intro2}</p>
          <div className=" mt-3">
                      <ShareButton label="Share" />
                    </div>

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
                <Link href={baseHref} className="hover:underline">{crumbProducts}s</Link>
              </li>
              <li className="text-white/60">/</li>
              <li className="text-white/90"> {lastSegment}</li>
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
    <h1 className="text-[24px] lg:text-[26px] font-semibold mt-1 lg:mt-5">{title} <span>- Direct Quarry Supplier</span></h1>
    <p className="text-[12px] lg:text-[14px] mb-10 lg:leading-[140%]">{intro}</p>
    
     <h2 className="text-[22px] lg:text-[24px] font-semibold mt-3">{title2}</h2>
    <p className="text-[12px] lg:text-[14px] mt-3 leading-tight lg:leading-[140%]">{intro2}</p>
  
  </header>
  <div className="ml-4">
              <ShareButton label="Share" />
            </div>

          {/* Alt: Breadcrumbs */}
           <nav className="mb-3 inline-flex items-center z-[99] px-3  text-xs sm:text-sm">
            <ol className="flex items-center gap-x-2">
              <li><Link href={prefix}>{crumbHome}</Link></li>
              <li>/</li>
              <li><Link href={baseHref}>{crumbProducts}s</Link></li>
              {selectedSegments.map((seg, i) => (
                <React.Fragment key={i}>
                  <li>/</li>
                  <li className="capitalize">{seg}</li>
                </React.Fragment>
              ))}
            </ol>
          </nav>

          {/* Sağdaki görsel */}
          <div className="absolute right-[-500px] top-1/2 -translate-y-1/2 w-[720px] h-[500px] z-[999]">
            <Image
              src={heroSrc}
              alt={alt}
              fill
              className="object-contain"
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
