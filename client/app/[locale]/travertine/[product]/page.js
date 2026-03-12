"use client";
import { useParams, usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import { useLocale, useTranslations, useMessages } from "next-intl";
import React from "react";
import { colorKeys, colorSlugFor, colorLabelFor } from "@/lib/travertine";
import {
  baseFor,
  productSlugFor,
  productKeyFromSlug,
  hasDeepLevels,
  CUTS,
  getLang,
  productUrl,
  cutSlugFor,
  PRODUCT_SLUGS
} from "@/lib/travertine";
import blocks from "@/public/images/deneme/ivoryblok.webp";
import slabs from "@/public/images/deneme/slabson.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/homepage/Pavers3.webp";
import { PRODUCT_IMG, IMAGE_BY_PRODUCT_AND_VARIANT } from "@/app/[locale]/(catalog)/_images";
import { DetailBlock } from "@/app/[locale]/(catalog)/_ui";
import ProductIntroSection from "../../components/products1/ProductIntroSection";
import TextSection from "../../components/products1/TextSection";
import ContactFrom from "../../components/generalcomponent/ContactFrom";
import SocialMediaSection from "../../components/products1/SocialMediaSection";
import InlineLinks from "../../components/generalcomponent/InlineLinks";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import VariantCircleSection2 from "../../components/products1/VariantCircleSection"; 
import OtherOptions from "../../components/generalcomponent/OtherOptions";
import BreadcrumbsExact from "../../components/generalcomponent/BreadcrumbsExact";

import {
  TILE_SIZE_SLUGS_TILES as TILE_SIZES_TILES,
  TILE_SIZE_SLUGS_PAVERS as TILE_SIZES_PAVERS,
} from "@/lib/labels";

// --- Blog & Incoterm inline link pattern'ları ---

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

function blogPath(locale, slug) {
  const finalSlug = resolveBlogSlug(locale, slug);
  return `/${locale}/${finalSlug}`;
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
        ];
      case 2:
        return [
          {
            pattern: /\bwholesalers\b/i,
            href: base("travertine-distributor"),
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
            pattern: /\bquarry-direct exporter?\b/i,
            href: base("travertine-exporter"),
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
       
        ];

        case 2:
          return [
                 {
            pattern: /\bhoned?\b/i,
            href: base("honed-travertine"),
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
            pattern: /\bpool decks?\b/i,
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
            pattern: /\bwholesalers\b/i,
            href: base("travertine-distributor"),
          },
        ];
      default:
        return [];
    }
  }

  return [];
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




// güvenli kaçış
const esc = (s) => String(s ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// "8x8" gibi slug → metinde şu varyasyonları yakala: 8x8, 8×8, 8" x 8", 8″×8″, 8 x 8 vb.
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

// tiles/pavers için default cut & process (metin içinde bulduğumuzu linke çevireceğiz)
function defaultProc(locale) {
  return locale.startsWith("tr") ? "dolgulu-honlanmis" : "filled-honed";
}

// metindeki ölçülerden (tekrar etmeyen) link pattern'ları üret
// ölçü yakalayıcı yardımcı
function buildSizePatternsFromText(text, { locale, productKey, cutSlugForProduct }) {
  if (!text) return [];
  const found = new Set();
  const out = [];

  const defaultProcSlug = locale.startsWith("tr") ? "dolgulu-honlanmis" : "filled-honed";
  const defaultCutSlug  = cutSlugForProduct(locale, "vein-cut", productKey);

  const safe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // metindeki tüm "WxH" örneklerini kaba bir aramayla bul
  const ROUGH = /(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)/gi;
  let m;
  while ((m = ROUGH.exec(text))) {
    const w = m[1], h = m[2];
    const sizeSlug = `${w}x${h}`;
    if (found.has(sizeSlug)) continue;
    found.add(sizeSlug);

    // akıllı tırnakları her sayının hemen sonuna opsiyonel ekle
    const variantRx = new RegExp(
      `\\b${safe(w)}(?:["″”])?\\s*[x×]\\s*${safe(h)}(?:["″”])?(?:\\s*(?:cm|mm|in))?\\b`,
      "gi"
    );

    out.push({
      pattern: variantRx,
      href: `/${locale}/${sizeSlug}-${defaultProcSlug}-${defaultCutSlug}`,
    });
  }
  return out;
}



function InfoCard({ title, children, contentClassName = "text-sm text-neutral-600 leading-tight text-center" }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

export default function ProductPage() {
  const { product } = useParams(); // bu, URL'deki product SLUG'ı (yerelleştirilmiş)
  const locale = useLocale();
  const lang = getLang(locale);

  // 1) Sadece geçerli ürün slug’ları izinli:
 const allowed = new Set(Object.values(PRODUCT_SLUGS[lang] || {})); // örn. {"blocks","slabs","tiles","pavers"}'ın localized halleri
 const seg = String(product || "").toLowerCase();
 if (!allowed.has(seg)) notFound();

  const t = useTranslations("ProductPage");
  const validProducts = new Set(Object.values(PRODUCT_SLUGS[lang] || {})); 

const opt = (key, fallback = "") => {
  if (typeof t.has === "function" && !t.has(key)) return fallback;
  try {
    const v = t(key);
    return v && v !== key ? v : fallback; // key aynen dönerse bulunamamıştır
  } catch {
    return fallback;
  }
};
const optRaw = (key, fallback = null) => {
  if (typeof t.has === "function" && !t.has(key)) return fallback;
  try {
    const v = t.raw(key);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
  const messages = useMessages();

  // ---- Slug -> key
  const productKey = productKeyFromSlug(locale, String(product));

  // ---- Base segment (ör. /en/wholesale-travertine-from-turkey)
  const baseSegment = baseFor(locale);
  const prefix = `/${locale}`;
  const baseHref = `/${locale}/${baseSegment}`; // yeni base; artık "travertines/travertenler" değil

  // ---- Ürün ana başlıkları
const title  = t(`${productKey}.title`);
  const alt    = opt(`${productKey}.alt`, "");
  const intro  = opt(`${productKey}.intro`, "");
  const title2 = opt(`${productKey}.title2`, "");
  const alt2   = opt(`${productKey}.alt2`, "");
  const intro2 = opt(`${productKey}.intro2`, "");

 const cardTitle1 = opt(`${productKey}.detailsHeadings.title1`, "");
 const cardTitle2 = opt(`${productKey}.detailsHeadings.title2`, "");
 const cardTitle3 = opt(`${productKey}.detailsHeadings.title3`, "");
 const cardTitle4 = opt(`${productKey}.detailsHeadings.title4`, "");
 const description = optRaw(`${productKey}.description`, intro);

  // ---- FAQ
  const qItems = messages?.ProductPage?.[productKey]?.QuestionsItems || {};
  const items = [];
  let j = 1;
  while (qItems[`aboutpage_s4_faq${j}_header`] && qItems[`aboutpage_s4_faq${j}_text`]) {
    items.push({
      q: qItems[`aboutpage_s4_faq${j}_header`],
      a: qItems[`aboutpage_s4_faq${j}_text`],
    });
    j++;
  }

  // ---- Cut heading/text (i18n)
  const cutsHeading = opt(`${productKey}.cuts.heading`, opt("cuts.heading", "Select Your Cut Type"));
  const cutsText    = opt(`${productKey}.cuts.text`,    opt("cuts.text",    "Choose between vein-cut and cross-cut."));

  // ---- Hero image
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc = typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap;

  // ---- Hangi ürün derinleşir?
 const showCutSelection = hasDeepLevels(productKey) && productKey !== "blocks";

  // ---- CUT kartları (yalnız slabs/tiles)
  const productSlug = productSlugFor(locale, productKey);


  const isBlocks = productKey === "blocks";
let colorCards = [];
if (isBlocks) {
   // i18n’den toplu görsel ve YouTube map’leri
    const blockImages =
      optRaw(`blocks.images`, null)    // "block" yazılmış olabilir; önce blocks
      || optRaw(`block.images`, null)  // fallback "block"
      || {};
    const blockYoutube =
      optRaw(`blocks.youtube`, null)
      || optRaw(`block.youtube`, null)
      || {};


  const colors = colorKeys(); // örn: ["ivory","light","antico"]
  colorCards = colors.map((ckey) => {
    const slug  = colorSlugFor(locale, ckey);             // "ivory" → "ivory" | "fildisi"
    const label = colorLabelFor(locale, ckey);  
     // Kısa SEO URL: /{locale}/{color}-travertine-blocks  (TR: /{locale}/{color}-traverten-bloklar)
 const pretty = locale.startsWith("tr")
   ? `/fildisi-traverten-bloklar`
   : `/${slug}-travertine-blocks`;

  // Görsel & YouTube (i18n → image map → fallback)
      const byVariantMap = (IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey] || {});
      const i18nImg = blockImages?.[ckey] || blockImages?.[slug];
      const mapImg  = byVariantMap?.[ckey] || byVariantMap?.[slug];
      const image   = i18nImg || mapImg ||
   (typeof imgMap === "object" ? imgMap?.[ckey] : undefined) ||
   `/images/blocks/${slug}.webp`;
      const youtubeUrl = blockYoutube?.[ckey] || blockYoutube?.[slug] || "";

    return {
      slug,
      vKey: ckey,
      title: locale.startsWith("tr")
   ? `Blaundos ${label} Traverten Blok`
   : `Blaundos ${label} Travertine Blocks`,
 description: locale.startsWith("tr")
   ? `Blaundos ${label} traverten blok tedariki.`
   : `Supply of Blaundos ${label} travertine blocks.`,
      // Yeni rota: /travertine/[product]/[color]
      // Yeni: kısa SEO link (string). Middleware bunu FS rotasına REWRITE edecek.
     href: pretty,
     img:image,
     youtubeUrl
    };
  });
}

    // Ürüne göre cut slug'ını düzelt (slabs→tiles/blocks/pavers)
   function cutSlugForProduct(locale, cutKey, productKey) {
    const lang = getLang(locale);
    const base = (CUTS[lang] || {})[cutKey] || cutKey; // örn: 'vein-cut-travertine-slabs'
    if (!base || typeof base !== "string") return cutKey;
    // EN dönüşümleri
    if (locale.startsWith("en")) {
      if (productKey === "slabs")             return base.replace(/-travertine-slabs$/i, "-travertine-slabs");
     if (productKey === "tiles")             return base.replace(/-travertine-slabs$/i, "-travertine-tiles");
      if (productKey === "blocks")            return base.replace(/-travertine-slabs$/i, "-travertine-blocks");
      if (productKey === "pavers" )
                                              return base.replace(/-travertine-slabs$/i, "-travertine-pavers");
    }
    // TR dönüşümleri
    if (productKey === "slabs")             return base.replace(/-traverten-plakalar$/i, "-traverten-plakalar");
     if (productKey === "tiles")             return base.replace(/-traverten-plakalar$/i, "-traverten-karolar");
    if (productKey === "blocks")            return base.replace(/-traverten-plakalar$/i, "-traverten-bloklar");
    if (productKey === "pavers" )
                                              return base.replace(/-traverten-plakalar$/i, "-traverten-dosemeler");
  }

  const cutCards = showCutSelection
    ? Object.keys(CUTS[lang] || {}).map((cutKey) => {
        const localizedCutSlug = cutSlugForProduct(locale, cutKey, productKey);
         const cutImagesObj = optRaw(`${productKey}.cuts.images`, {}) || {};
       const i18nImageTop = cutImagesObj?.[cutKey]; // (A) toplu
       const i18nImageOne = opt(`${productKey}.cuts.${cutKey}.image`, ""); // (B) tekil
       const image =
         i18nImageTop ||
         i18nImageOne ||
         (typeof imgMap === "object" ? imgMap?.[cutKey] : undefined) ||
         `/images/cuts/${cutKey}.jpg` ||
         heroSrc;

         const youtubeUrl = opt(`${productKey}.cuts.${cutKey}.youtube`, ""); // i18n’den oku
        return {
          slug: cutKey,
          title: opt(`${productKey}.cuts.${cutKey}.title`, cutKey),
          description: opt(`${productKey}.cuts.${cutKey}.desc`, ""),
          img: image,
          youtubeUrl, 
          href: {
           pathname: "/travertine/[product]/[cut]",
           params: { product: productSlug, cut: localizedCutSlug }
         },
        
        };
      })
    : [];

  // ---- Info cards içeriği
  const cards = [
    {
      title: cardTitle1,
      content: Array.isArray(description) ? description[0] : description || intro,
    },
    {
      title: cardTitle2,
      content: Array.isArray(description) ? description[1] ?? intro : intro,
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

  // ---- Inline link patternleri (metin içi “vein/cross” tıklanabilir)
const linkPatterns = locale.startsWith("tr")
   ? [
           {
       pattern: /damar[- ]kesim/i,
       href: `/${locale}/${baseSegment}/${productSlug}/${cutSlugForProduct(locale, "vein-cut", productKey)}`
     },
     {
       pattern: /enine[- ]kesim/i,
       href: `/${locale}/${baseSegment}/${productSlug}/${cutSlugForProduct(locale, "cross-cut", productKey)}`
     },
     ]
   : [
         {
       pattern: /vein[- ]cut/i,
       href: `/${locale}/${baseSegment}/${productSlug}/${cutSlugForProduct(locale, "vein-cut", productKey)}`
     },
     {
       pattern: /cross[- ]cut/i,
       href: `/${locale}/${baseSegment}/${productSlug}/${cutSlugForProduct(locale, "cross-cut", productKey)}`
     }
     ];


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
        pattern: /\btraverten blok(lar)?\b/gi,
        href: blogPath(locale, "traverten-bloklar-rehberi"),
      },
      {
        pattern: /\btraverten plakalar?\b/gi,
        href: blogPath(locale, "traverten-plakalar-rehberi"),
      },
      {
        pattern: /\btraverten karo(lar)?\b/gi,
        href: blogPath(locale, "karo-traverten-rehberi"),
      },
      {
        pattern: /\btraverten d(ö|o)şemeler?\b/gi,
        href: blogPath(locale, "traverten-dosemeler-rehberi"),
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
        pattern: /\btravertine blocks?\b/gi,
        href: blogPath(locale, "travertine-blocks-guide"),
      },
      {
        pattern: /\btravertine slabs?\b/gi,
        href: blogPath(locale, "travertine-slabs-guide"),
      },
      {
        pattern: /\btravertine tiles?\b/gi,
        href: blogPath(locale, "travertine-tiles-guide"),
      },
      {
        pattern: /\btravertine pavers?\b/gi,
        href: blogPath(locale, "travertine-pavers-guide"),
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


  // Ölçü bağlantı desenleri (tiles/pavers için) – lib/labels listesini kullan
  const isSizeDriven = productKey === "tiles" || productKey === "pavers";
  const sizeSlugs =
    productKey === "tiles"  ? TILE_SIZES_TILES
    : productKey === "pavers" ? TILE_SIZES_PAVERS
    : [];

  const defaultCutSlug = cutSlugForProduct(locale, "vein-cut", productKey);
  const defaultProcSlug = defaultProc(locale);

  // 3. kart metni içindeki ölçüleri → SEO kısa URL’ye çevir
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




 const heroAlt = locale.startsWith("tr")
   ? `Türkiye'den toptan traverten ${opt(`${productKey}.name`, productKey)}`
   : `Wholesale travertine ${opt(`${productKey}.name`, productKey)} from Turkey`;
  const cardTextClass = "text-[14px] leading-[120%] text-neutral-700 text-center";

  // ---- Breadcrumb
const rawPath   = usePathname();
const pathname  = typeof rawPath === "string" ? rawPath : "";
const segments  = pathname.split("/").filter(Boolean);

const lastSeg   = segments.at(-1) ?? "";                    // örn: "vein-cut"
const words     = lastSeg.split(/[-\s]+/).filter(Boolean);  // ["vein","cut"]

// Sadece iki kelimeyse sonuncuyu al; değilse segmenti aynen bırak
const selectedSegments = [...segments.slice(-1)]; // olduğu gibi kalsın

  // ---- Diğer seçenekler (çoğul anahtarlar!)
  const productAltMap = {
    blocks: "Blocks",
    slabs: "Slabs",
    tiles: "Tiles",
    "pavers": "Pavers",
  };

  return (
    <main className="py-6  mt-[22px] lg:mt-7 overflow-x-hidden">
      {/* ÜST INTRO */}
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
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        selectedSegments={selectedSegments}
        className="mt-6"
      />

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
      i === 2 && sizeLinkPatterns.length > 0
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


      {/* SLABS / TILES → Kesim seçimi */}
 {showCutSelection ? (
   <VariantCircleSection2
     heading={cutsHeading}
     text={cutsText}
     variantCards={cutCards}
     imgMap={imgMap}
     heroSrc={heroSrc}
     IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
     productKey={productKey}
   />
) : isBlocks ? (
   <VariantCircleSection2
     heading={locale.startsWith("tr") ? "Traverten Blok Renkler" : "Travertine Block Colors"}
     text={
       locale.startsWith("tr")
         ? "Majen, toptan traverten bloklarda üç özel Blaundos çeşidi sunar: Blaundos Antiko (gri-bej antik tonlar), Blaundos Light (açık bej) ve Blaundos Ivory (fildişi–krem). Bu bloklar çoğunlukla plaka kesimi veya özel işleme hazır doğal ocak yüzeyleriyle sevk edilir. Her renk, lüks cepheler, iç mekânlar veya büyük ölçekli ticari projeler için farklı bir karakter sunar. Talep üzerine esnek yüzey işlemleri sağlayarak mimarlar ve toptancılar için uyarlanabilir çözümler üretiriz."
         : "We supply three exclusive varieties of Wholesale Travertine Blocks: Blaundos Antiko (grey-beige antique tones), Blaundos Light (light beige), and Blaundos Ivory (ivory-cream). These blocks are primarily delivered with natural quarry surfaces, ready for slab cutting or custom processing. Each variety provides distinct tones for luxury façades, interiors or large-scale commercial projects. With flexible finishes available upon request, Majen ensures adaptability for diverse architectural needs."
     }
     variantCards={colorCards}
     imgMap={IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey] || imgMap}
     heroSrc={heroSrc}
     IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
     productKey={productKey}
   />
 ) : null}

      {/* Blocks / pavers → burada artık renk varyantı YOK. 
          İstersen bu blok yerine direkt teknik bölümleri, CTA, görseller vs. göster. */}

      {/* Serbest metin bölümleri */}
      {(() => {
  const textSectionRaw = optRaw(`${productKey}.TextSection`, {}) || {};
  const sections = [];
  let i = 1;

  while (
    textSectionRaw[`header${i}`] ||
    textSectionRaw[`text${i}`] ||
    textSectionRaw[`subheader${i}`] ||
    textSectionRaw[`subtext${i}`]
  ) {
    const header = textSectionRaw[`header${i}`];
    const text = textSectionRaw[`text${i}`];

    const titleForSection = header || `${title} — Section ${i}`;

    // 🔗 Bu section için blog + incoterm pattern'ları
    const blogPatterns = getBlogPatterns(productKey, i, locale);
    const incotermPatterns = getIncotermPatterns(locale);
    const patterns = [...blogPatterns, ...incotermPatterns];

    const paragraphsForSection = [];
    if (text) {
      paragraphsForSection.push(
        <InlineLinks
          key={`p-${productKey}-${i}`}
          text={text}
          patterns={patterns}
          textClassName="" // stil p'den gelsin
          linkClassName="text-teal-700 underline underline-offset-4 hover:no-underline"
        />
      );
    }

    if (titleForSection || paragraphsForSection.length) {
      sections.push({
        id: i,
        title: titleForSection,
        paragraphs: paragraphsForSection,
      });
    }
    i++;
  }

  return sections.map(({ id, title: secTitle, paragraphs }) => (
    <TextSection
      key={id}
      title={secTitle}
      paragraphs={paragraphs}
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
  ));
})()}


      <SocialMediaSection />
      <ContactFrom />
      <div id="faq" className="max-w-5xl mx-auto mt-12">
        <QuestionsSection items={items} span={`Travertine ${productAltMap[productKey]}`} />
      </div>

      <OtherOptions
        heading={locale === "tr" ? "Diğer Seçenekler" : "Other Options"}
        excludeProduct={productKey}
        productOrder={["blocks", "slabs", "tiles", "pavers"]} //blocks olmalı burası
        baseHref={`${prefix}/${baseSegment}`}
        productSegments={{
          blocks: productSlugFor(locale, "blocks"),
          slabs: productSlugFor(locale, "slabs"),
          tiles: productSlugFor(locale, "tiles"),
          "pavers": productSlugFor(locale, "pavers"),
        }}
        locale={locale}
        productImages={{ blocks: blocks, slabs, tiles, "pavers": special }}
        productHrefFor={(pkey) => productUrl(locale, pkey)}
      />
    </main>
  );
}
