// app/[locale]/[slug]/page.js
import DynamicTravertinePage from "./DynamicTravertinePage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const loc = locale || "en";
  // JSON’daki başlık/açıklamayı okumaya çalış (başarısızsa fallback)
  let metaTitle = "Travertine Guide";
  let metaDesc =
    "Explore travertine products: tiles, slabs, finishes, specs and care. Quarry-backed supplier.";
  let ogImage = "https://majen.com.tr/media/travertine-tiles-hero.webp";
  const canonical = `https://majen.com.tr/${loc}/blog/travertines/${slug}`;

  try {
    const t = await getTranslations({ locale: loc, namespace: "blog" });
    const pages = t.raw("pages");
    const page = pages?.[slug];
    if (page?.metaTitle) metaTitle = page.metaTitle;
    if (page?.metaDesc) metaDesc = page.metaDesc;
    if (page?.socialImage) ogImage = page.socialImage;
  } catch {}

  // TR muadili yoksa sadece en + x-default
  const alternates =
    loc === "en"
      ? {
          canonical,
          languages: {
            en: canonical,
            "x-default": canonical,
          },
        }
      : {
          canonical,
        };

  return {
    title: metaTitle,
    description: metaDesc,
    alternates,
    openGraph: {
      type: "article",
      title: metaTitle,
      description: metaDesc,
      url: canonical,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }) {
  const { slug, locale } = await params;
  return <DynamicTravertinePage slug={slug} localeFromServer={locale} />;
}
