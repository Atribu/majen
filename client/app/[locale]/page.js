// app/[locale]/page.jsx
import { getTranslations } from "next-intl/server";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const OG_IMAGE = `${SITE_URL}/images/og-home.jpg`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const title = t("title", {
    default:
      "Travertine Supplier from Turkey | Wholesale Blocks, Slabs & Tiles – Majen",
  });
  const description = (
    t("description", {
      default:
        "Majen supplies wholesale travertine from Uşak–Ulubey, Turkey: blocks, slabs & tiles in Blaundos Antiko, Light & Ivory. FOB/CIF worldwide shipping, reinforced packaging, A-grade quality.",
    }) || ""
  ).slice(0, 160);

  const canonical = locale === "tr" ? `${SITE_URL}/tr` : `${SITE_URL}/en`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en`,
        tr: `${SITE_URL}/tr`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
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

export default async function HomePage({ params }) {
  const { locale } = params;

  // Locale'e göre base segment (tr: traverten, en: travertine)
  const baseSeg = locale === "tr" ? "traverten" : "travertine";
  const homeName = locale === "tr" ? "Ana Sayfa" : "Home";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeName,
        item: `${SITE_URL}/${locale}`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "tr" ? "Traverten Bloklar" : "Travertine Blocks",
        url: `${SITE_URL}/${locale}/${baseSeg}/block`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "tr" ? "Traverten Plakalar" : "Travertine Slabs",
        url: `${SITE_URL}/${locale}/${baseSeg}/slabs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: locale === "tr" ? "Traverten Karolar" : "Travertine Tiles",
        url: `${SITE_URL}/${locale}/${baseSeg}/tiles`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: locale === "tr" ? "Özel Tasarımlar" : "Special Designs",
        url: `${SITE_URL}/${locale}/${baseSeg}/special`,
      },
    ],
  };

  const HomeClient = require("./components/homepage/HomeClient").default;

  return (
    <>
      <HomeClient />

      {/* WebSite + Organization (sen zaten eklemişsin, koruyorum) */}
      <Script
        id="ld-home-website-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                url: SITE_URL,
                name: "Majen",
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${SITE_URL}/search?q={query}`,
                  "query-input": "required name=query",
                },
              },
              {
                "@type": "Organization",
                name: "Majen",
                url: SITE_URL,
                logo: `${SITE_URL}/images/logo-512.png`,
              },
            ],
          }),
        }}
      />

      {/* BreadcrumbList (Home) */}
      <Script
        id="ld-breadcrumb-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ItemList (4 ana kategori) */}
      <Script
        id="ld-itemlist-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
    </>
  );
}
