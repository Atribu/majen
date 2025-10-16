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

  // 1) Modern dizi şeması: sections.faq.items: [{ q, a }]
  const arr = Array.isArray(page?.sections?.faq?.items)
    ? page.sections.faq.items
    : null;
  if (arr && arr.length) {
    const items = arr
      .filter(it => it && typeof it.q === "string" && typeof it.a === "string")
      .map(it => ({ q: it.q.trim(), a: it.a.trim() }))
      .filter(it => it.q && it.a);
    const span =
      page?.sections?.faq?.span ||
      page?.QuestionsItems?.aboutpage_s4_faq_span1 ||
      "";
    return { items, span };
  }

  // 2) Legacy/flat şema: QuestionsItems objesi
  const qItems = page?.QuestionsItems || {};
  if (!qItems || typeof qItems !== "object") {
    return { items: [], span: "" };
  }

  // İki düzeni de tara:
  //  - aboutpage_s4_faq1_header / aboutpage_s4_faq1_text
  //  - aboutpage_s4_faq_header1 / aboutpage_s4_faq_text1
  const pairs = [];
  for (const key of Object.keys(qItems)) {
    let idx = null;
    let kind = null;

    // Düzen A
    let m = key.match(/aboutpage_s4_faq(\d+)_(header|text)$/i);
    if (m) {
      idx = Number(m[1]);
      kind = m[2].toLowerCase();
    } else {
      // Düzen B
      m = key.match(/aboutpage_s4_faq_(header|text)(\d+)$/i);
      if (m) {
        kind = m[1].toLowerCase();
        idx = Number(m[2]);
      }
    }
    if (!idx || !kind) continue;

    const val = qItems[key];
    if (typeof val !== "string") continue;

    let slot = pairs.find(p => p.idx === idx);
    if (!slot) {
      slot = { idx };
      pairs.push(slot);
    }
    slot[kind] = val.trim();
  }

  const items = pairs
    .sort((a, b) => a.idx - b.idx)
    .filter(p => p.header && p.text)
    .map(p => ({ q: p.header, a: p.text }));

  const span =
    qItems.aboutpage_s4_faq_span1 ||
    page?.sections?.faq?.span ||
    "";

  return { items, span };
}



  return (
    <main className="px-5 md:px-8 lg:px-0 py-10 mt-14">
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
  heading={locale.startsWith("tr") ? "Diğer Seçenekler" : "Other Options"}
  customItems={[
    {
      title: locale.startsWith("tr") ? "Plakalar • Damar Kesim" : "Slabs • Vein-Cut",
      text:  locale.startsWith("tr") ? "Damar yönünde kesimle çizgisel görünüm." : "Linear look with vein direction.",
      img:   IMAGE_BY_PRODUCT?.slabs?.[cutKey] || heroSrc,
      href:  { pathname: "/travertine/[product]/[cut]", params: { product: "slabs", cut: "vein-cut" } },
    },
    {
      title: locale.startsWith("tr") ? "Plakalar • Enine Kesim" : "Slabs • Cross-Cut",
      text:  locale.startsWith("tr") ? "Bulutumsu, mozaik görünüm." : "Cloudy, mosaic-like pattern.",
      img:   IMAGE_BY_PRODUCT?.slabs?.[cutKey] || heroSrc,
      href:  { pathname: "/travertine/[product]/[cut]", params: { product: "slabs", cut: "cross-cut" } },
    },
    {
      title: locale.startsWith("tr") ? "Karolar • Damar Kesim" : "Tiles • Vein-Cut",
      text:  locale.startsWith("tr") ? "Proje ölçülerine göre kesim." : "Cut-to-size options.",
      img:   IMAGE_BY_PRODUCT?.tiles?.[cutKey] || heroSrc,
      href:  { pathname: "/travertine/[product]/[cut]", params: { product: "tiles", cut: "vein-cut" } },
    },
  ]}
/>


    </main>
  );
}