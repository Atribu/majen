// app/[locale]/travertine/[product]/[variant]/[cut]/page.js
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations, useMessages } from "next-intl";
import Link from "next/link";

import {
  CUTS,
  PROCESSES,
  BASE_BY_LOCALE,
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
  VARIANT_KEY_BY_SLUG,
  buildVariantChildPath,
} from "@/lib/travertine";

import {
  PRODUCT_IMG,
  IMAGE_BY_PRODUCT_AND_VARIANT,
  IMAGE_BY_PRODUCT_VARIANT_AND_CUT,
  IMAGE_BY_PRODUCT_VARIANT_AND_PROCESS
} from "@/app/[locale]/(catalog)/_images";

// UI Components
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";

// InfoCard Component
function InfoCard({ title, children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5 ${className}`}>
      <h3 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h3>
      <div className="text-sm text-neutral-600 leading-[1.7] text-center">
        {Array.isArray(children) ? children.join(", ") : children}
      </div>
    </div>
  );
}

export default function CutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };
  

  // Router & i18n
  const { product: rawProduct, variant: vSlug, cut: cutSlug } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");
  const messages = useMessages();

  // Yol/segment
  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];
  const baseHref = locale === "tr" ? "travertenler" : "travertines";

  // productKey & vKey
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === rawProduct) || "slabs";
  const vKey = VARIANT_KEY_BY_SLUG[vSlug];
  if (!vKey) return null;

  // Slug'dan varyant key
  const getVariantKeyFromSlug = (slug) => {
    const slugMap = {
      'blaundos-antiko': 'antiko',
      'blaundos-light': 'light',
      'blaundos-ivory': 'ivory'
    };
    return slugMap[slug] || slug;
  };

  const variantKey = getVariantKeyFromSlug(vSlug);

  // Cut key'i normalize et
  const getCutKeyFromSlug = (slug) => {
    const slugMap = {
      'vein-cut': 'veincut',
      'cross-cut': 'crosscut'
    };
    return slugMap[slug] || slug.replace('-', '');
  };

  const cutKey = getCutKeyFromSlug(cutSlug);

  // Varyant ve Cut verilerini JSON'dan çek
  // ProductPage.{productKey}.{variantKey}.{cutKey}
  const vOverrides = messages?.ProductPage?.[productKey]?.[variantKey] || null;
  const cutOverrides = vOverrides?.[cutKey] || null;

  console.log('Debug cut lookup:', {
    productKey,
    variantKey,
    cutSlug,
    cutKey,
    cutOverrides,
    availableCuts: vOverrides ? Object.keys(vOverrides) : 'none'
  });

  // Fallback'ler
  const baseTitle = t(`${productKey}.title`);
  const baseIntro = t(`${productKey}.intro`);
  
  // Varyant bilgileri
  const vTitle = vOverrides?.title || `${productKey} ${variantKey}`;
  const vAlt = vOverrides?.alt || `${vTitle} image`;

  // Cut bilgileri (override -> varyant -> ürün fallback)
  const cutTitle = cutOverrides?.title || vTitle;
  const cutIntro = cutOverrides?.intro || vOverrides?.intro || baseIntro;
  const cutTitle2 = cutOverrides?.title2 || vTitle;
  const cutIntro2 = cutOverrides?.intro2 || vOverrides?.intro2 || baseIntro;

  // Cut label
  const getCutLabel = (slug) => {
    const labels = {
      'vein-cut': locale === 'tr' ? 'Damar Kesim' : 'Vein Cut',
      'cross-cut': locale === 'tr' ? 'Enine Kesim' : 'Cross Cut'
    };
    return labels[slug] || slug;
  };

  const cutLabel = getCutLabel(cutSlug);

  // Diziler
  const sizes = cutOverrides?.sizes || vOverrides?.sizes || t.raw(`${productKey}.sizes`) || [];
  const finishes = cutOverrides?.finishes || vOverrides?.finishes || t.raw(`${productKey}.finishes`) || [];
  const features = cutOverrides?.features || vOverrides?.features || t.raw(`${productKey}.features`) || [];

  // Açıklama
  const descriptionRaw = cutOverrides?.description || vOverrides?.description || cutIntro;
  const description = Array.isArray(descriptionRaw) ? descriptionRaw : [descriptionRaw];

  // Görsel: cut özel -> varyant -> ürün
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    IMAGE_BY_PRODUCT_VARIANT_AND_CUT?.[productKey]?.[vSlug]?.[cutSlug] ??
    IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[vSlug] ??
    (typeof imgMap === "object"
      ? imgMap?.[vKey] ?? imgMap?.cover ?? Object.values(imgMap)[0]
      : imgMap);

  // Info Cards - Cut özel
  const cardsData = cutOverrides?.cards || vOverrides?.cards || {};
  const infoCards = [
    {
      title: cardsData.title1 || "Design Versatility",
      content: cardsData.text1 || description[0],
    },
    {
      title: cardsData.title2 || "Performance",
      content: cardsData.text2 || description[1],
    },
    {
      title: locale === 'tr' ? 'Boyutlar' : 'Sizes',
      content: sizes.length ? sizes.join(", ") : description[2] || cutIntro,
    },
    {
      title: locale === 'tr' ? 'Yüzeyler & Özellikler' : 'Finishes & Features',
      content: [...finishes, ...features].slice(0, 12).join(", "),
    }
  ];

  // Sections - Cut özel
  const appSection = cutOverrides?.ApplicationSection || vOverrides?.ApplicationSection || {};
  const availSection = cutOverrides?.AvailableSection || vOverrides?.AvailableSection || {};
  const finishSection = cutOverrides?.FinishesSection || vOverrides?.FinishesSection || {};
  const partnerSection = cutOverrides?.PartnerSection || vOverrides?.PartnerSection || {};
  const exportSection = cutOverrides?.ExportSection || vOverrides?.ExportSection || {};
  const qualitySection = cutOverrides?.QualitySection || vOverrides?.QualitySection || {};

  // TextSection
  const buildSections = (srcObj) => {
    if (!srcObj) return [];
    const out = [];
    let i = 1;
    while (srcObj[`header${i}`] || srcObj[`text${i}`]) {
      const header = srcObj[`header${i}`];
      const text = srcObj[`text${i}`];
      if (header || text) out.push({ id: i, title: header, paragraphs: [text].filter(Boolean) });
      i++;
    }
    return out;
  };

  const cutTextSection = cutOverrides?.TextSection || null;
  const vTextSection = vOverrides?.TextSection || null;
  const sections = buildSections(cutTextSection || vTextSection);

  // Process Cards (vein-cut altındaki natural, filling, epoxy vb.)
  const processLabels = {
    natural: locale === 'tr' ? 'Doğal' : 'Natural',
    filling: locale === 'tr' ? 'Dolgulu' : 'Filled',
    epoxy: locale === 'tr' ? 'Epoksi' : 'Epoxy',
    transparent: locale === 'tr' ? 'Şeffaf' : 'Transparent',
    antique: locale === 'tr' ? 'Antik' : 'Antique'
  };

  const processCards = (PROCESSES || []).map((proc) => ({
    slug: proc,
    vKey: proc,
    title: processLabels[proc] || proc,
    alt: `${cutTitle} ${processLabels[proc]}`,
    href: `${prefix}/${baseSegment}/${rawProduct}/${vSlug}/${cutSlug}/${proc}`,
    img: heroSrc, // Process'e özel görsel yoksa cut görseli
  }));

  // FAQ
  const cutQA = cutOverrides?.QuestionsItems || null;
  const variantQA = vOverrides?.QuestionsItems || null;
  
  const harvestQA = (qa) => {
    if (!qa) return [];
    const arr = [];
    for (let i = 1; i <= 12; i++) {
      const q = qa[`aboutpage_s4_faq${i}_header`];
      const a = qa[`aboutpage_s4_faq${i}_text`];
      if (q && a) arr.push({ q, a });
    }
    return arr;
  };

  const cutFaqItems = cutOverrides?.faq?.items || harvestQA(cutQA) || [];
  const variantFaqItems = harvestQA(variantQA) || [];
  const faqItems = cutFaqItems.length ? cutFaqItems : variantFaqItems;

  // Micro-proof
  const microProof = Array.isArray(cutOverrides?.microProof) 
    ? cutOverrides.microProof 
    : (Array.isArray(vOverrides?.microProof) ? vOverrides.microProof : []);

  // Accordion
  const accordionItems = [
    { title: partnerSection.list1, body: partnerSection.text1 },
    { title: partnerSection.list2, body: partnerSection.text2 },
    { title: partnerSection.list3, body: partnerSection.text3 },
  ].filter(item => item.body);

  return (
    <main className="px-5 md:px-8 lg:px-0 py-7 mt-16">
      {/* Intro Section */}
      <ProductIntroSection
        title={`${cutTitle} - ${cutLabel}`}
        intro={cutIntro}
        heroSrc={heroSrc}
        title2={cutTitle2}
        intro2={cutIntro2}
        alt={vAlt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Travertenler" : "Travertines"}
        depth={3}
      />

      {/* Cut Selector */}
      <section className="mt-12 max-w-[1200px] mx-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-3">
          {locale === "tr" ? "Kesim Seç" : "Choose Cut"}
        </h3>
        <div className="flex flex-wrap gap-3">
          {CUTS.map((c) => (
            <Link
              key={c}
              href={`${prefix}/${baseSegment}/${rawProduct}/${vSlug}/${c}`}
              className={`px-4 py-2 rounded-full border transition ${
                c === cutSlug
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 hover:border-black hover:bg-black hover:text-white"
              }`}
            >
              {getCutLabel(c)}
            </Link>
          ))}
        </div>
      </section>

      {/* Info Cards */}
      {infoCards.length > 0 && (
        <section className="mt-8 md:mt-10 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
          {infoCards.map((c, i) => (
            <InfoCard key={i} title={c.title}>
              {c.content}
            </InfoCard>
          ))}
        </section>
      )}

      {/* Process Selector Circle */}
      {processCards.length > 0 && (
        <VariantCircleSection
          heading={locale === "tr" ? "Yüzey İşlemi Seç" : "Choose Process"}
          variantCards={processCards}
           imgMap={PRODUCT_IMG[productKey]}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_VARIANT_AND_PROCESS}
          productKey="process"
        />
      )}

      {/* Application Section */}
      {appSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{appSection.title}</h2>
            {appSection.text && <p className="mt-2 text-[12px] lg:text-[14px]">{appSection.text}</p>}
          </div>
          {appSection.subtitle && (
            <div className="flex max-w-[1200px] mt-8">
              <InfoCard title={appSection.subtitle}>{appSection.subtext}</InfoCard>
            </div>
          )}
        </div>
      )}

      {/* Available Section */}
      {availSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{availSection.title}</h2>
            {availSection.text && <p className="mt-2 text-[12px] lg:text-[14px]">{availSection.text}</p>}
          </div>
          {availSection.subtitle && (
            <div className="flex max-w-[1200px] mt-8">
              <InfoCard title={availSection.subtitle}>{availSection.subtext}</InfoCard>
            </div>
          )}
        </div>
      )}

      {/* Finishes Section */}
      {finishSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{finishSection.title}</h2>
            {finishSection.text && <p className="mt-2 text-[12px] lg:text-[14px]">{finishSection.text}</p>}
          </div>
          <div className="flex max-w-[1150px] mt-8 gap-4 flex-col md:flex-row">
            {finishSection.subtitle && (
              <InfoCard title={finishSection.subtitle}>{finishSection.subtext}</InfoCard>
            )}
            {finishSection.subtitle2 && (
              <InfoCard title={finishSection.subtitle2}>{finishSection.subtext2}</InfoCard>
            )}
          </div>
        </div>
      )}

      {/* Export & Quality Sections */}
      {exportSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{exportSection.title}</h2>
            {exportSection.text && <p className="mt-2 text-[12px] lg:text-[14px]">{exportSection.text}</p>}
          </div>
        </div>
      )}

      {qualitySection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{qualitySection.title}</h2>
            {qualitySection.text && <p className="mt-2 text-[12px] lg:text-[14px]">{qualitySection.text}</p>}
          </div>
          {qualitySection.subtitle && (
            <div className="flex max-w-[1150px] mt-8 gap-4">
              <InfoCard title={qualitySection.subtitle}>{qualitySection.subtext}</InfoCard>
            </div>
          )}
        </div>
      )}

      {/* TextSection Blokları */}
      {sections.map(({ id, title, paragraphs }) => (
        <TextSection
          key={id}
          title={title}
          paragraphs={paragraphs}
          schema={schema}
          className="max-w-5xl mx-auto mt-12"
          clampMobile={3}
          as="section"
        />
      ))}

      {/* Micro-proof */}
      {microProof.length > 0 && (
        <section className="max-w-5xl mx-auto mt-10 items-center justify-center text-center">
          <ul className="micro-proof pl-6 space-y-1 text-sm text-neutral-700">
            {microProof.map((line, i) => (
              <li key={i}>- {line}</li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <div id="faq" className="max-w-5xl mx-auto mt-12">
          <QuestionsSection 
            items={faqItems} 
            span={`${cutTitle} ${cutLabel}`}
            header="FAQ"
          />
        </div>
      )}

      {/* Other Options */}
      {/* <OtherOptions
        heading={locale === 'tr' ? "Diğer Seçenekler" : "Other Options"}
        excludeProduct={productKey}
        productOrder={["block", "slabs", "tiles", "special"]}
        variantSlugs={["antiko", "light", "ivory"]}
        baseHref={`${prefix}/${baseSegment}`}
        productSegments={PRODUCT_SLUGS[locale]}
        locale={locale}
        productImages={PRODUCT_IMG}
        productHrefFor={(pkey) => `${prefix}/${baseSegment}/${PRODUCT_SLUGS[locale][pkey]}`}
        currentVariantSlug={vSlug}
      /> */}

      <ContactFrom />
    </main>
  );
}