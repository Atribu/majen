// app/[locale]/travertine/[product]/[cut]/page.jsx
"use client";

import React from "react";
import Head from "next/head";                      // ⬅️ YENİ
import { useParams, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  getLang,
  baseFor,
  productKeyFromSlug,
  CUTS,
  productSlugFor,
  cutKeyFromExternalSlug
} from "@/lib/travertine";
import { IMAGE_BY_PRODUCT, PROCESS_THUMB_BY_COMBINED } from "@/app/[locale]/(catalog)/_images";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import InlineLinks from "@/app/[locale]/components/generalcomponent/InlineLinks";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";
import slabs from "@/public/images/deneme/slabson.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/homepage/Pavers2.webp";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";
import BreadcrumbsExact from "@/app/[locale]/components/generalcomponent/BreadcrumbsExact";
import { PRODUCT_LABEL, CUT_LABEL, procSlugForLocale } from "@/lib/labels";

function InfoCard({ title, children, contentClassName = "text-sm text-neutral-600 leading-tight text-center" }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

// helpers
const safe = (fn, fb = undefined) => { try { const v = fn(); return v ?? fb; } catch { return fb; } };

// === Title formatting helpers (process ve cut yazıları) ===

function procSlugFor(locale, group, key) {
  const tr = String(locale).startsWith("tr");
  
  // natural ise filled/unfilled önekiyle birlikte üret
  const isNatural = (key === "natural" || key === "dogal");
  if (isNatural) {
    const fillTr = group === "filled" ? "dolgulu" : "dolgusuz";
    const fillEn = group === "filled" ? "filled"  : "unfilled";
    return tr ? `${fillTr}-dogal` : `${fillEn}-natural`;
  }
  
  // ✅ EN → TR dönüşümü
  const PROCESS_MAP = {
    en: {
      honed: "honed",
      polished: "polished",
      brushed: "brushed",
      tumbled: "tumbled"
    },
    tr: {
      honed: "honlanmis",
      polished: "cilali",
      brushed: "fircalanmis",
      tumbled: "eskitilmis",
      // İngilizce key gelebilir, onları da map'le
      honlanmis: "honlanmis",
      cilali: "cilali",
      fircalanmis: "fircalanmis",
      eskitilmis: "eskitilmis"
    }
  };
  
  const processMap = tr ? PROCESS_MAP.tr : PROCESS_MAP.en;
  const processSlug = processMap[key] || key;
  
  // dolgu öneki
  const fill = group === "filled" 
    ? (tr ? "dolgulu" : "filled") 
    : (tr ? "dolgusuz" : "unfilled");
  
  return `${fill}-${processSlug}`;
}

export default function CutPage() {
  const { product: productSlug, cut: cutSlugSegment } = useParams();
  const locale  = useLocale();
  const lang    = getLang(locale);
  const t       = useTranslations("ProductPage");
  const prefix  = `/${locale}`;

  const productKey  = productKeyFromSlug(locale, String(productSlug));
  const baseSegment = baseFor(locale);
  const baseHref    = `/${locale}/${baseSegment}`;

  // ---- Breadcrumb
  const rawPath = usePathname();
  const pathname = typeof rawPath === "string" ? rawPath : "";
  const segments = pathname.split("/").filter(Boolean);
  const selectedSegments = segments.slice(-1);

  // Ürüne göre cut slug'ını normalize et (slabs→tiles/blocks/pavers)
  function cutSlugForProduct(locale, cutKey, productKey) {
    const base = (CUTS[getLang(locale)] || {})[cutKey] || cutKey; // örn: 'vein-cut-travertine-slabs'
    if (typeof base !== "string") return cutKey;
    if (locale.startsWith("en")) {
      if (productKey === "slabs")  return base.replace(/-travertine-slabs$/i, "-travertine-slabs");
      if (productKey === "tiles")  return base.replace(/-travertine-slabs$/i, "-travertine-tiles");
      if (productKey === "blocks") return base.replace(/-travertine-slabs$/i, "-travertine-blocks");
      if (productKey === "pavers") return base.replace(/-travertine-slabs$/i, "-travertine-pavers");
      return base; // slabs
    }
    // TR dönüşümleri
    if (productKey === "slabs")  return base.replace(/-traverten-plakalar$/i, "-traverten-plakalar");
    if (productKey === "tiles")  return base.replace(/-traverten-plakalar$/i, "-traverten-karolar");
    if (productKey === "blocks") return base.replace(/-traverten-plakalar$/i, "-traverten-bloklar");
    if (productKey === "pavers") return base.replace(/-traverten-plakalar$/i, "-traverten-dosemeler"); // ⬅️ düzeltme
    return base; // plakalar (slabs)
  }

  // cut key + kanonik slug (sağlamlaştırılmış)
  const rawCutSlug = String(cutSlugSegment || "");
  // 1) lib helper
  let cutKey = cutKeyFromExternalSlug(locale, rawCutSlug);
  // 2) zayıf tahmin (slug içindeki kelimelere bak)
  if (!cutKey) {
    if (/cross|enine/i.test(rawCutSlug))      cutKey = "cross-cut";
    else if (/vein|damar/i.test(rawCutSlug))  cutKey = "vein-cut";
  }
  // 3) son emniyet
  if (!cutKey) cutKey = "vein-cut";

  const canonicalCutSlug = cutSlugForProduct(locale, cutKey, productKey) || rawCutSlug;

  // ProductIntroSection içerikleri
  const cutTitle = safe(() => t(`${productKey}.cuts.${cutKey}.title`), CUTS[lang]?.[cutKey] || cutKey);
  const cutIntro = safe(
    () => t(`${productKey}.cuts.${cutKey}.intro`),
    safe(() => t(`${productKey}.cuts.${cutKey}.processes.subtext`), "")
  );
  const title2   = safe(() => t(`${productKey}.cuts.${cutKey}.title2`), safe(() => t(`slabs.title2`), null));
  const intro2   = safe(() => t(`${productKey}.cuts.${cutKey}.intro2`),  safe(() => t(`slabs.intro2`),  null));
  const span     = safe(() => t(`${productKey}.cuts.${cutKey}.span`),    safe(() => t(`slabs.span`),null));

  const cardTextClass = "text-[14px] leading-[120%] text-neutral-700 text-center";

  const opt = (key, fallback = "") => {
    try {
      const v = t(key);
      return v && v !== key ? v : fallback;
    } catch {
      return fallback;
    }
  };

  const linkPatterns = [
    {
      pattern: /vein[- ]cut/i,
      href: {
        pathname: "/travertine/[product]/[cut]",
        params: { product: productSlug, cut: cutSlugForProduct(locale, "vein-cut", productKey) }
      }
    },
    {
      pattern: /cross[- ]cut/i,
      href: {
        pathname: "/travertine/[product]/[cut]",
        params: { product: productSlug, cut: cutSlugForProduct(locale, "cross-cut", productKey) }
      }
    },
  ];

  const optRaw = (key, fallback = null) => {
    try {
      const v = t.raw(key);
      return v ?? fallback;
    } catch {
      return fallback;
    }
  };

  const cardTitle1 = opt(`${productKey}.cuts.${cutKey}.detailsHeadings.title1`, "");
  const cardTitle2 = opt(`${productKey}.cuts.${cutKey}.detailsHeadings.title2`, "");
  const cardTitle3 = opt(`${productKey}.cuts.${cutKey}.detailsHeadings.title3`, "");
  const cardTitle4 = opt(`${productKey}.cuts.${cutKey}.detailsHeadings.title4`, "");
  const description = optRaw(`${productKey}.cuts.${cutKey}.description`, "");

  const variantHeader = optRaw(`${productKey}.cuts.${cutKey}.variants.title`, "");
  const variantText   = optRaw(`${productKey}.cuts.${cutKey}.variants.text`, "");

  // Hero görsel (ürün+cut → cover → fallback)
  const heroOverride = safe(() => t.raw(`${productKey}.cuts.${cutKey}.hero.src`), null);
  const heroAltOver  = safe(() => t(`${productKey}.cuts.${cutKey}.hero.alt`), null);
  const heroSrc =
    heroOverride ||
    IMAGE_BY_PRODUCT?.[productKey]?.[cutKey] ||
    IMAGE_BY_PRODUCT?.[productKey]?.cover;
  const heroAlt = heroAltOver || cutTitle;

  // Process grupları
  const processNode = safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes`), {});
  const groups = processNode?.groups || {};
  const meta   = processNode?.meta   || {};

  const ytCombined  = safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes.youtube.combined`), {}) || {};

  // i18n’de filled-natural var mı?
  const hasFilledNatural =
    safe(() => t.has(`${productKey}.cuts.${cutKey}.processes.filled-natural.title`), false) ||
    safe(() => t.has(`${productKey}.cuts.${cutKey}.processes.filled-natural.h1`), false);

  // filled grubunun item’larına natural/dogal’ı gerektiğinde en sona ekle
  if (hasFilledNatural) {
    const arr = Array.isArray(groups?.filled?.items) ? [...groups.filled.items] : [];
    if (!arr.includes("natural") && !arr.includes("dogal")) {
      arr.push("natural");
    }
    groups.filled = { ...(groups.filled || {}), items: arr };
  }

  const makeGroupCards = (groupName) => {
    const items   = groups[groupName]?.items || [];
    const heading = safe(() => t(`${productKey}.cuts.${cutKey}.processes.groups.${groupName}.heading`), groupName);
    const text    = safe(() => t(`${productKey}.cuts.${cutKey}.processes.groups.${groupName}.text`), "");

    const groupImgMap = {};

    const variantCards = items.map((pKey) => {
      const isNatural = (pKey === "natural" || pKey === "dogal");
      const titleKey  = isNatural
        ? `${productKey}.cuts.${cutKey}.processes.meta.natural.title`
        : `${productKey}.cuts.${cutKey}.processes.meta.${pKey}.title`;
      const title = safe(() => t(titleKey), pKey);

      const processSlug = isNatural
        ? procSlugFor(locale, groupName, "natural")
        : procSlugFor(locale, groupName, pKey);

      const normalizedKey = isNatural ? "natural" : pKey;
      const combinedKey   = `${groupName}:${normalizedKey}`;

      const youtubeUrl = ytCombined[combinedKey] || null;

      const imagesCombined =
        safe(() => t.raw(`${productKey}.cuts.${cutKey}.processes.images.combined`), null);
      const imgI18n =
        imagesCombined?.[combinedKey] ?? null;

      const imgByProduct =
        IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[combinedKey] || null;

      let image;
      if (productKey === "tiles") {
        image = imgByProduct || heroSrc;
      } else {
        image =
          imgI18n ||
          imgByProduct ||
          PROCESS_THUMB_BY_COMBINED?.[combinedKey] ||
          (isNatural
            ? (PROCESS_THUMB_BY_COMBINED?.["unfilled:natural"] ||
               PROCESS_THUMB_BY_COMBINED?.["filled:natural"])
            : null) ||
          heroSrc;
      }

      groupImgMap[combinedKey] = image;

      const href = {
        pathname: "/travertine/[product]/[cut]/[process]",
        params: { product: String(productSlug), cut: canonicalCutSlug, process: processSlug }
      };

      return {
        slug: combinedKey,
        vKey: combinedKey,
        title,
        href,
        alt: title,
        youtubeUrl
      };
    });

    return { heading, text, variantCards, imgMap: groupImgMap };
  };

  const filledBlock   = makeGroupCards("filled");
  const unfilledBlock = makeGroupCards("unfilled");

  const variantImgMapAll = { ...(filledBlock.imgMap || {}), ...(unfilledBlock.imgMap || {}) };

  // TextSection
  const textSectionCut = safe(() => t.raw(`${productKey}.cuts.${cutKey}.TextSection`), null);
  const textSectionTop = safe(() => t.raw(`${productKey}.TextSection`), {});
  const textSectionObj = textSectionCut || textSectionTop;

  const textSections = [];
  let i = 1;
  while (
    textSectionObj?.[`header${i}`] ||
    textSectionObj?.[`text${i}`] ||
    textSectionObj?.[`subheader${i}`] ||
    textSectionObj?.[`subtext${i}`]
  ) {
    const header = textSectionObj[`header${i}`];
    const text   = textSectionObj[`text${i}`];
    const subh   = textSectionObj[`subheader${i}`];
    const subt   = textSectionObj[`subtext${i}`];
    const secTitle = header || subh || `${cutTitle} — Section ${i}`;
    const paras    = [text, subt].filter(Boolean);
    if (secTitle || paras.length) textSections.push({ id: i, title: secTitle, paragraphs: paras });
    i++;
  }

  // FAQ
  const qCut = safe(() => t.raw(`${productKey}.cuts.${cutKey}.QuestionsItems`), null);
  const qTop = safe(() => t.raw(`${productKey}.QuestionsItems`), {});
  const qSrc = qCut || qTop;
  const faqItems = [];
  if (qSrc) {
    let j = 1;
    while (qSrc[`aboutpage_s4_faq${j}_header`] && qSrc[`aboutpage_s4_faq${j}_text`]) {
      faqItems.push({ q: qSrc[`aboutpage_s4_faq${j}_header`], a: qSrc[`aboutpage_s4_faq${j}_text`] });
      j++;
    }
  }

  // ---- Info cards içeriği
  const cards = [
    {
      title: cardTitle1,
      content: Array.isArray(description) ? description[0] : description ,
    },
    {
      title: cardTitle2,
      content: Array.isArray(description) ? description[1] : "",
    },
    {
      title: cardTitle3,
      content: Array.isArray(description) ? description[2] ?? "" : "",
    },
    {
      title: cardTitle4,
      content: Array.isArray(description) ? description[3] ?? "" : "",
    },
  ];

  const hrefForCut = (pkey, ckey) => ({
    pathname: "/travertine/[product]/[cut]",
    params: {
      product: productSlugFor(locale, pkey),
      cut:     cutSlugForProduct(locale, ckey, pkey),
    },
  });

  const productLabel = PRODUCT_LABEL[lang]?.[productKey] || productSlug;
  const cutLabel     = CUT_LABEL[lang]?.[cutKey]         || cutKey;

  const items = [
    { label: locale.startsWith("tr") ? "Traverten" : "Travertine", href: `/${locale}/${baseSegment}` },
    { label: productLabel, href: `/${locale}/${baseSegment}/${productSlug}` },
    { label: cutLabel,     href: `/${locale}/${canonicalCutSlug}` },
  ];

  //otherOptions için
  const otherCutKey = cutKey === "vein-cut" ? "cross-cut" : "vein-cut";

  const SHOWCASE_COMBOS = [
    { group: "filled",   proc: "polished" },
    { group: "filled",   proc: "honed"    },
    { group: "unfilled", proc: "honed"    },
  ];

  const processTitleFor = (group, proc) => {
    const tr = locale.startsWith("tr");
    const fillText = tr
      ? (group === "filled" ? "Dolgulu" : "Dolgusuz")
      : (group === "filled" ? "Filled"  : "Unfilled");
    const procMap = tr
      ? { honed:"Honlanmış", polished:"Cilalı", brushed:"Fırçalanmış", tumbled:"Eskitilmiş", natural:"Doğal" }
      : { honed:"Honed",     polished:"Polished", brushed:"Brushed",   tumbled:"Tumbled",    natural:"Natural" };
    return `${fillText}  ${procMap[proc] || proc}`;
  };

  const otherCutLabel =
    (typeof CUT_LABEL !== "undefined" && CUT_LABEL[lang]?.[otherCutKey]) ||
    otherCutKey.replace("", " ");

  const otherOptionsItems = SHOWCASE_COMBOS.map(({ group, proc }) => {
    const combinedKey = `${group}:${proc}`;
    const img =
      IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[otherCutKey]?.[combinedKey] ||
      IMAGE_BY_PRODUCT?.[productKey]?.[otherCutKey] ||
      IMAGE_BY_PRODUCT?.[productKey]?.cover ||
      heroSrc;

    const processSlug = procSlugFor(locale, group, proc);

    return {
      title: `${processTitleFor(group, proc)} ${otherCutLabel}  `,
      img,
      href: {
        pathname: "/travertine/[product]/[cut]/[process]",
        params: {
          product: String(productSlug),
          cut:     cutSlugForProduct(locale, otherCutKey, productKey),
          process: processSlug
        }
      }
    };
  });

  // 🔹 META & CANONICAL
// 🔹 META & CANONICAL (t() sadece key varsa çağrılıyor)
const metaTitleKey = `${productKey}.cuts.${cutKey}.metaTitle`;
const metaDescKey  = `${productKey}.cuts.${cutKey}.metaDesc`;

const metaTitle = safe(() => {
  if (typeof t.has === "function" && t.has(metaTitleKey)) {
    return t(metaTitleKey);
  }
  return cutTitle;
}, cutTitle);

const metaDesc = safe(() => {
  if (typeof t.has === "function" && t.has(metaDescKey)) {
    return t(metaDescKey);
  }
  return cutIntro;
}, cutIntro);

const canonical = `https://majen.com.tr/${locale}/${canonicalCutSlug}`;


  return (
    <main className="py-6 mt-[22px] lg:mt-7 overflow-x-hidden text-center w-full">
      <Head>
        <title>{metaTitle}</title>
        {metaDesc ? <meta name="description" content={metaDesc} /> : null}
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroSrc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={heroSrc} />
      </Head>

  
      <ProductIntroSection
        title={cutTitle}
        intro={cutIntro}
        title2={title2}
        intro2={intro2}
        heroSrc={heroSrc}
        alt={heroAlt}
        prefix={`/${locale}`}
        baseHref={`/${locale}/${baseSegment}`}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
        span={span}
      />
   

      <BreadcrumbsExact
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        selectedSegments={selectedSegments}
        className="mt-6"
        items={items}
      />
      
      {/* Info Cards */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto w-[95%]">
        {cards.map((c, i) => {
          const plain =
            typeof c.content === "string" ? c.content : Array.isArray(c.content) ? c.content.join(", ") : null;

          return (
            <InfoCard key={i} title={c.title} contentClassName={cardTextClass}>
              {i === 1 ? (
                <InlineLinks text={plain || ""} patterns={linkPatterns} textClassName={cardTextClass} />
              ) : (
                <span className={cardTextClass}>{plain}</span>
              )}
            </InfoCard>
          );
        })}
      </section>

    <section id="product-intro">
        <h2 className="text-[22px] lg:text-[24px] font-semibold mt-12">{variantHeader}</h2>
      <p className="text-[12px] lg:text-[14px] mt-3 leading-tight lg:leading-[140%] w-[90%] max-w-[1200px] mx-auto -mb-2">
        {variantText}
      </p>
 
      {/* Filled */}
      {filledBlock.variantCards.length > 0 && (
        <VariantCircleSection
          heading={filledBlock.heading}
          text={filledBlock.text}
          variantCards={filledBlock.variantCards}
          imgMap={variantImgMapAll}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
          productKey={productKey}
          imgAlt={`${productKey}  ${cutKey} `}
        />
      )}

      {/* Unfilled */}
      {unfilledBlock.variantCards.length > 0 && (
        <VariantCircleSection
          heading={unfilledBlock.heading}
          text={unfilledBlock.text}
          variantCards={unfilledBlock.variantCards}
          imgMap={variantImgMapAll}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
          productKey={productKey}
        />
      )}
    </section>

      {textSections.map(({ id, title, paragraphs }) => (
        <TextSection
          key={id}
          title={title}
          paragraphs={paragraphs}
          schema={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: cutTitle,
            author: { "@type": "Organization", name: "Majen" },
            publisher: { "@type": "Organization", name: "Majen" }
          }}
          className="max-w-5xl mx-auto mt-12"
          clampMobile={3}
          as="section"
        />
      ))}

      {faqItems.length > 0 && (
        <div id="faq" className="max-w-5xl mx-auto mt-12">
          <QuestionsSection items={faqItems} span={cutTitle} />
        </div>
      )}

      <SocialMediaSection />
      <ContactFrom />

      <OtherOptions
        heading={locale === "tr" ? "Diğer Seçenekler" : "Other Options"}
        customItems={otherOptionsItems}
        excludeProduct={productKey}
        productOrder={["slabs", "tiles", "pavers"]}
        baseHref={`${prefix}/${baseSegment}`}
        productSegments={{
          slabs: productSlugFor(locale, "slabs"),
          tiles: productSlugFor(locale, "tiles"),
          pavers: productSlugFor(locale, "pavers"),
        }}
        locale={locale}
        productImages={{ slabs, tiles, pavers: special }}
        productHrefFor={(pkey) => ({
          pathname: "/travertine/[product]",
          params: { product: productSlugFor(locale, pkey) }
        })}
      />
    </main>
  );
}
