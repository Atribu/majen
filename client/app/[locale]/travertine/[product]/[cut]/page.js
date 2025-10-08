// app/[locale]/travertine/[product]/[cut]/page.jsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations, useMessages } from "next-intl";
import {
  getLang,
  productKeyFromSlug,
  baseFor,
  CUTS,
  PROCESSES,
  buildSeoProcessPath
} from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection2 from "@/app/[locale]/components/products1/VariantCircleSection";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";

const opt = (getter, fallback = "") => {
  try {
    const v = getter();
    return v ?? fallback;
  } catch {
    return fallback;
  }
};

export default function CutPage() {
  const { product: productSlug, cut: cutSlugSegment } = useParams();
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");
  const messages = useMessages();

  const productKey = productKeyFromSlug(locale, String(productSlug));
  const baseSegment = baseFor(locale);

  // "vein-cut" | "cross-cut" key'ini bul
  const cutKey = Object.keys(CUTS[lang] || {}).find((k) => CUTS[lang][k] === cutSlugSegment) || "vein-cut";
  const canonicalCutSlug = CUTS[lang]?.[cutKey] || "vein-cut-travertine-slabs";

  // i18n içerik
  const processNode = opt(() => messages.ProductPage.slabs.cuts[cutKey].processes, {});
  const procHeading = opt(() => t(`slabs.cuts.${cutKey}.processes.heading`), lang === "tr" ? "Yüzey İşlemi Seç" : "Choose Your Process");
  const procSub     = opt(() => t(`slabs.cuts.${cutKey}.processes.subtext`), "");

  // hero görsel
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc = typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap;

  // FAQ (opsiyonel)
  const qItems = opt(() => messages.ProductPage[productKey].QuestionsItems, {});
  const faq = [];
  for (let i = 1; i <= 12; i++) {
    const q = qItems[`aboutpage_s4_faq${i}_header`];
    const a = qItems[`aboutpage_s4_faq${i}_text`];
    if (q && a) faq.push({ q, a });
  }

  // --- Gruplar: filled & unfilled
  const groups = processNode.groups || {};
  const meta = processNode.meta || {};

  const buildCardsForGroup = (groupName) => {
    const items = groups[groupName]?.items || [];
    const heading = opt(() => t(`slabs.cuts.${cutKey}.processes.groups.${groupName}.heading`), groupName);
    const text    = opt(() => t(`slabs.cuts.${cutKey}.processes.groups.${groupName}.text`), "");

    // Hangi fill?
    const fillForGroup = groupName === "filled" ? "filled" : "unfilled";

    const variantCards = items.map((p) => {
      // Natural → fill yok
      const isNatural = (p === "natural" || p === "dogal");
      const title = meta[p]?.title || p;
      const alt   = meta[p]?.alt   || `${title}`;



      // locale'e göre process slug
     const fillSlug =
       lang === "tr"
         ? (fillForGroup === "filled" ? "dolgulu" : "dolgusuz")
         : (fillForGroup === "filled" ? "filled"  : "unfilled");
     const procSlug = isNatural
       ? (lang === "tr" ? "dogal" : "natural")
       : `${fillSlug}-${p}`; // örn: filled-honed

     // next-intl route object → kesin olarak process page'e gider
     const href = {
       pathname: "/travertine/[product]/[cut]/[process]",
       params: {
         product: String(productSlug),
         cut: canonicalCutSlug, // KESİNLİKLE kanonik slug!
         process: procSlug
       }
     };

      return {
        slug: p,
        title,
        description: "",
        href,
        image: `/images/process/${p}.jpg`,
        alt
      };
    });

    return { heading, text, variantCards };
  };

  const filledBlock   = buildCardsForGroup("filled");
  const unfilledBlock = buildCardsForGroup("unfilled");

  // sayfa başlığı (cut başlığı)
  const cutTitle = opt(() => t(`slabs.cuts.${cutKey}.title`), CUTS[lang]?.[cutKey] || cutKey);
  const cutAlt   = opt(() => t(`slabs.cuts.${cutKey}.alt`), cutTitle);

  return (
    <main className="py-6 mt-16 overflow-x-hidden">
      <ProductIntroSection
        title={cutTitle}
        intro={procSub}
        heroSrc={heroSrc}
        alt={cutAlt}
        prefix={`/${locale}`}
        baseHref={`/${locale}/${baseSegment}`}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        span="- Direct Quarry Supplier"
      />

      {/* Filled */}
      {filledBlock.variantCards.length > 0 && (
        <VariantCircleSection2
          heading={filledBlock.heading}
          text={filledBlock.text}
          variantCards={filledBlock.variantCards}
          imgMap={imgMap}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={{}}
          productKey={productKey}
        />
      )}

      {/* Unfilled (Natural burada fill’siz çıkar) */}
      {unfilledBlock.variantCards.length > 0 && (
        <VariantCircleSection2
          heading={unfilledBlock.heading}
          text={unfilledBlock.text}
          variantCards={unfilledBlock.variantCards}
          imgMap={imgMap}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={{}}
          productKey={productKey}
        />
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <div id="faq" className="max-w-5xl mx-auto mt-12">
          <QuestionsSection items={faq} span={cutTitle} />
        </div>
      )}

      <ContactFrom />
    </main>
  );
}
