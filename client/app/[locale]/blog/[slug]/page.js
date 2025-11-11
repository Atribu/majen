// app/[locale]/[slug]/page.js
import DynamicTravertinePage from "./DynamicTravertinePage";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const OG_IMAGE = `${SITE_URL}/images/export/export-hero.webp`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isTR = locale === "tr";

  const title = isTR
    ? "Dünya Çapında Traverten İhracatı Nasıl Yapıyoruz | Majen Ocak Tedarikçisi"
    : "Travertine Export From Turkey | FOB CIF EXW Shipping – Majen";

  const description = isTR
    ? "Majen traverteni dünya geneline ihraç eder. FOB/CIF sevkiyat, ihracat dokümanları, güçlendirilmiş paketleme ve güvenilir teslimat."
    : "Majen exports travertine worldwide with FOB, CIF, EXW shipping options. From pro-forma to container loading: export documentation, reinforced packaging, and reliable delivery from Uşak–Ulubey.";

  // Bu URL’yi sadece OG/twitter için kullanıyoruz; canonical TAG YOK
  const pagePath = isTR
    ? "/tr/nasil-ihracat-yapiyoruz"
    : "/en/how-we-export";
  const pageUrl = `${SITE_URL}${pagePath}`;

  return {
    title,
    description,
    // 🔹 canonical YOK, sadece hreflang istersen bırakabilirsin:
    alternates: {
      languages: {
        en: `${SITE_URL}/en/how-we-export`,
        tr: `${SITE_URL}/tr/nasil-ihracat-yapiyoruz`,
        "x-default": `${SITE_URL}/en/how-we-export`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "article",
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
  const { slug, locale } = await params;
  return <DynamicTravertinePage slug={slug} localeFromServer={locale} />;
}
