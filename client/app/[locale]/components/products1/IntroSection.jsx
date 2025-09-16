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
            {t("title")}
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed line">
          {t("intro")}
          </p>

           <h2 id="intro-heading" className="text-2xl sm:text-3xl font-semibold">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed">
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi cupiditate, quibusdam eius sint delectus dicta. Eaque delectus labore modi illo facilis, maiores at, ratione nihil illum reiciendis excepturi cumque molestias atque? Repellat aspernatur excepturi sunt similique reiciendis optio eveniet quisquam at iste sit voluptatem animi necessitatibus architecto, unde, doloremque inventore rem eos doloribus voluptas quia quibusdam non labore. Eos ea maxime impedit in aut, rerum amet! Iure alias tenetur quibusdam excepturi, eaque voluptatum ipsum atque ullam quaerat praesentium neque! Enim tenetur repudiandae aperiam, ex esse, sequi omnis quidem sapiente sit incidunt natus deserunt! Vel officiis quas voluptas delectus odit. Deleniti veniam natus culpa fuga, tempora accusantium optio consequuntur sunt consectetur nostrum, porro repudiandae! Provident numquam cum corporis necessitatibus aliquid explicabo a tempore quasi earum? Error, odit. Laudantium sed omnis nesciunt nulla, alias, molestias numquam ex veniam debitis maiores esse. Minus, eaque! Fugiat similique vitae, ratione, ad hic voluptatibus, quod quisquam modi quidem ipsum odit? Placeat, doloribus. Consequuntur soluta saepe provident, delectus quasi ullam eaque expedita ab accusantium nostrum a suscipit odit beatae culpa dignissimos numquam facilis accusamus omnis illo esse. Adipisci architecto suscipit omnis voluptatibus, fuga maxime dolorum similique earum rem expedita, temporibus molestiae culpa totam quibusdam animi error quae? Consectetur incidunt, sint labore fugiat ut autem vero ex! Excepturi facilis harum odio illum ipsa nisi dolorem hic ab deleniti at est distinctio cum molestias recusandae corrupti eaque, libero dolore repellat explicabo, unde veritatis inventore neque eos! Unde id quis beatae numquam earum totam ipsam quidem voluptatibus blanditiis animi, mollitia deleniti dolorem, adipisci eaque quae cupiditate aliquid omnis sit nam, repudiandae fuga maiores! Dicta, dolorum! Quae minus deserunt aliquam molestias voluptate
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
     <h1 className="text-3xl font-semibold mt-3">{t("title")}</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, fugiat nulla sed nesciunt deleniti doloremque porro illum qui maxime dolorem facilis exercitationem modi suscipit distinctio odit blanditiis dolore vitae saepe?</p>
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
                 src="/images/traverterDeskt.webp"
              alt="travertine"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* <div className="hidden lg:flex flex-row items-center justify-center h-[500px] relative ">
     
        <div
          className="flex w-screen rounded-2xl h-[400px] max-w-[1000px]"
          style={{
            backgroundImage: "url('/images/homepage/antikarkaplan2.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
 <div
  className="absolute rounded-sm h-[500px] 2xl:h-[520px] w-[860px] 2xl:w-[50%] 2xl:max-w-[1000px] text-black flex flex-col justify-between left-1/2 -translate-x-1/2 "
>
        
        <div
          className="absolute rounded-sm h-[500px] 2xl:h-[520px] w-[860px] 2xl:w-[50%] 2xl:max-w-[1000px] text-black flex flex-col justify-between left-1/2 -translate-x-1/2"
          style={{
            backgroundImage: "url('/images/homepage/mermer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
         
          <header className="px-5 pt-5 w-[70%]">
           <h1 id="intro-heading" className="text-2xl sm:text-3xl font-semibold">
          Travertine - Wholesale Travertine From Turkey – Majen
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed">
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi 
          </p>

           <h2 id="intro-heading" className="text-2xl sm:text-3xl font-semibold mt-[5%]">
           Travertine -  Wholesale Travertine From Turkey 
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed">
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi 
          </p>
          </header>

         
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
      </div> */}

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
