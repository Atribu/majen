import Script from "next/script";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

/** Locale → kök segment */
const BASE_BY_LOCALE = { en: "travertine", tr: "traverten", de: "travertin", ru: "travertin" };

/** Ürün whitelist (blocks hariç) */
const CUT_PRODUCTS = new Set(["slabs", "tiles", "special", "special-designs"]);

/** UI label’ları (breadcrumb için) */
const PRODUCT_LABEL = {
  slabs: { en: "Travertine Slabs", tr: "Traverten Plakalar" },
  tiles: { en: "Travertine Tiles", tr: "Traverten Karolar" },
  "special-designs": { en: "Custom Designs", tr: "Özel Tasarım" },
  special: { en: "Custom Designs", tr: "Özel Tasarım" }, // alias
};

/** Kesim adlarını normalize eden yardımcı (breadcrumb, isimlendirme) */
function cutHumanName(cut, locale, product) {
  const isTR = locale === "tr";
  if (/^vein-cut-/.test(cut) || /^damar-kesim-/.test(cut)) {
    return isTR ? "Damar Kesim" : "Vein Cut";
  }
  if (/^cross-cut-/.test(cut) || /^enine-kesim-/.test(cut)) {
    return isTR ? "Enine Kesim" : "Cross Cut";
  }
  // fallback
  return cut.replace(/-/g, " ");
}

/** Canonical cut slug ürününe göre doğru mu? (slabs|tiles|special) */
function ensureProductInCutSlug(locale, cut, product) {
  const isTR = locale === "tr";
  const p = product === "special" ? "special" : product; // alias düzelt
  if (isTR) {
    // ...-traverten-(plakalar|karolar|ozel-tasarim)
    return cut
      .replace(/-traverten-plakalar$/i, `-traverten-${p === "slabs" ? "plakalar" : p === "tiles" ? "karolar" : "ozel-tasarim"}`)
      .replace(/-traverten-karolar$/i,  `-traverten-${p === "tiles" ? "karolar" : p === "slabs" ? "plakalar" : "ozel-tasarim"}`)
      .replace(/-traverten-ozel-tasarim$/i, `-traverten-${p === "special" ? "ozel-tasarim" : p === "slabs" ? "plakalar" : "karolar"}`);
  }
  // EN: ...-travertine-(slabs|tiles|special)
  return cut
    .replace(/-travertine-slabs$/i,   `-travertine-${p === "slabs" ? "slabs" : p === "tiles" ? "tiles" : "special"}`)
    .replace(/-travertine-tiles$/i,   `-travertine-${p === "tiles" ? "tiles" : p === "slabs" ? "slabs" : "special"}`)
    .replace(/-travertine-special$/i, `-travertine-${p === "special" ? "special" : p === "slabs" ? "slabs" : "tiles"}`);
}

/** Alternates helper */
function languageAlternates(url, locale) {
  const locales = ["en", "tr", "de", "ru"];
  const out = {};
  locales.forEach((l) => (out[l] = url.replace(`/${locale}/`, `/${l}/`)));
  return out;
}

/** Basit OG görsel fallback tablosu (ürün + cut) */
const OG_BY_PRODUCT_AND_CUT = {
  slabs: {
    "vein": { en: "/images/og/vein-cut-travertine-slabs-cover.webp", tr: "/images/og/tr-vein-cut-traverten-plaka.webp" },
    "cross": { en: "/images/og/cross-cut-travertine-slabs-cover.webp", tr: "/images/og/tr-cross-cut-traverten-plaka.webp" }
  },
  tiles: {
    "vein": { en: "/images/og/vein-cut-travertine-tiles-cover.webp", tr: "/images/og/tr-vein-cut-traverten-karo.webp" },
    "cross": { en: "/images/og/cross-cut-travertine-tiles-cover.webp", tr: "/images/og/tr-cross-cut-traverten-karo.webp" }
  },
  "special-designs": {
    "vein": { en: "/images/og/vein-cut-travertine-special-cover.webp", tr: "/images/og/tr-vein-cut-traverten-ozel.webp" },
    "cross": { en: "/images/og/cross-cut-travertine-special-cover.webp", tr: "/images/og/tr-cross-cut-traverten-ozel.webp" }
  }
};

function cutTypeKey(cut) {
  return /^vein-cut|^damar-kesim/.test(cut) ? "vein" : "cross";
}

export async function generateMetadata({ params }) {
  const { locale, product, cut } = await params;
  const isTR = locale === "tr";

  // blocks için cut layout yok
  if (!CUT_PRODUCTS.has(product)) {
    return { robots: { index: false, follow: false } };
  }

  // cut slug’ı ürününe uydur (…-travertine-slabs|tiles|special / …-traverten-…)
  const normalizedCut = ensureProductInCutSlug(locale, cut, product);

  // canonical: kısa public URL
  const canonicalPath = `/${locale}/${normalizedCut}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  // i18n SEO override:
  // ProductPage.{product}.cuts.{cutShort}.seo.{title|description|image}
  const cutShort = /^vein-cut|^damar-kesim/i.test(normalizedCut) ? "vein-cut"
                  : /^cross-cut|^enine-kesim/i.test(normalizedCut) ? "cross-cut"
                  : "vein-cut";

  let tSeo;
  try {
    tSeo = await getTranslations({
      locale,
      namespace: `ProductPage.${product}.cuts.${cutShort}.seo`,
    });
  } catch {
    // namespace yoksa tSeo.has undefined olmasın
    tSeo = { has: () => false };
  }

  const cutKeyType = /^vein-cut|^damar-kesim/.test(normalizedCut) ? "vein" : "cross";
  const ogFallback =
    OG_BY_PRODUCT_AND_CUT[product]?.[cutKeyType]?.[isTR ? "tr" : "en"] ||
    OG_BY_PRODUCT_AND_CUT.slabs.vein.en;

  const title =
    (tSeo.has?.("title") && tSeo("title")) ||
    (isTR
      ? `${cutHumanName(normalizedCut, locale, product)} ${PRODUCT_LABEL[product]?.tr || "Traverten"} | Majen`
      : `${cutHumanName(normalizedCut, locale, product)} ${PRODUCT_LABEL[product]?.en || "Travertine"} | Majen`);

  const description =
    (tSeo.has?.("description") && tSeo("description")) ||
    (isTR
      ? "Yüzey seçenekleriyle (cilalı, honlu, fırçalı, tamburlu) ve güvenilir ihracat süreçleriyle tedarik ediyoruz."
      : "Available in polished, honed, brushed and tumbled finishes with reliable export terms.");

  const ogImage =
    (tSeo.has?.("image") && tSeo("image")) || ogFallback;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      // yalnızca mevcut diller
      languages: {
        en: canonicalUrl.replace(`/${locale}/`, `/en/`),
        tr: canonicalUrl.replace(`/${locale}/`, `/tr/`),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
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


export default async function CutLayout({ children, params }) {
  const { locale, product, cut } = await params;
  if (!CUT_PRODUCTS.has(product)) {
    // blocks için bu layout kullanılmamalı
    notFound();
  }

  const isTR = locale === "tr";

  const normalizedCut = ensureProductInCutSlug(locale, cut, product);

  // URL’ler
  const homeUrl = `${SITE_URL}/${locale}`;
const catUrl = `${homeUrl}/${isTR ? "traverten" : "travertine"}`;
  const productUrl = `${homeUrl}/${isTR ? "traverten" : "travertine"}-${product === "special" ? "special" : product}`;
  const pageUrl = `${homeUrl}/${normalizedCut}`;

  // İsimler
  const productLabel = PRODUCT_LABEL[product]?.[isTR ? "tr" : "en"] || (isTR ? "Traverten" : "Travertine");
  const cutName = cutHumanName(normalizedCut, locale, product);

  // Breadcrumb JSON-LD
  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isTR ? "Ana Sayfa" : "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: isTR ? "Traverten" : "Travertine", item: catUrl },
      { "@type": "ListItem", position: 3, name: productLabel, item: productUrl },
      { "@type": "ListItem", position: 4, name: cutName, item: pageUrl },
    ],
  };

  // Product JSON-LD (fiyatsız temel alanlar)
  const productJSONLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isTR ? `${cutName} | Majen` : `${cutName} from Turkey | Majen`,
    brand: { "@type": "Organization", name: "Majen" },
    category: "Natural Stone",
    url: pageUrl,
    offers: { "@type": "Offer", priceCurrency: "USD", availability: "http://schema.org/InStock" },
  };

  // FAQ JSON-LD — i18n (opsiyonel)
  // Namespace örneği: Seo.{product}.cutsFAQ.{vein|cross}.aboutpage_s4_faq1_header
  function shortCutKey(full) {
  // full ör: "vein-cut-travertine-slabs" | "cross-cut-travertine-tiles" | TR varyasyonları
  if (/^vein-cut|^damar-kesim/i.test(full)) return "vein-cut";
  if (/^cross-cut|^enine-kesim/i.test(full)) return "cross-cut";
  return "vein-cut";
}

let faqJSONLD = null;
try {
  const cutShort = shortCutKey(normalizedCut); // "vein-cut" | "cross-cut"
  const tQA = await getTranslations({
    locale,
    namespace: `ProductPage.${product}.cuts.${cutShort}.QuestionsItems`,
  });

  const list = [];
  // en.json’da gördüğümüz kalıba göre: aboutpage_s4_faq1_header, aboutpage_s4_faq1_text, ...
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
        id="jsonld-cut-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* JSON-LD: Product */}
      <Script
        id="jsonld-cut-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJSONLD) }}
      />

      {/* JSON-LD: FAQ (varsa) */}
      {faqJSONLD && (
        <Script
          id="jsonld-cut-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJSONLD) }}
        />
      )}
    </>
  );
}
