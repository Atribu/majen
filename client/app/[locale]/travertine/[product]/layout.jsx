// app/[locale]/(catalog)/product/layout.jsx
import { getTranslations } from "next-intl/server";
import {
  BASE_BY_LOCALE,
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
} from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const toSrc = (img) => (typeof img === "string" ? img : img?.src || "");

// Kod içi fallback (i18n bulunamazsa)
const FALLBACK = {
  en: {
    block: {
      title: "Wholesale Travertine Blocks from Turkey | Majen Quarry Supplier",
      description:
        "Premium wholesale travertine blocks from Turkey – direct from Uşak Ulubey quarry. Export-ready with FOB/CIF options. Blaundos Antiko, Light and Ivory travertine blocks.",
    },
    slabs: {
      title: "Travertine Slabs Supplier from Turkey | Majen",
      description:
        "Premium 2cm, 3cm, 5cm travertine slabs: polished, honed, brushed. Ideal for bookmatch and large areas. Export-ready from Turkey.",
    },
    tiles: {
      title: "Wholesale Travertine Tiles from Turkey | Majen",
      description:
        "Durable travertine tiles for interior/exterior: 30×60, 60×60, 40×80 and more. Consistent quality, wholesale pricing.",
    },
    special: {
      title: "Custom Travertine Designs | Majen",
      description:
        "Bespoke travertine: steps, mosaics, borders, custom architectural cuts. Project-based production, global shipping.",
    },
  },
  tr: {
    block: {
      title: "Türkiye’den Toptan Traverten Blok | Majen Ocak Tedarikçisi",
      description:
        "Uşak Ulubey ocağımızdan doğrudan toptan traverten bloklar. FOB/CIF seçenekleri, Blaundos Antiko, Light ve Ivory renkleri.",
    },
    slabs: {
      title: "Türkiye’den Traverten Plaka Tedarikçisi | Majen",
      description:
        "2 cm, 3 cm, 5 cm traverten plakalar: cilalı, honlu, fırçalı. Bookmatch ve geniş alanlar için ideal.",
    },
    tiles: {
      title: "Türkiye’den Toptan Traverten Karo | Majen",
      description:
        "İç/dış mekân için dayanıklı traverten karolar: 30×60, 60×60, 40×80 ve daha fazlası. Tutarlı kalite, toptan fiyat.",
    },
    special: {
      title: "Özel Traverten Tasarımları | Majen",
      description:
        "Basamaklar, mozaikler, bordürler ve özel mimari kesimler. Proje bazlı üretim, global sevkiyat.",
    },
  },
};

export async function generateMetadata({ params }) {
  const { locale, product } = await params; 
  const tSeo = await getTranslations({ locale, namespace: "Seo.product" });

  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

  const baseSegment = BASE_BY_LOCALE[locale]; // travertine | traverten
  const productSlug = PRODUCT_SLUGS[locale]?.[productKey] ?? product;
  const canonicalPath = `/${locale}/${baseSegment}/${productSlug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  // i18n → varsa kullan, yoksa FALLBACK
  const title =
    tSeo.has(`${productKey}.title`)
      ? tSeo(`${productKey}.title`)
      : FALLBACK[locale]?.[productKey]?.title ||
        "Travertine | Majen";

  let description =
  tSeo.has(`${productKey}.description`)
    ? tSeo(`${productKey}.description`)
    : FALLBACK[locale]?.[productKey]?.description ||
      "Wholesale travertine from Turkey by Majen.";

// Eğer ürün block ise → özel format ekle
if (productKey === "block") {
  description = locale === "en"
    ? "Wholesale Travertine Blocks from Turkey | Antiko, Light, Ivory – Majen"
    : "Türkiye’den Toptan Traverten Blokları | Antiko, Light, Ivory – Majen";
}

if (productKey === "slab") {
  description = locale === "en"
    ? "Majen supplies Wholesale Travertine Slabs From Turkey in 2cm, 3cm and 5cm thickness. Export-ready slabs with polished, honed, brushed or tumbled finishes. Colors: Blaundos Antiko, Light, Ivory."
    : "Türkiye’den Toptan Traverten Blokları | Antiko, Light, Ivory – Majen";
}

if (productKey === "tile") {
  description = locale === "en"
    ? "Majen supplies Wholesale Travertine Tiles From Turkey in 30×60, 60×60, and 40×80 cm sizes. Polished, honed, brushed & tumbled finishes. Export-ready with FOB/CIF shipping."
    : "Türkiye’den Toptan Traverten Blokları | Antiko, Light, Ivory – Majen";
}

if (productKey === "special") {
  description = locale === "en"
    ? "Majen supplies Wholesale Travertine Special Designs From Turkey including steps, mosaics, borders, and custom architectural pieces. Export-ready, reinforced packaging, FOB/CIF shipping."
    : "Türkiye’den Toptan Traverten Blokları | Antiko, Light, Ivory – Majen";
}


  // OG görsel (ürünün kapak görseli)
  const imgMap = PRODUCT_IMG[productKey];
  const ogImage =
    toSrc(
      typeof imgMap === "object"
        ? imgMap.cover ?? Object.values(imgMap)[0]
        : imgMap
    ) || "/images/og-fallback.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: canonicalUrl.replace(`/${locale}/`, `/tr/`),
        en: canonicalUrl.replace(`/${locale}/`, `/en/`),
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

export default function ProductLayout({ children }) {
  return children;
}
