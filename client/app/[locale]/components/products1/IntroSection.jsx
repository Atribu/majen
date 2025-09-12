import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

const IntroSection = () => {
  // JSON-LD Schema for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://majen.com.tr/tr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Travertine",
        item: "https://majen.com.tr/tr/travertine",
      },
    ],
  };

  return (
    <section
      className="flex flex-row items-center justify-center h-[700px] mt-12 relative overflow-hidden"
      aria-labelledby="intro-heading"
    >
      {/* Arka plan div */}
      <div className="flex w-screen bg-black rounded-2xl h-[400px]" />

      {/* İçerik div */}
      <div className="absolute rounded-sm bg-black h-[500px] 2xl:h-[520px] w-[860px] 2xl:w-[50%] 2xl:max-w-[1000px] text-white flex flex-col justify-between left-1/2 -translate-x-1/2">
        {/* Üst kısım: Başlık + Açıklama */}
        <header className="px-5 pt-5  w-[540px]">
          <h1 id="intro-heading" className="text-3xl font-semibold">
            Travertine From Turkey – Majen
          </h1>
          <p className="mt-3">
            Majen olarak, Türkiye’nin seçkin ocaklarından projelerinize uygun
            traverten tedarik ediyoruz. Blok, slab ve karo seçenekleriyle proje
            odaklı üretim sağlıyoruz.
          </p>
        </header>

        {/* Alt kısım: Breadcrumbs */}
        <nav className="bg-black px-4 py-3 rounded-sm" aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <span className="mx-2 text-white/50">/</span>
              <Link href="/travertine" className="hover:underline">
                Travertine
              </Link>
            </li>
          </ol>
        </nav>

        {/* Resim */}
        <div className="absolute right-[-500px] top-1/2 -translate-y-1/2 w-[800px] h-[400px]">
          <Image
            src="/images/traverterDeskt.webp" // kendi görsel yolunu koy
            alt="Travertine slabs with polished surface from Majen"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Breadcrumb Schema (Google için) */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  );
};

export default IntroSection;
