import React from "react";
import GalleryBanner from "./components/GalleryBanner";
import mainImg from "@/public/images/homepage/antikarkaplan2.webp";
import GalleryScrollSection from "./components/GalleryScrollSection";
import { useTranslations } from "next-intl";
import ContactFrom from "../components/generalcomponent/ContactFrom";
import SocialMediaSection from "../components/products1/SocialMediaSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

// 🔹 SEO / canonical
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isTR = locale === "tr";

  const slugPath = isTR ? "galeri" : "gallery";
  const canonicalUrl = `${SITE_URL}/${locale}/${slugPath}`;

  const title = isTR
    ? "Traverten Fotoğraf Galerisi | Majen"
    : "Travertine Photo Gallery | Majen";

  const description = isTR
    ? "Majen traverten ocağından blok, plaka, karo ve proje uygulamalarına ait referans fotoğraflar."
    : "Photo gallery of travertine blocks, slabs, tiles and reference projects from the Majen quarry.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en/gallery`,
        tr: `${SITE_URL}/tr/galeri`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      locale,
      images: [{ url: `${SITE_URL}/images/homepage/antikarkaplan2.webp` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/homepage/antikarkaplan2.webp`],
    },
    robots: { index: true, follow: true },
  };
}

const Page = () => {
  const t = useTranslations("Gallery");

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden gap-[100px] mb-12">
      <div className="flex flex-col items-center justify-center">
        <GalleryBanner img={mainImg} span={t("subtitle")} header={t("title")} />
        <GalleryScrollSection />
        <SocialMediaSection />
        <ContactFrom />
      </div>
    </div>
  );
};

export default Page;
