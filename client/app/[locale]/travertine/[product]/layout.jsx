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

  const description =
    tSeo.has(`${productKey}.description`)
      ? tSeo(`${productKey}.description`)
      : FALLBACK[locale]?.[productKey]?.description ||
        "Wholesale travertine from Turkey by Majen.";

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
