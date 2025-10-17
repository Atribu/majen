"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations, useMessages } from "next-intl";
import {
  baseFor,
  productKeyFromSlug,
  COLOR_KEY_BY_SLUG,
  colorLabelFor,
  sizeSlugListForProduct,
  sizeLabelFromSlug,
  CUTS,
  getLang
} from "@/lib/travertine";
import {
  IMAGE_BY_PRODUCT,
  IMAGE_BY_PRODUCT_AND_VARIANT as IMAGE_BY_PRODUCT_AND_COLOR,
  PROCESS_THUMB_BY_COMBINED
} from "@/app/[locale]/(catalog)/_images";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import EmblaCarousel from "@/app/[locale]/components/generalcomponent/EmblaCarousel";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";
import BreadcrumbsExact from "@/app/[locale]/components/generalcomponent/BreadcrumbsExact";
import SpecTable from "@/app/[locale]/travertine/blocks/[color]/SpecTable";
import InfoListCard from "@/app/[locale]/travertine/blocks/[color]/InfoListCard";
import SocialBlock from "@/app/[locale]/travertine/blocks/[color]/SocialBlock";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";

const safe = (fn, fb = null) => { try { const v = fn(); return v ?? fb; } catch { return fb; } };


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

export default function ColorDetailPage() {
  const { product: productSlug, cut: cutSlug, process: processSlug, color: colorSlug, thickness } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");
  const messages = useMessages(); 
  const productKey = productKeyFromSlug(locale, String(productSlug));
   const isBlocks = productKey === "blocks";   // ⬅️ blocks kısa akışı
   
  const cutKey = isBlocks
    ? null
    : (Object.keys(CUTS[lang] || {}).find((k) => CUTS[lang][k] === cutSlug) || "vein-cut");
  const procKeyFull = isBlocks ? "" : String(processSlug || "").toLowerCase();
  const colorKey = (COLOR_KEY_BY_SLUG && COLOR_KEY_BY_SLUG[colorSlug]) || String(colorSlug || "").toLowerCase();
  const sizeSlugs = sizeSlugListForProduct(productKey, t);
  // Hash'tan oku (örn. #2cm). Uyum yoksa ilk boy.
  const hashValue = typeof window !== "undefined" ? decodeURIComponent(window.location.hash.replace(/^#/, "")) : "";
  const initialFromHash = hashValue && sizeSlugs.includes(hashValue) ? hashValue : sizeSlugs[0];
  const [selected, setSelected] = React.useState(initialFromHash);

  // Hash değişirse state’i senkronize et
  React.useEffect(() => {
    const onHashChange = () => {
      const v = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (v && sizeSlugs.includes(v)) setSelected(v);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [sizeSlugs]);
  // blocks'ta process/cut olmayabilir; yalnızca product+color yeterli
  if (!productKey || !colorKey || (!procKeyFull && !isBlocks)) {
    return <main className="p-10 text-center text-neutral-500">Loading...</main>;
  }


 let page = null;
 if (isBlocks) {
   // Blocks: direkt renk düğümü (cut/process yok)
   page = messages?.ProductPage?.[productKey]?.colors?.[colorKey] || null;
 } else {
   // Mevcut (slabs/tiles/special) akış
   page =
     messages?.ProductPage?.[productKey]
              ?.cuts?.[cutKey]
              ?.processes?.[procKeyFull]
              ?.colors?.[colorKey]
     || null;

   // TR’de birleşik anahtar çevirme fallback'i
   if (!page && locale.startsWith("tr")) {
     const enKey = trCombinedToEn(procKeyFull);
     if (enKey) {
       page =
         messages?.ProductPage?.[productKey]
                  ?.cuts?.[cutKey]
                  ?.processes?.[enKey]
                  ?.colors?.[colorKey]
         || null;
     }
   }
 }

  const chooseThicknessLabel = page?.ui?.chooseThickness || (locale.startsWith("tr") ? "Kalınlık Seç" : "Choose Thickness");
  const applicationsLabel = page?.ui?.applicationsLabel || (locale.startsWith("tr") ? "Uygulamalar" : "Applications");
  const specsLabel = page?.ui?.specsLabel || (locale.startsWith("tr") ? "Teknik Özellikler" : "Specifications");
  const faqLabel = page?.ui?.faqLabel || (locale.startsWith("tr") ? "SSS" : "FAQ");
  const colorLabel = colorLabelFor(locale, colorKey);
 let processLabel = "";
  if (!isBlocks) {
    processLabel =
      messages?.ProductPage?.[productKey]?.cuts?.[cutKey]?.processes?.[procKeyFull]?.title || null;
    if (!processLabel && locale.startsWith("tr")) {
      const enKey = trCombinedToEn(procKeyFull);
      processLabel =
        messages?.ProductPage?.[productKey]?.cuts?.[cutKey]?.processes?.[enKey]?.title || null;
    }
    processLabel = processLabel || procKeyFull.replace(/-/g, " ");
  }

 const H1 = page?.h1 || (isBlocks ? `${colorLabel}` : `${colorLabel} · ${processLabel}`);
 const H2 = page?.title || (isBlocks ? `${colorLabel}` : `${colorLabel} · ${processLabel}`);
  const lead = page?.lead || "";
  const intro = page?.intro || "";
  const intro2 = page?.intro2 || "";
  const metaTitle = page?.metaTitle || H1;
  const metaDesc = page?.metaDesc || intro;
// process → combinedKey (blocks’ta yok)
const combinedKey = isBlocks ? null : combinedKeyFromProc(procKeyFull, locale);

// 1) _images: product → colorThumbs → cut → combinedKey → colorKey
const fromColorByProcess = !isBlocks && combinedKey
  ? IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[combinedKey]?.[colorKey]
  : null;

// 2) ürün-variant genel renk görselleri (slug ya da key)
const fromVariant =
  IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorSlug]
  || IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorKey];

// 3) process thumb (global)
const fromProcessThumb = !isBlocks && combinedKey
  ? PROCESS_THUMB_BY_COMBINED?.[combinedKey]
  : null;

// 4) en son genel cover
const heroSrc =
  fromColorByProcess
  || fromVariant
  || fromProcessThumb
  || (!isBlocks ? IMAGE_BY_PRODUCT?.[productKey]?.[cutKey] : null)   // blocks’ta cut yok
  || IMAGE_BY_PRODUCT?.[productKey]?.cover
  || "/images/homepage/antikoarkplan.webp";

  // === GALLERY ===
const i18nGallery =
  (page?.gallery && Array.isArray(page.gallery) ? page.gallery : null) || null;

function getGallery() {
  if (Array.isArray(i18nGallery) && i18nGallery.length) return i18nGallery;
  if (heroSrc) return [heroSrc, heroSrc, heroSrc]; // basit fallback
  return [];
}

  const baseSegment = baseFor(locale);
  // SEO notu: hash canonical'a eklenmez (arama motorları # sonrasını dikkate almaz).
   const canonical = isBlocks
    ? `https://www.majen.com.tr/${locale}/${colorSlug}-${(locale.startsWith("tr") ? "traverten-bloklar" : "travertine-blocks")}`
    : `https://www.majen.com.tr/${locale}/${colorSlug}-${processSlug}-${cutSlug}`;
  const sections = page?.sections || {};
  const apps = sections.applications;
  const specs = sections.specs;
const { items: faqItems, span: faqSpan } = extractFaqFromPage(page);

function combinedKeyFromProc(proc = "", locale = "en") {
  const s = String(proc).toLowerCase().trim();
  if (!s) return null;
  if (s === "natural" || s === "dogal") return "natural";

  const fillMap = { dolgulu: "filled", dolgusuz: "unfilled", filled: "filled", unfilled: "unfilled" };
  const procMap = {
    honlanmis: "honed",
    cilali: "polished",
    fircalanmis: "brushed",
    eskitilmis: "tumbled",
    honed: "honed", polished: "polished", brushed: "brushed", tumbled: "tumbled"
  };

  const [fillRaw, procRaw] = s.split("-");
  const fill = fillMap[fillRaw] || fillRaw;
  const p    = procMap[procRaw] || procRaw;

  // COLOR thumbs ve PROCESS_THUMB_BY_COMBINED colon (:) ile indexleniyor
  return `${fill}:${p}`;
}

const finishesNode = page?.finishes || {};
const exportNode   = page?.export  || {};

const finishesItems = [finishesNode.list1, finishesNode.list2, finishesNode.list3, finishesNode.list4].filter(Boolean);
const exportItems   = [exportNode.list1,   exportNode.list2,   exportNode.list3,   exportNode.list4].filter(Boolean);

const finishesTitle = finishesNode.title || (locale.startsWith("tr") ? "Yüzey İşlemleri" : "Finishes & Processing Options");
const exportTitle   = exportNode.title   || (locale.startsWith("tr") ? "İhracat & Paketleme" : "Export, Packaging & Shipping");

const title3 = page?.h3, text3 = page?.text3;
const title4 = page?.h4, text4 = page?.text4;
const title5 = page?.h5, text5 = page?.text5;

// page içinden FAQ çıkar (hem sections.faq.items hem QuestionsItems destekli)
function extractFaqFromPage(page) {
  if (!page || typeof page !== "object") return { items: [], span: "" };

  const qObj = page?.QuestionsItems;
  if (!qObj || typeof qObj !== "object") return { items: [], span: "" };

  // indexleri topla (her iki pattern’i destekle)
  const idxSet = new Set();
  for (const k of Object.keys(qObj)) {
    let m = k.match(/^aboutpage_s4_faq(\d+)_(header|text)$/i); // ...faq1_header / ...faq1_text
    if (m) { idxSet.add(Number(m[1])); continue; }
    m = k.match(/^aboutpage_s4_faq_(header|text)(\d+)$/i);     // ...faq_header1 / ...faq_text1
    if (m) { idxSet.add(Number(m[2])); }
  }

  const items = Array.from(idxSet)
    .sort((a, b) => a - b)
    .map((n) => {
      const q =
        (typeof qObj[`aboutpage_s4_faq${n}_header`] === "string" && qObj[`aboutpage_s4_faq${n}_header`].trim()) ||
        (typeof qObj[`aboutpage_s4_faq_header${n}`] === "string" && qObj[`aboutpage_s4_faq_header${n}`].trim()) ||
        "";
      const a =
        (typeof qObj[`aboutpage_s4_faq${n}_text`] === "string" && qObj[`aboutpage_s4_faq${n}_text`].trim()) ||
        (typeof qObj[`aboutpage_s4_faq_text${n}`] === "string" && qObj[`aboutpage_s4_faq_text${n}`].trim()) ||
        "";
      return q && a ? { q, a } : null;
    })
    .filter(Boolean);

  const span =
    (typeof qObj.aboutpage_s4_faq_span1 === "string" && qObj.aboutpage_s4_faq_span1.trim()) || "";

  return { items, span };
}


function procSlugForLocale(locale, procKey) {
  const s = String(procKey || "").toLowerCase().trim();
  if (!s) return "";
  // "natural" tek başına gelirse canonical yap
  if (s === "natural" || s === "dogal") {
    return locale.startsWith("tr") ? "dolgusuz-dogal" : "unfilled-natural";
  }
  // TR birleşik gelirse EN’e çevir, sonra tekrar TR'ye map et
  const [fillEn, pEn] = trCombinedToEn(s).split("-");
  if (locale.startsWith("tr")) {
    const fillTr = fillEn === "filled" ? "dolgulu" : "dolgusuz";
    const procTr = { honed:"honlanmis", polished:"cilali", brushed:"fircalanmis", tumbled:"eskitilmis", natural:"dogal" }[pEn] || pEn;
    return `${fillTr}-${procTr}`;
  }
  // EN
  return `${fillEn}-${pEn}`;
}

// ↑ dosyanın üst tarafına (helper’ların yanına) ekle
const VALID_PROCS_EN = new Set([
  "natural",
  "filled-honed","unfilled-honed",
  "filled-polished","unfilled-polished",
  "filled-brushed","unfilled-brushed",
  "filled-tumbled","unfilled-tumbled",
  "filled-natural","unfilled-natural",
]);

function normalizeProcEn(key) {
  const s = String(key || "").toLowerCase().trim();
  if (!s) return "";
  if (s === "dogal" || s === "natural") return "natural";
  // TR birleşik geldiyse EN’e çevir
  return trCombinedToEn(s);
}

function friendlyProcessLabelForLocale(procKey, locale) {
  const s = normalizeProcEn(procKey);           // "filled-polished" | "natural"
  if (!s) return "";
  if (s === "natural") return locale.startsWith("tr") ? "Dolgusuz · Doğal" : "Unfilled · Natural";
  const [fill, proc] = s.split("-");
  const fillTR = fill === "filled" ? "Dolgulu" : "Dolgusuz";
  const procTR = { honed:"Honlanmış", polished:"Cilalı", brushed:"Fırçalanmış", tumbled:"Eskitilmiş", natural:"Doğal" }[proc] || proc;
  const procEN = proc.charAt(0).toUpperCase() + proc.slice(1);
  const fillEN = fill.charAt(0).toUpperCase() + fill.slice(1);
  return locale.startsWith("tr") ? `${fillTR} · ${procTR}` : `${fillEN} · ${procEN}`;
}

function procSlugForLocale(locale, procKey) {
  const en = normalizeProcEn(procKey); // en canonical
  if (locale.startsWith("tr")) {
    if (en === "natural") return "dolgusuz-dogal";
    const [fill, p] = en.split("-");
    const fillTr = fill === "filled" ? "dolgulu" : "dolgusuz";
    const pTr = { honed:"honlanmis", polished:"cilali", brushed:"fircalanmis", tumbled:"eskitilmis", natural:"dogal" }[p] || p;
    return `${fillTr}-${pTr}`;
  }
  return en; // en slug
}

function colorsForProcess(procKeyEn) {
  const node = messages?.ProductPage?.[productKey]
    ?.cuts?.[cutKey]?.processes?.[procKeyEn];
  const cols = node?.colors && typeof node.colors === "object"
    ? Object.keys(node.colors)
    : [];
  return cols; // örn: ["ivory","light","antico"]
}

function pickColorForProcess(procKeyEn, preferNot = colorKey) {
  const list = colorsForProcess(procKeyEn);
  // mevcut sayfa rengi haric ilk uygun rengi tercih et
  const alt = list.find((c) => c && c !== preferNot);
  return alt || preferNot; // yoksa mevcut renk
}


// ↓ mevcut buildOtherProcessItems()’ı bununla değiştir
function buildOtherProcessItems() {
  if (isBlocks || !productKey || !cutKey || !colorKey) return [];

  const procDict = messages?.ProductPage?.[productKey]?.cuts?.[cutKey]?.processes || {};
  // Sadece geçerli process anahtarlarını al
  const allProcKeys = Object.keys(procDict).filter((k) => VALID_PROCS_EN.has(normalizeProcEn(k)));

  // bulunduğun işlemi çıkar
  const currentEn = normalizeProcEn(procKeyFull);
  const others = allProcKeys
    .filter((k) => normalizeProcEn(k) !== currentEn)
    .slice(0, 3);

  return others.map((otherProcKeyRaw) => {
    const otherProcKey = otherProcKeyRaw.toLowerCase();
    const node = procDict[otherProcKey] || {};

    // Başlık: process label + (opsiyonel renk)
    const procLabel = friendlyProcessLabelForLocale(otherProcKey, locale);
    const title = `${colorLabel} · ${procLabel}`;

    // Kısa açıklama: varsa node.lead/intro; yoksa sade fallback
    const text =
      (typeof node.lead === "string" && node.lead) ||
      (typeof node.intro === "string" && node.intro) ||
      (locale.startsWith("tr")
        ? "Bu işlem/yüzey için detayları görüntüleyin."
        : "View details for this finish/process.");

    // Görsel önceliği: aynı renk + diğer işlem thumb → global process thumb → mevcut hero
    const ck = combinedKeyFromProc(otherProcKey, locale);
    const colorThumb =
      IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[ck]?.[colorKey];
    const processThumb = PROCESS_THUMB_BY_COMBINED?.[ck];
    const img = colorThumb || processThumb || heroSrc;

    // Hedef rota: aynı product + cut + color, sadece process değişiyor
    const processSlugLocalized = procSlugForLocale(locale, otherProcKey);

    return {
      title,
      text,
      img,
      href: {
        pathname: "/travertine/[product]/[cut]/[process]/[color]",
        params: {
          product: productSlug,
          cut: cutSlug,
          process: processSlugLocalized,
          color: colorSlug,
        },
      },
    };
  });
}



  return (
    <main className="px-5 md:px-8 lg:px-0 py-10 mt-2 lg:mt-4">
      <Head>
        <title>{metaTitle}</title>
        {metaDesc ? <meta name="description" content={metaDesc} /> : null}
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroSrc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={heroSrc} />
      </Head>

     
     {/* Intro (başlık + hero) */}
  <ProductIntroSection
  title={H1}
  intro={intro}
  title2={H2}
  intro2={intro2}
  heroSrc={heroSrc}
  alt={H1}
  prefix={`/${locale}`}
  baseHref={`/${locale}/${baseFor(locale)}`}
  crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
  crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
  span=""
/>

  {/* Breadcrumbs (opsiyonel ama önerilir) */}
  <BreadcrumbsExact
  prefix={`/${locale}`}
  baseHref={`/${locale}/${baseFor(locale)}`}
  crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
  crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
  selectedSegments={(typeof window !== "undefined" ? window.location.pathname : "").split("/").filter(Boolean).slice(-1)}
  className="mt-4"
/>


  {/* Carousel + Sağ panel */}
<section className="mx-auto text-center flex flex-col items-center justify-center max-w-[1400px] w-[95%] mt-6">
  <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start w-full">
    <div className="w-[90%] lg:w-[45%] items-center justify-start flex">
      <EmblaCarousel images={getGallery()} altPrefix={H1} />
    </div>
    <div className="flex flex-col w-[90%] lg:w-[45%] gap-5">
      {specs?.rows?.length ? (
        <div className="space-y-4 text-start bg-white rounded-xl p-6 shadow-md">
          <SpecTable
            rows={specs.rows}
            title={specs.h2 || (locale.startsWith("tr") ? "Teknik Özellikler" : "Specifications")}
          />
        </div>
      ) : null}

      {/* (isteğe bağlı) Sağ panelde kalınlık seçim kartını burada tutabilirsiniz */}
      {/* mevcut selected/sizeSlugs mantığınız bozulmaz */}

      <SocialBlock />
    </div>
  </div>
</section>

{/* Finishes & Export kartları */}
{(finishesItems.length || exportItems.length) ? (
  <section className="max-w-[1400px] w-[95%] mx-auto mt-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {finishesItems.length ? <InfoListCard title={finishesTitle} items={finishesItems} prefix={`/${locale}`} /> : null}
      {exportItems.length   ? <InfoListCard title={exportTitle}   items={exportItems}   prefix={`/${locale}`} /> : null}
    </div>
  </section>
) : null}

{/* Uzun metin başlıkları */}
{(title3 || title4 || title5) && (
  <section className="w-[90%] md:w-[80%] max-w-[1400px] mx-auto text-center">
    {title3 ? (<><h3 className="text-[20px] lg:text-[22px] font-bold mt-6">{title3}</h3>{text3 ? <p className="text-[12px] lg:text-[14px]">{text3}</p> : null}</>) : null}
    {title4 ? (<><h4 className="text-[20px] lg:text-[22px] font-bold mt-5">{title4}</h4>{text4 ? <p className="text-[12px] lg:text-[14px]">{text4}</p> : null}</>) : null}
    {title5 ? (<><h5 className="text-[20px] lg:text-[22px] font-bold mt-5">{title5}</h5>{text5 ? <p className="text-[12px] lg:text-[14px]">{text5}</p> : null}</>) : null}
  </section>
)}

{/* FAQ (zaten mevcut çıkarımını kullanıyoruz) */}
{faqItems.length > 0 && (
   <div id="faq" className="max-w-5xl mx-auto mt-12">
     <QuestionsSection items={faqItems} span={faqSpan || H1} />
   </div>
 )}

<SocialMediaSection/>

<ContactFrom />

{/* OtherOptions: mevcut locale-aware resolveHref ile */}
<OtherOptions
  locale={locale}
  heading={locale.startsWith("tr") ? "Diğer İşlemler" : "Other Processes"}
  customItems={buildOtherProcessItems()}
/>


    </main>
  );
}