"use client";
//gallery images came from _images GALLERY_BY_PRODUCT_AND_VARIANT
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations,useMessages  } from "next-intl";

import {
  getLang,
  baseFor,
  colorLabelFor,
  colorSlugFor,
} from "@/lib/travertine";
import blockIvory from "@/public/images/homepage/Ivoryblok.webp";
import slabAnticoVeincut from "@/public/images/new/slab/antico/Antikveincut.webp"
import slabAnticoCrosscut from "@/public/images/new/slab/antico/Antikcrosscut.webp"
import tilesLight from "@/public/images/homepage/kesim.webp";

import { IMAGE_BY_PRODUCT_AND_VARIANT, GALLERY_BY_PRODUCT_AND_VARIANT } from "@/app/[locale]/(catalog)/_images";
import BreadcrumbsExact from "@/app/[locale]/components/generalcomponent/BreadcrumbsExact";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import EmblaCarousel from "@/app/[locale]/components/generalcomponent/EmblaCarousel";
import SpecTable from "./SpecTable";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import InfoListCard from "./InfoListCard";
import SocialBlock from "./SocialBlock";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";

export default function BlockColorClient({ locale, color }) {
  const t = useTranslations("ProductPage");
  const lang = getLang(locale);
  const base = baseFor(locale);
  const prefix = `/${locale}`;

  const label = colorLabelFor(locale, String(color));
  
  // ✅ BLOCKS için slug her zaman EN olmalı (ivory/light/antico)
  // Çünkü i18n JSON ve _images.js EN key kullanıyor
  const rawColor = String(color);
  const normalizedSlug = rawColor === "ivory" || rawColor === "fildisi" ? "ivory"
    : rawColor === "light" || rawColor === "acik" ? "light"
    : rawColor === "antico" || rawColor === "antiko" ? "antico"
    : rawColor;
  
  // 🔍 DEBUG
  console.log("📥 Raw color param:", color);
  console.log("🔑 Normalized slug (forced EN):", normalizedSlug);
  console.log("🏷️ Label:", label);
  console.log("🌍 Locale:", locale);

  const i18nBlockImages = t.raw("blocks.images", null) || {};

  const img =
    i18nBlockImages?.[normalizedSlug] ||
    i18nBlockImages?.[String(color)] ||
    IMAGE_BY_PRODUCT_AND_VARIANT?.blocks?.[normalizedSlug] ||
    IMAGE_BY_PRODUCT_AND_VARIANT?.blocks?.[String(color)] ||
    blockIvory; // ✅ placeholder yerine gerçek görsel

  // ✅ Gallery: ÖNCE _images (StaticImport), SONRA i18n (string paths)
  const i18nGallery = t.raw("blocks.gallery", null) || {};
  
  // 🔸 Önce _images'den dene (import'lu görseller)
  let gallery = 
    GALLERY_BY_PRODUCT_AND_VARIANT?.blocks?.[normalizedSlug] ||
    GALLERY_BY_PRODUCT_AND_VARIANT?.blocks?.[String(color)] ||
    null;

  // 🔸 Yoksa i18n'den dene (string path'ler)
  if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
    gallery = 
      i18nGallery?.[normalizedSlug] ||
      i18nGallery?.[String(color)] ||
      null;
  }

  // ✅ Eğer gallery yoksa, fallback olarak img'yi array yap
  if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
    console.warn("⚠️ No gallery found, using fallback images");
    gallery = [img, img, img, img, img];
  }



  // ✅ Eğer gallery yoksa, fallback olarak img'yi array yap
  if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
    console.warn("⚠️ No gallery found, using fallback images");
    gallery = [img, img, img, img, img]; // aynı görseli 5 kez göster (geçici)
  }

   const colorsDict = t.raw("blocks.colors", null) || {};
  const colorContent =
    colorsDict?.[normalizedSlug] ||
    colorsDict?.[String(color)] ||
    null;

  // JSON bulunamazsa önceki fallback'lerin kalsın
  const titleFromJson = colorContent?.h1;
  const introFromJson = colorContent?.intro;
    const titleFromJson2 = colorContent?.title2;
  const introFromJson2 = colorContent?.intro2;

      const titleFromJson3 = colorContent?.h3;
  const introFromJson3 = colorContent?.text3;

     const titleFromJson4 = colorContent?.h4;
  const introFromJson4 =colorContent?.text4;

       const titleFromJson5 = colorContent?.h4;
  const introFromJson5 =colorContent?.text4;

  // Breadcrumb
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const selectedSegments = segments.slice(-1);

  // Hero + metinler
 const title  = titleFromJson ?? (locale === "tr" ? `${label} Traverten Bloklar` : `${label} Travertine Blocks`);
  const intro  = introFromJson ?? (locale === "tr"
    ? "Bloklarda doğrudan renk seçimi yapabilirsiniz. Kesim ve yüzey işlemleri isteğe göre uygulanır."
    : "For blocks, you can jump directly to the color. Cutting and surface finishes are applied on request."
  );
 const title2  = titleFromJson2 ?? (locale === "tr" ? `${label} Traverten Bloklar` : `${label} Travertine Blocks`);
  const intro2  = introFromJson2 ?? (locale === "tr"
    ? "Bloklarda doğrudan renk seçimi yapabilirsiniz. Kesim ve yüzey işlemleri isteğe göre uygulanır."
    : "For blocks, you can jump directly to the color. Cutting and surface finishes are applied on request."
  );

  const title3  = titleFromJson3 ?? (locale === "tr" ? `${label} Traverten Bloklar` : `${label} Travertine Blocks`);
  const text3  = introFromJson3 ?? (locale === "tr"
    ? "Bloklarda doğrudan renk seçimi yapabilirsiniz. Kesim ve yüzey işlemleri isteğe göre uygulanır."
    : "For blocks, you can jump directly to the color. Cutting and surface finishes are applied on request."
  );

   const title4  = titleFromJson4 ?? (locale === "tr" ? `${label} Traverten Bloklar` : `${label} Travertine Blocks`);
  const text4  = introFromJson4 ?? (locale === "tr"
    ? "Bloklarda doğrudan renk seçimi yapabilirsiniz. Kesim ve yüzey işlemleri isteğe göre uygulanır."
    : "For blocks, you can jump directly to the color. Cutting and surface finishes are applied on request."
  );

     const title5  = titleFromJson5 ?? (locale === "tr" ? `${label} Traverten Bloklar` : `${label} Travertine Blocks`);
  const text5  = introFromJson5 ?? (locale === "tr"
    ? "Bloklarda doğrudan renk seçimi yapabilirsiniz. Kesim ve yüzey işlemleri isteğe göre uygulanır."
    : "For blocks, you can jump directly to the color. Cutting and surface finishes are applied on request."
  );

  const heroSrc = img;
  const heroAlt = title;
  const baseHref = `${prefix}/${base}`;

  const colorNode   = (t.raw("blocks.colors", null) );

// ✅ TABLO VERİSİ
const specRows   = colorContent?.sections?.specs?.rows ?? [];
const specsTitle = colorContent?.sections?.specs?.h2
  ?? colorContent?.ui?.specsLabel
  ?? "Technical Specifications (Typical Values)";

const qi = colorContent?.QuestionsItems || {};
const faqItems = extractFaqFromColor(colorContent);
const faqSpan =
  colorContent?.QuestionsItems?.aboutpage_s4_faq_span1 ||
  colorContent?.sections?.faq?.span ||
  "";


const finishesNode = colorContent?.finishes || {};
const exportNode   = colorContent?.export  || {};

const finishesItems = [
  finishesNode.list1,
  finishesNode.list2,
  finishesNode.list3,
  finishesNode.list4,
].filter(Boolean);

const exportItems = [
  exportNode.list1,
  exportNode.list2,
  exportNode.list3,
  exportNode.list4, // varsa
].filter(Boolean);

// Başlıklar (JSON yoksa kısa fallback verelim)
const finishesTitle = finishesNode.title || (locale === "tr" ? "Yüzey İşlemleri" : "Finishes");
const exportTitle   = exportNode.title   || (locale === "tr" ? "İhracat & Paketleme" : "Export & Packaging");

// --- FAQ: color'a göre robust çıkarım ---
function extractFaqFromColor(colorNode) {
  if (!colorNode || typeof colorNode !== "object") return [];

  // 0) Eğer yanlışlıkla dizi bekleyen kod kalmışsa null'a düşür
  if (Array.isArray(colorNode?.QuestionsItems)) {
    // Yeni JSON'da QuestionsItems bir OBJE; eski dizi yaklaşımı yok.
    // Yine de destek olsun diye q/a alanlı dizi gelirse alalım.
    const arr = colorNode.QuestionsItems.filter(
      it => it && typeof it.q === "string" && typeof it.a === "string"
    ).map(it => ({ q: it.q.trim(), a: it.a.trim() }));
    if (arr.length) return arr;
  }

  const qItems = colorNode?.QuestionsItems || {};
  const pairs = [];

  // Her anahtarı gez ve hem "faqN_header" hem "faq_headerN" düzenlerini yakala.
  // Örnekler:
  //  - aboutpage_s4_faq1_header / aboutpage_s4_faq1_text
  //  - aboutpage_s4_faq_header1 / aboutpage_s4_faq_text1
  for (const key of Object.keys(qItems)) {
    let idx = null;
    let kind = null;

    // Düzen A: ..._faq1_header / ..._faq1_text
    let m = key.match(/aboutpage_s4_faq(\d+)_(header|text)$/i);
    if (m) {
      idx = Number(m[1]);
      kind = m[2].toLowerCase(); // header | text
    } else {
      // Düzen B: ..._faq_header1 / ..._faq_text1
      m = key.match(/aboutpage_s4_faq_(header|text)(\d+)$/i);
      if (m) {
        kind = m[1].toLowerCase();
        idx = Number(m[2]);
      }
    }

    if (!idx || !kind) continue;
    const val = qItems[key];
    if (typeof val !== "string") continue;

    // pairs: { idx, header?: string, text?: string }
    let slot = pairs.find(p => p.idx === idx);
    if (!slot) {
      slot = { idx };
      pairs.push(slot);
    }
    slot[kind] = val.trim();
  }

  // indeks sırasına göre ve hem header hem text olanları filtrele
  return pairs
    .sort((a, b) => a.idx - b.idx)
    .filter(p => p.header && p.text)
    .map(p => ({ q: p.header, a: p.text }));
}



  return (
    <main className="py-6 mt-[22px] lg:mt-7 overflow-x-hidden gap-5 flex flex-col">
      <ProductIntroSection
        title={title}
        intro={intro}
        title2={title2}
        intro2={intro2}
        heroSrc={heroSrc}
        alt={heroAlt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        span=""
      />

      <BreadcrumbsExact
        prefix={prefix}
        baseHref={`${prefix}/${base}`}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        selectedSegments={selectedSegments}
        className="mb-4"
        items={[
          { label: locale === "tr" ? "Traverten" : "Travertine", href: `${prefix}/${base}` },
          { label: locale === "tr" ? "Bloklar" : "Blocks", href: `${prefix}/${base}/blocks` },
          { label, href: `${prefix}/travertine/blocks/${normalizedSlug}` },
        ]}
      />

      <div className="mx-auto text-center flex flex-col items-center justify-center max-w-[1400px] w-[95%]">

        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start w-full">
          <div className="w-[90%] lg:w-[45%] items-center justify-start flex">
            <EmblaCarousel
              images={gallery}
              altPrefix={`${label} travertine blocks`}
            />
          </div>
          <div className="flex flex-col w-[90%] lg:w-[45%] gap-5">
            <div className="space-y-4 text-start bg-white rounded-xl p-6 shadow-md">
                 <SpecTable rows={specRows} title={specsTitle} />
            </div>
            <SocialBlock/>
          </div>
        
        </div>
      </div>

      <div className="max-w-[1400px] w-[95%] mx-auto ">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InfoListCard title={finishesTitle} items={finishesItems} />
    <InfoListCard title={exportTitle}   items={exportItems} />
  </div>
</div>

      <div className="w-[90%] md:w-[80%] max-w-[1400px] mx-auto text-center justify-center items-center">
        <h3 className="text-[20px] lg:text-[22px] font-bold tracking-tight text-neutral-900">
         {title3}
        </h3>
        <p className="text-[12px] lg:text-[14px]">{text3}</p>

         <h4 className="text-[20px] lg:text-[22px] font-bold tracking-tight text-neutral-900 mt-5">
         {title4}
        </h4>
        <p className="text-[12px] lg:text-[14px]">{text4}</p>

         <h5 className="text-[20px] lg:text-[22px] font-bold tracking-tight text-neutral-900 mt-5">
         {title5}
        </h5>
        <p className="text-[12px] lg:text-[14px]">{text5}</p>
      </div>

      <QuestionsSection items={faqItems} span={`Common Questions About  ${label} Travertine Blocks`}/>
      <SocialMediaSection />
      <ContactFrom />

      <OtherOptions
  locale={locale}                 // resolveHref locale'yi prefixlemek için kullanıyor
  heading={t("blocks.otherOptions.heading", { default: "Other Options" })}
  customItems={[
    {
      // Slabs / Vein-Cut
      title: locale === "tr" ? "Plakalar • Vein-Cut" : "Slabs • Vein-Cut",
      text:  locale === "tr"
        ? "Damar yönünde kesimle daha çizgisel görünüm."
        : "Linear look with vein-direction cut.",
      img: slabAnticoVeincut,
      href: { pathname: "/travertine/[product]/[cut]", params: { product: "slabs", cut: "vein-cut" } },
    },
    {
      // Slabs / Cross-Cut
      title: locale === "tr" ? "Plakalar • Cross-Cut" : "Slabs • Cross-Cut",
      text:  locale === "tr"
        ? "Damağa kesit görünümüyle daha bulutumsu desen."
        : "Cloudy, mosaic-like pattern via cross-cut.",
      img:  slabAnticoCrosscut,
      href: { pathname: "/travertine/[product]/[cut]", params: { product: "slabs", cut: "cross-cut" } },
    },

    {
      title: locale === "tr" ? "Karo • Vein-Cut" : "Tiles • Vein-Cut",
      text:  locale === "tr" ? "Proje ihtiyaçlarına göre ölçüler." : "Cut-to-size options for projects.",
      img:   tilesLight,
      href:  { pathname: "/travertine/[product]/[cut]", params: { product: "tiles", cut: "vein-cut" } },
    },
  ]}
/>
    </main>
  );
}