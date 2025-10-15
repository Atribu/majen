// app/[locale]/travertine/[product]/[cut]/[process]/layout.jsx
import Script from "next/script";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

/** Locale → kök segment */
const BASE_BY_LOCALE = { en: "travertine", tr: "traverten", de: "travertin", ru: "travertin" };

/** Process layout’u olan ürünler (blocks hariç) */
const PROCESS_PRODUCTS = new Set(["slabs", "tiles", "special", "special-designs"]);

/** UI label’ları (breadcrumb için) */
const PRODUCT_LABEL = {
  slabs: { en: "Travertine Slabs", tr: "Traverten Plakalar" },
  tiles: { en: "Travertine Tiles", tr: "Traverten Karolar" },
  "special-designs": { en: "Custom Designs", tr: "Özel Tasarım" },
  special: { en: "Custom Designs", tr: "Özel Tasarım" }, // alias
};

/** Kesim kısa anahtarını üret ("vein-cut" | "cross-cut") */
function shortCutKey(full) {
  const s = String(full || "").toLowerCase();
  if (/^vein-cut|^damar-kesim/.test(s)) return "vein-cut";
  if (/^cross-cut|^enine-kesim/.test(s)) return "cross-cut";
  return "vein-cut";
}

/** EN/TR ürün adını cut slug'ında doğru son ekle normalize et */
function ensureProductInCutSlug(locale, cut, product) {
  const isTR = locale === "tr";
  const p = product === "special" ? "special" : product;
  if (isTR) {
    return String(cut)
      .replace(/-traverten-plakalar$/i, `-traverten-${p === "slabs" ? "plakalar" : p === "tiles" ? "karolar" : "ozel-tasarim"}`)
      .replace(/-traverten-karolar$/i,  `-traverten-${p === "tiles" ? "karolar" : p === "slabs" ? "plakalar" : "ozel-tasarim"}`)
      .replace(/-traverten-ozel-tasarim$/i, `-traverten-${p === "special" ? "ozel-tasarim" : p === "slabs" ? "plakalar" : "karolar"}`);
  }
  return String(cut)
    .replace(/-travertine-slabs$/i,   `-travertine-${p === "slabs" ? "slabs" : p === "tiles" ? "tiles" : "special"}`)
    .replace(/-travertine-tiles$/i,   `-travertine-${p === "tiles" ? "tiles" : p === "slabs" ? "slabs" : "special"}`)
    .replace(/-travertine-special$/i, `-travertine-${p === "special" ? "special" : p === "slabs" ? "slabs" : "tiles"}`);
}

/** Process slug’ını i18n lookup için normalize et ("dolgulu-cilali"→EN anahtar "filled-polished") */
function toLookupProcKey(procSlug) {
  const s = String(procSlug || "").toLowerCase().trim();
  if (!s) return s;
  if (s === "dogal") return "natural";
  const [fillRaw, procRaw] = s.split("-");
  const fill = { dolgulu: "filled", dolgusuz: "unfilled", filled: "filled", unfilled: "unfilled" }[fillRaw] || fillRaw;
  const proc = {
    honlanmis: "honed", cilali: "polished", fircalanmis: "brushed", eskitilmis: "tumbled",
    honed: "honed", polished: "polished", brushed: "brushed", tumbled: "tumbled"
  }[procRaw] || procRaw;
  return s.includes("-") ? `${fill}-${proc}` : s; // "natural" gibi tek anahtar kalsın
}

/** Process adını breadcrumb’da okunur yapmak */
function humanProcessName(procSlug, locale) {
  const s = String(procSlug || "").toLowerCase();
  if (s === "natural" || s === "dogal") return locale === "tr" ? "Doğal" : "Natural";
  const [fill, proc] = s.split("-");
  if (!proc) return s.replace(/-/g, " ");
  if (locale === "tr") {
    const mapFill = { dolgulu: "Dolgulu", dolgusuz: "Dolgusuz" };
    const mapProc = { honlanmis: "Honlanmış", cilali: "Cilalı", fircalanmis: "Fırçalanmış", eskitilmis: "Eskitilmiş" };
    return `${mapFill[fill] || fill} ${mapProc[proc] || proc}`.replace(/\b\w/g, m => m.toUpperCase());
  }
  const mapFillEn = { filled: "Filled", unfilled: "Unfilled" };
  return `${mapFillEn[fill] || fill} ${proc}`.replace(/\b\w/g, m => m.toUpperCase());
}

/** Alternates helper */
function languageAlternates(url, locale) {
  const locales = ["en", "tr", "de", "ru"];
  const out = {};
  locales.forEach((l) => (out[l] = url.replace(`/${locale}/`, `/${l}/`)));
  return out;
}

/** Basit OG fallback (ürün + cut tipi) */
const OG_BY_PRODUCT_AND_CUT = {
  slabs: {
    vein:  { en: "/images/og/vein-cut-travertine-slabs-cover.webp",  tr: "/images/og/tr-vein-cut-traverten-plaka.webp" },
    cross: { en: "/images/og/cross-cut-travertine-slabs-cover.webp", tr: "/images/og/tr-cross-cut-traverten-plaka.webp" }
  },
  tiles: {
    vein:  { en: "/images/og/vein-cut-travertine-tiles-cover.webp",  tr: "/images/og/tr-vein-cut-traverten-karo.webp" },
    cross: { en: "/images/og/cross-cut-travertine-tiles-cover.webp", tr: "/images/og/tr-cross-cut-traverten-karo.webp" }
  },
  "special-designs": {
    vein:  { en: "/images/og/vein-cut-travertine-special-cover.webp",  tr: "/images/og/tr-vein-cut-traverten-ozel.webp" },
    cross: { en: "/images/og/cross-cut-travertine-special-cover.webp", tr: "/images/og/tr-cross-cut-traverten-ozel.webp" }
  }
};

function cutTypeKey(cut) {
  return /^vein-cut|^damar-kesim/i.test(String(cut)) ? "vein" : "cross";
}

export async function generateMetadata({ params }) {
  const { locale, product, cut, process } = await params;

  if (!PROCESS_PRODUCTS.has(product)) {
    return { robots: { index: false, follow: false } };
  }

  const isTR = locale === "tr";
  const normalizedCut = ensureProductInCutSlug(locale, cut, product);

  // 🔹 Kısa SEO canonical: /{locale}/{process}-{cut}
  // (Routing’de '/travertine/[product]/[cut]/[process]' → '/[process]-[cut]' map'lenmişti)
  const canonicalPath = `/${locale}/${process}-${normalizedCut}`;
  const canonicalUrl  = `${SITE_URL}${canonicalPath}`;

  // 🔹 i18n SEO override:
  // ProductPage.{product}.cuts.{vein-cut|cross-cut}.processes.{filled-polished|...}.seo
  const cutShort  = shortCutKey(normalizedCut);      // "vein-cut" | "cross-cut"
  const procLookup = toLookupProcKey(process);       // "filled-polished" | "natural" ...

  let tSeo;
  try {
    tSeo = await getTranslations({
      locale,
      namespace: `ProductPage.${product}.cuts.${cutShort}.processes.${procLookup}.seo`
    });
  } catch {
    tSeo = { has: () => false };
  }

  const ogFallback =
    OG_BY_PRODUCT_AND_CUT[product]?.[cutTypeKey(normalizedCut)]?.[isTR ? "tr" : "en"] ||
    OG_BY_PRODUCT_AND_CUT.slabs.vein.en;

  const title =
    (tSeo.has?.("title") && tSeo("title")) ||
    (isTR ? "Traverten | Majen" : "Travertine | Majen");

  const description =
    (tSeo.has?.("description") && tSeo("description")) ||
    (isTR
      ? "Doğrudan ocaktan tedarik, güvenilir ihracat."
      : "Direct quarry supply with reliable export terms.");

  const ogImage =
    (tSeo.has?.("image") && tSeo("image")) ||
    ogFallback;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      // Projede aktif olan diller: en & tr
      languages: {
        en: canonicalUrl.replace(`/${locale}/`, `/en/`),
        tr: canonicalUrl.replace(`/${locale}/`, `/tr/`),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [{ url: `${SITE_URL}${ogImage}` }],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${ogImage}`],
    },
    robots: { index: true, follow: true },
  };
}


export default async function ProcessLayout({ children, params }) {
  const { locale, product, cut, process } = await params;
  if (!PROCESS_PRODUCTS.has(product)) notFound();

  const isTR = locale === "tr";
  const base = BASE_BY_LOCALE[locale] || BASE_BY_LOCALE.en;
  const normalizedCut = ensureProductInCutSlug(locale, cut, product);
  const cutShort = shortCutKey(normalizedCut);
  const procLookup = toLookupProcKey(process);

  // URL’ler
  const homeUrl    = `${SITE_URL}/${locale}`;
  const catUrl     = `${homeUrl}/${base}`;
  const productUrl = `${catUrl}/${product}`;
  const cutUrl     = `${productUrl}/${normalizedCut}`;
  const pageUrl    = `${cutUrl}/${process}`;

  // İsimler (breadcrumb)
  const productLabel = PRODUCT_LABEL[product]?.[isTR ? "tr" : "en"] || (isTR ? "Traverten" : "Travertine");
  let cutName = isTR ? (cutShort === "vein-cut" ? "Damar Kesim" : "Enine Kesim") : (cutShort === "vein-cut" ? "Vein Cut" : "Cross Cut");
  let processTitle = humanProcessName(process, locale);

  // Process başlığı (i18n’den varsa)
  try {
    const tProc = await getTranslations({
      locale,
      namespace: `ProductPage.${product}.cuts.${cutShort}.processes.${procLookup}`
    });
    if (tProc?.has?.("title")) processTitle = tProc("title");
  } catch {}

  // Breadcrumb JSON-LD
  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isTR ? "Ana Sayfa" : "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: isTR ? "Traverten" : "Travertine", item: catUrl },
      { "@type": "ListItem", position: 3, name: productLabel, item: productUrl },
      { "@type": "ListItem", position: 4, name: cutName, item: cutUrl },
      { "@type": "ListItem", position: 5, name: processTitle, item: pageUrl },
    ],
  };

  // Product JSON-LD (process seviyesinde)
const productJSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  // ör: "Unfilled Honed - Cross Cut | Majen"
  name: `${humanProcessName(process, locale)} - ${cutName} | Majen`,
  brand: { "@type": "Organization", name: "Majen" },
  category: "Natural Stone",
  url: pageUrl,
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "http://schema.org/InStock" },
};

  // FAQ JSON-LD — process-level (varsa)
  let faqJSONLD = null;
  try {
    const tQA = await getTranslations({
      locale,
      namespace: `ProductPage.${product}.cuts.${cutShort}.processes.${procLookup}.QuestionsItems`,
    });

    const list = [];
    for (let i = 1; i <= 20; i++) {
      const qKey = `aboutpage_s4_faq${i}_header`;
      const aKey = `aboutpage_s4_faq${i}_text`;
      if (tQA.has?.(qKey) && tQA.has?.(aKey)) {
        list.push({
          "@type": "Question",
          name: tQA(qKey),
          acceptedAnswer: { "@type": "Answer", text: tQA(aKey) },
        });
      } else {
        break;
      }
    }
    if (list.length) {
      faqJSONLD = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: locale,
        mainEntityOfPage: pageUrl,
        mainEntity: list,
      };
    }
  } catch {
    // namespace yoksa sessizce geç
  }

  return (
    <>
      {children}

      {/* JSON-LD: Breadcrumb */}
      <Script
        id="jsonld-process-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* JSON-LD: Product */}
      <Script
        id="jsonld-process-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJSONLD) }}
      />

      {/* JSON-LD: FAQ (varsa) */}
      {faqJSONLD && (
        <Script
          id="jsonld-process-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJSONLD) }}
        />
      )}
    </>
  );
}
