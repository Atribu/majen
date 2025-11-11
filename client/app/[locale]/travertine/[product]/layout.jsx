// app/[locale]/(catalog)/product/layout.jsx
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import {
  BASE_BY_LOCALE,
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
} from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const toSrc = (img) => (typeof img === "string" ? img : img?.src || "");

// Ürün ve dil bazlı başlık + açıklama fallback’leri
const META_BY_PRODUCT = {
  en: {
    block: {
      title: "Wholesale Travertine Blocks From Turkey | Majen Quarry Supplier",
      description:
        "Majen supplies Wholesale Travertine Blocks From Turkey – Blaundos Antiko, Light, Ivory. Average 280×220×200 cm, 30–35 tons. FOB/CIF worldwide shipping with full documentation.",
    },
    slabs: {
      title: "Wholesale Travertine Slabs from Turkey | Majen",
      description:
        "Explore high-quality wholesale travertine slabs from Turkey. Durable, stylish, and directly from the quarry. Partner with Majen today.",
    },
    tiles: {
      title: "Wholesale Travertine Tiles From Turkey | 30×60 60×60 – Majen",
      description:
        "Majen supplies Wholesale Travertine Tiles From Turkey – Blaundos Antiko, Light, Ivory. Sizes: 30×60, 60×60, 40×80 cm. Finishes: polished, honed, brushed, tumbled. FOB/CIF worldwide export.",
    },
    pavers: {
      title: "Wholesale Travertine Pavers | Global Supplier of Natural Stone for Outdoor Projects",
      description:
        "Discover premium wholesale travertine pavers for patios, pools, and landscapes. Global export, competitive prices, and consistent stone quality.",
    },
  },
  tr: {
    block: {
      title: "Türkiye’den Toptan Traverten Blok | Majen Ocak Tedarikçisi",
      description:
        "Türkiye’den Toptan Traverten Blokları | Antiko, Light, Ivory – Majen",
    },
    slabs: {
      title: "Türkiye’den Traverten Plaka Tedarikçisi | Majen",
      description:
        "2 cm, 3 cm, 5 cm traverten plakalar: cilalı, honlu, fırçalı. Bookmatch ve geniş alanlar için ideal. Türkiye’den ihracata hazır.",
    },
    tiles: {
      title: "Türkiye’den Toptan Traverten Karo | Majen",
      description:
        "30×60, 60×60, 40×80 cm ebatlarında Türkiye’den Toptan Traverten Karolar. Cilalı, honlu, fırçalı ve tamburlu yüzeyler. FOB/CIF sevkiyat.",
    },
    pavers: {
      title: "Wholesale Travertine Pavers | Global Supplier of Natural Stone for Outdoor Projects",
      description:
        "Discover premium wholesale travertine pavers for patios, pools, and landscapes. Global export, competitive prices, and consistent stone quality.",
    },
  },
};

export async function generateMetadata({ params }) {
  const { locale, product } = await params;

  // i18n üzerinden override etmek isterseniz: Seo.product.{block|slabs|tiles|pavers}.title/description
  const tSeo = await getTranslations({ locale, namespace: "Seo.product" });

  // URL ve productKey
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

  const baseSegment = BASE_BY_LOCALE[locale]; // "travertine" | "traverten"
  const productSlug = PRODUCT_SLUGS[locale]?.[productKey] ?? product;
    const canonicalPath = `/${locale}/${baseSegment}-${productSlug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  // Başlık & açıklama: önce i18n → yoksa META_BY_PRODUCT fallback
  const fallback = META_BY_PRODUCT[locale]?.[productKey] ?? META_BY_PRODUCT.en.block;

  const title = tSeo.has(`${productKey}.title`)
    ? tSeo(`${productKey}.title`)
    : fallback.title;

  const description = tSeo.has(`${productKey}.description`)
    ? tSeo(`${productKey}.description`)
    : fallback.description;

  // OG görsel (ürün kapağı)
  const imgMap = PRODUCT_IMG[productKey];
  const ogImage =
    toSrc(typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap) ||
    "/images/og-fallback.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
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


export default async function ProductLayout({ children, params }) {
  const { locale, product } = await params;

  // URL ve i18n temel değişkenler
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

  const baseSegment = BASE_BY_LOCALE[locale]; // travertine | traverten
  const baseUrl    = `${SITE_URL}/${locale}`;
  const catUrl     = `${baseUrl}/${baseSegment}`;
  const productUrl = `${catUrl}/${PRODUCT_SLUGS[locale]?.[productKey] ?? product}`;

  // BreadCrumb adları (locale'e göre)
  const crumbHome = locale === "tr" ? "Ana Sayfa" : "Home";
  const crumbCat  = locale === "tr" ? "Traverten" : "Travertine";

  // Ürün adları (breadcrumb ve Product.name için)
  const productNames = {
    en: {
      block:  "Travertine Blocks",
      slabs:  "Travertine Slabs",
      tiles:  "Travertine Tiles",
      pavers:"Custom Travertine Designs",
    },
    tr: {
      block:  "Traverten Bloklar",
      slabs:  "Traverten Plakalar",
      tiles:  "Traverten Karolar",
      pavers:"Özel Traverten Tasarımları",
    },
  };
  const prodName = productNames[locale]?.[productKey] ?? product;

  // Product.name (daha SEO odaklı)
  const productSchemaName =
    locale === "tr"
      ? `Türkiye’den ${prodName} | Majen`
      : `Wholesale ${prodName} from Turkey | Majen`;

  // Product Schema için görsel
  const imgMap = PRODUCT_IMG[productKey];
  const imageUrl =
    toSrc(typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap) ||
    "/images/og-fallback.jpg";

  // Breadcrumb JSON-LD
  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: crumbHome, item: `${baseUrl}` },
      { "@type": "ListItem", position: 2, name: crumbCat,  item: `${catUrl}`  },
      { "@type": "ListItem", position: 3, name: prodName,  item: `${productUrl}` },
    ],
  };

  // Product JSON-LD (temel alanlar; fiyat vs. vermiyoruz)
  const productJSONLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productSchemaName,
    brand: { "@type": "Organization", name: "Majen" },
    category: "Natural Stone",
    image: [`${SITE_URL}${imageUrl}`],
    url: productUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "http://schema.org/InStock",
    },
  };

  // FAQ JSON-LD (varsa i18n’den çek)
  // Not: TR/EN metinleriniz ProductPage.{productKey}.QuestionsItems altında ise:
  // {aboutpage_s4_faq1_header, aboutpage_s4_faq1_text, ...}
  let faqJSONLD = null;
try {
  const tQA = await getTranslations({
    locale,
    namespace: `ProductPage.${productKey}.QuestionsItems`,
  });

  const faqList = [];
  for (let i = 1; i <= 20; i++) {
    const qKey = `aboutpage_s4_faq${i}_header`;
    const aKey = `aboutpage_s4_faq${i}_text`;
    if (tQA.has(qKey) && tQA.has(aKey)) {
      faqList.push({
        "@type": "Question",
        name: tQA(qKey),
        acceptedAnswer: { "@type": "Answer", text: tQA(aKey) },
      });
    } else {
      break;
    }
  }

  if (faqList.length > 0) {
    faqJSONLD = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${productUrl}#faq`,
      inLanguage: locale,                 // "en" | "tr"
      mainEntityOfPage: productUrl,       // sayfa bağlamı
      mainEntity: faqList,
    };
  }
} catch {
  faqJSONLD = null;
}

  return (
    <>
      {children}

      {/* JSON-LD: Breadcrumb */}
      <Script
        id="jsonld-product-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* JSON-LD: Product */}
      <Script
        id="jsonld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJSONLD) }}
      />

      {/* JSON-LD: FAQ (varsa) */}
      {faqJSONLD && (
        <Script
          id="jsonld-product-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJSONLD) }}
        />
      )}
    </>
  );
}