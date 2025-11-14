"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { IMAGES_BLOG } from "@/app/[locale]/(catalog)/_images";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";
// 🔗 product & process helperları
import { baseFor, CUTS, getLang } from "@/lib/travertine";
/* -------------------------------------------
   HELPERS: route slug → pages key
-------------------------------------------- */
function normalizeRouteSlug(raw = "") {
  return String(raw)
    .trim()
    .replace(/^\/+/, "")
    .replace(/^(en|tr)\//i, "")
    .replace(/^blog\//i, "")
    .replace(/^travertines?\//i, "")
    .toLowerCase();
}

function pageKeyFromSlug(routeSlug = "") {
  return String(routeSlug).replace(/-guide$/, "");
}

// ✅ locale + slug → blog.pages key
function resolvePageKey(locale, slug) {
  const lang = String(locale || "en").toLowerCase().split("-")[0];

  const base = pageKeyFromSlug(normalizeRouteSlug(slug));

  const MAP = {
    en: {
      "travertine-guide": "travertine-guide",

      "travertine-tiles": "travertine-tiles",
      "travertine-slabs": "travertine-slabs",
      "travertine-blocks": "travertine-blocks",
      "travertine-pavers": "travertine-pavers",
      "travertine-mosaics": "travertine-mosaics",

      "polished-travertine": "polished-travertine",
      "honed-travertine": "honed-travertine",
      "tumbled-travertine": "tumbled-travertine",
      "brushed-travertine": "brushed-travertine",
      "filled-travertine": "filled-travertine",
      "unfilled-travertine": "unfilled-travertine",

      "ivory-travertine": "ivory-travertine",
      "light-travertine": "light-travertine",
      "antico-travertine": "antico-travertine",

      "travertine-flooring": "travertine-flooring",
      "travertine-cladding": "travertine-cladding",
      "travertine-facade": "travertine-facade",
      "travertine-bathroom": "travertine-bathroom",
      "travertine-kitchen": "travertine-kitchen",
      "travertine-pool": "travertine-pool",

      "travertine-turkey": "travertine-turkey",
      "turkish-travertine": "turkish-travertine",
      "travertine-quarry": "travertine-quarry",
      "travertine-supplier": "travertine-supplier",
      "travertine-exporter": "travertine-exporter",
      "travertine-manufacturer": "travertine-manufacturer",
      "travertine-distributor": "travertine-distributor",
    },

    tr: {
      "traverten-rehberi": "travertine-guide",

      "karo-traverten-rehberi": "travertine-tiles",
      "traverten-plakalar-rehberi": "travertine-slabs",
      "traverten-bloklar-rehberi": "travertine-blocks",
      "traverten-dosemeler-rehberi": "travertine-pavers",
      "traverten-mozaik-rehberi": "travertine-mosaics",

      "parlak-traverten-rehberi": "polished-travertine",
      "honlanmis-traverten": "honed-travertine",
      "eskitilmis-traverten": "tumbled-travertine",
      "fircalanmis-traverten": "brushed-travertine",
      "dolgulu-traverten": "filled-travertine",
      "dolgusuz-traverten": "unfilled-travertine",

      "fildisi-traverten": "ivory-travertine",
      "acik-traverten": "light-travertine",
      "antiko-traverten": "antico-travertine",

      "traverten-zemin-kaplama": "travertine-flooring",
      "traverten-kaplama": "travertine-cladding",
      "traverten-cephe": "travertine-facade",
      "traverten-banyo": "travertine-bathroom",
      "traverten-mutfak": "travertine-kitchen",
      "traverten-havuz": "travertine-pool",

      "turkiye-traverteni": "travertine-turkey",
      "turk-traverteni": "turkish-travertine",
      "traverten-ocagi": "travertine-quarry",
      "traverten-tedarikcisi": "travertine-supplier",
      "traverten-ihracatcisi": "travertine-exporter",
      "traverten-ureticisi": "travertine-manufacturer",
      "traverten-dagiticisi": "travertine-distributor",
    },
  };

  const table = MAP[lang] || {};
  return table[base] || base;
}

// -------------------------------------------
// LOCAL HELPERS: productSlugFor & procSlugForLocale
// (blog linkleme için minimal versiyon)
// -------------------------------------------
function productSlugFor(locale, productKey) {
  const lang = String(locale || "en").toLowerCase().startsWith("tr") ? "tr" : "en";

  const MAP = {
    en: {
      tiles: "travertine-tiles",
      slabs: "travertine-slabs",
      blocks: "travertine-blocks",
      pavers: "travertine-pavers",
      mosaics: "travertine-mosaics",
    },
    tr: {
      tiles: "traverten-karolar",
      slabs: "traverten-plakalar",
      blocks: "traverten-bloklar",
      pavers: "traverten-dosemeler",
      mosaics: "traverten-mozaikler",
    },
  };

  return (MAP[lang] && MAP[lang][productKey]) || productKey;
}

function procSlugForLocale(locale, combinedProcKey) {
  const lang = String(locale || "en").toLowerCase().startsWith("tr") ? "tr" : "en";

  const MAP = {
    en: {
      "filled-honed": "filled-honed-travertine",
      "filled-polished": "filled-polished-travertine",
      // gerekirse başka kombinasyonları da ekleyebiliriz
    },
    tr: {
      "filled-honed": "dolgulu-honlanmis-traverten",
      "filled-polished": "dolgulu-parlak-traverten",
    },
  };

  return (MAP[lang] && MAP[lang][combinedProcKey]) || combinedProcKey;
}


/* -------------------------------------------
   BLOG → PRODUCT / PROCESS LINK HELPERS
-------------------------------------------- */

// Incoterm + shipment/delivery → how-we-export
function getIncotermPatterns(locale) {
  const exportBase = locale.startsWith("tr")
    ? "nasıl-ihracat-yapıyoruz"
    : "how-we-export";

  const rootHref = `/${locale}/${exportBase}`;

  return [
    { pattern: /\bFOB\b/gi, href: `${rootHref}/fob` },
    { pattern: /\bCIF\b/gi, href: `${rootHref}/cif` },
    { pattern: /\bEXW\b/gi, href: `${rootHref}/exw` },
    // genel terimler → ana export sayfası
    { pattern: /\bshipments?\b/gi, href: rootHref },
    { pattern: /\bshipping\b/gi, href: rootHref },
    { pattern: /\bdeliver(y|ies)\b/gi, href: rootHref },
  ];
}

// Blogdan product listing'e linkler
function blogToProductPatterns(locale) {
  // Örn: /en/travertine-blocks
  //      /tr/traverten-bloklar
  const mk = (productKey) =>
    `/${locale}/${productSlugFor(locale, productKey)}`;

  const patterns = [];

  if (locale.startsWith("tr")) {
    patterns.push(
      {
        pattern: /\btraverten blok(lar)?\b/gi,
        href: mk("blocks"),
      },
      {
        pattern: /\btraverten plaka(lar)?\b/gi,
        href: mk("slabs"),
      },
      {
        pattern: /\btraverten karo(lar)?\b/gi,
        href: mk("tiles"),
      },
      {
        pattern: /\btraverten d(ö|o)şemeler?\b/gi,
        href: mk("pavers"),
      },
    );
  } else {
    patterns.push(
      {
        pattern: /\btravertine blocks?\b/gi,
        href: mk("blocks"),
      },
      {
        pattern: /\btravertine slabs?\b/gi,
        href: mk("slabs"),
      },
      {
        pattern: /\btravertine tiles?\b/gi,
        href: mk("tiles"),
      },
      {
        pattern: /\btravertine pavers?\b/gi,
        href: mk("pavers"),
      },
    );
  }

  return patterns;
}


// CUT slug'ını ürün tipine göre normalize eden helper
function cutSlugForProduct(locale, cutKey, productKey) {
  const base = (CUTS[getLang(locale)] || {})[cutKey] || cutKey;
  if (typeof base !== "string") return cutKey;

  if (locale.startsWith("en")) {
    if (productKey === "slabs")
      return base.replace(/-travertine-slabs$/i, "-travertine-slabs");
    if (productKey === "tiles")
      return base.replace(/-travertine-slabs$/i, "-travertine-tiles");
    if (productKey === "blocks")
      return base.replace(/-travertine-slabs$/i, "-travertine-blocks");
    if (productKey === "pavers")
      return base.replace(/-travertine-slabs$/i, "-travertine-pavers");
    return base;
  }

  // TR
  if (productKey === "slabs")
    return base.replace(/-traverten-plakalar$/i, "-traverten-plakalar");
  if (productKey === "tiles")
    return base.replace(/-traverten-plakalar$/i, "-traverten-karolar");
  if (productKey === "blocks")
    return base.replace(/-traverten-plakalar$/i, "-traverten-bloklar");
  if (productKey === "pavers")
    return base.replace(/-traverten-plakalar$/i, "-traverten-dosemeler");
  return base;
}

// Blogdan direkt spesifik process sayfasına linkler
function blogToProcessPatterns(locale) {
  const mkProcessHref = (productKey, cutKey, combinedProcKey) => {
    // Örn hedef:
    // /en/travertine-slabs/vein-cut-travertine-slabs/filled-honed-travertine
    // /tr/traverten-plakalar/damar-kesim-traverten-plakalar/dolgulu-honlanmis-traverten
    const productSeg = productSlugFor(locale, productKey);
    const cutSlug = cutSlugForProduct(locale, cutKey, productKey);
    const procSlug = procSlugForLocale(locale, combinedProcKey);
    return `/${locale}/${productSeg}/${cutSlug}/${procSlug}`;
  };

  const patterns = [];

  // EN örnekleri
  patterns.push(
    {
      pattern: /\bfilled\s+honed\s+vein\s+cut\s+travertine\s+slabs?\b/gi,
      href: mkProcessHref("slabs", "vein-cut", "filled-honed"),
    },
    {
      pattern: /\bfilled\s+polished\s+vein\s+cut\s+travertine\s+slabs?\b/gi,
      href: mkProcessHref("slabs", "vein-cut", "filled-polished"),
    },
    {
      pattern: /\bfilled\s+honed\s+cross\s+cut\s+travertine\s+pavers?\b/gi,
      href: mkProcessHref("pavers", "cross-cut", "filled-honed"),
    },
  );

  if (locale.startsWith("tr")) {
    patterns.push(
      {
        pattern: /\bdolgulu\s+honlanm(ı|i)ş\s+damar\s+kesim\s+traverten\s+plaka(lar)?\b/gi,
        href: mkProcessHref("slabs", "vein-cut", "filled-honed"),
      },
      {
        pattern: /\bdolgulu\s+parlak\s+damar\s+kesim\s+traverten\s+plaka(lar)?\b/gi,
        href: mkProcessHref("slabs", "vein-cut", "filled-polished"),
      },
      {
        pattern: /\bdolgulu\s+honlanm(ı|i)ş\s+cross\s+cut\s+traverten\s+d(ö|o)şemeler?\b/gi,
        href: mkProcessHref("pavers", "cross-cut", "filled-honed"),
      },
    );
  }

  return patterns;
}

function blogToColorPatterns(locale) {
  const lang = locale.startsWith("tr") ? "tr" : "en";

  const mk = (slug) => `/${locale}/${slug}`;

  const patterns = [];

  if (lang === "en") {
    patterns.push(
      { pattern: /\bivory travertine\b/gi, href: mk("ivory-travertine") },
      { pattern: /\blight travertine\b/gi, href: mk("light-travertine") },
      { pattern: /\bantico travertine\b/gi, href: mk("antico-travertine") },
    );
  } else {
    patterns.push(
      { pattern: /\bfildisi traverten\b/gi, href: mk("fildisi-traverten") },
      { pattern: /\baci(k|ğ) traverten\b/gi, href: mk("acik-traverten") },
      { pattern: /\bantiko traverten\b/gi, href: mk("antiko-traverten") },
    );
  }

  return patterns;
}



/* -------------------------------------------
   BLOG LINKIFY COMPONENT
-------------------------------------------- */

function BlogLinkify({ text, locale, className }) {
  if (!text) return null;

  const patterns = [
    ...getIncotermPatterns(locale),
    ...blogToProductPatterns(locale),
    ...blogToProcessPatterns(locale),
    ...blogToColorPatterns(locale),   
  ];

  let segments = [text];

  patterns.forEach(({ pattern, href }, ruleIndex) => {
    const nextSegments = [];

    segments.forEach((seg, segIndex) => {
      if (typeof seg !== "string") {
        nextSegments.push(seg);
        return;
      }

      let lastIndex = 0;
      let match;
      pattern.lastIndex = 0;

      while ((match = pattern.exec(seg)) !== null) {
        const matchText = match[0];

        if (match.index > lastIndex) {
          nextSegments.push(seg.slice(lastIndex, match.index));
        }

        nextSegments.push(
          <Link
            key={`blog-link-${ruleIndex}-${segIndex}-${match.index}`}
            href={href}
            className="text-teal-700 underline underline-offset-4 hover:no-underline"
          >
            {matchText}
          </Link>
        );

        lastIndex = match.index + matchText.length;
      }

      if (lastIndex < seg.length) {
        nextSegments.push(seg.slice(lastIndex));
      }
    });

    segments = nextSegments;
  });

  return <span className={className}>{segments}</span>;
}

/* -------------------------------------------
   UI helpers
-------------------------------------------- */
const Container = ({ children }) => (
  <div className="mx-auto max-w-[1400px] px-4">{children}</div>
);

const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="scroll-mt-28 py-10 flex flex-col items-center justify-center text-center"
  >
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

const Card = ({ href, imgSrc, alt, title, blurb }) => {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};
  return (
    <Wrapper
      {...wrapperProps}
      className="group rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
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
        {href && <span className="mt-3 inline-block text-sm">Read more →</span>}
      </div>
    </Wrapper>
  );
};

export default function DynamicTravertinePage({ slug, localeFromServer }) {
  const locale = useLocale() || localeFromServer || "en";
  const t = useTranslations("blog");

  const routeSlug = slug || "travertine-tiles-guide";
  const pageKey = resolvePageKey(locale, routeSlug);

  const pagesObj = t.raw?.("pages") || {};
  const pageRaw = pagesObj[pageKey];

  const safePage = pageRaw || {
    metaTitle: "Travertine",
    metaDesc: "Travertine guide.",
    h1: "Travertine",
    intro:
      "Explore travertine product types, finishes, colors, applications and sourcing from Turkey.",
    sections: {},
  };

  const s = safePage.sections || {};

  const imgMap = IMAGES_BLOG?.[pageKey] || {};
  const socialImage =
    safePage.socialImage || "/media/travertine-tiles-hero.webp";
  const heroSrc = imgMap?.hero?.src || socialImage;

  const canonical = `/${locale}/blog/${routeSlug}`;
  const bc = [
    { name: t("common.breadcrumbs.home"), href: `/${locale}` },
    { name: t("common.breadcrumbs.blog"), href: `/${locale}/blog` },
    { name: safePage.h1, href: `/${locale}/blog/${routeSlug}` },
  ].filter((b) => b && b.name && b.href);

  const datePublished = safePage.datePublished || "2025-01-15";
  const dateModified = safePage.dateModified || "2025-09-25";

  const breadcrumbLd =
    bc.length > 0
      ? {
          "@type": "BreadcrumbList",
          itemListElement: bc.map((b, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: b.name,
            item: `https://majen.com.tr${b.href}`,
          })),
        }
      : null;

  const faqItems = [
    ...(s.faq?.extra || []),
    ...(s.faq?.items || []),
  ].map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  }));
  const faqLd =
    faqItems.length > 0
      ? { "@type": "FAQPage", "@id": `${canonical}#faq`, mainEntity: faqItems }
      : null;

  const blogPostingLd = {
    "@type": "BlogPosting",
    "@id": `${canonical}#post`,
    headline: safePage.metaTitle || safePage.h1,
    description: safePage.metaDesc,
    inLanguage: locale,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Majen" },
    publisher: {
      "@type": "Organization",
      name: "Majen",
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

  const graphLd = {
    "@context": "https://schema.org",
    "@graph": [
      blogPostingLd,
      ...(faqLd ? [faqLd] : []),
      ...(breadcrumbLd
        ? [{ "@id": `${canonical}#breadcrumbs`, ...breadcrumbLd }]
        : []),
    ],
  };

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
    const els = tocItems
      .map((x) => document.getElementById(x.id))
      .filter(Boolean);
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

  const imgKey = (group, key) => imgMap?.[group]?.[key]?.src || null;
  const imgAlt = (group, key, fallback) =>
    imgMap?.[group]?.[key]?.alt || fallback || "";

  return (
    <>
      <Head>
        <title>{safePage.metaTitle}</title>
        {safePage.metaDesc && (
          <meta name="description" content={safePage.metaDesc} />
        )}
        <link rel="canonical" href={canonical} />

        {/* Alternates */}
        <link
          rel="alternate"
          href={`https://majen.com.tr/en/blog/${routeSlug}`}
          hrefLang="en"
        />
        <link
          rel="alternate"
          href={`https://majen.com.tr/tr/blog/${routeSlug}`}
          hrefLang="tr"
        />
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

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
        />
      </Head>

      {/* Hero + H1 + Intro */}
      <header className="relative mt-12 flex flex-col items-center justify-center">
        <Container>
          <div className="py-4 lg:py-8 flex flex-col items-center justify-center text-center">
            <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold tracking-tight">
              {safePage.h1}
            </h1>

            {safePage.lead && (
              <p className="mt-2 max-w-[1100px] text-[12px] md:text-[14px] lg:text-[16px] text-neutral-800">
                <strong>
                  <BlogLinkify
                    text={safePage.lead.strong}
                    locale={locale}
                  />
                </strong>{" "}
                <BlogLinkify
                  text={safePage.lead.rest}
                  locale={locale}
                />
              </p>
            )}

            {safePage.intro && (
              <BlogLinkify
                text={safePage.intro}
                locale={locale}
                className="mt-3 max-w-[1300px] text-[12px] md:text-[14px] lg:text-[16px] text-neutral-700 leading-relaxed"
              />
            )}
          </div>
        </Container>

        <div className="relative h-60 md:h-[56vh] w-[60vw] max-h-[460px]">
          {heroSrc ? (
            <Image
              src={heroSrc}
              alt={safePage.h1}
              fill
              className="object-cover "
              priority
            />
          ) : (
            <div className="h-full w-full bg-neutral-200" />
          )}
        </div>
      </header>

      <Container>
        <div className="flex flex-col mt-3 lg:mt-4">
          {/* Sticky TOC */}
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
                          ((Math.max(
                            0,
                            tocItems.findIndex((i) => i.id === active)
                          ) +
                            1) /
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
            {/* 1) COLORS */}
            {s.colors && (
              <Section id="colors" title={s.colors.h2}>
                {s.colors.intro && (
                  <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                    <BlogLinkify
                      text={s.colors.intro}
                      locale={locale}
                    />
                  </p>
                )}

                {Array.isArray(s.colors.extras) &&
                  s.colors.extras.length > 0 && (
                    <div className="mt-4 space-y-4 flex flex-col items-center justify-center text-center">
                      {s.colors.extras.map((x) => (
                        <div key={x.h3}>
                          <h3 className="text-lg font-semibold">{x.h3}</h3>
                          <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                            <BlogLinkify
                              text={x.p}
                              locale={locale}
                            />
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(s.colors.items || []).map((it) => (
                    <Card
                      key={it.slug}
                      imgSrc={imgKey("colors", it.slug)}
                      alt={imgAlt("colors", it.slug, it.h3)}
                      title={it.h3}
                      blurb={it.blurb}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* 2) FINISHES */}
            {s.finishes && (
              <Section id="finishes" title={s.finishes.h2}>
                {s.finishes.intro && (
                  <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                    <BlogLinkify
                      text={s.finishes.intro}
                      locale={locale}
                    />
                  </p>
                )}

                {Array.isArray(s.finishes.extras) &&
                  s.finishes.extras.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {s.finishes.extras.map((x) => (
                        <div
                          key={x.h3}
                          className="rounded-2xl border p-5"
                        >
                          <h3 className="text-base font-semibold">
                            {x.h3}
                          </h3>
                          <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px]">
                            <BlogLinkify
                              text={x.p}
                              locale={locale}
                            />
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                  {(s.finishes.items || []).map((it) => (
                    <Card
                      key={it.slug}
                      imgSrc={imgKey("finishes", it.slug)}
                      alt={imgAlt("finishes", it.slug, it.h3 || it.slug)}
                      title={it.h3 || it.slug}
                      blurb={it.blurb}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* 3) APPLICATIONS */}
            {s.applications && (
              <Section id="applications" title={s.applications.h2}>
                {s.applications.intro && (
                  <div className="text-[12px] md:text-[14px] lg:text-[16px]">
                    <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                      <BlogLinkify
                        text={s.applications.intro}
                        locale={locale}
                      />
                    </p>
                  </div>
                )}

                {Array.isArray(s.applications.details) &&
                  s.applications.details.length > 0 && (
                    <div className="mt-4 space-y-4 items-center justify-center text-center">
                      {s.applications.details.map((x) => (
                        <div key={x.slug}>
                          <h3 className="text-base md:text-lg font-semibold">
                            {x.h3}
                          </h3>
                          <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                            <BlogLinkify
                              text={x.p}
                              locale={locale}
                            />
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm ">
                  {(s.applications.cards || []).map((c) => (
                    <div
                      key={c.slug}
                      className="rounded-2xl border p-5"
                    >
                      <h3 className="text-base font-semibold">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px]">
                        <BlogLinkify
                          text={c.desc}
                          locale={locale}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* 4) SPECIFICATIONS */}
            {s.specs && (
              <Section id="specs" title={s.specs.h2}>
                {s.specs.intro && (
                  <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                    <BlogLinkify
                      text={s.specs.intro}
                      locale={locale}
                    />
                  </p>
                )}
                <div className="overflow-auto mt-4 hidden md:flex">
                  <table className="min-w-[640px] w-full text-sm border rounded-2xl overflow-hidden">
                    <thead>
                      <tr className="bg-neutral-50 text-center">
                        <th className="p-3">Property</th>
                        <th className="p-3">Typical Value</th>
                        <th className="p-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...(s.specs.table || []), ...(s.specs.extraRows || [])].map(
                        (row, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-3">{row.prop}</td>
                            <td className="p-3">
                              <BlogLinkify
                                text={row.value}
                                locale={locale}
                              />
                            </td>
                            <td className="p-3">
                              <BlogLinkify
                                text={row.notes}
                                locale={locale}
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {/* 5) INSTALLATION & CARE */}
            {s.install && (
              <Section id="install" title={s.install.h2}>
                {s.install.intro && (
                  <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                    <BlogLinkify
                      text={s.install.intro}
                      locale={locale}
                    />
                  </p>
                )}
                {Array.isArray(s.install.careNotes) &&
                  s.install.careNotes.length > 0 && (
                    <div className="flex flex-col items-center justify-center text-center">
                      <ul className="care-notes mt-4 list-disc pl-5 space-y-1 text-left">
                        {s.install.careNotes.map((x, i) => (
                          <li key={i}>
                            <BlogLinkify
                              text={x}
                              locale={locale}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </Section>
            )}

            {/* 6) PROS & CONS */}
            {s.proscons && (
              <Section id="proscons" title={s.proscons.h2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mt-4 ">
                  <div className="rounded-2xl border p-5">
                    <h3 className="text-base font-semibold">Pros</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      {(s.proscons.pros || []).map((p, i) => (
                        <li key={i}>
                          <BlogLinkify
                            text={p}
                            locale={locale}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border p-5">
                    <h3 className="text-base font-semibold">Cons</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      {(s.proscons.cons || []).map((c, i) => (
                        <li key={i}>
                          <BlogLinkify
                            text={c}
                            locale={locale}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>
            )}

            <SocialMediaSection />
            <ContactFrom />

            {/* 7) GALLERY */}
            {s.gallery && (
              <Section id="gallery" title={s.gallery.h2}>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(imgMap?.gallery || []).map((g, i) => (
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

            {/* 8) FAQ */}
            {s.faq && (
              <Section id="faq">
                <QuestionsSection
                  span="Blog"
                  items={[...(s.faq.extra || []), ...(s.faq.items || [])]}
                />
              </Section>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
