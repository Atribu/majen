"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  getLang,
  productKeyFromSlug,
  baseFor,
  CUTS
} from "@/lib/travertine";

import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import TextSection from "@/app/[locale]/components/products1/TextSection";

const safe = (fn, fb = undefined) => {
  try { const v = fn(); return v ?? fb; } catch { return fb; }
};

// "filled-honed" / "unfilled-polished" gibi birleşikler için helper
function procSlugFor(locale, fillGroup, processKey) {
  const lang = String(locale).startsWith("tr") ? "tr" : "en";
  if (processKey === "natural" || processKey === "dogal") {
    return lang === "tr" ? "dogal" : "natural";
  }
  const fill = (fillGroup === "filled")
    ? (lang === "tr" ? "dolgulu" : "filled")
    : (lang === "tr" ? "dolgusuz" : "unfilled");
  return `${fill}-${processKey}`;
}

export default function CutPage() {
  const { product: productSlug, cut: cutSlugSegment } = useParams();
  const locale  = useLocale();
  const lang    = getLang(locale);
  const t       = useTranslations("ProductPage");

  const productKey  = productKeyFromSlug(locale, String(productSlug)) || "slabs";
  const baseSegment = baseFor(locale);

  // "vein-cut" | "cross-cut" key’ini bul + kanonik slug
  const cutKey =
    Object.keys(CUTS[lang] || {}).find((k) => CUTS[lang][k] === cutSlugSegment) || "vein-cut";
  const canonicalCutSlug = CUTS[lang]?.[cutKey] || cutSlugSegment;

  // --- ProductIntroSection için cut’a özel içerikler ---
  const cutTitle = safe(() => t(`slabs.cuts.${cutKey}.title`), CUTS[lang]?.[cutKey] || cutKey);
  const cutIntro = safe(() => t(`slabs.cuts.${cutKey}.intro`),
                   safe(() => t(`slabs.cuts.${cutKey}.processes.subtext`), ""));
  const title2   = safe(() => t(`slabs.cuts.${cutKey}.title2`), safe(() => t(`slabs.title2`), null));
  const intro2   = safe(() => t(`slabs.cuts.${cutKey}.intro2`), safe(() => t(`slabs.intro2`), null));
  const span     = safe(() => t(`slabs.cuts.${cutKey}.span`), safe(() => t(`slabs.span`), "- Direct Quarry Supplier"));
  const heroOv   = safe(() => t.raw(`slabs.cuts.${cutKey}.hero.src`), null);
  const heroAlt  = safe(() => t(`slabs.cuts.${cutKey}.hero.alt`), null);

  // Hero fallback
  const imgMap  = PRODUCT_IMG[productKey];
  const heroMap = typeof imgMap === "object" ? (imgMap.cover ?? Object.values(imgMap)[0]) : imgMap;
  const heroSrc = heroOv || heroMap || "/images/homepage/antikoarkplan.webp";
  const cutAlt  = heroAlt || cutTitle;

  // --- Process grupları (filled / unfilled) ---
  const processNode = safe(() => t.raw(`slabs.cuts.${cutKey}.processes`), {});
  const groups = processNode?.groups || {};
  const meta   = processNode?.meta   || {};

  const makeGroupCards = (groupName) => {
    const items   = groups[groupName]?.items || [];
    const heading = safe(() => t(`slabs.cuts.${cutKey}.processes.groups.${groupName}.heading`), groupName);
    const text    = safe(() => t(`slabs.cuts.${cutKey}.processes.groups.${groupName}.text`), "");

    const variantCards = items.map((pKey) => {
      const isNatural = (pKey === "natural" || pKey === "dogal");
      const title = meta?.[pKey]?.title || pKey;
      const alt   = meta?.[pKey]?.alt   || title;

      const processSlug = isNatural ? procSlugFor(locale, "filled", "natural")
                                    : procSlugFor(locale, groupName, pKey);

      // ✅ Route-object → next-intl mapping ile /[process]-[cut] SEO path üretilecek
      const href = {
        pathname: "/travertine/[product]/[cut]/[process]",
        params: {
          product: String(productSlug),     // zaten localized product slug
          cut: canonicalCutSlug,            // KESİNLİKLE kanonik cut slug
          process: processSlug              // örn: filled-honed / dolgulu-honlanmis
        }
      };

      return { slug: pKey, title, description: "", href, image: `/images/process/${pKey}.jpg`, alt };
    });

    return { heading, text, variantCards };
  };

  const filledBlock   = makeGroupCards("filled");
  const unfilledBlock = makeGroupCards("unfilled");

  // --- TextSection: önce CUT altından, yoksa ürün kökünden
  const textSectionCut = safe(() => t.raw(`slabs.cuts.${cutKey}.TextSection`), null);
  const textSectionTop = safe(() => t.raw(`slabs.TextSection`), {});
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

  // --- FAQ: önce CUT altından, yoksa ürün kökünden
  const qCut = safe(() => t.raw(`slabs.cuts.${cutKey}.QuestionsItems`), null);
  const qTop = safe(() => t.raw(`slabs.QuestionsItems`), {});
  const qSrc = qCut || qTop;

  const faqItems = [];
  if (qSrc) {
    let j = 1;
    while (qSrc[`aboutpage_s4_faq${j}_header`] && qSrc[`aboutpage_s4_faq${j}_text`]) {
      faqItems.push({
        q: qSrc[`aboutpage_s4_faq${j}_header`],
        a: qSrc[`aboutpage_s4_faq${j}_text`]
      });
      j++;
    }
  }

  return (
    <main className="py-6 mt-16 overflow-x-hidden">
      <ProductIntroSection
        title={cutTitle}
        intro={cutIntro}
        title2={title2}
        intro2={intro2}
        heroSrc={heroSrc}
        alt={cutAlt}
        prefix={`/${locale}`}
        baseHref={`/${locale}/${baseSegment}`}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
        span={span}
      />

      {filledBlock.variantCards.length > 0 && (
        <VariantCircleSection
          heading={filledBlock.heading}
          text={filledBlock.text}
          variantCards={filledBlock.variantCards}
          imgMap={PRODUCT_IMG[productKey]}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={{}}
          productKey={productKey}
        />
      )}

      {unfilledBlock.variantCards.length > 0 && (
        <VariantCircleSection
          heading={unfilledBlock.heading}
          text={unfilledBlock.text}
          variantCards={unfilledBlock.variantCards}
          imgMap={PRODUCT_IMG[productKey]}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={{}}
          productKey={productKey}
        />
      )}

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

      <ContactFrom />
    </main>
  );
}
