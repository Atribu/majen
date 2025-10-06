import { getTranslations } from "next-intl/server";
import { productKeyFromSlug } from "@/lib/travertine";

// slug -> varyant anahtarı (JSON’daki nesne adlarıyla eşleşiyor)
const VARIANT_SLUG_TO_KEY = {
  "blaundos-antiko": "antiko",
  "blaundos-light": "light",
  "blaundos-ivory": "ivory"
};

export async function generateMetadata({ params }) {
  const { locale, product, variant } = await params;
  const t = await getTranslations({ locale, namespace: "ProductPage" });

  // productKey: slabs/blocks/tiles/special
  const productKey = productKeyFromSlug(locale, product) || "slabs";
  const vKey = VARIANT_SLUG_TO_KEY[variant] || variant;

  // JSON’dan varyant override nesnesini ve fallback’leri çek
  const vOverride =
    t.raw(`${productKey}.${vKey}`) ??
    t.raw(`${productKey}.variants.${vKey}`) ??
    null;

  const baseTitle = t(`${productKey}.title`, { fallback: "Travertine from Turkey" });
  const baseIntro = t(`${productKey}.intro`, { fallback: "" });

  // Önce SEO alanları, yoksa normal title/intro, yoksa ürün fallback
  const title = vOverride?.seo?.title || vOverride?.title || baseTitle;
  const description = vOverride?.seo?.description || vOverride?.intro || baseIntro;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.majen.com.tr";
  const baseSegment = locale === "tr" ? "travertenler" : "travertines";
  const canonical = `${SITE_URL}/${locale}/${baseSegment}/${product}/${variant}`;

  // (Basit OG görseli — isterseniz varyant görselini de burada hesaplayabiliriz)
  const ogImage = `${SITE_URL}/media/travertine-hero.webp`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: [{ url: ogImage }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
    robots: { index: true, follow: true }
  };
}

// Bu layout sadece metadata için; UI'ta değişiklik yok
export default function VariantLayout({ children }) {
  return children;
}
