// app/[locale]/travertine/[product]/[cut]/page.jsx
"use client";

import React from "react";
import Head from "next/head";                      // ⬅️ YENİ
import { useParams, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  getLang,
  baseFor,
  productKeyFromSlug,
  CUTS,
  productSlugFor,
  cutKeyFromExternalSlug
} from "@/lib/travertine";
import { IMAGE_BY_PRODUCT, PROCESS_THUMB_BY_COMBINED } from "@/app/[locale]/(catalog)/_images";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import InlineLinks from "@/app/[locale]/components/generalcomponent/InlineLinks";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";
import slabs from "@/public/images/deneme/slabson.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/homepage/Pavers2.webp";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";
import BreadcrumbsExact from "@/app/[locale]/components/generalcomponent/BreadcrumbsExact";
import { PRODUCT_LABEL, CUT_LABEL, procSlugForLocale, TILE_SIZE_SLUGS_TILES as TILE_SIZES_TILES,
  TILE_SIZE_SLUGS_PAVERS as TILE_SIZES_PAVERS, } from "@/lib/labels";

function InfoCard({ title, children, contentClassName = "text-sm text-neutral-600 leading-tight text-center" }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

// helpers
const safe = (fn, fb = undefined) => { try { const v = fn(); return v ?? fb; } catch { return fb; } };

// === Title formatting helpers (process ve cut yazıları) ===

function procSlugFor(locale, group, key) {
  const tr = String(locale).startsWith("tr");
  
  // natural ise filled/unfilled önekiyle birlikte üret
  const isNatural = (key === "natural" || key === "dogal");
  if (isNatural) {
    const fillTr = group === "filled" ? "dolgulu" : "dolgusuz";
    const fillEn = group === "filled" ? "filled"  : "unfilled";
    return tr ? `${fillTr}-dogal` : `${fillEn}-natural`;
  }
  
  // ✅ EN → TR dönüşümü
  const PROCESS_MAP = {
    en: {
      honed: "honed",
      polished: "polished",
      brushed: "brushed",
      tumbled: "tumbled"
    },
    tr: {
      honed: "honlanmis",
      polished: "cilali",
      brushed: "fircalanmis",
      tumbled: "eskitilmis",
      // İngilizce key gelebilir, onları da map'le
      honlanmis: "honlanmis",
      cilali: "cilali",
      fircalanmis: "fircalanmis",
      eskitilmis: "eskitilmis"
    }
  };
  
  const processMap = tr ? PROCESS_MAP.tr : PROCESS_MAP.en;
  const processSlug = processMap[key] || key;
  
  // dolgu öneki
  const fill = group === "filled" 
    ? (tr ? "dolgulu" : "filled") 
    : (tr ? "dolgusuz" : "unfilled");
  
  return `${fill}-${processSlug}`;
}

export default function CutPage() {
  const { product: productSlug, cut: cutSlugSegment } = useParams();
  const locale  = useLocale();
  const lang    = getLang(locale);
  const t       = useTranslations("ProductPage");
  const prefix  = `/${locale}`;

  const productKey  = productKeyFromSlug(locale, String(productSlug));
  const baseSegment = baseFor(locale);
  const baseHref    = `/${locale}/${baseSegment}`;

  function getIncotermPatterns(locale) {
  const exportBase = locale.startsWith("tr")
    ? "nasıl-ihracat-yapıyoruz"
    : "how-we-export";

  return [
    {
      pattern: /\bFOB\b/i,
      href: `/${locale}/${exportBase}/fob`,
    },
    {
      pattern: /\bCIF\b/i,
      href: `/${locale}/${exportBase}/cif`,
    },
    {
      pattern: /\bEXW\b/i,
      href: `/${locale}/${exportBase}/exw`,
    },
  ];
}

// güvenli kaçış
const esc = (s) => String(s ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function sizeRegexForSlug(sizeSlug) {
  if (sizeSlug === "versailles-set" || sizeSlug === "versailles-pattern") {
    // yazı içinde "Versailles set", "Versailles pattern", "Versailles-Set" vb.
    const word = sizeSlug === "versailles-set" ? "set" : "pattern";
    return new RegExp(`\\bversailles\\s*[-–—]?\\s*${word}\\b`, "i");
  }
  const [w, h] = String(sizeSlug).split("x");
  return new RegExp(
    `${esc(w)}\\s*["″']?\\s*[x×]\\s*${esc(h)}\\s*["″']?`,
    "i"
  );
}

/**
 * productKey: "blocks" | "slabs" | "tiles" | "pavers"
 * sectionIndex: 1..5 (header1/text1, header2/text2,...)
 */
function getBlogPatterns(productKey, sectionIndex, locale) {
    const base = (slug) => blogPath(locale, slug);  // ✅ TR/EN’e göre doğru slug

  if (productKey === "blocks") {
    switch (sectionIndex) {
      case 1:
        return [
          {
            pattern: /\btravertine blocks?\b/i,
            href: base("travertine-blocks-guide"),
          },
          {
            pattern: /\bquarry extraction\b/i,
            href: base("travertine-quarry"),
          },
        ];
      case 3:
        return [
          {
            pattern: /\btravertine blocks?\b/i,
            href: base("travertine-blocks-guide"),
          },
           {
            pattern: /\bwholesalers\b/i,
            href: base("travertine-distributor"),
          },
        ];
      case 4:
        return [
          {
            pattern: /\bexport partner\b/i,
            href: base("travertine-exporter"),
          },
        ];
      default:
        return [];
    }
  }

  if (productKey === "slabs") {
    switch (sectionIndex) {
      case 1:
        return [
          {
            pattern: /\bhoned?\b/i,
            href: base("honed-travertine"),
          },
             {
            pattern: /\bpolished?\b/i,
            href: base("polished-travertine"),
          },
            {
            pattern: /\bbrushed?\b/i,
            href: base("brushed-travertine"),
          },
             {
            pattern: /\btumbled?\b/i,
            href: base("tumbled-travertine"),
          },
        ]
      case 3:
         return [
          {
            pattern: /\btravertine slabs?\b/i,
            href: base("travertine-slabs-guide"),
          },
          {
            // wall cladding
            pattern: /\bwall cladding\b/i,
            href: base("travertine-cladding"),
          },
           {
            // flooring
            pattern: /\bfloors\b/i,
            href: base("travertine-flooring"),
          },
          {
            // flooring
            pattern: /\bflooring\b/i,
            href: base("travertine-flooring"),
          },
          {
            // facades / façades
            pattern: /\b(exterior\s+)?fa(?:ç|c)ades?\b/i,
            href: base("travertine-facade"),
          },

           {
            pattern: /\bwholesalers\b/i,
            href: base("travertine-distributor"),
          },
        ];

         case 5:
         return [
          {
            pattern: /\bwholesalers?\b/i,
            href: base("travertine-distributor"),
          },
           {
            pattern: /\bexports?\b/i,
            href: base("travertine-exporter"),
          },
    
        ];
        // genel slabs guide
        return [
          {
            pattern: /\btravertine slabs?\b/i,
            href: base("travertine-slabs-guide"),
          },
        ];

      case 2:
        // Applications of slabs: cladding, flooring, façades
        return [
          {
            pattern: /\btravertine slabs?\b/i,
            href: base("travertine-slabs-guide"),
          },
          {
            // wall cladding
            pattern: /\bwall cladding\b/i,
            href: base("travertine-cladding"),
          },
          {
            // flooring
            pattern: /\bflooring\b/i,
            href: base("travertine-flooring"),
          },
          {
            // facades / façades
            pattern: /\b(exterior\s+)?fa(?:ç|c)ades?\b/i,
            href: base("travertine-facade"),
          },
        ];
      default:
        return [];
    }
  }

  if (productKey === "tiles") {
    switch (sectionIndex) {
      case 1:
        return [
          {
            pattern: /\btravertine tiles?\b/i,
            href: base("travertine-tiles-guide"),
          },
          {
            pattern: /\bwall cladding?\b/i,
            href: base("travertine-cladding"),
          },
          {
            pattern: /\bflooring?\b/i,
            href: base("travertine-flooring"),
          },
          {
            pattern: /\bfacades?\b/i,
            href: base("travertine-facades"),
          },
          {
            pattern: /\bbathroom?\b/i,
            href: base("travertine-bathroom"),
          },
        ];
      case 2:
        return [
          {
            pattern: /\bwholesalers\b/i,
            href: base("travertine-distributor"),
          },
          {
            pattern: /\bivory\b/i,
            href: base("ivory-travertine"),
          },
          {
            pattern: /\blight\b/i,
            href: base("light-travertine"),
          },
          {
            pattern: /\bantico\b/i,
            href: base("antico-travertine"),
          },
        ]
      case 3:
        // flooring, bathrooms, pool decks
        return [
          {
            pattern: /\bflooring\b/i,
            href: base("travertine-flooring"),
          },
          {
            pattern: /\bwall cladding\b/i,
            href: base("travertine-cladding"),
          },
          {
            pattern: /\bpool decks?\b/i,
            href: base("travertine-pool"),
          },
        ];
        case 4:
          return [
            {
            pattern: /\bdistributors?\b/i,
            href: base("travertine-distributor"),
          },
             {
            pattern: /\bquarrying?\b/i,
            href: base("travertine-quarry"),
          },
          ]
      default:
        return [];
    }
  }

  if (productKey === "pavers") {
    switch (sectionIndex) {
      case 1:
        return [
          {
            pattern: /\btravertine pavers?\b/i,
            href: base("travertine-pavers-guide"),
          },
            {
            pattern: /\bquarry-direct supplier,?\b/i,
            href: base("travertine-quarry"),
          },
       
        ];

        case 2:
          return [
                 {
            pattern: /\bhoned?\b/i,
            href: base("honed-travertine"),
          },
                {
            pattern: /\bpolished?\b/i,
            href: base("polished-travertine"),
          },
              {
            pattern: /\bbrushed?\b/i,
            href: base("brushed-travertine"),
          },
          
            {
            pattern: /\btumbled?\b/i,
            href: base("tumbled-travertine"),
          },
             {
            pattern: /\bfilled?\b/i,
            href: base("filled-travertine"),
          },
          {
            pattern: /\bunfilled?\b/i,
            href: base("unfilled-travertine"),
          },
          ]
      case 3:
        return [
  
          {
            pattern: /\bUnfilled?\b/i,
            href: base("unfilled-travertine"),
          },
        ];
            case 4:
        return [
          {
            pattern: /\bpool?\b/i,
            href: base("travertine-pool"),
          },
        ];
      case 5:
        return [
          {
            pattern: /\btravertine supplier\b/i,
            href: base("travertine-supplier"),
          },
          {
            pattern: /\bexport\b/i,
            href: base("travertine-exporter"),
          },
        ];
      default:
        return [];
    }
  }

  return [];
}

function defaultProc(locale) {
  return locale.startsWith("tr") ? "dolgulu-honlanmis" : "filled-honed";
}

// İngilizce "anahtar slug" → her dil için gerçek slug
const BLOG_SLUG_MAP = {
  en: {
    "travertine-blocks-guide": "travertine-blocks-guide",
    "travertine-slabs-guide": "travertine-slabs-guide",
    "travertine-tiles-guide": "travertine-tiles-guide",
    "travertine-pavers-guide": "travertine-pavers-guide",
    "travertine-cladding": "travertine-cladding",
    "travertine-flooring": "travertine-flooring",
    "travertine-facade": "travertine-facade",
    "travertine-quarry": "travertine-quarry",
    "travertine-exporter": "travertine-exporter",
    "travertine-distributor": "travertine-distributor",
    "travertine-supplier": "travertine-supplier",
    "travertine-pool": "travertine-pool",
    "polished-travertine": "polished-travertine",
    "honed-travertine": "honed-travertine",
    "brushed-travertine": "brushed-travertine",
    "tumbled-travertine": "tumbled-travertine",
    "ivory-travertine": "ivory-travertine",
    "light-travertine": "light-travertine",
    "antico-travertine": "antico-travertine",
    "travertine-bathroom":  "travertine-bathroom",
    "filled-travertine":"filled-travertine",
    "unfilled-travertine":"unfilled-travertine",
  },
  tr: {
    // 🔻 Bunları sen kendi gerçek TR URL’lerine göre ayarla
    "travertine-blocks-guide": "traverten-bloklari",
    "travertine-slabs-guide": "traverten-plakalar",
    "travertine-tiles-guide": "traverten-karolar",
    "travertine-pavers-guide": "traverten-dosemeler",
    "travertine-cladding": "traverten-kaplama",
    "travertine-flooring": "traverten-zemin-kaplama",
    "travertine-facade": "traverten-cephe-kaplama",
    "travertine-quarry": "traverten-ocagi",
    "travertine-exporter": "traverten-ihracatcisi",
    "travertine-distributor": "traverten-toptancisi",
    "travertine-supplier": "traverten-tedarikcisi",
    "travertine-pool": "traverten-havuz-kaplama",
    "polished-travertine": "cilali-traverten",
    "honed-travertine": "honlanmis-traverten",
    "brushed-travertine": "fircalanmis-traverten",
    "tumbled-travertine": "eskitilmis-traverten",
     "ivory-travertine": "fildisi-traverten",
    "light-travertine": "acik-traverten",
    "antico-travertine": "antiko-traverten",
    "travertine-bathroom":  "traverten-banyo",
    "filled-travertine":"dolgulu-traverten",
    "unfilled-travertine":"dolgusuz-traverten",
  },
};

function resolveBlogSlug(locale, slug) {
  const lang = locale.startsWith("tr") ? "tr" : "en";
  const clean = String(slug)
    .replace(/^travertines\//, "")  // eski prefix’leri temizle
    .replace(/^\//, "");            // baştaki /'ı kaldır

  const map = BLOG_SLUG_MAP[lang] || {};
  return map[clean] || clean;       // map’te yoksa olduğu gibi bırak
}




  // ---- Breadcrumb
  const rawPath = usePathname();
  const pathname = typeof rawPath === "string" ? rawPath : "";
  const segments = pathname.split("/").filter(Boolean);
  const selectedSegments = segments.slice(-1);

  // Ürüne göre cut slug'ını normalize et (slabs→tiles/blocks/pavers)
  function cutSlugForProduct(locale, cutKey, productKey) {
    const base = (CUTS[getLang(locale)] || {})[cutKey] || cutKey; // örn: 'vein-cut-travertine-slabs'
    if (typeof base !== "string") return cutKey;
    if (locale.startsWith("en")) {
      if (productKey === "slabs")  return base.replace(/-travertine-slabs$/i, "-travertine-slabs");
      if (productKey === "tiles")  return base.replace(/-travertine-slabs$/i, "-travertine-tiles");
      if (productKey === "blocks") return base.replace(/-travertine-slabs$/i, "-travertine-blocks");
      if (productKey === "pavers") return base.replace(/-travertine-slabs$/i, "-travertine-pavers");
      return base; // slabs
    }
    // TR dönüşümleri
    if (productKey === "slabs")  return base.replace(/-traverten-plakalar$/i, "-traverten-plakalar");
    if (productKey === "tiles")  return base.replace(/-traverten-plakalar$/i, "-traverten-karolar");
    if (productKey === "blocks") return base.replace(/-traverten-plakalar$/i, "-traverten-bloklar");
    if (productKey === "pavers") return base.replace(/-traverten-plakalar$/i, "-traverten-dosemeler");
    return base; // plakalar (slabs)
  }

  // cut key + kanonik slug (sağlamlaştırılmış)
  const rawCutSlug = String(cutSlugSegment || "");
  // 1) lib helper
  let cutKey = cutKeyFromExternalSlug(locale, rawCutSlug);
  // 2) zayıf tahmin (slug içindeki kelimelere bak)
  if (!cutKey) {
    if (/cross|enine/i.test(rawCutSlug))      cutKey = "cross-cut";
    else if (/vein|damar/i.test(rawCutSlug))  cutKey = "vein-cut";
  }
  // 3) son emniyet
  if (!cutKey) cutKey = "vein-cut";

  const canonicalCutSlug = cutSlugForProduct(locale, cutKey, productKey) || rawCutSlug;

  // ProductIntroSection içerikleri
  const cutTitle = safe(() => t(`${productKey}.cuts.${cutKey}.title`), CUTS[lang]?.[cutKey] || cutKey);
  const cutIntro = safe(
    () => t(`${productKey}.cuts.${cutKey}.intro`),
    safe(() => t(`${productKey}.cuts.${cutKey}.processes.subtext`), "")
  );
  const title2   = safe(() => t(`${productKey}.cuts.${cutKey}.title2`), safe(() => t(`slabs.title2`), null));
  const intro2   = safe(() => t(`${productKey}.cuts.${cutKey}.intro2`),  safe(() => t(`slabs.intro2`),  null));
  const span     = safe(() => t(`${productKey}.cuts.${cutKey}.span`),    safe(() => t(`slabs.span`),null));

  const cardTextClass = "text-[14px] leading-[120%] text-neutral-700 text-center";

  const opt = (key, fallback = "") => {
    try {
      const v = t(key);
      return v && v !== key ? v : fallback;
    } catch {
      return fallback;
    }
  };

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

  const optRaw = (key, fallback = null) => {
    try {
      const v = t.raw(key);
      return v ?? fallback;
    } catch {
      return fallback;
    }
  };

  const cardTitle1 = opt(`${productKey}.cuts.${cutKey}.detailsHeadings.title1`, "");
  const cardTitle2 = opt(`${productKey}.cuts.${cutKey}.detailsHeadings.title2`, "");
  const cardTitle3 = opt(`${productKey}.cuts.${cutKey}.detailsHeadings.title3`, "");
  const cardTitle4 = opt(`${productKey}.cuts.${cutKey}.detailsHeadings.title4`, "");
  const description = optRaw(`${productKey}.cuts.${cutKey}.description`, "");

  const variantHeader = optRaw(`${productKey}.cuts.${cutKey}.variants.title`, "");
  const variantText   = optRaw(`${productKey}.cuts.${cutKey}.variants.text`, "");

  // Hero görsel (ürün+cut → cover → fallback)
  const heroOverride = safe(() => t.raw(`${productKey}.cuts.${cutKey}.hero.src`), null);
  const heroAltOver  = safe(() => t(`${productKey}.cuts.${cutKey}.hero.alt`), null);
  const heroSrc =
    heroOverride ||
    IMAGE_BY_PRODUCT?.[productKey]?.[cutKey] ||
    IMAGE_BY_PRODUCT?.[productKey]?.cover;
  const heroAlt = heroAltOver || cutTitle;

  // Process grupları
  const processNode = safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes`), {});
  const groups = processNode?.groups || {};
  const meta   = processNode?.meta   || {};

  const ytCombined  = safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes.youtube.combined`), {}) || {};

  // i18n’de filled-natural var mı?
  const hasFilledNatural =
    safe(() => t.has(`${productKey}.cuts.${cutKey}.processes.filled-natural.title`), false) ||
    safe(() => t.has(`${productKey}.cuts.${cutKey}.processes.filled-natural.h1`), false);

  // filled grubunun item’larına natural/dogal’ı gerektiğinde en sona ekle
  if (hasFilledNatural) {
    const arr = Array.isArray(groups?.filled?.items) ? [...groups.filled.items] : [];
    if (!arr.includes("natural") && !arr.includes("dogal")) {
      arr.push("natural");
    }
    groups.filled = { ...(groups.filled || {}), items: arr };
  }

  const makeGroupCards = (groupName) => {
    const items   = groups[groupName]?.items || [];
    const heading = safe(() => t(`${productKey}.cuts.${cutKey}.processes.groups.${groupName}.heading`), groupName);
    const text    = safe(() => t(`${productKey}.cuts.${cutKey}.processes.groups.${groupName}.text`), "");

    const groupImgMap = {};

    const variantCards = items.map((pKey) => {
      const isNatural = (pKey === "natural" || pKey === "dogal");
      const titleKey  = isNatural
        ? `${productKey}.cuts.${cutKey}.processes.meta.natural.title`
        : `${productKey}.cuts.${cutKey}.processes.meta.${pKey}.title`;
      const title = safe(() => t(titleKey), pKey);

      const processSlug = isNatural
        ? procSlugFor(locale, groupName, "natural")
        : procSlugFor(locale, groupName, pKey);

      const normalizedKey = isNatural ? "natural" : pKey;
      const combinedKey   = `${groupName}:${normalizedKey}`;

      const youtubeUrl = ytCombined[combinedKey] || null;

      const imagesCombined =
        safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes.images.combined`), null);
      const imgI18n =
        imagesCombined?.[combinedKey] ?? null;

      const imgByProduct =
        IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[combinedKey] || null;

      let image;
      if (productKey === "tiles") {
        image = imgByProduct || heroSrc;
      } else {
        image =
          imgI18n ||
          imgByProduct ||
          PROCESS_THUMB_BY_COMBINED?.[combinedKey] ||
          (isNatural
            ? (PROCESS_THUMB_BY_COMBINED?.["unfilled:natural"] ||
               PROCESS_THUMB_BY_COMBINED?.["filled:natural"])
            : null) ||
          heroSrc;
      }

      groupImgMap[combinedKey] = image;

      const href = {
        pathname: "/travertine/[product]/[cut]/[process]",
        params: { product: String(productSlug), cut: canonicalCutSlug, process: processSlug }
      };

      return {
        slug: combinedKey,
        vKey: combinedKey,
        title,
        href,
        alt: title,
        youtubeUrl
      };
    });

    return { heading, text, variantCards, imgMap: groupImgMap };
  };

  const filledBlock   = makeGroupCards("filled");
  const unfilledBlock = makeGroupCards("unfilled");

  const variantImgMapAll = { ...(filledBlock.imgMap || {}), ...(unfilledBlock.imgMap || {}) };

  // TextSection
  const textSectionCut = safe(() => t.raw(`${productKey}.cuts.${cutKey}.TextSection`), null);
  const textSectionTop = safe(() => t.raw(`${productKey}.TextSection`), {});
  const textSectionObj = textSectionCut || textSectionTop;

  const textSections = [];
  let i = 1;
  while (
    textSectionObj?.[`header${i}`] ||
    textSectionObj?.[`text${i}`] ||
    textSectionObj?.[`subheader${i}`] ||
    textSectionObj?.[`subtext${i}`]
  ) {
    const header = textSectionObj[`header${i}`];
    const text   = textSectionObj[`text${i}`];
    const subh   = textSectionObj[`subheader${i}`];
    const subt   = textSectionObj[`subtext${i}`];
    const secTitle = header || subh || `${cutTitle} — Section ${i}`;
    const paras    = [text, subt].filter(Boolean);
    if (secTitle || paras.length) textSections.push({ id: i, title: secTitle, paragraphs: paras });
    i++;
  }

  // FAQ
  const qCut = safe(() => t.raw(`${productKey}.cuts.${cutKey}.QuestionsItems`), null);
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

  // ---- Info cards içeriği
  const cards = [
    {
      title: cardTitle1,
      content: Array.isArray(description) ? description[0] : description ,
    },
    {
      title: cardTitle2,
      content: Array.isArray(description) ? description[1] : "",
    },
    {
      title: cardTitle3,
      content: Array.isArray(description) ? description[2] ?? "" : "",
    },
    {
      title: cardTitle4,
      content: Array.isArray(description) ? description[3] ?? "" : "",
    },
  ];

  const hrefForCut = (pkey, ckey) => ({
    pathname: "/travertine/[product]/[cut]",
    params: {
      product: productSlugFor(locale, pkey),
      cut:     cutSlugForProduct(locale, ckey, pkey),
    },
  });

  const productLabel = PRODUCT_LABEL[lang]?.[productKey] || productSlug;
  const cutLabel     = CUT_LABEL[lang]?.[cutKey]         || cutKey;

  const items = [
    { label: locale.startsWith("tr") ? "Traverten" : "Travertine", href: `/${locale}/${baseSegment}` },
    { label: productLabel, href: `/${locale}/${baseSegment}/${productSlug}` },
    { label: cutLabel,     href: `/${locale}/${canonicalCutSlug}` },
  ];

  //otherOptions için
  const otherCutKey = cutKey === "vein-cut" ? "cross-cut" : "vein-cut";

  const SHOWCASE_COMBOS = [
    { group: "filled",   proc: "polished" },
    { group: "filled",   proc: "honed"    },
    { group: "unfilled", proc: "honed"    },
  ];

  const processTitleFor = (group, proc) => {
    const tr = locale.startsWith("tr");
    const fillText = tr
      ? (group === "filled" ? "Dolgulu" : "Dolgusuz")
      : (group === "filled" ? "Filled"  : "Unfilled");
    const procMap = tr
      ? { honed:"Honlanmış", polished:"Cilalı", brushed:"Fırçalanmış", tumbled:"Eskitilmiş", natural:"Doğal" }
      : { honed:"Honed",     polished:"Polished", brushed:"Brushed",   tumbled:"Tumbled",    natural:"Natural" };
    return `${fillText}  ${procMap[proc] || proc}`;
  };

  const otherCutLabel =
    (typeof CUT_LABEL !== "undefined" && CUT_LABEL[lang]?.[otherCutKey]) ||
    otherCutKey.replace("", " ");

  const otherOptionsItems = SHOWCASE_COMBOS.map(({ group, proc }) => {
    const combinedKey = `${group}:${proc}`;
    const img =
      IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[otherCutKey]?.[combinedKey] ||
      IMAGE_BY_PRODUCT?.[productKey]?.[otherCutKey] ||
      IMAGE_BY_PRODUCT?.[productKey]?.cover ||
      heroSrc;

    const processSlug = procSlugFor(locale, group, proc);

    return {
      title: `${processTitleFor(group, proc)} ${otherCutLabel}  `,
      img,
      href: {
        pathname: "/travertine/[product]/[cut]/[process]",
        params: {
          product: String(productSlug),
          cut:     cutSlugForProduct(locale, otherCutKey, productKey),
          process: processSlug
        }
      }
    };
  });


  //sayfa içi linkleme

function blogPath(locale, slug) {
  const finalSlug = resolveBlogSlug(locale, slug);
  return `/${locale}/${finalSlug}`;
}

function productKeyTr(locale, productKey) {
  if (!locale.startsWith("tr")) return productKey; // İngilizce -> orijinal productKey

  switch (productKey) {
    case "slabs":  return "plakalar";
    case "tiles":  return "karolar";
    case "blocks": return "bloklar";
    case "pavers": return "dosemeler";
    default:       return productKey;
  }
}

  function makeBlogPatterns(locale, productKey) {
  const patterns = [];

  // travertine blocks / slabs / tiles / pavers
  if (locale.startsWith("tr")) {
    patterns.push(
        {
        pattern: /\bFOB?\b/gi,
        href: blogPath(locale, "nasil-ihracat-yapiyoruz/fob"),
      },
            {
        pattern: /\bCIF?\b/gi,
        href: blogPath(locale, "nasil-ihracat-yapiyoruz/cif"),
      },
      {
        pattern: /\btraverten blok(lar)?\b/gi,
        href: blogPath(locale, "traverten-bloklar"),
      },
      {
        pattern: /\btraverten plakalar?\b/gi,
        href: blogPath(locale, "traverten-plakalar"),
      },
      {
        pattern: /\btraverten karo(lar)?\b/gi,
        href: blogPath(locale, "traverten-karolar"),
      },
      {
        pattern: /\btraverten d(ö|o)şemeler?\b/gi,
        href: blogPath(locale, "traverten-dosemeler"),
      },
           {
        pattern: /\bpolished?\b/gi,
        href: blogPath(locale, `/dolgulu-cilali-damar-kesim-traverten-${productKeyTr(locale, productKey)}`),
      },
       {
        pattern: /\bhoned?\b/gi,
        href: blogPath(locale, `/dolgulu-honlanmis-damar-kesim-traverten-${productKeyTr(locale, productKey)}`),
      },
           {
        pattern: /\bbrushed?\b/gi,
        href: blogPath(locale,  `/dolgulu-fircalanmis-damar-kesim-traverten-${productKeyTr(locale, productKey)}`),
      },
            {
        pattern: /\btumbled?\b/gi,
        href: blogPath(locale,  `/dolgulu-eskitilmis-damar-kesim-traverten-${productKeyTr(locale, productKey)}`),
      }
    );
  } else {
    patterns.push(
        {
        pattern: /\bFOB?\b/gi,
        href: blogPath(locale, "how-we-export/fob"),
      },
            {
        pattern: /\bCIF?\b/gi,
        href: blogPath(locale, "how-we-export/cif"),
      },
      {
        pattern: /\btravertine blocks?\b/gi,
        href: blogPath(locale, "travertine-blocks"),
      },
      {
        pattern: /\btravertine slabs?\b/gi,
        href: blogPath(locale, "travertine-slabs"),
      },
      {
        pattern: /\btravertine tiles?\b/gi,
        href: blogPath(locale, "travertine-tiles"),
      },
      {
        pattern: /\btravertine pavers?\b/gi,
        href: blogPath(locale, "travertine-pavers"),
      },
           {
        pattern: /\bpolished?\b/gi,
        href: blogPath(locale, `/filled-polished-vein-cut-travertine-${productKey}`),
      },
       {
        pattern: /\bhoned?\b/gi,
        href: blogPath(locale, `/filled-honed-vein-cut-travertine-${productKey}`),
      },
           {
        pattern: /\bbrushed?\b/gi,
        href: blogPath(locale,  `/filled-brushed-vein-cut-travertine-${productKey}`),
      },
            {
        pattern: /\btumbled?\b/gi,
        href: blogPath(locale,  `/filled-tumbled-vein-cut-travertine-${productKey}`),
      }
    );
  }

  // Renk blogları (Blaundos Antiko / Light / Ivory)
   // ---- BLOK SAYFASI
  if (productKey === "blocks") {
    patterns.push(
      {
        pattern: /\bAntiko\b/gi,
        href: blogPath(locale, "antico-travertine-blocks"),
      },
      {
        pattern: /\bLight\b/gi,
        href: blogPath(locale, "light-travertine-blocks"),
      },
      {
        pattern: /\bIvory\b/gi,
        href: blogPath(locale, "ivory-travertine-blocks"),
      }
    );
  }
  // ---- SLABS SAYFASI
  else if (productKey === "slabs") {
    patterns.push(
      {
        pattern: /\bAntiko\b/gi,
        href: blogPath(
          locale,
          "antico-filled-honed-vein-cut-travertine-slabs"
        ),
      },
      {
        pattern: /\bLight\b/gi,
        href: blogPath(
          locale,
          "light-filled-honed-vein-cut-travertine-slabs"
        ),
      },
      {
        pattern: /\bIvory\b/gi,
        href: blogPath(
          locale,
          "ivory-filled-honed-vein-cut-travertine-slabs"
        ),
      }
    );
  }
  // ---- TILES / PAVERS vb. DİĞER ÜRÜNLER
  else {
    patterns.push(
      {
        pattern: /\bAntiko\b/gi,
        href: blogPath(
          locale,
          `8x8-filled-honed-vein-cut-travertine-${productKey}#product-intro`
        ),
      },
      {
        pattern: /\bLight\b/gi,
        href: blogPath(
          locale,
          `8x8-filled-honed-vein-cut-travertine-${productKey}#product-intro`
        ),
      },
      {
        pattern: /\bIvory\b/gi,
        href: blogPath(
          locale,
          `8x8-filled-honed-vein-cut-travertine-${productKey}#product-intro`
        ),
      }
    );
  }

  // Quarry → travertine quarry
  patterns.push({
    pattern: /\bquarry\b/gi,
    href: blogPath(locale, "travertine-quarry"),
  });

  return patterns;
}

const blogLinkPatterns = makeBlogPatterns(locale, productKey);

  const isSizeDriven = productKey === "tiles" || productKey === "pavers";
  const sizeSlugs =
    productKey === "tiles"  ? TILE_SIZES_TILES
    : productKey === "pavers" ? TILE_SIZES_PAVERS
    : [];

  const defaultCutSlug = cutSlugForProduct(locale, "vein-cut", productKey);
  const defaultProcSlug = defaultProc(locale);

  const sizeLinkPatterns = isSizeDriven
    ? sizeSlugs.map((s) => {
        const rx = sizeRegexForSlug(s);
        // tiles: versailles-set, pavers: versailles-pattern (URL başında size geliyor)
        const sizeForUrl =
          productKey === "tiles"  && s === "versailles-pattern" ? "versailles-set" :
          productKey === "pavers" && s === "versailles-set"     ? "versailles-pattern" :
          s;
        return {
          pattern: rx,
          href: `/${locale}/${sizeForUrl}-${defaultProcSlug}-${defaultCutSlug}`,
        };
      })
    : [];

 // linkleme son   

  // 🔹 META & CANONICAL
// 🔹 META & CANONICAL (t() sadece key varsa çağrılıyor)
const metaTitleKey = `${productKey}.cuts.${cutKey}.metaTitle`;
const metaDescKey  = `${productKey}.cuts.${cutKey}.metaDesc`;

const metaTitle = safe(() => {
  if (typeof t.has === "function" && t.has(metaTitleKey)) {
    return t(metaTitleKey);
  }
  return cutTitle;
}, cutTitle);

const metaDesc = safe(() => {
  if (typeof t.has === "function" && t.has(metaDescKey)) {
    return t(metaDescKey);
  }
  return cutIntro;
}, cutIntro);

const canonical = `https://majen.com.tr/${locale}/${canonicalCutSlug}`;

const productAltMap = {
    blocks: "Blocks",
    slabs: "Slabs",
    tiles: "Tiles",
    "pavers": "Pavers",
  };

  return (
    <main className="py-6 mt-[22px] lg:mt-7 overflow-x-hidden text-center w-full">
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
        title={cutTitle}
        intro={cutIntro}
        title2={title2}
        intro2={intro2}
        heroSrc={heroSrc}
        alt={heroAlt}
        prefix={`/${locale}`}
        baseHref={`/${locale}/${baseSegment}`}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
        span={span}
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
      
      {/* Info Cards */}
      {/* <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto w-[95%]">
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
      </section> */}

         {/* 4 BİLGİ KARTI */}
           <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto w-[95%]">
        {cards.map((c, i) => {
          const plain =
            typeof c.content === "string"
              ? c.content
              : Array.isArray(c.content)
              ? c.content.join(", ")
              : "";
      
              // 🔗 3. kart (index 2): tiles/pavers ise ölçüleri linke çevir (bold)
                  const patternsForCard =
            i === 1 && sizeLinkPatterns.length > 0
              ? sizeLinkPatterns
              : i === 1
              ? [...linkPatterns, ...blogLinkPatterns]
              : blogLinkPatterns;
      
      
          return (
             <InfoCard key={i} title={c.title} contentClassName={cardTextClass}>
              {patternsForCard.length ? (
                <InlineLinks
                  text={plain || ""}
                  patterns={patternsForCard}
                  textClassName={cardTextClass}
                />
              ) : (
                <span className={cardTextClass}>{plain}</span>
              )}
            </InfoCard>
          );
        })}
      </section>

      

    <section id="product-intro">
        <h2 className="text-[22px] lg:text-[24px] font-semibold mt-12">{variantHeader}</h2>
      <p className="text-[12px] lg:text-[14px] mt-3 leading-tight lg:leading-[140%] w-[90%] max-w-[1200px] mx-auto -mb-2">
        {variantText}
      </p>
 
      {/* Filled */}
      {filledBlock.variantCards.length > 0 && (
        <VariantCircleSection
          heading={filledBlock.heading}
          text={filledBlock.text}
          variantCards={filledBlock.variantCards}
          imgMap={variantImgMapAll}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
          productKey={productKey}
          imgAlt={`${productKey}  ${cutKey} `}
        />
      )}

      {/* Unfilled */}
      {unfilledBlock.variantCards.length > 0 && (
        <VariantCircleSection
          heading={unfilledBlock.heading}
          text={unfilledBlock.text}
          variantCards={unfilledBlock.variantCards}
          imgMap={variantImgMapAll}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
          productKey={productKey}
        />
      )}
    </section>

      {/* TEXT SECTIONS – eski data + yeni link yapısı */}
      {textSections.map(({ id, title, paragraphs }, index) => {
        // Eski versiyonda i = 1..N idi, burada index 0’dan başlıyor:
        const sectionIndex = index + 1;

        // Bu section için blog + incoterm pattern’ları
        const blogPatterns = getBlogPatterns(productKey, sectionIndex, locale);
        const incotermPatterns = getIncotermPatterns(locale);
        const patterns = [...blogPatterns, ...incotermPatterns];

        // Eski versiyondaki paragraphs string’lerini InlineLinks ile sarmalıyoruz
        const enhancedParagraphs = (paragraphs || []).map((p, i) => (
          <InlineLinks
            key={`p-${id}-${i}`}
            text={p}
            patterns={patterns}
            textClassName="" // stil TextSection içindeki <p>’den gelsin
            linkClassName="text-teal-700 underline underline-offset-4 hover:no-underline"
          />
        ));

        return (
          <TextSection
            key={id}
            title={title}
            paragraphs={enhancedParagraphs}
            schema={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: `Wholesale Travertine ${productAltMap[productKey]} from Turkey`,
              author: { "@type": "Organization", name: "Majen" },
              publisher: { "@type": "Organization", name: "Majen" },
            }}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"
            title2=""
            text2=""
          />
        );
      })}


      {faqItems.length > 0 && (
        <div id="faq" className="max-w-5xl mx-auto mt-12">
          <QuestionsSection items={faqItems} span={cutTitle} />
        </div>
      )}

      <SocialMediaSection />
      <ContactFrom />

      <OtherOptions
        heading={locale === "tr" ? "Diğer Seçenekler" : "Other Options"}
        customItems={otherOptionsItems}
        excludeProduct={productKey}
        productOrder={["slabs", "tiles", "pavers"]}
        baseHref={`${prefix}/${baseSegment}`}
        productSegments={{
          slabs: productSlugFor(locale, "slabs"),
          tiles: productSlugFor(locale, "tiles"),
          pavers: productSlugFor(locale, "pavers"),
        }}
        locale={locale}
        productImages={{ slabs, tiles, pavers: special }}
        productHrefFor={(pkey) => ({
          pathname: "/travertine/[product]",
          params: { product: productSlugFor(locale, pkey) }
        })}
      />
    </main>
  );
}
