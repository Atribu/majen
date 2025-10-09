// app/[locale]/travertine/[product]/[cut]/page.jsx
"use client";
//resimler en.json'dan geliyor process image kısmı
import React from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { getLang, baseFor, productKeyFromSlug, CUTS } from "@/lib/travertine";
import { IMAGE_BY_PRODUCT, PROCESS_THUMB_BY_COMBINED } from "@/app/[locale]/(catalog)/_images";

import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";

// helpers
const safe = (fn, fb = undefined) => { try { const v = fn(); return v ?? fb; } catch { return fb; } };

function procSlugFor(locale, group, key) {
  const tr = String(locale).startsWith("tr");
  if (group === "natural" || key === "natural" || key === "dogal") {
    return tr ? "dogal" : "natural";
  }
  const fill = group === "filled" ? (tr ? "dolgulu" : "filled") : (tr ? "dolgusuz" : "unfilled");
  return `${fill}-${key}`;
}

export default function CutPage() {
  const { product: productSlug, cut: cutSlugSegment } = useParams();
  const locale  = useLocale();
  const lang    = getLang(locale);
  const t       = useTranslations("ProductPage");

  const productKey  = productKeyFromSlug(locale, String(productSlug)) || "slabs";
  const baseSegment = baseFor(locale);

  // cut key + kanonik slug
  const cutKey =
    Object.keys(CUTS[lang] || {}).find((k) => CUTS[lang][k] === cutSlugSegment) || "vein-cut";
  const canonicalCutSlug = CUTS[lang]?.[cutKey] || String(cutSlugSegment);

  // ProductIntroSection içerikleri
  const cutTitle = safe(() => t(`slabs.cuts.${cutKey}.title`), CUTS[lang]?.[cutKey] || cutKey);
  const cutIntro = safe(
    () => t(`slabs.cuts.${cutKey}.intro`),
    safe(() => t(`slabs.cuts.${cutKey}.processes.subtext`), "")
  );
  const title2   = safe(() => t(`slabs.cuts.${cutKey}.title2`), safe(() => t(`slabs.title2`), null));
  const intro2   = safe(() => t(`slabs.cuts.${cutKey}.intro2`),  safe(() => t(`slabs.intro2`),  null));
  const span     = safe(() => t(`slabs.cuts.${cutKey}.span`),    safe(() => t(`slabs.span`), "- Direct Quarry Supplier"));

  // Hero görsel (ürün+cut → cover → fallback)
  const heroOverride = safe(() => t.raw(`slabs.cuts.${cutKey}.hero.src`), null);
  const heroAltOver  = safe(() => t(`slabs.cuts.${cutKey}.hero.alt`), null);
  const heroSrc =
    heroOverride ||
    IMAGE_BY_PRODUCT?.[productKey]?.[cutKey] ||
    IMAGE_BY_PRODUCT?.[productKey]?.cover ||
    "/images/homepage/antikoarkplan.webp";
  const heroAlt = heroAltOver || cutTitle;

  // Process grupları
  const processNode = safe(() => t.raw(`slabs.cuts.${cutKey}.processes`), {});
  const groups = processNode?.groups || {};
  const meta   = processNode?.meta   || {};

  // ... imports arasında IMAGE_BY_PRODUCT ve PROCESS_THUMB_BY_COMBINED var

const makeGroupCards = (groupName) => {
  const items   = groups[groupName]?.items || [];
  const heading = safe(() => t(`slabs.cuts.${cutKey}.processes.groups.${groupName}.heading`), groupName);
  const text    = safe(() => t(`slabs.cuts.${cutKey}.processes.groups.${groupName}.text`), "");

  // bu grubun görsel haritasını burada topluyoruz
  const groupImgMap = {};

  const variantCards = items.map((pKey) => {
    const isNatural = (pKey === "natural" || pKey === "dogal");
    const titleKey  = isNatural
      ? `slabs.cuts.${cutKey}.processes.meta.natural.title`
      : `slabs.cuts.${cutKey}.processes.meta.${pKey}.title`;
    const title = safe(() => t(titleKey), pKey);

    const processSlug = isNatural
      ? procSlugFor(locale, "natural", "natural")
      : procSlugFor(locale, groupName, pKey);

    // 🔑 combined key (doldulu/dolgusuz ayrımı için)
    const combinedKey = isNatural ? "natural" : `${groupName}:${pKey}`;

    // görseli 3 kaynaktan dene: i18n → _images → fallback
    const imagesCombined =
      safe(() => t.raw(`slabs.cuts.${cutKey}.processes.images.combined`), null);
    const imgI18n = imagesCombined?.[combinedKey] ?? null;
    const imgByProduct =
      IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[combinedKey] || null;
    const image =
      imgI18n || imgByProduct || PROCESS_THUMB_BY_COMBINED?.[combinedKey] || heroSrc;

    // ❗ imgMap, karttaki *slug* ile eşleşiyor → slug'ı combinedKey yapıyoruz
    groupImgMap[combinedKey] = image;

    const href = {
      pathname: "/travertine/[product]/[cut]/[process]",
      params: { product: String(productSlug), cut: canonicalCutSlug, process: processSlug }
    };

    return {
      slug: combinedKey,     // ⬅️ önemli: "filled:honed" gibi
      vKey: combinedKey,     // (komponent vKey kullanıyorsa)
      title,
      href,
      alt: title
      // card.image vermesek de olur; imgMap üzerinden bulunacak
    };
  });

  return { heading, text, variantCards, imgMap: groupImgMap };
};



  const filledBlock   = makeGroupCards("filled");
  const unfilledBlock = makeGroupCards("unfilled");

  const variantImgMapAll = { ...(filledBlock.imgMap || {}), ...(unfilledBlock.imgMap || {}) };

  // TextSection: önce CUT altında, yoksa ürün kökü
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

  // FAQ: önce CUT altında, yoksa ürün kökü
  const qCut = safe(() => t.raw(`slabs.cuts.${cutKey}.QuestionsItems`), null);
  const qTop = safe(() => t.raw(`slabs.QuestionsItems`), {});
  const qSrc = qCut || qTop;
  const faqItems = [];
  if (qSrc) {
    let j = 1;
    while (qSrc[`aboutpage_s4_faq${j}_header`] && qSrc[`aboutpage_s4_faq${j}_text`]) {
      faqItems.push({ q: qSrc[`aboutpage_s4_faq${j}_header`], a: qSrc[`aboutpage_s4_faq${j}_text`] });
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
        alt={heroAlt}
        prefix={`/${locale}`}
        baseHref={`/${locale}/${baseSegment}`}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
        span={span}
      />

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
