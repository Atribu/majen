// app/[locale]/(catalog)/travertine/page.jsx
import { getTranslations } from "next-intl/server";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const OG_IMAGE = `${SITE_URL}/images/og-travertine.jpg`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TravertinePage" });

  const title = t("metaTitle", {
    default: "Wholesale Travertine From Turkey | Blocks, Slabs, Tiles – Majen",
  });

  const description = (
    t("metaDescription", {
      default:
        "Majen supplies wholesale travertine from Uşak–Ulubey, Turkey: blocks, slabs & tiles in Blaundos Antiko, Light, Ivory. FOB/CIF worldwide shipping",
    }) || ""
  ).slice(0, 160);

  const canonicalLocalized =
    locale === "tr"
      ? `${SITE_URL}/tr/traverten`
      : `${SITE_URL}/en/travertine`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalLocalized,
      languages: {
        en: `${SITE_URL}/en/travertine`,
        tr: `${SITE_URL}/tr/traverten`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalLocalized,
      type: "website",
      locale,
      images: [{ url: OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }) {
  const { locale } = params;

  // URL & metinleri locale'e göre kur
  const baseSeg = locale === "tr" ? "traverten" : "travertine";
  const homeName = locale === "tr" ? "Ana Sayfa" : "Home";
  const catName  = locale === "tr" ? "Traverten" : "Travertine";

  const baseUrl = `${SITE_URL}/${locale}`;
  const catUrl  = `${baseUrl}/${baseSeg}`;

  const names = {
    block:  locale === "tr" ? "Traverten Bloklar"   : "Travertine Blocks",
    slabs:  locale === "tr" ? "Traverten Plakalar"  : "Travertine Slabs",
    tiles:  locale === "tr" ? "Traverten Karolar"   : "Travertine Tiles",
    special:locale === "tr" ? "Özel Tasarımlar"     : "Special Designs",
  };

  const urls = {
    block:  `${catUrl}/block`,
    slabs:  `${catUrl}/slabs`,
    tiles:  `${catUrl}/tiles`,
    special:`${catUrl}/special`,
  };

  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeName, item: baseUrl },
      { "@type": "ListItem", position: 2, name: catName,  item: catUrl  },
    ],
  };

  const itemListJSONLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: names.block,  url: urls.block  },
      { "@type": "ListItem", position: 2, name: names.slabs,  url: urls.slabs  },
      { "@type": "ListItem", position: 3, name: names.tiles,  url: urls.tiles  },
      { "@type": "ListItem", position: 4, name: names.special,url: urls.special},
    ],
  };

  const TravertinePageClient = require("./components/TravertinePageClient").default;

  return (
    <>
      <TravertinePageClient />

      {/* JSON-LD: Breadcrumb */}
      <Script
        id="jsonld-breadcrumb-travertine"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* JSON-LD: ItemList (4 kategori) */}
      <Script
        id="jsonld-itemlist-travertine"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJSONLD) }}
      />
    </>
  );
}
