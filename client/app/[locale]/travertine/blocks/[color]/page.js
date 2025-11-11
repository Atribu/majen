import BlockColorClient from "./BlockColorClient";
import { colorKeys, colorSlugFor, colorLabelFor } from "@/lib/travertine";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

// ✅ METADATA
export async function generateMetadata({ params }) {
  const { locale, color } = await params;
  const isTR = locale === "tr";

  // color param zaten slug (en: ivory/light/antico, tr: ivory/acik/antiko)
  const colorSlug = String(color);
  const colorLabel = colorLabelFor(locale, colorSlug) || colorSlug;

  // URL pattern:
  // en → /en/ivory-travertine-blocks
  // tr → /tr/antiko-traverten-bloklar
  const baseSlug = isTR ? "traverten-bloklar" : "travertine-blocks";
  const canonicalUrl = `${SITE_URL}/${locale}/${colorSlug}-${baseSlug}`;

  const title = isTR
    ? `${colorLabel} Traverten Bloklar | Majen Ocak Tedarikçisi`
    : `${colorLabel} Travertine Blocks From Turkey | Majen Quarry`;

  const description = isTR
    ? `${colorLabel} traverten bloklar: Uşak–Ulubey ocağından ihracata hazır blok traverten. FOB/CIF sevkiyat ve proje bazlı üretim.`
    : `${colorLabel} travertine blocks from our Uşak–Ulubey quarry, export-ready with FOB/CIF shipping for your projects.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en/${colorSlug}-travertine-blocks`,
        tr: `${SITE_URL}/tr/${colorSlug}-traverten-bloklar`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

// Build-time rotalar
export async function generateStaticParams() {
  const locales = ["en", "tr"];
  const colors = colorKeys(); // ["ivory","light","antico"]
  const params = [];
  for (const locale of locales) {
    for (const key of colors) {
      params.push({
        locale,
        color: colorSlugFor(locale, key), // en: ivory|light|antico, tr: ivory|acik|antiko
      });
    }
  }
  return params;
}

// Server component: sadece client component'e paramları pasla
export default async function Page({ params }) {
  const { locale, color } = await params;
  return <BlockColorClient locale={locale} color={color} />;
}
