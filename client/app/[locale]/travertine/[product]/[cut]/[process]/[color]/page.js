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
import Image from "next/image";

/* ---------------- utils ---------------- */
const safe = (fn, fb = null) => { try { const v = fn(); return v ?? fb; } catch { return fb; } };

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
const toDisplayKey = (procEn) => (normalizeProcEn(procEn) === "natural" ? "unfilled-natural" : normalizeProcEn(procEn));
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const dedup = (arr) => { const s = new Set(); const out=[]; for (const x of arr) if (x && !s.has(x)) { s.add(x); out.push(x); } return out; };

/* ---------------- PAGE ---------------- */
export default function ColorDetailPage() {
  const { product: productSlug, cut: cutSlug, process: processSlug, color: leafSlugFromRoute } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");
  const messages = useMessages();

  const productKey = productKeyFromSlug(locale, String(productSlug));
    const isBlocks = productKey === "blocks";
    const isSlabs  = productKey === "slabs";
    const isTiles  = productKey === "tiles";
    const isPavers  = productKey === "pavers";
    const isSizedProduct = isTiles || isPavers;

    const pickFirst = (v) => (Array.isArray(v) ? v[0] : v ?? null);


function normalizePaverSizeSlug(raw) {
  if (!raw) return null;
  let s = String(raw).trim().toLowerCase();
  s = s.replace(/["“”]/g, "").replace(/[×x]/g, "x").replace(/\s+/g, "");
  if (s === "versailles") return "versailles-set";
  return s;
}



          function cutSlugForProduct(locale, cutKey, productKey) {
          const base = (CUTS[getLang(locale)] || {})[cutKey] || cutKey; // örn: 'vein-cut-travertine-slabs'
          if (typeof base !== "string") return cutKey;
          if (locale.startsWith("en")) {
              if (productKey === "slabs")             return base.replace(/-travertine-slabs$/i, "-travertine-slabs");
            if (productKey === "tiles")            return base.replace(/-travertine-slabs$/i, "-travertine-tiles");
            if (productKey === "blocks")           return base.replace(/-travertine-slabs$/i, "-travertine-blocks");
            if (productKey === "pavers")  return base.replace(/-travertine-slabs$/i, "-travertine-pavers");
            return base; // slabs
          }
          // TR dönüşümleri
          if (productKey === "slabs")             return base.replace(/-traverten-plakalar$/i, "-traverten-plakalar");
          if (productKey === "tiles")            return base.replace(/-traverten-plakalar$/i, "-traverten-karolar");
          if (productKey === "blocks")           return base.replace(/-traverten-plakalar$/i, "-traverten-bloklar");
          if (productKey === "pavers")  return base.replace(/-traverten-plakalar$/i, "-traverten-dosemeler");
          return base; // plakalar (slabs)
        }

      function resolveCutKey(locale, productKey, cutSlug) {
      const target = String(cutSlug || "").toLowerCase().trim();
      const lang = getLang(locale);
      const cuts = CUTS[lang] || {};
    
      // 1) Ürün tipine göre gerçek slug'ı üretip birebir karşılaştır
      for (const k of Object.keys(cuts)) {
        const candidate = String(
          cutSlugForProduct(locale, k, productKey) // ⬅️ zaten dosyada tanımlı
        ).toLowerCase();
        if (candidate === target) return k;
      }
    
      // 2) Eski "slabs" tabanlı kayda karşılaştır (geriye dönük güvence)
      for (const k of Object.keys(cuts)) {
        const base = String(cuts[k] || "").toLowerCase();
        if (base === target) return k;
      }
    
      // 3) Heuristik (son çare)
      if (/vein|damar/.test(target)) return "vein-cut";
      if (/cross|yatay/.test(target)) return "cross-cut";
      return "vein-cut";
    }

  // Anahtarlar
 const cutKey = resolveCutKey(locale, productKey, cutSlug);

  const procKeyFull = isBlocks ? "" : String(processSlug || "").toLowerCase();
  const leafSlugRaw = String(leafSlugFromRoute || "").toLowerCase();
  const colorKey = !isTiles ? (COLOR_KEY_BY_SLUG?.[leafSlugRaw] || leafSlugRaw) : null;
  const sizeKey =
  isTiles
    ? normalizeTileSizeSlug(leafSlugRaw)
    : isPavers
      ? normalizePaverSizeSlug(leafSlugRaw)
      : null;
  const combinedKey = isBlocks ? null : combinedKeyFromProc(procKeyFull, locale);

  /* 🔹 HOOKLAR — daima en üstte ve koşulsuz (Hata Çözümü: Koşullu Hook Çağrımı) */
  const sizeSlugs = sizeSlugListForProduct(productKey, t);
  const hashValue = typeof window !== "undefined" ? decodeURIComponent(window.location.hash.replace(/^#/, "")) : "";
  const initialFromHash = hashValue && sizeSlugs.includes(hashValue) ? hashValue : (sizeSlugs[0] || "");
  const [selected, setSelected] = React.useState(initialFromHash);

  // tiles renk seçimi
  const COLOR_CHOICES = ["ivory", "light", "antico"];
  const [selectedColor, setSelectedColor] = React.useState("ivory");

  // tiles renk → görsel listesi (React.useCallback ile sarıldı)
const imagesForColor = React.useCallback((colorKeyEn) => {
  // Sadece tiles + geçerli process + size varsa çalışsın
  if (!isTiles || !combinedKey || !sizeKey) return [];

  // 🔴 tiles için asıl kaynak: cut + process + size + color
  const fromColorByProcess =
    IMAGE_BY_PRODUCT?.[productKey]
      ?.colorThumbs?.[cutKey]
      ?. [combinedKey]
      ?. [sizeKey]
      ?. [colorKeyEn];

  // fallback’ler (renk/ürün genel görselleri)
  const fromVariant =
    IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorKeyEn] ??
    IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[
      colorLabelFor(locale, colorKeyEn)?.toLowerCase?.()
    ];

  const fallbacks = dedup([
    ...toArray(fromVariant),
    ...toArray(PROCESS_THUMB_BY_COMBINED?.[combinedKey]),
    ...toArray(IMAGE_BY_PRODUCT?.[productKey]?.[cutKey]),
    ...toArray(IMAGE_BY_PRODUCT?.[productKey]?.cover),
  ]);

  const primary = toArray(fromColorByProcess);
  return primary.length ? primary : fallbacks;
}, [isTiles, combinedKey, productKey, cutKey, sizeKey, locale]);


  // colorImagesMap ve firstAvailableColor'ı useMemo ile hesaplayın (Uyarı Çözümü: Karmaşık İfade)
  const colorImagesMap = React.useMemo(() => 
    Object.fromEntries(COLOR_CHOICES.map((k) => [k, imagesForColor(k)]))
  , [COLOR_CHOICES, imagesForColor]);

  const firstAvailableColor = React.useMemo(() => 
    COLOR_CHOICES.find((k) => (colorImagesMap[k] || []).length > 0) || COLOR_CHOICES[0]
  , [COLOR_CHOICES, colorImagesMap]);

  // Hash değişimi için useEffect
  React.useEffect(() => {
    const onHashChange = () => {
      const v = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (v && sizeSlugs.includes(v)) setSelected(v);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [sizeSlugs]);

  // Renk seçimi için useEffect (Hata ve Uyarı Çözümü: Eksik Bağımlılıklar)
  React.useEffect(() => {
    if (!isTiles) return;
    
    // Yalnızca ilk yüklemede, mevcut seçili renk geçersizse güncelle
    setSelectedColor((prev) => {
      // Eğer prev rengi COLOR_CHOICES içinde değilse VEYA o renk için görsel yoksa
      if (!COLOR_CHOICES.includes(prev) || !(colorImagesMap[prev]?.length)) {
        return firstAvailableColor;
      }
      return prev;
    });

  }, [isTiles, firstAvailableColor, COLOR_CHOICES, colorImagesMap]);
  /* ---------------- HOOKLAR BİTTİ ---------------- */

  /* 🔹 Guard tek yerden */
  const guardMessage =
    (!productKey || (!procKeyFull && !isBlocks)) ? "Loading..." :
    (isTiles && !sizeKey) ? "Invalid size" :
    (!isTiles && !colorKey && !isBlocks) ? "Invalid color" :
    null;

  if (guardMessage) {
    return <main className="p-10 text-center text-neutral-500">{guardMessage}</main>;
  }

  /* ---- JSON / labels ---- */
  const lookupProcKey = locale.startsWith("tr") ? trCombinedToEn(procKeyFull) : procKeyFull;

let page = null;

if (isBlocks) {
  page = messages?.ProductPage?.[productKey]?.colors?.[colorKey || ""] || null;
} else {
  const LEAF_NODE = isSizedProduct ? "sizes" : "colors";
  // tiles → sizeKey, pavers → sizeKey (normalizePaverSizeSlug), slabs → colorKey
  const leafId = isSizedProduct ? sizeKey : colorKey;

  page =
    messages?.ProductPage?.[productKey]
      ?.cuts?.[cutKey]
      ?.processes?.[procKeyFull]
      ?.[LEAF_NODE]
      ?.[leafId] || null;

  // TR process adıyla yazdıysan fallback
  if (!page && locale.startsWith("tr")) {
    page =
      messages?.ProductPage?.[productKey]
        ?.cuts?.[cutKey]
        ?.processes?.[lookupProcKey]
        ?.[LEAF_NODE]
        ?.[leafId] || null;
  }
}


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

  const LEAF_KEY   = isTiles ? sizeKey : colorKey;
  const LEAF_LABEL = isTiles ? sizeLabelFromSlug(sizeKey || "") : colorLabelFor(locale, colorKey || "");

  const H1         = page?.h1 || (isBlocks ? `${LEAF_LABEL}` : `${LEAF_LABEL} · ${processLabel}`);
  const H2         = page?.title || (isBlocks ? `${LEAF_LABEL}` : `${LEAF_LABEL} · ${processLabel}`);
  const intro      = page?.intro || "";
  const intro2     = page?.intro2 || "";
  const metaTitle = page?.metaTitle || H1;
  const metaDesc  = page?.metaDesc  || intro;

  /* ---- Görseller ---- */
  // combinedKey zaten yukarıda hesaplandı
  
let galleryPrimaryValue = null;

if (!isBlocks && combinedKey) {
  if (isTiles && sizeKey && selectedColor) {
    // 🔴 Tiles: size + color
    galleryPrimaryValue =
      IMAGE_BY_PRODUCT?.[productKey]
        ?.colorThumbs?.[cutKey]
        ?. [combinedKey]
        ?. [sizeKey]
        ?. [selectedColor] || null;
  } else {
    // Slabs / pavers / blocks: eski davranış
    galleryPrimaryValue =
      IMAGE_BY_PRODUCT?.[productKey]
        ?.colorThumbs?.[cutKey]
        ?. [combinedKey]
        ?. [LEAF_KEY] || null;
  }
}

const galleryPrimary = toArray(galleryPrimaryValue);


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

  // imagesForColor, useMemo ve useCallback ile yukarı taşındı.
  const imagesForCarousel = isTiles ? (colorImagesMap[selectedColor] || gallery) : gallery;

  /* ---- Canonical ---- */
  const baseSegment = baseFor(locale);
  // const canonical = isBlocks
  //   ? `https://majen.com.tr/${locale}/${leafSlugRaw}-${(locale.startsWith("tr") ? "traverten-bloklar" : "travertine-blocks")}`
  //   : `https://majen.com.tr/${locale}/${leafSlugRaw}-${processSlug}-${cutSlug}`;

  const ROOT_URL = "https://majen.com.tr";

const canonicalPath = isBlocks
  ? `/${locale}/${leafSlugRaw}-${(
      locale.startsWith("tr") ? "traverten-bloklar" : "travertine-blocks"
    )}`
  : `/${locale}/${leafSlugRaw}-${processSlug}-${cutSlug}`;

const canonical = `${ROOT_URL}${canonicalPath}`;

  /* ---- Sections / FAQ ---- */
  const sections = page?.sections || {};
  const apps  = sections.applications;
  const specs = sections.specs;

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
    const items = Array.from(idxSet).sort((a,b)=>a-b).map((n) => {
      const q =
        (typeof qObj[`aboutpage_s4_faq${n}_header`] === "string" && qObj[`aboutpage_s4_faq${n}_header`].trim()) ||
        (typeof qObj[`aboutpage_s4_faq_header${n}`] === "string" && qObj[`aboutpage_s4_faq_header${n}`].trim()) || "";
      const a =
        (typeof qObj[`aboutpage_s4_faq${n}_text`] === "string" && qObj[`aboutpage_s4_faq${n}_text`].trim()) ||
        (typeof qObj[`aboutpage_s4_faq_text${n}`] === "string" && qObj[`aboutpage_s4_faq_text${n}`].trim()) || "";
      return q && a ? { q, a } : null;
    }).filter(Boolean);
    const span =
      (typeof qObj.aboutpage_s4_faq_span1 === "string" && qObj.aboutpage_s4_faq_span1.trim()) || "";
    return { items, span };
  })(page);

  /* ---- OtherOptions ---- */
  function colorsForProcess(procKeyEn) {
    const node = messages?.ProductPage?.[productKey]?.cuts?.[cutKey]?.processes?.[procKeyEn];
    return node?.colors && typeof node.colors === "object" ? Object.keys(node.colors) : [];
  }
function buildOtherProcessItems() {
  if (isBlocks || !productKey || !cutKey || !LEAF_KEY) return [];

  const procDict = messages?.ProductPage?.[productKey]?.cuts?.[cutKey]?.processes || {};
  const currentDisplay = toDisplayKey(procKeyFull);

  const candidates = [];
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

  candidates.sort((a, b) =>
    (TOPOLOGICAL_ORDER.indexOf(a.displayKey) >>> 0) -
    (TOPOLOGICAL_ORDER.indexOf(b.displayKey) >>> 0)
  );

  const items = [];

  for (const { rawKey, en, displayKey } of candidates) {
    if (items.length >= 3) break;

    const node = procDict[rawKey] || procDict[en] || {};
    const procLabel = friendlyProcessLabelForLocale(displayKey, locale);
    const title = `${LEAF_LABEL} · ${procLabel}`;
    const ck = combinedKeyFromProc(displayKey, locale); // "filled:honed" vb.

    const colorForCard = !isTiles
      ? (colorsForProcess(en).includes("ivory") ? "ivory" : (colorsForProcess(en)[0] || "ivory"))
      : null;

let imgCandidate;

    if (isTiles) {
      // tiles: önce product.processThumbs, sonra global process thumb
      const fromProcessThumb =
        IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[ck] ??
        PROCESS_THUMB_BY_COMBINED?.[ck];

      imgCandidate = pickFirst(fromProcessThumb);
    } else {
      // slabs/pavers: colorThumbs → colorVariant → processThumb → global
      const fromColorThumbs =
        IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[ck]?.[colorForCard];

      const fromColorVariant =
        IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorForCard];

      const fromProcessThumb =
        IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[ck] ??
        PROCESS_THUMB_BY_COMBINED?.[ck];

      imgCandidate =
        pickFirst(fromColorThumbs) ||
        pickFirst(fromColorVariant) ||
        pickFirst(fromProcessThumb);
    }

    // Eğer string ise ve sadece whitespace ise, çöpe at
    if (typeof imgCandidate === "string" && imgCandidate.trim() === "") {
      imgCandidate = null;
    }

    // Son fallbackler
    const img = imgCandidate || heroSrc || "/images/homepage/antikoarkplan.webp";

    const processSlugLocalized = procSlugForLocale(locale, displayKey);

    items.push({
      title,
      text:
        node.lead ||
        node.intro ||
        (locale.startsWith("tr")
          ? "Bu yüzey için detayları görüntüleyin."
          : "View details for this finish/process."),
      img,
      href: {
        pathname: "/travertine/[product]/[cut]/[process]/[color]",
        params: {
          product: productSlug,
          cut: cutSlug,
          process: processSlugLocalized,
          color: leafSlugRaw, // tiles’ta size; slabs’ta color
        },
      },
    });
  }

  return items;
}



  /* ---- Breadcrumbs ---- */
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

  /* ---- Render ---- */
  return (
    <main className="px-1 md:px-5 lg:px-0 py-10 mt-2 lg:mt-4">
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
        heroSrc={imagesForCarousel[0]}
        alt={H1}
        prefix={`/${locale}`}
        baseHref={`/${locale}/${baseFor(locale)}`}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
        span=""
      />

     <section id="product-intro">
       <BreadcrumbsExact
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        selectedSegments={selectedSegments}
        className="mt-6"
        items={items}
      />
     </section>


           {( isTiles || isPavers && page?.h5) && (
        <div className="w-[90%] md:w-[80%] max-w-[1400px] mx-auto text-center">
          
          {page?.h5 ? (<><h5 className="text-[20px] lg:text-[22px] font-bold mt-5">{page.h5}</h5>{page?.text5 ? <p className="text-[12px] lg:text-[14px]">{page.text5}</p> : null}</>) : null}
        </div>
      )}

      {/* Carousel + Sağ panel */}
      <section className="mx-auto text-center flex flex-col items-center justify-center max-w-[1400px] w-[95%] mt-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start w-full">
          {/* Carousel tarafı */}
          <div className="w-[97%] md:w-[90%] lg:w-[45%] items-center justify-start flex relative">
            {/* Renk baloncukları (sadece tiles) */}
            {isTiles && (
              <div className="absolute left-3 top-3 z-10 flex gap-2">
                {["ivory","light","antico"].map((ck) => {
                  const label = colorLabelFor(locale, ck);
                  // colorImagesMap artık kullanılabilir ve günceldir
                  const sampleSrc = (colorImagesMap[ck] && colorImagesMap[ck][0]) || heroSrc; 
                  const isActive = selectedColor === ck;
                  return (
                    <button
                      key={ck}
                      type="button"
                      onClick={() => setSelectedColor(ck)}
                      title={label}
                      aria-label={label}
                      className={[
                        "relative h-10 w-10 rounded-full overflow-hidden ring-2 transition",
                        isActive ? "ring-teal-700" : "ring-white/80 hover:ring-teal-500",
                        "bg-white/40 backdrop-blur-sm"
                      ].join(" ")}
                    >
                      <Image
                        src={sampleSrc}
                        alt={`${label} sample`}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <EmblaCarousel
              key={isTiles ? `tiles-${selectedColor}` : "default"}
              images={imagesForCarousel}
              altPrefix={H1}
            />
          </div>

          {/* Sağ panel */}
          <div className="flex flex-col w-[98%] md:w-[90%] lg:w-[45%] gap-3 md:gap-5">
            {specs?.rows?.length ? (
              <div className="space-y-4 text-start bg-white rounded-xl p-3 md:p-6 shadow-md">
                <SpecTable rows={specs.rows} title={specs.h2 || specsLabel} />
                {isTiles && (
                  <div className="text-sm text-neutral-600">
                    {locale.startsWith("tr") ? "Seçili renk: " : "Selected color: "}
                    <strong>{colorLabelFor(locale, selectedColor)}</strong>
                  </div>
                )}
              </div>
            ) : null}
            <SocialBlock />
          </div>
        </div>
      </section>

      {/* Finishes & Export */}
      {(page?.finishes || page?.export) && (
        <section className="max-w-[1400px] w-[95%] mx-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(() => {
              const node = page?.finishes || {};
              const items = [node.list1, node.list2, node.list3, node.list4].filter(Boolean);
              return items.length ? <InfoListCard title={node.title || (locale.startsWith("tr") ? "Yüzey İşlemleri" : "Finishes & Processing Options")} items={items} prefix={`/${locale}`} /> : null;
            })()}
            {(() => {
              const node = page?.export || {};
              const items = [node.list1, node.list2, node.list3, node.list4].filter(Boolean);
              return items.length ? <InfoListCard title={node.title || (locale.startsWith("tr") ? "İhracat & Paketleme" : "Export, Packaging & Shipping")} items={items} prefix={`/${locale}`} /> : null;
            })()}
          </div>
        </section>
      )}

      {/* Uzun metin bölümleri */}
      {( page?.h3 || page?.h4 || page?.h5) && (
        <section className="w-[90%] md:w-[80%] max-w-[1400px] mx-auto text-center">
          {page?.h3 ? (<><h3 className="text-[20px] lg:text-[22px] font-bold mt-6">{page.h3}</h3>{page?.text3 ? <p className="text-[12px] lg:text-[14px]">{page.text3}</p> : null}</>) : null}
          {page?.h4 ? (<><h4 className="text-[20px] lg:text-[22px] font-bold mt-5">{page.h4}</h4>{page?.text4 ? <p className="text-[12px] lg:text-[14px]">{page.text4}</p> : null}</>) : null}
         {(isSlabs && page?.h5) && 
         (
          <section>
             {page?.h5 ? (<><h5 className="text-[20px] lg:text-[22px] font-bold mt-5">{page.h5}</h5>{page?.text5 ? <p className="text-[12px] lg:text-[14px]">{page.text5}</p> : null}</>) : null}
          </section>
         )}
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