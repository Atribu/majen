import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { BASE_BY_LOCALE, PRODUCT_SLUGS } from "@/lib/travertine";
import QuestionsSection from "../components/generalcomponent/QuestionsSection";
import SocialMediaSection from "../components/products1/SocialMediaSection";

// ---- Metadata (hreflang + canonical + OG/Twitter)
export async function generateMetadata({ params }) {
  const { locale } = await params; // Next'in "params'ı await et" uyarısını çözer
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  // TR slugu istersen /tr/hakkimizda yapıp route'u da öyle açabilirsin.
  const urls = {
    en: "/en/about",
    tr: "/tr/about",
  };

  return {
    title: t("seo.title"),
    description: t("seo.description"),
    alternates: {
      canonical: urls[locale],
      languages: {
        en: urls.en,
        tr: urls.tr,
        "x-default": urls.en,
      },
    },
    openGraph: {
      title: t("seo.title"),
      description: t("seo.description"),
      url: urls[locale],
      siteName: "Majen",
      type: "website",
      images: [{ url: "/og/about.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.title"),
      description: t("seo.description"),
      images: ["/og/about.jpg"],
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  const t2  = await getTranslations({ locale, namespace: "AboutPage.Questions" });

           const items = [
        { q: t2("q1"), a: t2("a1") },
        { q: t2("q2"), a: t2("a2") },
        { q: t2("q3"), a: t2("a3") }
      ];

  const base = BASE_BY_LOCALE[locale]; // "travertine" | "traverten"
  const hrefFor = (key) => `/${locale}/${base}/${PRODUCT_SLUGS[locale][key]}`;

  // ---- JSON-LD (Organization + Breadcrumb + (varsa) FAQPage)
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Majen",
      url: `${site}/${locale}/about`,
      logo: `${site}/images/logo.svg`,
      sameAs: [
        "https://www.linkedin.com/company/majen", // varsa güncelle
        "https://www.instagram.com/majen",        // varsa güncelle
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "info@majen.com",
          telephone: "+90-533-000-0000",
          areaServed: ["TR", "US", "EU"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: t("breadcrumbs.home"),
          item: `${site}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t("breadcrumbs.about"),
          item: `${site}/${locale}/about`,
        },
      ],
    },
    items.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }
      : null,
  ].filter(Boolean);

  return (
    <main className="min-h-[60vh]">
      {/* HERO */}
      <section className="relative h-[420px] md:h-[520px]">
        <Image
          src="/images/homepage/antikarkaplan2.webp"
          alt={t("hero.alt")}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-8 text-white h-full flex flex-col justify-center">
          <h1 className="text-[28px] md:text-[36px] font-semibold leading-tight">
            {t("hero.title")}
          </h1>
          <p className="mt-3 max-w-3xl text-[14px] md:text-[16px] leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* HAKKIMIZDA BLOKLARI */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-6">
          <article className="rounded-xl border border-neutral-200 p-5 bg-white">
            <h2 className="text-lg font-semibold">{t("blocks.mission.title")}</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              {t("blocks.mission.text")}
            </p>
          </article>

          <article className="rounded-xl border border-neutral-200 p-5 bg-white">
            <h2 className="text-lg font-semibold">{t("blocks.quality.title")}</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              {t("blocks.quality.text")}
            </p>
          </article>

          <article className="rounded-xl border border-neutral-200 p-5 bg-white">
            <h2 className="text-lg font-semibold">{t("blocks.logistics.title")}</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              {t("blocks.logistics.text")}
            </p>
          </article>
        </div>

        {/* İç linkleme (SEO) */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">{t("explore.title")}</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href={hrefFor("block")}
              className="rounded-xl border border-neutral-200 p-4 text-center hover:bg-neutral-50"
            >
              {t("explore.blocks")}
            </Link>
            <Link
              href={hrefFor("slabs")}
              className="rounded-xl border border-neutral-200 p-4 text-center hover:bg-neutral-50"
            >
              {t("explore.slabs")}
            </Link>
            <Link
              href={hrefFor("tiles")}
              className="rounded-xl border border-neutral-200 p-4 text-center hover:bg-neutral-50"
            >
              {t("explore.tiles")}
            </Link>
            <Link
              href={`/${locale}/howweexport`}
              className="rounded-xl border border-neutral-200 p-4 text-center hover:bg-neutral-50"
            >
              {t("explore.export")}
            </Link>
          </div>
        </div>

        {/* Sertifikalar / Güven sinyali */}
        <div className="mt-10 rounded-xl border border-neutral-200 p-5 bg-white">
          <h2 className="text-lg font-semibold">{t("trust.title")}</h2>
          <p className="mt-2 text-sm leading-7 text-neutral-700">
            {t("trust.text")}
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-neutral-700 list-disc list-inside">
            <li>{t("trust.items.qualityReports")}</li>
            <li>{t("trust.items.packingPhotos")}</li>
            <li>{t("trust.items.sealNumbers")}</li>
            <li>{t("trust.items.docs")}</li>
          </ul>
        </div>
        
        <SocialMediaSection/>

        {/* FAQ — client JS olmadan (<details>) */}
        <QuestionsSection items={items} span="About" />
      </section>

      {/* JSON-LD */}
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
