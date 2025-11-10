import React from 'react'
import ContactSection from '../components/contactus/ContactSection'
import SocialMediaSection from '../components/products1/SocialMediaSection'
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  const title = t("seo.title", {
    default: "Contact Majen Travertine | Wholesale Supplier From Turkey",
  });

  const description = (
    t("seo.description", {
      default:
        "Get in touch with Majen for wholesale travertine blocks, slabs and tiles from Turkey. Ask about pricing, availability and export options (FOB, CIF, EXW).",
    }) || ""
  ).slice(0, 160);

  // 🌐 Canonical URL (route'un /[locale]/contact olduğunu varsayıyoruz)
  const canonical =
    locale === "tr"
      ? "https://majen.com.tr/tr/contact"
      : "https://majen.com.tr/en/contact";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "https://majen.com.tr/en/contact",
        tr: "https://majen.com.tr/tr/contact",
        "x-default": "https://majen.com.tr/en/contact",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Majen",
      locale,
      images: [{ url: "https://majen.com.tr/og/cover-contact.jpg" }], // varsa böyle bir görsel, yoksa değiştir
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://majen.com.tr/og/cover-contact.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

const page = () => {
  return (
    <div >
      <ContactSection/>
    </div>
  )
}

export default page
