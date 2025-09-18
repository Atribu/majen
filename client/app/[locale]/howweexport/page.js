import { getTranslations } from "next-intl/server";
import IntroSection from "../components/products1/IntroSection";
import QuestionsSection from "../components/generalcomponent/QuestionsSection";
import ContactFrom from "../components/generalcomponent/ContactFrom";
import CardsSection from "./CardsSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const OG_IMAGE = `${SITE_URL}/images/export/export-hero.webp`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HowWeExportPage" });

  const title = "Travertine Export Methods from Turkey | Wholesale Supplier Majen";
  const description =
    "Majen exports wholesale travertine blocks, slabs, and tiles worldwide. Learn about FOB, CIF, and EXW shipping methods, export documentation, and safe container loading.";

  const canonical =
    locale === "tr"
      ? `${SITE_URL}/tr/howweexport`
      : `${SITE_URL}/en/howweexport`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/howweexport`,
        tr: `${SITE_URL}/tr/howweexport`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
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


export default function Page() {
  return (
    <div>
      <IntroSection
        title="How We Export Travertine Worldwide"
        intro="Majen delivers wholesale travertine blocks, slabs, and tiles directly from Uşak–Ulubey to buyers worldwide. Our export process is transparent, reliable, and tailored to importer needs."
        title2="Shipping Methods"
        intro2="FOB (Free On Board): We load containers at Turkish ports, buyers manage shipping. CIF (Cost, Insurance, Freight): We handle shipping, insurance, and freight to buyer’s port."
        heroSrc="/images/export/export-hero.webp"
        bgMobile="/images/export/export-bg-mobile.webp"
        bgDesktop="/images/homepage/antikarkaplan2.webp"
        bgPanel="/images/homepage/antikarkaplan4.webp"
        imageAlt="Travertine export methods"
        crumbHomeLabel="Home"
        crumbHomeHref="/en"
        crumbSectionLabel="Export Methods"
        crumbSectionHref="/en/howweexport"
        showBreadcrumb={true}
      />
      {/* <CardsSection/> */}
      <QuestionsSection/>
      <ContactFrom/>
    </div>
  );
}
