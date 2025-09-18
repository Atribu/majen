// app/[locale]/(catalog)/travertine/page.jsx
import { getTranslations } from "next-intl/server";

// OG görseli: public altındaki bir görseli kullan
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const OG_IMAGE = `${SITE_URL}/images/og-travertine.jpg`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TravertinePage" });

  // Başlık / Açıklama
  const title = t("title", {
    default: "Wholesale Travertine From Turkey – Majen",
  });
  // intro çok uzunsa kırpıyoruz
  const description = (t("intro", { default: "" }) || "").slice(0, 160);

  const canonical = `${SITE_URL}/${locale}/travertine`; 
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

export default function Page() {
  // Server component: sadece client component'i render ediyoruz
  // (client dosyasını az önce oluşturduk)
  const TravertinePageClient = require("./components/TravertinePageClient").default;
  return <TravertinePageClient />;
}
