// app/[locale]/contact/page.tsx  (TR: /tr/iletisim için route alias kullanıyorsan dosya adını uyumla)
import ContactSection from "../components/contactus/ContactSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  // Gerçek slug’ı seç
  const pathByLocale = {
    en: "/en/contact-us",
    tr: "/tr/iletisim",
  };
  const canonicalPath = pathByLocale[locale] || pathByLocale.en;

  return {
    title: t("seo.title", { default: "Contact Majen Travertine | Wholesale Supplier From Turkey" }),
    description: t("seo.description", {
      default:
        "Get in touch with Majen for wholesale travertine blocks, slabs and tiles from Turkey. Ask about pricing, availability and export options (FOB, CIF, EXW).",
    }),
    alternates: {
      canonical: canonicalPath, // metadataBase sayesinde tam URL'ye döner
      languages: {
        en: pathByLocale.en,
        tr: pathByLocale.tr,
        "x-default": pathByLocale.en,
      },
    },
    openGraph: {
      url: canonicalPath,
      title: t("seo.title"),
      description: t("seo.description"),
      type: "website",
      siteName: "Majen",
      images: [{ url: "/og/cover-contact.jpg" }],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.title"),
      description: t("seo.description"),
      images: ["/og/cover-contact.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default function ContactPage() {
  return <ContactSection />;
}
