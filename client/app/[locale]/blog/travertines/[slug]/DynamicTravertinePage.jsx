"use client";
import React from "react"; 
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { IMAGES_BLOG } from "@/app/[locale]/(catalog)/_images";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";

/**
 * Dynamic SEO Landing Template for Travertine pages (Tiles/Slabs/Blocks/Pavers/Mosaics)
 * JSX only. Pulls text from next-intl (en.json/tr.json) and images from _images.js
 * This component expects `slug` as a prop from the server page.
 */
export default function DynamicTravertinePage({ slug, localeFromServer }) {
  const locale = useLocale() || localeFromServer;
  const t = useTranslations("blog");

  const currentSlug = slug || "travertine-tiles"; // default
  const pagesObj = t.raw?.("pages");
  const page = pagesObj ? pagesObj[currentSlug] : undefined;

  const safePage = page || {
    metaTitle: "Travertine",
    metaDesc: "Travertine guide.",
    h1: "Travertine",
    intro:
      "Explore travertine product types, finishes, colors, applications and sourcing from Turkey.",
    sections: {},
  };

  const img = IMAGES_BLOG?.[currentSlug] || {};

  // Breadcrumbs (UI + JSON-LD)
  const bc = [
    { name: t("common.breadcrumbs.home"), href: `/${locale}` },
    { name: t("common.breadcrumbs.blog"), href: `/${locale}/blog` },
    { name: t("common.breadcrumbs.travertines"), href: `/${locale}/blog/travertines` },
    { name: safePage.h1, href: `/${locale}/blog/travertines/${currentSlug}` },
  ];
  const breadcrumbs = bc.filter(
    (b) => b && typeof b.name === "string" && b.name && typeof b.href === "string" && b.href
  );

  const canonical = `https://majen.com.tr/${locale}/blog/travertines/${currentSlug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: safePage.metaTitle || safePage.h1,
    description: safePage.metaDesc,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Majen Natural Stone" },
    publisher: {
      "@type": "Organization",
      name: "Majen",
      logo: { "@type": "ImageObject", url: "https://majen.com.tr/logo.png" },
    },
    inLanguage: locale,
  };

  const faqItems = safePage?.sections?.faq?.items || [];
  const faqLd = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      }
    : null;

  const breadcrumbLd =
    breadcrumbs.length
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: b.name,
            item: `https://majen.com.tr${b.href}`,
          })),
        }
      : null;

  const Container = ({ children }) => (
    <div className="mx-auto max-w-[1400px] px-4">{children}</div>
  );

  const Section = ({ id, title, children }) => (
    <section id={id} className="scroll-mt-28 py-10 flex flex-col items-center justify-center text-center">
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
      )}
      <div className="mt-1 md:mt-2 lg:mt-4 space-y-6 text-neutral-700 leading-relaxed">
        {children}
      </div>
    </section>
  );

  const Card = ({ href, imgSrc, alt, title, blurb }) => (
    <Link
      href={href || "#"}
      className="group rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-44 w-full">
        {imgSrc ? (
          <Image src={imgSrc} alt={alt || title} fill className="object-cover" />
        ) : (
          <div className="h-full w-full bg-neutral-100" />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold group-hover:underline underline-offset-4">
          {title}
        </h3>
        {blurb && <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px] text-neutral-700 leading-[120%] lg:leading-relaxed">{blurb}</p>}
        <span className="mt-3 inline-block text-sm">Read more →</span>
      </div>
    </Link>
  );

  const s = safePage.sections || {};
  const toc = t.raw("common.toc");
  const tocItems = [
    s.colors && { id: "colors", label: toc.colors },
    s.finishes && { id: "finishes", label: toc.finishes },
    s.applications && { id: "applications", label: toc.applications },
    s.specs && { id: "specs", label: toc.specs },
    s.install && { id: "install", label: toc.install },
    s.proscons && { id: "proscons", label: toc.proscons },
    s.gallery && { id: "gallery", label: toc.gallery },
    s.faq && { id: "faq", label: toc.faq },
    s.related && { id: "related", label: toc.related },
  ].filter(Boolean);

  const relatedDefaults = [
    { title: "Travertine Blog Hub", href: `/${locale}/blog/travertines` },
    { title: "Travertine Slabs", href: `/${locale}/blog/travertine-slabs` },
    { title: "Travertine Blocks", href: `/${locale}/blog/travertine-blocks` },
    { title: "Travertine Pavers", href: `/${locale}/blog/travertine-pavers` },
    { title: "Travertine Mosaics", href: `/${locale}/blog/travertine-mosaics` },
  ];

  const imgKey = (group, key) => img?.[group]?.[key]?.src || null;
  const imgAlt = (group, key, fallback) =>
    img?.[group]?.[key]?.alt || fallback || "";

  const colorCards = (s.colors?.items || []).map((it) => ({
    href: `/${locale}/blog/travertines/${currentSlug}/${it.slug}`,
    imgSrc: imgKey("colors", it.slug),
    alt: imgAlt("colors", it.slug, it.h3),
    title: it.h3,
    blurb: it.blurb,
  }));

  const finishCards = (s.finishes?.items || []).map((it) => ({
    href: `/${locale}/blog/travertines/${currentSlug}/${it.slug}`,
    imgSrc: imgKey("finishes", it.slug),
    alt: imgAlt("finishes", it.slug, it.h3),
    title: it.h3 || it.slug,
    blurb: it.blurb,
  }));

  const appCards = (s.applications?.cards || []).map((c) => ({
    href: `/${locale}/blog/travertines/${currentSlug}/${c.slug}`,
    title: c.title,
    desc: c.desc,
  }));

  

  // Aktif başlığı tut
const [active, setActive] = React.useState(tocItems?.[0]?.id ?? null);

// Scrollspy: görünür section'ı aktif yap
React.useEffect(() => {
  if (!tocItems?.length) return;

  const topOffset = 80; // header yüksekliğine göre ayarla
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    },
    {
      root: null,
      rootMargin: `-${topOffset + 8}px 0px -60% 0px`,
      threshold: [0.1, 0.25, 0.5, 0.75],
    }
  );

  const els = tocItems.map((x) => document.getElementById(x.id)).filter(Boolean);
  els.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}, [tocItems]);

// Smooth scroll + ufak offset düzeltmesi
const handleTocClick = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => {
    window.scrollTo({ top: window.scrollY - 8, behavior: "instant" });
  }, 220);
};

  const items = s.faq.items || [];


  return (
    <>
      <Head>
        <title>{safePage.metaTitle}</title>
        {safePage.metaDesc && (
          <meta name="description" content={safePage.metaDesc} />
        )}
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={safePage.metaTitle} />
        <meta property="og:description" content={safePage.metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        {faqLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
        )}
        {breadcrumbLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
          />
        )}
      </Head>

      <div className="bg-neutral-50 border-b">
        <Container>
          <nav className="text-sm py-3 flex flex-wrap gap-2">
            {breadcrumbs.map((b, i) => (
              <span key={b.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-neutral-400">/</span>}
                <Link href={b.href} className="hover:underline">
                  {b.name}
                </Link>
              </span>
            ))}
          </nav>
        </Container>
      </div>

      <header className="relative">
        <div className="relative h-60 md:h-80">
          {img?.hero?.src ? (
            <Image
              src={img.hero.src}
              alt={img.hero.alt || safePage.h1}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-neutral-200" />
          )}
        </div>
        <Container>
          <div className="py-4 lg:py-8 flex flex-col items-center justify-center text-center">
            <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold tracking-tight">
              {safePage.h1}
            </h1>
            {safePage.intro && (
              <p className="mt-0 md:mt-2 lg:mt-4 max-w-[1300px] text-base md:text-lg leading-relaxed text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
                {safePage.intro}
              </p>
            )}
          </div>
        </Container>
      </header>

      <Container>
        <div className="flex flex-col">
          <aside
  className="sticky h-max rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)] z-[99]"
  style={{ top: 80 }} // header’in hemen altına yapışsın
>
  {/* Başlık + ilerleme çubuğu */}
  <div className="px-2 lg:px-4 pt-2 lg:pt-3 pb-2 flex items-center justify-between">
    <h2 className="text-[14px] md:text-[14px] lg:text-[16px] font-semibold text-neutral-800">On this page</h2>
    {tocItems.length > 1 && (
      <div className="ml-3 h-1 flex-1 bg-neutral-200 rounded-full overflow-hidden text-[12px] md:text-[14px] lg:text-[16px]">
        <div
          className="h-full bg-neutral-800/70 transition-all "
          style={{
            width: `${(Math.max(0, tocItems.findIndex(i => i.id === active)) + 1) / tocItems.length * 100}%`,
          }}
        />
      </div>
    )}
  </div>

  <nav className="px-1 lg:px-2 pb-3 ">
  <ol className="flex flex-wrap gap-2 px-2 py-1">
    {tocItems.map((x) => {
      const isActive = active === x.id;
      return (
        <li key={x.id}>
          <a
            href={`#${x.id}`}
            onClick={(e) => handleTocClick(e, x.id)}
            className={[
              "inline-flex items-center gap-2 text-xs md:text-sm px-1 lg:px-3 py-1 lg:py-1.5 rounded-full border transition",
              isActive
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white/80 hover:bg-neutral-100 border-neutral-200 text-neutral-700",
            ].join(" ")}
          >
            {/* <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-neutral-400"}`} /> */}
            {x.label}
          </a>
        </li>
      );
    })}
  </ol>
</nav>
</aside>

          <div className="lg:col-span-9 ">
            {s.colors && (
              <Section id="colors" title={s.colors.h2}>
                <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.colors.intro}</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colorCards.map((c) => (
                    <Card key={c.href} {...c} />
                  ))}
                </div>
              </Section>
            )}

            {s.finishes && (
              <Section id="finishes" title={s.finishes.h2}>
                <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.finishes.intro}</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                  {finishCards.map((f) => (
                    <Card key={f.href} {...f} />
                  ))}
                </div>
              </Section>
            )}

            {s.applications && (
              <Section id="applications" title={s.applications.h2} className="flex flex-col items-center justify-center text-center">
                <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.applications.intro}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm ">
                  {appCards.map((c) => (
                    <div key={c.href} className="rounded-2xl border p-5">
                      <h3 className="text-base font-semibold">{c.title}</h3>
                      <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px]">{c.desc}</p>
                      <Link href={c.href} className="mt-3 inline-block underline">
                        Learn more
                      </Link>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {s.specs && (
              <Section id="specs" title={s.specs.h2}>
                <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.specs.intro}</p>
                <div className="overflow-auto mt-4">
                  <table className="min-w-[640px] w-full text-sm border rounded-2xl overflow-hidden">
                    <thead>
                      <tr className="bg-neutral-50 text-left">
                        <th className="p-3">Property</th>
                        <th className="p-3">Typical Value</th>
                        <th className="p-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(s.specs.table || []).map((row, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">{row.prop}</td>
                          <td className="p-3">{row.value}</td>
                          <td className="p-3">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {s.install && (
              <Section id="install" title={s.install.h2}>
                <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.install.intro}</p>
              </Section>
            )}

            {s.proscons && (
              <Section id="proscons" title={s.proscons.h2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mt-4 ">
                  <div className="rounded-2xl border p-5">
                    <h3 className="text-base font-semibold">Pros</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      {(s.proscons.pros || []).map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border p-5">
                    <h3 className="text-base font-semibold">Cons</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      {(s.proscons.cons || []).map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>
            )}

            {s.gallery && (
              <Section id="gallery" title={s.gallery.h2}>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(img?.gallery || []).map((g) => (
                    <div
                      key={g.src}
                      className="relative h-56 w-full rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={g.src}
                        alt={g.alt || safePage.h1}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {s.faq && (
              <QuestionsSection span="Blog" items={items}/>
            )}

            <Section id="related" title={toc.related || "Related Guides"}>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                {relatedDefaults.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>

            <div className="my-10 rounded-2xl border p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">
                  {t("common.cta.title")}
                </h2>
                <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px] text-neutral-700">
                  {t("common.cta.desc")}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="px-4 py-2 rounded-xl border hover:bg-neutral-50"
                >
                  {t("common.cta.contact")}
                </Link>
                <Link
                  href={`/${locale}/catalog`}
                  className="px-4 py-2 rounded-xl border hover:bg-neutral-50"
                >
                  {t("common.cta.catalog")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
