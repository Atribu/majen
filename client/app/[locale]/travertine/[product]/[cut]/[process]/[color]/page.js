"use client";

import React from "react";
import Head from "next/head";
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

import {
  PRODUCT_LABEL,
  CUT_LABEL,
  colorLabelForLocale,
  procSlugForLocale
} from "@/lib/labels";

import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import EmblaCarousel from "@/app/[locale]/components/generalcomponent/EmblaCarousel";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";
import BreadcrumbsExact from "@/app/[locale]/components/generalcomponent/BreadcrumbsExact";
import SpecTable from "@/app/[locale]/travertine/blocks/[color]/SpecTable";
import InfoListCard from "@/app/[locale]/travertine/blocks/[color]/InfoListCard";
import SocialBlock from "@/app/[locale]/travertine/blocks/[color]/SocialBlock";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";

// ---------- utils ----------
const safe = (fn, fb = null) => { try { const v = fn(); return v ?? fb; } catch { return fb; } };

// TR birleşik → EN birleşik
function trCombinedToEn(procKey = "") {
  const s = String(procKey).toLowerCase().trim();
  if (!s) return s;
  if (s === "dogal") return "natural";
  const [fillRaw, procRaw] = s.split("-");
  const fill = { dolgulu:"filled", dolgusuz:"unfilled", filled:"filled", unfilled:"unfilled" }[fillRaw] || fillRaw;
  const proc = {
    honlanmis:"honed", cilali:"polished", fircalanmis:"brushed", eskitilmis:"tumbled",
    honed:"honed", polished:"polished", brushed:"brushed", tumbled:"tumbled"
  }[procRaw] || procRaw;
  return `${fill}-${proc}`;
}
function normalizeProcEn(key) {
  const s = String(key || "").toLowerCase().trim();
  if (!s) return "";
  if (s === "dogal" || s === "natural") return "natural";
  return trCombinedToEn(s);
}
function friendlyProcessLabelForLocale(procKey, locale) {
  const s = normalizeProcEn(procKey);
  if (!s) return "";
  if (s === "natural") return locale.startsWith("tr") ? "Dolgusuz · Doğal" : "Unfilled · Natural";
  const [fill, proc] = s.split("-");
  const fillTR = fill === "filled" ? "Dolgulu" : "Dolgusuz";
  const procTR = { honed:"Honlanmış", polished:"Cilalı", brushed:"Fırçalanmış", tumbled:"Eskitilmiş" }[proc] || proc;
  const procEN = proc.charAt(0).toUpperCase() + proc.slice(1);
  const fillEN = fill.charAt(0).toUpperCase() + fill.slice(1);
  return locale.startsWith("tr") ? `${fillTR} · ${procTR}` : `${fillEN} · ${procEN}`;
}
// tiles size slug normalize (örn. 12"×24" → 12x24)
function normalizeTileSizeSlug(raw) {
  if (!raw) return null;
  let s = String(raw).trim().toLowerCase();
  s = s.replace(/["“”]/g, "").replace(/[×x]/g, "x").replace(/\s+/g, "");
  const MAP = new Map([
    ["8x8","8x8"],["12x12","12x12"],["12x24","12x24"],["16x16","16x16"],
    ["18x18","18x18"],["24x24","24x24"],["24x48","24x48"],["48x110","48x110"],
    ["versailles","versailles-set"],["versailles-set","versailles-set"]
  ]);
  if (MAP.has(s)) return MAP.get(s);
  const m = s.match(/^(\d{1,3})x(\d{1,3})$/);
  return m ? `${m[1]}x${m[2]}` : null;
}
function combinedKeyFromProc(proc = "", locale = "en") {
  const s = String(proc).toLowerCase().trim();
  if (!s) return null;
  if (s === "natural" || s === "dogal") return "natural";
  const fillMap = { dolgulu:"filled", dolgusuz:"unfilled", filled:"filled", unfilled:"unfilled" };
  const procMap = {
    honlanmis:"honed", cilali:"polished", fircalanmis:"brushed", eskitilmis:"tumbled",
    honed:"honed", polished:"polished", brushed:"brushed", tumbled:"tumbled"
  };
  const [fillRaw, procRaw] = s.split("-");
  const fill = fillMap[fillRaw] || fillRaw;
  const p    = procMap[procRaw] || procRaw;
  return `${fill}:${p}`; // PROCESS_THUMB_BY_COMBINED’de ":" ile indexleniyor
}

// OtherOptions yardımcıları
const TOPOLOGICAL_ORDER = [
  "unfilled-natural", "filled-natural",
  "unfilled-honed",   "filled-honed",
  "unfilled-polished","filled-polished",
  "unfilled-brushed", "filled-brushed",
  "unfilled-tumbled", "filled-tumbled",
];
const VALID_PROCS_EN = new Set([
  "natural",
  "filled-honed","unfilled-honed",
  "filled-polished","unfilled-polished",
  "filled-brushed","unfilled-brushed",
  "filled-tumbled","unfilled-tumbled",
  "filled-natural","unfilled-natural",
]);
function toDisplayKey(procEn) {
  const s = normalizeProcEn(procEn);
  return s === "natural" ? "unfilled-natural" : s;
}
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
function dedup(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) { if (x && !seen.has(x)) { seen.add(x); out.push(x); } }
  return out;
}

// ---------- PAGE ----------
export default function ColorDetailPage() {
  const { product: productSlug, cut: cutSlug, process: processSlug, color: leafSlugFromRoute } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");
  const messages = useMessages();

  const productKey = productKeyFromSlug(locale, String(productSlug));
  const isTiles  = productKey === "tiles";
  const isBlocks = productKey === "blocks";

  // array ise ilk dolu elemanı al; değilse aynen döndür
const pickFirst = (v) => Array.isArray(v) ? v.find(Boolean) : v;


  const cutKey = isBlocks ? null
    : (Object.keys(CUTS[lang] || {}).find((k) => CUTS[lang][k] === String(cutSlug)) || "vein-cut");

  const procKeyFull = isBlocks ? "" : String(processSlug || "").toLowerCase();

  // ---- LEAF (color | size)
  const leafSlugRaw = String(leafSlugFromRoute || "").toLowerCase();
  const colorKey = !isTiles
    ? (COLOR_KEY_BY_SLUG && (COLOR_KEY_BY_SLUG )[leafSlugRaw]) || leafSlugRaw
    : null;
  const sizeKey  = isTiles ? normalizeTileSizeSlug(leafSlugRaw) : null;

  const LEAF_KEY   = isTiles ? sizeKey : colorKey;
  const LEAF_LABEL = isTiles ? sizeLabelFromSlug(sizeKey || "") : colorLabelFor(locale, colorKey || "");

  // ---- Hash → selected (kalınlık/size filtresi vs.)
  const sizeSlugs = sizeSlugListForProduct(productKey, t);
  const hashValue = typeof window !== "undefined" ? decodeURIComponent(window.location.hash.replace(/^#/, "")) : "";
  const initialFromHash = hashValue && sizeSlugs.includes(hashValue) ? hashValue : (sizeSlugs[0] || "");
  const [selected, setSelected] = React.useState(initialFromHash);
  React.useEffect(() => {
    const onHashChange = () => {
      const v = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (v && sizeSlugs.includes(v)) setSelected(v);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [sizeSlugs]);

  // ---- Guards
  if (!productKey || (!procKeyFull && !isBlocks)) {
    return <main className="p-10 text-center text-neutral-500">Loading...</main>;
  }
  if (isTiles && !sizeKey) {
    return <main className="p-10 text-center text-neutral-500">Invalid size</main>;
  }
  if (!isTiles && !colorKey && !isBlocks) {
    return <main className="p-10 text-center text-neutral-500">Invalid color</main>;
  }

  // ---- JSON’dan sayfa düğümü
  const lookupProcKey = locale.startsWith("tr") ? trCombinedToEn(procKeyFull) : procKeyFull;

  let page = null;
  if (isBlocks) {
    page = messages?.ProductPage?.[productKey]?.colors?.[colorKey || ""] || null;
  } else {
    const LEAF_NODE = isTiles ? "sizes" : "colors";
    page = messages?.ProductPage?.[productKey]
            ?.cuts?.[cutKey ]
            ?.processes?.[procKeyFull]
            ?.[LEAF_NODE]?.[LEAF_KEY ] || null;

    if (!page && locale.startsWith("tr")) {
      page = messages?.ProductPage?.[productKey]
              ?.cuts?.[cutKey ]
              ?.processes?.[lookupProcKey]
              ?.[LEAF_NODE]?.[LEAF_KEY ] || null;
    }
  }

  // ---- UI metinleri
  const chooseThicknessLabel = page?.ui?.chooseThickness || (locale.startsWith("tr") ? "Kalınlık Seç" : "Choose Thickness");
  const specsLabel           = page?.ui?.specsLabel || (locale.startsWith("tr") ? "Teknik Özellikler" : "Specifications");

  let processLabel = "";
  if (!isBlocks) {
    processLabel =
      messages?.ProductPage?.[productKey]?.cuts?.[cutKey]?.processes?.[procKeyFull]?.title
      || (locale.startsWith("tr")
          ? messages?.ProductPage?.[productKey]?.cuts?.[cutKey]?.processes?.[lookupProcKey]?.title
          : null)
      || procKeyFull.replace(/-/g, " ");
  }

  const H1        = page?.h1 || (isBlocks ? `${LEAF_LABEL}` : `${LEAF_LABEL} · ${processLabel}`);
  const H2        = page?.title || (isBlocks ? `${LEAF_LABEL}` : `${LEAF_LABEL} · ${processLabel}`);
  const intro     = page?.intro || "";
  const intro2    = page?.intro2 || "";
  const metaTitle = page?.metaTitle || H1;
  const metaDesc  = page?.metaDesc  || intro;

  // ---- Görseller / Galeri: PRIMARY → sadece colorThumbs[] varsa onu kullan
const combinedKey = isBlocks ? null : combinedKeyFromProc(procKeyFull, locale);

const galleryPrimaryValue =
  (!isBlocks && combinedKey)
    ? IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[combinedKey]?.[LEAF_KEY]
    : null;

    const galleryPrimary = toArray(galleryPrimaryValue);

  // Fallback listesi (yalnızca primary yoksa devreye girsin)
const fallbackList = dedup([
  ...toArray(!isTiles ? (IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[leafSlugRaw]
                         ?? IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorKey]) : null),
  ...toArray((!isBlocks && combinedKey) ? PROCESS_THUMB_BY_COMBINED?.[combinedKey] : null),
  ...toArray(!isBlocks ? IMAGE_BY_PRODUCT?.[productKey]?.[cutKey] : null),
  ...toArray(IMAGE_BY_PRODUCT?.[productKey]?.cover),
  "/images/homepage/antikoarkplan.webp",
]);

const gallery = galleryPrimary.length ? galleryPrimary : fallbackList;
const heroSrc = (page?.hero?.src) || gallery[0];

  // ---- Canonical
  const baseSegment = baseFor(locale);
  const canonical = isBlocks
    ? `https://www.majen.com.tr/${locale}/${leafSlugRaw}-${(locale.startsWith("tr") ? "traverten-bloklar" : "travertine-blocks")}`
    : `https://www.majen.com.tr/${locale}/${leafSlugRaw}-${processSlug}-${cutSlug}`;

  // ---- Sections
  const sections = page?.sections || {};
  const apps  = sections.applications;
  const specs = sections.specs;

  // ---- FAQ çıkar
  const { items: faqItems, span: faqSpan } = (function extractFaqFromPage(pageNode) {
    if (!pageNode || typeof pageNode !== "object") return { items: [], span: "" };
    const qObj = pageNode?.QuestionsItems;
    if (!qObj || typeof qObj !== "object") return { items: [], span: "" };
    const idxSet = new Set();
    for (const k of Object.keys(qObj)) {
      let m = k.match(/^aboutpage_s4_faq(\d+)_(header|text)$/i);
      if (m) { idxSet.add(Number(m[1])); continue; }
      m = k.match(/^aboutpage_s4_faq_(header|text)(\d+)$/i);
      if (m) { idxSet.add(Number(m[2])); }
    }
    const items = Array.from(idxSet)
      .sort((a,b)=>a-b)
      .map((n) => {
        const q =
          (typeof qObj[`aboutpage_s4_faq${n}_header`] === "string" && qObj[`aboutpage_s4_faq${n}_header`].trim()) ||
          (typeof qObj[`aboutpage_s4_faq_header${n}`] === "string" && qObj[`aboutpage_s4_faq_header${n}`].trim()) || "";
        const a =
          (typeof qObj[`aboutpage_s4_faq${n}_text`] === "string" && qObj[`aboutpage_s4_faq${n}_text`].trim()) ||
          (typeof qObj[`aboutpage_s4_faq_text${n}`] === "string" && qObj[`aboutpage_s4_faq_text${n}`].trim()) || "";
        return q && a ? { q, a } : null;
      })
      .filter(Boolean) ;
    const span =
      (typeof qObj.aboutpage_s4_faq_span1 === "string" && qObj.aboutpage_s4_faq_span1.trim()) || "";
    return { items, span };
  })(page);

  // ---- OtherOptions (aynı leaf ile process değiştir)
  function colorsForProcess(procKeyEn) {
    const node = messages?.ProductPage?.[productKey]
      ?.cuts?.[cutKey]?.processes?.[procKeyEn];
    return node?.colors && typeof node.colors === "object"
      ? Object.keys(node.colors)
      : [];
  }
  function buildOtherProcessItems() {
    if (isBlocks || !productKey || !cutKey || !LEAF_KEY) return [];
    const procDict = messages?.ProductPage?.[productKey]?.cuts?.[cutKey]?.processes || {};
    const currentDisplay = toDisplayKey(procKeyFull);

    const candidates= [];
    const seenDisplay = new Set();
    for (const rawKey of Object.keys(procDict)) {
      const en = normalizeProcEn(rawKey);
      if (!VALID_PROCS_EN.has(en)) continue;
      const displayKey = toDisplayKey(en);
      if (displayKey === currentDisplay) continue;
      if (seenDisplay.has(displayKey)) continue;
      seenDisplay.add(displayKey);
      candidates.push({ rawKey, en, displayKey });
    }
    candidates.sort((a,b) =>
      (TOPOLOGICAL_ORDER.indexOf(a.displayKey) >>> 0) -
      (TOPOLOGICAL_ORDER.indexOf(b.displayKey) >>> 0)
    );

    const items=[];
    for (const { rawKey, en, displayKey } of candidates) {
      if (items.length >= 3) break;
      const node = procDict[rawKey] || procDict[en] || {};
      const procLabel = friendlyProcessLabelForLocale(displayKey, locale);
      const title = `${LEAF_LABEL} · ${procLabel}`;
      const ck = combinedKeyFromProc(displayKey, locale);

      const colorForCard = !isTiles
        ? (colorsForProcess(en).includes("ivory") ? "ivory" : (colorsForProcess(en)[0] || "ivory"))
        : null;

      const img = isTiles
        ? (PROCESS_THUMB_BY_COMBINED?.[ck ] || heroSrc)
        : (IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey ]?.[ck ]?.[colorForCard ]
            || IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorForCard ]
            || PROCESS_THUMB_BY_COMBINED?.[ck ]
            || heroSrc);

      const processSlugLocalized = procSlugForLocale(locale, displayKey);

      items.push({
        title,
        text: (node.lead || node.intro || (locale.startsWith("tr") ? "Bu yüzey için detayları görüntüleyin." : "View details for this finish/process.")),
        img,
        href: {
          pathname: "/travertine/[product]/[cut]/[process]/[color]",
          params: {
            product: productSlug,
            cut:     cutSlug,
            process: processSlugLocalized,
            color:   leafSlugRaw, // tiles’ta size; slabs’ta color
          },
        },
      });
    }
    return items;
  }

  // ---- Breadcrumbs
  const prefix = `/${locale}`;
  const baseHref = `${prefix}/${baseFor(locale)}`;
  const pathnameBreadcrumbs = typeof pathname === "string" ? pathname : "";
  const segments = pathnameBreadcrumbs.split("/").filter(Boolean);
  const selectedSegments = segments.slice(-1);

  const productLabel = PRODUCT_LABEL[lang]?.[productKey] || productSlug;
  const cutLabel     = CUT_LABEL[lang]?.[cutKey ] || (cutKey );
  const processLabelLocalized = friendlyProcessLabelForLocale(procKeyFull, locale);

  const items = [
    { label: locale.startsWith("tr") ? "Traverten" : "Travertine", href: `/${locale}/${baseFor(locale)}` },
    { label: productLabel, href: `/${locale}/${baseFor(locale)}/${productSlug}` },
    !isBlocks ? { label: cutLabel, href: `/${locale}/${baseFor(locale)}/${productSlug}/${cutSlug}` } : null,
    !isBlocks ? { label: processLabelLocalized, href: `/${locale}/${baseFor(locale)}/${productSlug}/${cutSlug}/${processSlug}` } : null,
    { label: LEAF_LABEL, href: `/${locale}/${baseFor(locale)}/${productSlug}${!isBlocks ? `/${cutSlug}/${processSlug}` : ""}/${leafSlugRaw}` },
  ].filter(Boolean) ;

  // ---- Finishes / Export
  const finishesNode = page?.finishes || {};
  const exportNode   = page?.export  || {};
  const finishesItems = [finishesNode.list1, finishesNode.list2, finishesNode.list3, finishesNode.list4].filter(Boolean);
  const exportItems   = [exportNode.list1,   exportNode.list2,   exportNode.list3,   exportNode.list4].filter(Boolean);
  const finishesTitle = finishesNode.title || (locale.startsWith("tr") ? "Yüzey İşlemleri" : "Finishes & Processing Options");
  const exportTitle   = exportNode.title   || (locale.startsWith("tr") ? "İhracat & Paketleme" : "Export, Packaging & Shipping");

  const title3 = page?.h3, text3 = page?.text3;
  const title4 = page?.h4, text4 = page?.text4;
  const title5 = page?.h5, text5 = page?.text5;

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

      <BreadcrumbsExact
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        selectedSegments={selectedSegments}
        className="mt-6"
        items={items}
      />

      {/* Carousel + Sağ panel */}
      <section className="mx-auto text-center flex flex-col items-center justify-center max-w-[1400px] w-[95%] mt-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start w-full">
          <div className="w-[90%] lg:w-[45%] items-center justify-start flex">
            <EmblaCarousel images={gallery} altPrefix={H1} />
          </div>
          <div className="flex flex-col w-[90%] lg:w-[45%] gap-5">
            {specs?.rows?.length ? (
              <div className="space-y-4 text-start bg-white rounded-xl p-6 shadow-md">
                <SpecTable
                  rows={specs.rows}
                  title={specs.h2 || specsLabel}
                />
              </div>
            ) : null}
            <SocialBlock />
          </div>
        </div>
      </section>

      {/* Finishes & Export */}
      {(finishesItems.length || exportItems.length) ? (
        <section className="max-w-[1400px] w-[95%] mx-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finishesItems.length ? <InfoListCard title={finishesTitle} items={finishesItems} prefix={`/${locale}`} /> : null}
            {exportItems.length   ? <InfoListCard title={exportTitle}   items={exportItems}   prefix={`/${locale}`} /> : null}
          </div>
        </section>
      ) : null}

      {/* Uzun metin bölümleri */}
      {(title3 || title4 || title5) && (
        <section className="w-[90%] md:w-[80%] max-w-[1400px] mx-auto text-center">
          {title3 ? (<><h3 className="text-[20px] lg:text-[22px] font-bold mt-6">{title3}</h3>{text3 ? <p className="text-[12px] lg:text-[14px]">{text3}</p> : null}</>) : null}
          {title4 ? (<><h4 className="text-[20px] lg:text-[22px] font-bold mt-5">{title4}</h4>{text4 ? <p className="text-[12px] lg:text-[14px]">{text4}</p> : null}</>) : null}
          {title5 ? (<><h5 className="text-[20px] lg:text-[22px] font-bold mt-5">{title5}</h5>{text5 ? <p className="text-[12px] lg:text-[14px]">{text5}</p> : null}</>) : null}
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <div id="faq" className="max-w-5xl mx-auto mt-12">
          <QuestionsSection items={faqItems} span={faqSpan || H1} />
        </div>
      )}

      <SocialMediaSection/>
      <ContactFrom />

      {/* Other processes */}
      <OtherOptions
        locale={locale}
        heading={locale.startsWith("tr") ? "Diğer İşlemler" : "Other Processes"}
        customItems={buildOtherProcessItems()}
      />
    </main>
  );
}
