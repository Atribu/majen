import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import BreadcrumbsExact from "../../components/generalcomponent/BreadcrumbsExact";
import { COMPANY_PAGE_KEYS, companyPath } from "@/lib/companyPages";
import CompanyNavigation from "./CompanyNavigation";

const PAGE_IMAGES = {
  stonePhilosophy: {
    hero: "/images/homepage/antikarkaplan2.webp",
    detail: "/images/homepage/anasayfa3.webp",
  },
  history: {
    hero: "/images/homepage/antikoarkplan.webp",
    detail: "/images/blocks/antik2.webp",
  },
  quarries: {
    hero: "/images/blogs/TravertineQuarry.webp",
    detail: "/images/blocks/Ivoryblok.webp",
  },
  stoneProcessing: {
    hero: "/images/blogs/Travertinemanufacturer.webp",
    detail: "/images/homepage/kesim.webp",
  },
};

export async function generateCompanyMetadata(locale, pageKey) {
  const t = await getTranslations({ locale, namespace: `CompanyPages.pages.${pageKey}` });
  const canonical = companyPath(locale, pageKey);

  return {
    title: t("seo.title"),
    description: t("seo.description"),
    alternates: {
      canonical,
      languages: {
        tr: companyPath("tr", pageKey),
        en: companyPath("en", pageKey),
        "x-default": companyPath("en", pageKey),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Majen",
      url: canonical,
      title: t("seo.title"),
      description: t("seo.description"),
      images: [{ url: PAGE_IMAGES[pageKey].hero }],
      locale,
    },
    robots: { index: false, follow: true },
  };
}

function FeatureCards({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, index) => (
        <article key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
          <span className="text-xs font-semibold tracking-[0.18em] text-[#00877b]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-neutral-600">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div className="relative ml-3 border-l border-neutral-300 md:ml-0 md:grid md:grid-cols-4 md:border-l-0 md:border-t">
      {items.map((item, index) => (
        <article key={item.title} className="relative pb-10 pl-8 md:pb-0 md:pl-0 md:pr-8 md:pt-8">
          <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#00877b] md:-top-[5px] md:left-0" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00877b]">
            {item.label || String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function ProcessSteps({ items }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-2">
      {items.map((item, index) => (
        <article key={item.title} className="bg-white p-6 md:p-8">
          <div className="flex items-start gap-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{item.text}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function CompanyDetailPage({ locale, pageKey }) {
  const t = await getTranslations({ locale, namespace: "CompanyPages" });
  const page = t.raw(`pages.${pageKey}`);
  const images = PAGE_IMAGES[pageKey];
  const currentIndex = COMPANY_PAGE_KEYS.indexOf(pageKey);
  const nextKey = COMPANY_PAGE_KEYS[(currentIndex + 1) % COMPANY_PAGE_KEYS.length];
  const contactHref = locale === "tr" ? "/tr/iletisim" : "/en/contactus";

  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex min-h-[440px] items-end overflow-hidden md:min-h-[570px]">
        <Image
          src={images.hero}
          alt={page.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-12 text-white md:px-8 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            {t("common.eyebrow")}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            {page.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
            {page.hero.subtitle}
          </p>
        </div>
      </section>

      <CompanyNavigation locale={locale} current={pageKey} />

      <div className="mx-auto max-w-[1180px] px-5 pt-7 md:px-8">
        <BreadcrumbsExact
          prefix={`/${locale}`}
          crumbHome={t("common.home")}
          items={[
            { label: t("nav.overview"), href: companyPath(locale, "overview") },
            { label: t(`nav.${pageKey}`), href: companyPath(locale, pageKey) },
          ]}
          className="mb-0 px-0"
        />
      </div>

      <section className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 md:grid-cols-[1.08fr_.92fr] md:items-center md:px-8 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00877b]">
            {page.intro.kicker}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{page.intro.title}</h2>
          <p className="mt-6 leading-8 text-neutral-600">{page.intro.text1}</p>
          <p className="mt-4 leading-8 text-neutral-600">{page.intro.text2}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={images.detail}
            alt={page.detailAlt}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-[#f5f3ee] py-14 md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="mb-9 max-w-2xl">
            <h2 className="text-2xl font-semibold md:text-3xl">{page.section.title}</h2>
            <p className="mt-3 leading-7 text-neutral-600">{page.section.text}</p>
          </div>
          {pageKey === "history" ? (
            <Timeline items={page.timeline} />
          ) : pageKey === "stoneProcessing" ? (
            <ProcessSteps items={page.steps} />
          ) : (
            <FeatureCards items={page.cards} />
          )}
        </div>
      </section>

      <section className="relative overflow-hidden py-16 text-white md:py-24">
        <Image src="/images/homepage/antikarkaplan2.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <blockquote className="relative z-10 mx-auto max-w-4xl px-6 text-center text-2xl font-medium leading-relaxed md:text-4xl md:leading-snug">
          “{page.quote}”
        </blockquote>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
        <div className="flex flex-col justify-between gap-8 rounded-2xl border border-neutral-200 p-7 md:flex-row md:items-center md:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold md:text-3xl">{page.closing.title}</h2>
            <p className="mt-3 leading-7 text-neutral-600">{page.closing.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={contactHref} className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800">
              {t("common.contact")}
            </Link>
            <Link
              href={companyPath(locale, nextKey)}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium hover:bg-neutral-50"
            >
              {t("common.next")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
