"use client";
//resimler _images klasöründeki IMAGE_BY_PRODUCT burdan geliyor ve variant kısmının resimleri colorThumbs dan (_images)
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  baseFor,
  productKeyFromSlug,
  colorKeys,
  colorLabelFor,
  colorSlugFor,
  buildSeoColorPath,
  CUTS,
  getLang
} from "@/lib/travertine";

 import {
   IMAGE_BY_PRODUCT,               // product/cut/process bazlı hero & thumb kaynakları
   IMAGE_BY_PRODUCT_AND_VARIANT,   // renk görselleri (color)
   PROCESS_THUMB_BY_COMBINED       // global fallback (filled:honed vb.)
 } from "@/app/[locale]/(catalog)/_images";

import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className="text-sm text-neutral-600 leading-[1.7] text-center">{children}</div>
    </div>
  );
}

// URL'deki process segmentini i18n anahtarı olarak normalize et (EN: filled-polished, TR: dolgulu-cilali, natural/dogal)
function normalizeProcKey(procSlug = "", locale = "en") {
  const s = String(procSlug).toLowerCase().trim();

  // natural/dogal direkt döner
  if (s === "natural" || s === "dogal") return s;

  // EN ise beklenen "filled-xxx" / "unfilled-xxx"
  if (locale.startsWith("en")) {
    // eski tek anahtar geldi ise (örn. "polished"), varsayılanı filled say:
    if (!s.includes("-")) return `filled-${s}`;
    return s;
  }

  // TR: dolgulu-/dolgusuz- önek dönüşümü
  if (locale.startsWith("tr")) {
    // tek anahtar (örn. "cilali") gelirse doldur: "dolgulu-cilali"
    if (!s.includes("-")) return `dolgulu-${s}`;
    return s;
  }

  return s;
}

// UI'da okunaklı başlık üret ("Filled · Polished" / "Dolgulu · Cilalı" / "Natural")
function friendlyProcessLabel(procKey, locale) {
  const titleCase = (x) =>
    String(x || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

  if (!procKey) return locale.startsWith("tr") ? "İşlem" : "Process";
  if (procKey === "natural")  return "Natural";
  if (procKey === "dogal")    return "Doğal";

  const [fill, proc] = procKey.split("-");
  if (locale.startsWith("tr")) {
    const mapFill = { dolgulu: "Dolgulu", dolgusuz: "Dolgusuz" };
    const mapProc = {
      honlanmis: "Honlanmış",
      cilali: "Cilalı",
      fircalanmis: "Fırçalanmış",
      eskitilmis: "Eskitilmiş"
    };
    return `${mapFill[fill] || titleCase(fill)} · ${mapProc[proc] || titleCase(proc)}`;
  }

  const mapFillEn = { filled: "Filled", unfilled: "Unfilled" };
  return `${mapFillEn[fill] || titleCase(fill)} · ${titleCase(proc)}`;
}

// güvenli okuyucu
const safe = (fn, fallback) => {
  try { const v = fn(); return v ?? fallback; } catch { return fallback; }
};

// TR birleşik → EN birleşik ("dolgulu-cilali" → "filled-polished")
function trCombinedToEn(procKey = "") {
  const s = String(procKey).toLowerCase().trim();
  if (!s) return s;
  if (s === "dogal") return "natural";
  const [fillRaw, procRaw] = s.split("-");
  const fill = { dolgulu: "filled", dolgusuz: "unfilled", filled: "filled", unfilled: "unfilled" }[fillRaw] || fillRaw;
  const proc = {
    honlanmis: "honed",
    cilali: "polished",
    fircalanmis: "brushed",
    eskitilmis: "tumbled",
    honed: "honed", polished: "polished", brushed: "brushed", tumbled: "tumbled"
  }[procRaw] || procRaw;
  return `${fill}-${proc}`;
}


export default function ProcessPage() {
  const { product: productSlug, cut: cutSlug, process } = useParams();
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");

  const prefix = `/${locale}`;
  const baseSegment = baseFor(locale);
  const baseHref = `${prefix}/${baseSegment}`;

  const productKey = productKeyFromSlug(locale, String(productSlug)) || "slabs";

  // cutSlug (SEO) → cutKey ("vein-cut" | "cross-cut")
  const cutKey = Object.keys(CUTS[lang] || {}).find((k) => CUTS[lang][k] === cutSlug) || "vein-cut";
  const cutTitle = safe(() => t(`${productKey}.cuts.${cutKey}.title`), cutKey);

  // process anahtarı: birleşik (filled-polished / unfilled-honed / natural ...)
  const procKey = normalizeProcKey(process, locale);
  const procLabel = friendlyProcessLabel(procKey, locale);

  // TR'de "dolgulu-..." anahtarını EN'e çevirip lookup'ı tek kanaldan yapalım
const lookupProcKey =
  locale.startsWith("tr") ? trCombinedToEn(procKey) : procKey;

  // === ÜRÜN GENEL ===
  const productTitle = safe(() => t(`${productKey}.title`), "Product");
  const productIntro = safe(() => t(`${productKey}.intro`), "");
  const sizes    = safe(() => t.raw(`${productKey}.sizes`), []) || [];
  const finishes = safe(() => t.raw(`${productKey}.finishes`), []) || [];
  const features = safe(() => t.raw(`${productKey}.features`), []) || [];
  const description = safe(() => t.raw(`${productKey}.description`), productIntro) || productIntro;

// === PROCESS DÜĞÜMÜ === (tek anahtarla; TR ise EN'e çevrilmiş hali)
const processNode =
  safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes.${lookupProcKey}`), {}) || {};

// Başlık
const processTitle = processNode.title || procLabel;
  const processIntro = processNode.lead || processNode.intro || safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes.subtext`), "");

 // Görsel / alt başlıklar / span (process → combined key)
 const combinedKey = combinedKeyFromProc(procKey, locale); // "filled:honed" | "unfilled:polished" | "natural"

 // 1) i18n override (varsa)
 const heroI18n = processNode?.hero?.src || null;

 // 2) _images → product/cut/processHero → combined key
 const heroByImages =
   IMAGE_BY_PRODUCT?.[productKey]?.processHero?.[cutKey]?.[combinedKey] ||
   IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[combinedKey] || // thumb’ı da hero fallback olarak kullan
   IMAGE_BY_PRODUCT?.[productKey]?.[cutKey] ||                               // cut cover
   IMAGE_BY_PRODUCT?.[productKey]?.cover ||
   PROCESS_THUMB_BY_COMBINED?.[combinedKey] ||                               // global fallback
   "/images/homepage/antikoarkplan.webp";

 const heroSrc = heroI18n || heroByImages;
 const heroAlt = processNode?.hero?.alt || `${productTitle} ${processTitle}`;
  const span    = processNode.span || safe(() => t(`${productKey}.span`), undefined);

   // "filled-polished" | "unfilled-honed" | "natural" | TR karşılıkları → combined key (EN sabit): "filled:polished" | "natural"
 function combinedKeyFromProc(procKey = "", locale = "en") {
   const s = String(procKey).toLowerCase().trim();
   if (!s) return null;
   if (s === "natural" || s === "dogal") return "natural";

   // TR → EN dönüşüm tabloları
   const fillMap = { dolgulu: "filled", dolgusuz: "unfilled", filled: "filled", unfilled: "unfilled" };
   const procMap = {
     honlanmis: "honed", cilali: "polished", fircalanmis: "brushed", eskitilmis: "tumbled",
     honed: "honed", polished: "polished", brushed: "brushed", tumbled: "tumbled"
   };

   const [fillRaw, procRaw] = s.split("-");
   const fill = fillMap[fillRaw] || fillRaw;
   const proc = procMap[procRaw] || procRaw;
   return `${fill}:${proc}`;
 }


  // INFO KARTLARI
  const hSizes    = safe(() => t(`${productKey}.detailsHeadings.sizes`), "Sizes / Thickness");
  const hFeatures = safe(() => t(`${productKey}.detailsHeadings.features`), "Finishes & Features");

  const cards = [
    {
      title: `${productTitle} · ${cutTitle} · ${processTitle}`,
      content: processIntro || (Array.isArray(description) ? description[0] : description)
    },
    {
      title: hSizes,
      content: Array.isArray(description) ? (description[1] ?? productIntro) : productIntro
    },
    {
      title: hSizes,
      content: sizes.length ? sizes.join(", ") : (locale.startsWith("tr") ? "Kalınlık seçeneklerini renk sayfasında görün." : "See size options on the color page.")
    },
    {
      title: hFeatures,
      content: [...(finishes || []), ...(features || [])].slice(0, 12).join(", ")
    }
  ];

  // === RENK SEÇİMİ ===
  const cKeys = colorKeys();


const colorImgMap = Object.fromEntries(
  cKeys.map((key) => {
    // slug (route) ve key (en.json anahtarı) aynı aile ama ayrışık olabilir; slug görseli için de lazım
    const slug = colorSlugFor(locale, key);

    // ✅ 1. öncelik: _images → product → colorThumbs → cut → combinedKey → colorKey
    const fromColorByProcess =
      IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[combinedKey]?.[key];

    // ✅ 2. öncelik: ürün-variant (renk) görselleri (genel)
    const fromVariant =
      IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug] ||
      IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[key]; // bazı projelerde slug==key olmayabiliyor

    // ✅ 3. öncelik: process thumb (global)
    const fromProcessThumb =
      PROCESS_THUMB_BY_COMBINED?.[combinedKey];

    // ✅ 4. fallback: sayfanın hero görseli
    const src = fromColorByProcess || fromVariant || fromProcessThumb || heroSrc;

    return [slug, src];
  })
);

const colorCards = cKeys.map((key) => {
  const label = colorLabelFor(locale, key);
  const slug  = colorSlugFor(locale, key);
  return {
    slug,
    vKey: slug,       // VariantCircleSection imgMap’i slug ile okuyorsa
    title: label,
    alt: label,
    href: buildSeoColorPath(locale, productKey, cutSlug, process, key)
  };
});


  return (
    <main className="px-5 md:px-8 lg:px-0 py-7 mt-16">
      {/* INTRO */}
      <ProductIntroSection
        title={processNode.h1 || `${productTitle} · ${cutTitle} · ${processTitle}`}
        intro={processIntro}
        title2={processNode.title2 || undefined}
        intro2={processNode.intro2 || undefined}
        span={span}
        heroSrc={heroSrc}
        alt={heroAlt}
        prefix={prefix}
        baseHref={`${prefix}/${baseSegment}`}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
        depth={3}
      />

      {/* INFO CARDS */}
      <section className="mt-8 md:mt-10 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
        {cards.map((c, i) => (
          <InfoCard key={i} title={c.title}>
            {typeof c.content === "string" ? c.content : Array.isArray(c.content) ? c.content.join(", ") : null}
          </InfoCard>
        ))}
      </section>

      {/* COLOR SEÇİMİ */}
      <VariantCircleSection
        heading={`${processTitle} ${locale.startsWith("tr") ? "Renkleri" : "Colors"}`}
        variantCards={colorCards}
        imgMap={colorImgMap} 
        heroSrc={heroSrc}
        IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
        productKey="color"
      />

      {/* Metin / CTA */}
      <TextSection
        title={locale.startsWith("tr") ? "Türkiye'den Toptan Traverten" : "Wholesale Travertine from Turkey"}
        paragraphs={[
          Array.isArray(description) ? (description[2] || description[0] || productIntro) : (description || productIntro)
        ]}
        className="max-w-5xl mx-auto mt-12"
        clampMobile={3}
        as="section"
      />

      <ContactFrom />
    </main>
  );
}
