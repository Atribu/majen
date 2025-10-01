"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { IMAGES_BLOG } from "@/app/[locale]/(catalog)/_images";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";

/**
 * Dynamic SEO Landing Template for Travertine pages (Tiles/Slabs/Blocks/Pavers/Mosaics)
 * JSX only. Pulls text from next-intl (en.json/tr.json) and images from _images.js
 * This component expects `slug` as a prop from the server page.
 */
export default function DynamicTravertinePage({ slug, localeFromServer }) {
  const locale = useLocale() || localeFromServer || "en";
  const t = useTranslations("blog");

  const currentSlug = slug || "travertine-tiles"; // default
  const pagesObj = t.raw?.("pages");
  const pageRaw = pagesObj ? pagesObj[currentSlug] : undefined;

  const safePage = pageRaw || {
    metaTitle: "Travertine",
    metaDesc: "Travertine guide.",
    h1: "Travertine",
    intro:
      "Explore travertine product types, finishes, colors, applications and sourcing from Turkey.",
    sections: {},
  };

  const s = safePage.sections || {};
  const img = IMAGES_BLOG?.[currentSlug] || {};

  // --------- Routing / canonicals / breadcrumbs ----------
  const bc = [
    { name: t("common.breadcrumbs.home"), href: `/${locale}` },
    { name: t("common.breadcrumbs.blog"), href: `/${locale}/blog` },
    { name: t("common.breadcrumbs.travertines"), href: `/${locale}/blog/travertines` },
    { name: safePage.h1, href: `/${locale}/blog/travertines/${currentSlug}` },
  ].filter(
    (b) => b && typeof b.name === "string" && b.name && typeof b.href === "string" && b.href
  );

  const canonical = `https://www.majen.com.tr/${locale}/blog/travertines/${currentSlug}`;

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

  // --------- JSON-LD pieces (we'll unify later into @graph) ----------
  const breadcrumbLd =
    bc.length > 0
      ? {
          "@type": "BreadcrumbList",
          itemListElement: bc.map((b, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: b.name,
            item: `https://www.majen.com.tr${b.href}`,
          })),
        }
      : null;

  // Lead + social image + dates (from JSON)
  const socialImage =
    safePage.socialImage || "https://www.majen.com.tr/media/travertine-tiles-hero.webp";
  const datePublished = safePage.datePublished || "2025-01-15";
  const dateModified = safePage.dateModified || "2025-09-25";

  // FAQ items (combine extra + items)
  const extraFaq = s.faq?.extra || [];
  const baseFaq = s.faq?.items || [];
  const allFaqItems = [...extraFaq, ...baseFaq];

  const faqLd =
    allFaqItems.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: allFaqItems.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }
      : null;

  // BlogPosting LD
  const blogPostingLd = {
    "@type": "BlogPosting",
    "@id": `${canonical}#post`,
    headline: safePage.metaTitle || safePage.h1,
    description: safePage.metaDesc,
    inLanguage: "en",
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Majen" },
    publisher: {
      "@type": "Organization",
      name: "Majen",
      logo: { "@type": "ImageObject", url: "https://www.majen.com.tr/media/logo.png" },
    },
    image: socialImage,
    datePublished,
    dateModified,
    keywords:
      safePage.ld?.keywords || [
        "travertine tiles",
        "Turkish travertine",
        "travertine flooring",
        "travertine finishes",
        "wholesale travertine",
      ],
  };

  // Unify into single @graph
  const graphLd = {
    "@context": "https://schema.org",
    "@graph": [
      blogPostingLd,
      ...(faqLd ? [faqLd] : []),
      ...(breadcrumbLd ? [{ "@id": `${canonical}#breadcrumbs`, ...breadcrumbLd }] : []),
    ],
  };

  // --------- UI helpers ----------
  const Container = ({ children }) => (
    <div className="mx-auto max-w-[1400px] px-4">{children}</div>
  );

  const Section = ({ id, title, children }) => (
    <section
      id={id}
      className="scroll-mt-28 py-10 flex flex-col items-center justify-center text-center"
    >
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
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
        <h3 className="text-[16px] font-semibold group-hover:underline underline-offset-4">
          {title}
        </h3>
        {blurb && (
          <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px] text-neutral-700 leading-[120%] lg:leading-[130%]">
            {blurb}
          </p>
        )}
        <span className="mt-3 inline-block text-sm">Read more →</span>
      </div>
    </Link>
  );

  // --------- TOC ----------
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

  const [active, setActive] = React.useState(tocItems?.[0]?.id ?? null);

  React.useEffect(() => {
    if (!tocItems?.length) return;
    const topOffset = 80;
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

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      window.scrollTo({ top: window.scrollY - 8, behavior: "instant" });
    }, 220);
  };

  // --------- Images helpers ----------
  const imgKey = (group, key) => img?.[group]?.[key]?.src || null;
  const imgAlt = (group, key, fallback) => img?.[group]?.[key]?.alt || fallback || "";
  

  // --------- Derived cards / extras ----------
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

  // NEW: extras from SEO pack
  const colorExtras = s.colors?.extras || []; // [{h3,p}]
  const finishExtras = s.finishes?.extras || []; // [{h3,p}]
  const appDetails = s.applications?.details || []; // [{slug,h3,p}]
  const extraSpecRows = s.specs?.extraRows || []; // [{prop,value,notes}]
  const careNotes = s.install?.careNotes || []; // [string]
  const microProof = s.microProof || []; // [string]

  // Related (default fallbacks)
  const relatedDefaults = [
    { title: "Travertine Blog Hub", href: `/${locale}/blog/travertines` },
    { title: "Travertine Slabs", href: `/${locale}/blog/travertines/travertine-slabs` },
    { title: "Travertine Blocks", href: `/${locale}/blog/travertines/travertine-blocks` },
    { title: "Travertine Pavers", href: `/${locale}/blog/travertines/travertine-pavers` },
    { title: "Travertine Mosaics", href: `/${locale}/blog/travertines/travertine-mosaics` },
  ];

  return (
    <>
      <Head>
        {/* Basic metas (if generateMetadata not used) */}
        <title>{safePage.metaTitle}</title>
        {safePage.metaDesc && <meta name="description" content={safePage.metaDesc} />}
        <link rel="canonical" href={canonical} />
        {/* Alternates: TR muadili yoksa en + x-default bırakılabilir */}
        <link rel="alternate" href={canonical} hrefLang="en" />
        <link rel="alternate" href={canonical} hrefLang="x-default" />

        {/* OG/Twitter */}
        <meta property="og:title" content={safePage.metaTitle} />
        <meta property="og:description" content={safePage.metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={safePage.metaTitle} />
        <meta name="twitter:description" content={safePage.metaDesc} />
        <meta name="twitter:image" content={socialImage} />

        {/* Performance hint for hero */}
        <link
          rel="preload"
          as="image"
          href={socialImage}
          imagesrcset={`${socialImage} 1600w`}
          imagesizes="100vw"
          fetchpriority="high"
        />

        {/* Single JSON-LD @graph (BlogPosting + FAQPage + BreadcrumbList) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
        />
      </Head>

      {/* Breadcrumbs */}
      <div className="bg-neutral-50 border-b">
        <Container>
          <nav className="text-sm py-3 flex flex-wrap gap-2">
            {bc.map((b, i) => (
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

      {/* Hero + H1 + Lead + Intro */}
{/* Hero + H1 + Lead + Intro */}
<header className="relative ">
 
  <Container>
    <div className="py-4 lg:py-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold tracking-tight">
        {safePage.h1}
      </h1>

      {/* YENİ: Lead (yalnızca varsa) */}
      {safePage.lead && (
        <p className="mt-2 max-w-[1100px] text-[12px] md:text-[14px] lg:text-[16px] text-neutral-800">
          <strong>{safePage.lead.strong}</strong>
          {safePage.lead.rest}
        </p>
      )}

      {/* Mevcut intro (varsa) */}
      {safePage.intro && (
        <p className="mt-3 max-w-[1300px] text-[12px] md:text-[14px] lg:text-[16px] text-neutral-700 leading-relaxed">
          {safePage.intro}
        </p>
      )}
    </div>
  </Container>
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
</header>

<Container>
  <div className="flex flex-col mt-3 lg:mt-4">
    {/* Sticky TOC (varsa) */}
    {tocItems?.length > 0 && (
      <aside
        className="sticky h-max rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)] z-[99]"
        style={{ top: 80 }}
      >
        <div className="px-2 lg:px-4 pt-2 lg:pt-3 pb-1 md:pb-2 flex items-center justify-between">
          <h2 className="text-[14px] md:text-[14px] lg:text-[16px] font-semibold text-neutral-800">
            On this page
          </h2>
          {tocItems.length > 1 && (
            <div className="ml-3 h-1 flex-1 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-800/70 transition-all"
                style={{
                  width: `${
                    ((Math.max(0, tocItems.findIndex((i) => i.id === active)) + 1) /
                      tocItems.length) *
                    100
                  }%`,
                }}
              />
            </div>
          )}
        </div>

        <nav className="px-1 lg:px-2 pb-1 md:pb-3">
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
                    {x.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>
    )}

    <div className="lg:col-span-9 ">
      {/* 1) COLORS (varsa) */}
      {s.colors && (
        <Section id="colors" title={s.colors.h2}>
          {s.colors.intro && (
            <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.colors.intro}</p>
          )}

          {/* YENİ: ekstra H3 bloklar (varsa) */}
          {Array.isArray(s.colors.extras) && s.colors.extras.length > 0 && (
            <div className="mt-4 space-y-4 flex flex-col items-center justify-center text-center">
              {s.colors.extras.map((x) => (
                <div key={x.h3}>
                  <h3 className="text-lg font-semibold">{x.h3}</h3>
                  <p className="text-[12px] md:text-[14px] lg:text-[16px]">{x.p}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mevcut RESİMLİ kartlar (aynı kalıyor) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(s.colors.items || []).map((it) => (
              <Card
                key={it.slug}
                href={`/${locale}/blog/travertines/${currentSlug}/${it.slug}`}
                imgSrc={img?.colors?.[it.slug]?.src || null}
                alt={img?.colors?.[it.slug]?.alt || it.h3}
                title={it.h3}
                blurb={it.blurb}
              />
            ))}
          </div>
        </Section>
      )}

      {/* 2) FINISHES (varsa) */}
      {s.finishes && (
        <Section id="finishes" title={s.finishes.h2}>
          {s.finishes.intro && (
            <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.finishes.intro}</p>
          )}

          {/* YENİ: ekstra H3 bloklar (varsa) */}
          {Array.isArray(s.finishes.extras) && s.finishes.extras.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {s.finishes.extras.map((x) => (
                <div key={x.h3} className="rounded-2xl border p-5">
                  <h3 className="text-base font-semibold">{x.h3}</h3>
                  <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px]">{x.p}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mevcut RESİMLİ kartlar (aynı kalıyor) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {(s.finishes.items || []).map((it) => (
              <Card
                key={it.slug}
                href={`/${locale}/blog/travertines/${currentSlug}/${it.slug}`}
                imgSrc={img?.finishes?.[it.slug]?.src || null}
                alt={img?.finishes?.[it.slug]?.alt || it.h3 || it.slug}
                title={it.h3 || it.slug}
                blurb={it.blurb}
              />
            ))}
          </div>
        </Section>
      )}

      {/* 3) APPLICATIONS (varsa) */}
      {s.applications && (
        <Section id="applications" title={s.applications.h2}>
          {s.applications.intro && (
            <p className="text-[12px] md:text-[14px] lg:text-[16px]">
              {s.applications.intro}
            </p>
          )}

          {/* YENİ: flooring/bathroom/kitchen detayları (varsa) */}
          {Array.isArray(s.applications.details) && s.applications.details.length > 0 && (
            <div className="mt-4 space-y-4 items-center justify-center text-center">
              {s.applications.details.map((x) => (
                <div key={x.slug}>
                  <h3 className="text-base md:text-lg font-semibold">{x.h3}</h3>
                  <p className="text-[12px] md:text-[14px] lg:text-[16px]">{x.p}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mevcut kart grid (resimsiz) */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm ">
            {(s.applications.cards || []).map((c) => (
              <div key={c.slug} className="rounded-2xl border p-5">
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px]">{c.desc}</p>
                <Link
                  href={`/${locale}/blog/travertines/${currentSlug}/${c.slug}`}
                  className="mt-3 inline-block underline"
                >
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 4) SPECIFICATIONS (varsa) */}
      {s.specs && (
        <Section id="specs" title={s.specs.h2}>
          {s.specs.intro && (
            <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.specs.intro}</p>
          )}
          <div className="overflow-auto mt-4 hidden md:flex">
            <table className="min-w-[640px] w-full text-sm border rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-neutral-50 text-left">
                  <th className="p-3">Property</th>
                  <th className="p-3">Typical Value</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[...(s.specs.table || []), ...(s.specs.extraRows || [])].map((row, i) => (
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

      {/* 5) INSTALLATION & CARE (varsa) */}
      {s.install && (
        <Section id="install" title={s.install.h2}>
          {s.install.intro && (
            <p className="text-[12px] md:text-[14px] lg:text-[16px]">{s.install.intro}</p>
          )}

          {/* YENİ: bakım notları (varsa) */}
          {Array.isArray(s.install.careNotes) && s.install.careNotes.length > 0 && (
            <div className="flex flex-col items-center justify-center text-center">
              <ul className="care-notes mt-4 list-disc pl-5 space-y-1 text-left">
              {s.install.careNotes.map((x, i) => (
                <li key={i} className="text-[12px] md:text-[14px] lg:text-[16px]">
                  {x}
                </li>
              ))}
            </ul>
            </div>
          )}
        </Section>
      )}

      {/* 6) PROS & CONS (varsa) */}
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

      {/* 7) GALLERY (varsa ve resimler korunur) */}
       {s.gallery && (
              <Section id="gallery" title={s.gallery.h2}>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(img?.gallery || []).map((g,i) => (
                    <div
                     key={`${g.src}-${i}`}
                      className="relative h-56 w-full rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={g.src}
                        alt={g.alt || safePage.h1}
                        width={400}
                        height={350}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Section>
            )}



      {/* 8) FAQ (varsa; ekstra + mevcut birleştirilmiş) */}
      {s.faq && (
       <Section id="faq">
         <QuestionsSection
          span="Blog"
          items={[...(s.faq.extra || []), ...(s.faq.items || [])]}
        />
       </Section>
      )}
    </div>
    <ContactFrom/>
  </div>
</Container>

    </>
  );
}
