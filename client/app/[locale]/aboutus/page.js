import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { BASE_BY_LOCALE, PRODUCT_SLUGS } from "@/lib/travertine";
import QuestionsSection from "../components/generalcomponent/QuestionsSection";
import SocialMediaSection from "../components/products1/SocialMediaSection";

/* -------------------------------------------------------------------------- */
/*                           🔹 SEO / METADATA BLOKU 🔹                       */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

 const pathByLocale = {
    en: "/en/about",
    tr: "/tr/hakkimizda",
  };
  const canonicalPath = pathByLocale[locale] || pathByLocale.en;

  return {
    title: t("seo.title"),
    description: t("seo.description"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: pathByLocale.en,
        tr: pathByLocale.tr,
        "x-default": pathByLocale.en,
      },
    },
    openGraph: {
      url: canonicalPath,
      type: "article",
      title: t("seo.title"),
      description: t("seo.description"),
      siteName: "Majen",
      images: [{ url: "/og/about.jpg" }],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.title"),
      description: t("seo.description"),
      images: ["/og/about.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

/* -------------------------------------------------------------------------- */
/*                            🔹 ABOUT PAGE MAIN 🔹                           */
/* -------------------------------------------------------------------------- */
export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const t2 = await getTranslations({ locale, namespace: "AboutPage.Questions" });

  const items = [
    { q: t2("q1"), a: t2("a1") },
    { q: t2("q2"), a: t2("a2") },
    { q: t2("q3"), a: t2("a3") },
  ];

  const base = BASE_BY_LOCALE[locale];
  const hrefFor = (key) => `/${locale}/${base}/${PRODUCT_SLUGS[locale][key]}`;

  /* -------------------------------------------------------------------------- */
  /*                              🔹 JSON-LD BLOKU 🔹                           */
  /* -------------------------------------------------------------------------- */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Majen Quarry",
      url: `https://majen.com.tr${locale === "tr" ? "/tr/hakkimizda" : "/en/about"}`,
      logo: "/images/logo.svg",
      sameAs: [
        "https://www.linkedin.com/company/majen",
        "https://www.instagram.com/majen",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "info@majen.com",
          telephone: "+90-533-000-0000",
          areaServed: ["TR", "US", "EU"],
        },
      ],
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                🔹 RENDER 🔹                                */
  /* -------------------------------------------------------------------------- */
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
          {["mission", "quality", "logistics"].map((key) => (
            <article
              key={key}
              className="rounded-xl border border-neutral-200 p-5 bg-white"
            >
              <h2 className="text-lg font-semibold">
                {t(`blocks.${key}.title`)}
              </h2>
              <p className="mt-2 text-sm leading-7 text-neutral-700">
                {t(`blocks.${key}.text`)}
              </p>
            </article>
          ))}
        </div>

        {/* İç linkleme (SEO) */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">{t("explore.title")}</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {["block", "slabs", "tiles"].map((key) => (
              <Link
                key={key}
                href={hrefFor(key)}
                className="rounded-xl border border-neutral-200 p-4 text-center hover:bg-neutral-50"
              >
                {t(`explore.${key}`)}
              </Link>
            ))}
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

        {/* Sosyal medya & FAQ */}
        <SocialMediaSection />
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
