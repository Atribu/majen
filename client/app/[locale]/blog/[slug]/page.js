// app/[locale]/[slug]/page.js
import DynamicTravertinePage from "./DynamicTravertinePage";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { localizedBlogPath, resolveBlogPageKey } from "@/lib/blogPageRoutes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const OG_IMAGE = `${SITE_URL}/images/export/export-hero.webp`;

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const messages = await getMessages({ locale });
  const pageKey = resolveBlogPageKey(locale, slug);
  const page = pageKey ? messages?.blog?.pages?.[pageKey] : null;

  if (!page) notFound();

  const title = page.metaTitle || page.h1;
  const description = page.metaDesc || page.intro || "";
  const pageUrl = `${SITE_URL}${localizedBlogPath(locale, pageKey)}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${SITE_URL}${localizedBlogPath("en", pageKey)}`,
        tr: `${SITE_URL}${localizedBlogPath("tr", pageKey)}`,
        "x-default": `${SITE_URL}${localizedBlogPath("en", pageKey)}`,
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
  const messages = await getMessages({ locale });
  const pageKey = resolveBlogPageKey(locale, slug);

  if (!pageKey || !messages?.blog?.pages?.[pageKey]) notFound();

  return <DynamicTravertinePage slug={slug} localeFromServer={locale} />;
}
