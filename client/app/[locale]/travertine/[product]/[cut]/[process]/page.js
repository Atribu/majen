"use client";
//resimler _images klasöründeki IMAGE_BY_PRODUCT burdan geliyor ve variant kısmının resimleri colorThumbs dan (_images)
import { useParams, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

import {
  baseFor,
  productKeyFromSlug,
  colorKeys,
  colorLabelFor,
  colorSlugFor,
  buildSeoColorPath,
  CUTS,
  getLang,
  productSlugFor
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
import InlineLinks from "@/app/[locale]/components/generalcomponent/InlineLinks";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";
import BreadcrumbsExact from "@/app/[locale]/components/generalcomponent/BreadcrumbsExact";
import {
  PRODUCT_LABEL,
  CUT_LABEL,
  TILE_SIZE_SLUGS_TILES,
  TILE_SIZE_SLUGS_PAVERS,
  tileSizeLabelForLocale
} from "@/lib/labels";
import { Link } from "@/i18n/navigation";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";

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
  // if (s === "natural" || s === "dogal") return s;
    if (s === "natural" || s === "dogal") {
    return locale.startsWith("tr") ? "dolgusuz-dogal" : "unfilled-natural";
  }

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

const pickFirst = (v) => Array.isArray(v) ? v.find(Boolean) : v;

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

    // ---- Breadcrumb
    const rawPath = usePathname();
    const pathname = typeof rawPath === "string" ? rawPath : "";
    const segments = pathname.split("/").filter(Boolean);
    const selectedSegments = segments.slice(-1);

  const productKey = productKeyFromSlug(locale, String(productSlug)) || "slabs";

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


  // cutSlug (SEO) → cutKey ("vein-cut" | "cross-cut")
 const cutKey = resolveCutKey(locale, productKey, cutSlug);
  const cutTitle = safe(() => t(`${productKey}.cuts.${cutKey}.title`), cutKey);

  // process anahtarı: birleşik (filled-polished / unfilled-honed / natural ...)
  const procKey = normalizeProcKey(process, locale);
  const procLabel = friendlyProcessLabel(procKey, locale);

  // TR'de "dolgulu-..." anahtarını EN'e çevirip lookup'ı tek kanaldan yapalım
const lookupProcKey =
  locale.startsWith("tr") ? trCombinedToEn(procKey) : procKey;

  const youtubeByColor =
   (safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.youtubeByColor`), {}) || {});

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

  // 🔴 tek doğal → unfilled:natural
  if (s === "natural" || s === "dogal") return "unfilled:natural";

  const fillMap = { dolgulu:"filled", dolgusuz:"unfilled", filled:"filled", unfilled:"unfilled" };
  const procMap = {
    honlanmis:"honed", cilali:"polished", fircalanmis:"brushed", eskitilmis:"tumbled",
    honed:"honed", polished:"polished", brushed:"brushed", tumbled:"tumbled",
    natural:"natural", dogal:"natural"
  };
  const [fillRaw, procRaw] = s.split("-");
  const fill = fillMap[fillRaw] || fillRaw;
  const proc = procMap[procRaw] || procRaw;
  return `${fill}:${proc}`;
}



 const dh =
  processNode.detailsHeadings ||
  safe(() => t.raw(`${productKey}.cuts.${cutKey}.detailsHeadings`), {}) ||
  {};

const descArr = Array.isArray(processNode.description)
  ? processNode.description
  : (safe(() => t.raw(`${productKey}.cuts.${cutKey}.description`), []) || []);

  // INFO KARTLARI
  const hSizes    = safe(() => t(`${productKey}.detailsHeadings.sizes`), "Sizes / Thickness");
  const hFeatures = safe(() => t(`${productKey}.detailsHeadings.features`), "Finishes & Features");

    const qCut = safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.QuestionsItems`), null);
  const qTop = safe(() => t.raw(`${productKey}.QuestionsItems`), {});
  const qSrc = qCut || qTop;
  
  const faqItems = [];
  if (qSrc) {
    let j = 1;
    while (qSrc[`aboutpage_s4_faq${j}_header`] && qSrc[`aboutpage_s4_faq${j}_text`]) {
      faqItems.push({ q: qSrc[`aboutpage_s4_faq${j}_header`], a: qSrc[`aboutpage_s4_faq${j}_text`] });
      j++;
    }
  }


  // INFO KARTLARI — tamamen processNode’dan (fallback cut → product)
const cards = [
  {
    title: dh.title1 || `${productTitle} · ${cutTitle} · ${processTitle}`,
    content: descArr[0] || (Array.isArray(description) ? description[1] : "")
  },
  {
    title: dh.title2 || (locale.startsWith("tr") ? "Renkler" : "Colors"),
    content: descArr[1] || (Array.isArray(description) ? description[1] : "")
  },
  {
    title: dh.title3 || hSizes,
    content: descArr[2] || (sizes.length ? sizes.join(", ") : (locale.startsWith("tr") ? "Kalınlık seçeneklerini renk sayfasında görün." : "See size options on the color page."))
  },
  {
    title: dh.title4 || hFeatures,
    content: descArr[3] || [...(finishes || []), ...(features || [])].slice(0, 12).join(", ")
  }
];


  // === RENK SEÇİMİ ===
  const cKeys = colorKeys();


const colorImgMap = Object.fromEntries(
  cKeys.map((key) => {
    const slug = colorSlugFor(locale, key);

    // 1) _images → colorThumbs (artık dizi olabilir)
    const fromColorByProcess =
      IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[combinedKey]?.[key];

    // 2) ürün-variant (tekil ya da bazen dizi olabilir)
    const fromVariant =
      IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug] ??
      IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[key];

    // 3) global process thumb (tekil)
    const fromProcessThumb = PROCESS_THUMB_BY_COMBINED?.[combinedKey];

    // ✅ dizi ise ilkini al, değilse doğrudan kullan
    const src =
      pickFirst(fromColorByProcess) ||
      pickFirst(fromVariant) ||
      pickFirst(fromProcessThumb) ||
      heroSrc;

    return [slug, src];
  })
);


const colorCards = cKeys.map((key) => {
  const label = colorLabelFor(locale, key);
  const slug  = colorSlugFor(locale, key);
 const youtubeUrl = youtubeByColor && typeof youtubeByColor === "object" ? youtubeByColor[key] : null;

  return {
    slug,
    vKey: slug,       
    title: label,
    alt: label,
    href: buildSeoColorPath(locale, productKey, cutSlug, process, key),
    youtubeUrl: youtubeUrl || undefined,  // ⬅️ eklenen alan
  };
});

 const cardTextClass = "text-[14px] leading-[120%] text-neutral-700 text-center";

      const linkPatterns = [
    {
      pattern: /vein[- ]cut/i,
      href: {
        pathname: "/travertine/[product]/[cut]",
        params: { product: productSlug, cut: cutSlugForProduct(locale, "vein-cut", productKey) }
      }
    },
    {
      pattern: /cross[- ]cut/i,
      href: {
        pathname: "/travertine/[product]/[cut]",
        params: { product: productSlug, cut: cutSlugForProduct(locale, "cross-cut", productKey) }
      }
    },
  ];

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

 function procSlugForLocale(locale, procKey) {
  const norm = String(procKey).toLowerCase();

  // 🔴 “natural” görünce hedef slug hep unfilled-natural (TR: dolgusuz-dogal)
  if (norm === "natural" || norm === "dogal") {
    return locale.startsWith("tr") ? "dolgusuz-dogal" : "unfilled-natural";
  }

  // mevcut EN↔TR çeviri mantığın:
  const enCombo = trCombinedToEn(norm);
  if (locale.startsWith("tr")) {
    const [fillEn, pEn] = enCombo.split("-");
    const fillTr = fillEn === "filled" ? "dolgulu" : "dolgusuz";
    const procTr = { honed:"honlanmis", polished:"cilali", brushed:"fircalanmis", tumbled:"eskitilmis", natural:"dogal" }[pEn] || pEn;
    return `${fillTr}-${procTr}`;
  }
  return enCombo; // EN
}


const PROCESS_EN = [
  "natural",
  "filled-honed","unfilled-honed",
  "filled-polished","unfilled-polished",
  "filled-brushed","unfilled-brushed",
  "filled-tumbled","unfilled-tumbled",
  "filled-natural","unfilled-natural",
];

// TR metinlerde de yakalamak istersen (opsiyonel ama faydalı)
const PROCESS_TR = [
  "dogal",
  "dolgulu-honlanmis","dolgusuz-honlanmis",
  "dolgulu-cilali","dolgusuz-cilali",
  "dolgulu-fircalanmis","dolgusuz-fircalanmis",
  "dolgulu-eskitilmis","dolgusuz-eskitilmis",
  "dolgulu-dogal","dolgusuz-dogal",
];

// Bu helper, "filled-honed" gibi bir anahtar için hem "filled honed" hem "filled-honed" yazımını yakalayan regex üretir
function wordsOrHyphenRegex(s) {
  const safe = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");     // escape
  return new RegExp(`\\b${safe.replace("-", "[ -]")}\\b`, "i");
}

// TR “doğal” yazımı da olabileceği için küçük bir ek desenle destekleyelim
// const NATURAL_TR_REGEX = /\bdoğal\b/i;
// sadece "dolgulu/dolgusuz doğal" ve "filled/unfilled natural" yakalansın
 const NATURAL_EN_COMBO_REGEX = /\b(?:unfilled|filled)[ -]natural\b/i;
 const NATURAL_TR_COMBO_REGEX = /\b(?:dolgulu|dolgusuz)[ -]doğal\b/i;


// EN ve TR process anahtarlarından pattern → href objeleri üret
const processPatterns = []
   .concat(
     PROCESS_EN.flatMap((k) => {
       const href = {
         pathname: "/travertine/[product]/[cut]/[process]",
         params: { product: productSlug, cut: cutSlug, process: procSlugForLocale(locale, k) },
       };
       if (k === "natural") {
         // yalnızca "filled/unfilled natural" eşleşsin
         return [{ pattern: NATURAL_EN_COMBO_REGEX, href }];
       }
       // diğerleri eski mantıkla
       const rx = wordsOrHyphenRegex(k); // "filled[ -]honed" vb.
       return [{ pattern: rx, href }];
     })
   )
  .concat(
      PROCESS_TR.flatMap((kTr) => {
       const href = {
         pathname: "/travertine/[product]/[cut]/[process]",
         params: { product: productSlug, cut: cutSlug, process: procSlugForLocale(locale, kTr) },
       };
       if (kTr === "dogal") {
         // yalnızca "dolgulu/dolgusuz doğal" eşleşsin
         return [{ pattern: NATURAL_TR_COMBO_REGEX, href }];
       }
       return [{ pattern: wordsOrHyphenRegex(kTr), href }];
     })
  );
  // Son olarak kesim (vein/cross) pattern’lerine process pattern’lerini ekle
linkPatterns.push(...processPatterns);

// helper: bu objede gerçekten TS alanları var mı?
function hasTS(obj) {
  if (!obj || typeof obj !== "object") return false;
  return Object.keys(obj).some((k) => /^(header|text|subheader|subtext)\d+$/i.test(k));
}

// 1) process-level (doğru yer)
const textSectionProcRaw = safe(() =>
  t.raw(`${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.TextSection`)
, null);

// 2) cut-level (fallback)
const textSectionCutRaw = hasTS(textSectionProcRaw) ? null : safe(() =>
  t.raw(`${productKey}.cuts.${cutKey}.TextSection`)
, null);

// 3) product-level (son fallback)
const textSectionProdRaw = (hasTS(textSectionProcRaw) || hasTS(textSectionCutRaw)) ? null : safe(() =>
  t.raw(`${productKey}.TextSection`)
, null);

// en uygun kaynak
const textSectionObj =
  (hasTS(textSectionProcRaw) && textSectionProcRaw) ||
  (hasTS(textSectionCutRaw) && textSectionCutRaw) ||
  (hasTS(textSectionProdRaw) && textSectionProdRaw) ||
  null;

// Map’le
const textSections = [];
if (textSectionObj) {
  let i = 1;
  while (
    textSectionObj[`header${i}`] ||
    textSectionObj[`text${i}`] ||
    textSectionObj[`subheader${i}`] ||
    textSectionObj[`subtext${i}`]
  ) {
    const title = textSectionObj[`header${i}`]
      || textSectionObj[`subheader${i}`]
      || `${processTitle} — Section ${i}`;
    const paragraphs = [textSectionObj[`text${i}`], textSectionObj[`subtext${i}`]].filter(Boolean);
    textSections.push({ id: i, title, paragraphs });
    i++;
  }
}

const optRaw = (key, fallback = null) => {
  try {
    const v = t.raw(key);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};

  const variantHeader = optRaw(`${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.variants.title`, "");
  const variantText = optRaw(`${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.variants.text`, "");

const productLabel = PRODUCT_LABEL[lang]?.[productKey] || productSlug;
const cutLabel     = CUT_LABEL[lang]?.[cutKey]         || cutKey;

// process slug’ını göster (TR’de “dolgulu-cilali”)
const processSlugLocalized = procSlugForLocale(locale, process);

const items = [
  { label: locale.startsWith("tr") ? "Traverten" : "Travertine", href: `/${locale}/${baseSegment}` },
  { label: productLabel, href: `/${locale}/${baseSegment}/${productSlug}` },
  { label: cutLabel,     href: `/${locale}/${cutSlug}` },               // kısa cut sayfası
  { label: processSlugLocalized, href: `/${locale}/${process}-${cutSlug}` }, // current
];

const ALL_PROCS_EN = [
  "filled-polished","filled-honed","filled-brushed","filled-tumbled",
  "unfilled-honed","unfilled-brushed","unfilled-tumbled","unfilled-natural",
];
const otherProcKeysEN = ALL_PROCS_EN
  .filter((p) => p !== lookupProcKey)
  .slice(0, 3);

// 2) Kart başına 3 renk (öncelik sırası)
const COLOR_PRIORITY = ["ivory", "light", "antico"]; // istersen farklı sıraya al
const colorKeyList = colorKeys();                     // i18n key ailesi
// color slug ve label'ları hazırla (locale'e göre)
const colorTriplet = COLOR_PRIORITY
  .map((enKey) => {
    // projende renk key ↔ slug farklı olabilir; hem key hem slug deneyelim
    const slug = colorSlugFor(locale, enKey);
    const label = colorLabelFor(locale, enKey);
    // gerçekte varsa kullan; yoksa colorKeys() listesinden sıradakiyle doldur
    return { key: enKey, slug, label };
  })
  .slice(0, 3);

// 3) Her process için görsel (thumb) bul (product/cut/process → combined key)
function combinedKeyFromEn(enCombo) {
  // "filled-polished" → "filled:polished"
  if (!enCombo) return null;
  const s = String(enCombo).trim();
  if (s === "natural" || s === "unfilled-natural") return "unfilled:natural";
  const [fi, pr] = s.split("-");
  return `${fi}:${pr}`;
}

function processThumbFor(enCombo) {
  const cKey = combinedKeyFromEn(enCombo);
  return (
    IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[cKey] ||
    PROCESS_THUMB_BY_COMBINED?.[cKey] ||
    heroSrc
  );
}

// 4) Kartların link ve metinlerini üret
const otherProcessCards = otherProcKeysEN.map((enCombo) => {
  // başlık (locale'e uygun “Filled · Honed” biçimi)
  const procTitle = friendlyProcessLabel(enCombo, locale);
  const targetProcessSlug = procSlugForLocale(locale, enCombo); // hedef URL process segmenti (locale'li)
  const img = processThumbFor(enCombo);

  // buton, ilk renge gitsin
  const firstColor = colorTriplet[0];
  const buttonHref = buildSeoColorPath(
    locale,
    productKey,
    cutSlug,               // bulunduğun cut SEO segmenti
    targetProcessSlug,     // hedef process segmenti
    firstColor.key         // renk key (EN family), buildSeoColorPath içinde doğru çözümleniyor
  );

  // kart gövdesinde 3 renk linki
  const textJsx = (
    <>
      {(locale.startsWith("tr") ? "Renkler: " : "Colors: ")}
      {colorTriplet.map((c, idx) => {
        const href = buildSeoColorPath(locale, productKey, cutSlug, targetProcessSlug, c.key);
        return (
          <React.Fragment key={`${enCombo}-${c.key}`}>
            <Link href={href} className="text-teal-700 hover:underline">
              {c.label}
            </Link>
            {idx < colorTriplet.length - 1 ? " · " : ""}
          </React.Fragment>
        );
      })}
    </>
  );

  return {
    title: procTitle,
    textJsx,
    img,
    href: {
      // buton (Go to page) için ilk renge deep link veriyoruz
      pathname: buttonHref, // i18n Link locale’i ekleyecek, path locale’siz olmalı
    },
  };
});

const isSizeDriven = productKey === "tiles" || productKey === "pavers";

// tiles için kendi ölçüleri, pavers için kendi ölçüleri
const sizeSlugListForThisProduct = productKey === "tiles"
  ? TILE_SIZE_SLUGS_TILES
  : productKey === "pavers"
    ? TILE_SIZE_SLUGS_PAVERS
    : [];

const sizeCards = isSizeDriven
  ? sizeSlugListForThisProduct.map((sizeSlug) => {
      const title = tileSizeLabelForLocale(locale, sizeSlug);

      const href = {
        pathname: "/travertine/[product]/[cut]/[process]/[color]",
        params: {
          product: productSlug,   // "tiles" veya "pavers"
          cut: cutSlug,           // örn "vein-cut-travertine-pavers"
          process: process,       // "filled-polished"
          color: sizeSlug,        // <-- param adı [color] ama aslında ölçü
        },
      };

      // görsel fallback
      const img = processThumbFor(lookupProcKey) || heroSrc;

      return {
        slug: sizeSlug,
        vKey: sizeSlug,
        title,
        href,
        img,
      };
    })
  : [];




  return (
    <main className="py-6 mt-[22px] lg:mt-7 overflow-x-hidden text-center w-full">
      {/* INTRO */}
      <ProductIntroSection
        title={processNode.h1 || `${productTitle} · ${cutTitle} · ${processTitle}`}
        intro={processIntro}
        title2={processNode.title2 || undefined}
        intro2={processNode.intro2 || undefined}
        span=""
        heroSrc={heroSrc}
        alt={heroAlt}
        prefix={prefix}
        baseHref={`${prefix}/${baseSegment}`}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
        depth={3}
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

      {/* INFO CARDS */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto w-[95%]">
                   {cards.map((c, i) => {
                     const plain =
                       typeof c.content === "string" ? c.content : Array.isArray(c.content) ? c.content.join(", ") : null;
           
                     return (
                       <InfoCard key={i} title={c.title} contentClassName={cardTextClass}>
                         {i === 1 ? (
                           <InlineLinks text={plain || ""} patterns={linkPatterns} textClassName={cardTextClass} />
                         ) : (
                           <span className={cardTextClass}>{plain}</span>
                         )}
                       </InfoCard>
                     );
                   })}
       </section>

       <h2 className="text-[22px] lg:text-[24px] font-semibold mt-12">{variantHeader}</h2>
<p className="text-[12px] lg:text-[14px] mt-3 leading-tight lg:leading-[140%] w-[90%] max-w-[1200px] mx-auto -mb-2"> {variantText}</p>

      {/* COLOR SEÇİMİ */}
<VariantCircleSection
  heading={
    isSizeDriven
      ? (locale.startsWith("tr") ? "Mevcut Ölçüler" : "Available Sizes")
      : `${processTitle} ${locale.startsWith("tr") ? "Renkleri" : "Colors"}`
  }
  variantCards={isSizeDriven ? sizeCards : colorCards}
  imgMap={isSizeDriven ? { cover: heroSrc } : colorImgMap}
  heroSrc={heroSrc}
  IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
  productKey={isSizeDriven ? `${productKey}-sizes` : "color"}
/>



      {/* Metin / CTA */}
{textSections.length > 0 && textSections.map(({ id, title, paragraphs }) => (
  <TextSection
    key={id}
    title={title}
    paragraphs={paragraphs}
    className="max-w-5xl mx-auto mt-12"
    clampMobile={3}
    as="section"
  />
))}

         {faqItems.length > 0 && (
        <div id="faq" className="max-w-5xl mx-auto mt-12">
          <QuestionsSection items={faqItems} span={cutTitle} />
        </div>
      )}
      
      <SocialMediaSection/>
  
      <ContactFrom />
      
      <OtherOptions
  locale={locale}
  heading={locale.startsWith("tr") ? "Diğer İşlemler" : "Other Processes"}
  customItems={otherProcessCards}
  // İstersen 3 kart tek satır
  gridClassName="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center"
/>
    </main>
  );
}
