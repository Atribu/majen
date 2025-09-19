
// app/[locale]/page.jsx
import { getTranslations } from "next-intl/server";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const OG_IMAGE = `${SITE_URL}/images/og-home.jpg`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const title = t("title", {
    default: "Travertine Supplier from Turkey | Wholesale Blocks, Slabs & Tiles – Majen",
  });
  const description = (t("description", {
    default:
      "Direct quarry supplier in Uşak–Ulubey. Wholesale travertine blocks, slabs, tiles and custom designs.",
  }) || "").slice(0, 160);

  const canonical =
    locale === "tr" ? `${SITE_URL}/tr` : `${SITE_URL}/en`;

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

export default function HomePage() {
  const HomeClient = require("./components/homepage/HomeClient").default; // varsa client parçası
  return (
    <>
      <HomeClient />
      <Script
        id="ld-home"
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
    </>
  );
}



