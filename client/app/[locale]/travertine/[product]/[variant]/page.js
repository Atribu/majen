"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import { useLocale, useTranslations, useMessages } from "next-intl";
import Link from "next/link";

import {
  CUTS,
  BASE_BY_LOCALE,
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
  VARIANT_KEY_BY_SLUG,
  buildVariantChildPath,
  hasDeepLevels,
} from "@/lib/travertine";

import {
  PRODUCT_IMG,
  IMAGE_BY_PRODUCT_AND_VARIANT,
  IMAGE_BY_PRODUCT_VARIANT_AND_CUT,
} from "@/app/[locale]/(catalog)/_images";

const showVariantCircleFor = new Set(["slabs", "tiles"]);

// UI parçaları
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import OtherOptions2 from "@/app/[locale]/components/generalcomponent/OtherOptions2";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";
import BreadcrumbsExact from "@/app/[locale]/components/generalcomponent/BreadcrumbsExact";
import IncotermLinkify from "@/app/[locale]/components/generalcomponent/IncotermLinkify";

// Basit InfoCard
function InfoCard({ title, children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5 ${className}`}>
      <h3 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h3>
      <div className="text-sm text-neutral-600 leading-[1.7] text-center">
        {/* children slot */}
        {Array.isArray(children) ? children.join(", ") : children}
      </div>
    </div>
  );
}

// ---- Accordion (smooth height) ----
function Collapse({ open, children }) {
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState("0px");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      // open: set to scrollHeight then auto
      el.style.height = "0px";
      const target = el.scrollHeight;
      requestAnimationFrame(() => {
        el.style.height = target + "px";
      });
      const onEnd = () => {
        if (open) el.style.height = "auto";
      };
      el.addEventListener("transitionend", onEnd, { once: true });
    } else {
      // close: from current height to 0
      const current = el.scrollHeight;
      el.style.height = current + "px";
      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    }
  }, [open]);

  return (
    <div
      ref={ref}
      className="overflow-hidden transition-[height] duration-400 ease-in-out"
      style={{ height }}
    >
      <div className="py-4">{children}</div>
    </div>
  );
}

function AccordionItem({ title, body, defaultOpen = false }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className="rounded-xl border border-neutral-200 bg-white/70 backdrop-blur-sm shadow-[0_6px_24px_-10px_rgba(0,0,0,0.15)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-neutral-900">{title}</span>
        <span
          className={`inline-block transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      <Collapse open={open}>
        <div className="px-5 text-sm leading-7 text-neutral-700">{body}</div>
      </Collapse>
    </div>
  );
}

function AccordionGroup({ items = [], defaultOpenIndex = 0, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((it, i) => (
        <AccordionItem
          key={i}
          title={it.title}
          body={typeof it.body === "string" ? it.body : (it.body?.join?.(" ") ?? "")}
          defaultOpen={i === defaultOpenIndex}
        />
      ))}
    </div>
  );
}

export default function VariantPage() {
  // --- JSON-LD şeması
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  // ---- Router & i18n - TÜM HOOK'LARI EN BAŞTA ÇAĞIR
  const { product: rawProduct, variant: vSlug } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");
  const messages = useMessages();
  const pathname = usePathname() || ""; // usePathname'ı buraya taşıdık

  // ---- Yol/segment yardımcıları
  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];
  const baseHref = locale === "tr" ? "travertenler" : "travertines"; // breadcrumb için

  // ---- productKey & vKey çıkar
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === rawProduct) || "block";
  const vKey = VARIANT_KEY_BY_SLUG[vSlug];
  
  // Eğer vKey yoksa, hook'lardan sonra return edelim
  if (!vKey) return null;

  // Breadcrumbs için segmentleri hook'lardan sonra hesaplayalım
  const depth = 2;
  const segments = pathname.split("/").filter(Boolean); 
  const lastSegment = pathname.split("/").filter(Boolean).pop(); 
  const selectedSegments = segments.slice(-depth);

  // ---- Slug'dan varyant key'ini çıkar (blaundos-antiko -> antiko)
  const getVariantKeyFromSlug = (slug) => {
    const slugMap = {
      'blaundos-antiko': 'antiko',
      'blaundos-light': 'light', 
      'blaundos-ivory': 'ivory'
    };
    return slugMap[slug] || slug;
  };

  const variantKey = getVariantKeyFromSlug(vSlug);

  // ---- Varyant override zinciri (düzeltilmiş!)
  // 1) ProductPage.{productKey}.{variantKey} (en.json'daki yapıya göre)
  // 2) ProductVariantPage.{productKey}.{vKey} (eğer varsa)
  // 3) ProductPage.{productKey}.variants.{vKey} (eski yapı)
  // 4) ProductPage.{vKey} (yanlışlıkla köke yazıldıysa)
  const vOverrides =
    messages?.ProductPage?.[productKey]?.[variantKey] ||
    messages?.ProductVariantPage?.[productKey]?.[vKey] ||
    messages?.ProductPage?.[productKey]?.variants?.[vKey] ||
    messages?.ProductPage?.[vKey] ||
    null;

  console.log('Debug variant lookup:', {
    productKey,
    vSlug,
    variantKey,
    vOverrides,
    availableVariants: messages?.ProductPage?.[productKey] ? Object.keys(messages.ProductPage[productKey]) : 'none'
  });

  // ---- Ürün geneli (fallback)
  const baseTitle = t(`${productKey}.title`);
  const baseIntro = t(`${productKey}.intro`);
  const baseAlt = t(`${productKey}.alt`);

  // ---- Varyant başlık/alt: override -> ProductPage.{productKey}.variants.{vKey} -> ürün geneli
  const vTitle = vOverrides?.title || 
    t(`${productKey}.variants.${vKey}.title`) || 
    `${productKey} ${variantKey}`.replace(/^\w/, c => c.toUpperCase());
    
  const vAlt = vOverrides?.alt || 
    t(`${productKey}.variants.${vKey}.alt`) || 
    `${vTitle} image`;

  const pageTitle = vOverrides?.title || vTitle || baseTitle;
  const pageIntro = vOverrides?.intro || baseIntro;
  const pageTitle2 = vOverrides?.title2 || vTitle || baseTitle;
  const pageIntro2 = vOverrides?.intro2 || baseIntro;
  const pageAlt = vOverrides?.alt || vAlt || baseAlt;

  const variantTitle = vOverrides?.varianttitle

  // ---- Diziler (override -> ürün geneli -> [])
  const sizes =
    (Array.isArray(vOverrides?.sizes) && vOverrides.sizes) ||
    t.raw(`${productKey}.sizes`) ||
    [];
  const finishes =
    (Array.isArray(vOverrides?.finishes) && vOverrides.finishes) ||
    t.raw(`${productKey}.finishes`) ||
    [];
  const features =
    (Array.isArray(vOverrides?.features) && vOverrides.features) ||
    t.raw(`${productKey}.features`) ||
    [];

  // ---- Açıklama/Description (diziye normalize et)
  const descriptionRaw =
    vOverrides?.description || t.raw(`${productKey}.description`) || pageIntro;
  const description = Array.isArray(descriptionRaw) ? descriptionRaw : [descriptionRaw];

  // ---- Görsel: varyant resmi -> ürün varyant fallback -> ürün kapak
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[vSlug] ??
    (typeof imgMap === "object"
      ? imgMap?.[vKey] ?? imgMap?.cover ?? Object.values(imgMap)[0]
      : imgMap);

  // ---- InfoCard başlıkları (detailsHeadings)
  const dh = vOverrides?.detailsHeadings || t.raw(`${productKey}.detailsHeadings`) || {};

  const cardsData = vOverrides?.cards || {};
const infoCards = [
  {
    title: cardsData.title1 || "Design Versatility",
    content: cardsData.text1 || description[0],
  },
  {
    title: cardsData.title2 || "Performance",
    content: cardsData.text2 || description[1],
  }
];

const appSection = vOverrides?.ApplicationSection || {};

const availSection = vOverrides?.AvailableSection || {};

const finishSection = vOverrides?.FinishesSection || {};

const partnerSection = vOverrides?.PartnerSection || {};

const exportSection = vOverrides?.ExportSection || {};

const qualitySection = vOverrides?.QualitySection || {};

const accordionItems = [
  { title: partnerSection.list1, body: partnerSection.text1 },
  { title: partnerSection.list2, body: partnerSection.text2 },
  { title: partnerSection.list3, body: partnerSection.text3 },
];

  // ---- TextSection (varyant özel -> ürün genel)
  const buildSections = (srcObj) => {
    if (!srcObj) return [];
    const out = [];
    let i = 1;
    while (
      srcObj[`header${i}`] ||
      srcObj[`text${i}`] ||
      srcObj[`subheader${i}`] ||
      srcObj[`subtext${i}`]
    ) {
      const header = srcObj[`header${i}`] || srcObj[`subheader${i}`];
      const text = srcObj[`text${i}`] || srcObj[`subtext${i}`];
      if (header || text) out.push({ id: i, title: header, paragraphs: [text].filter(Boolean) });
      i++;
    }
    return out;
  };

  const vTextSection = vOverrides?.TextSection || null;
  const baseTextSection = t.raw(`${productKey}.TextSection`) || null;
  const sections = buildSections(vTextSection || baseTextSection);

  // ---- CUT seçenekleri + dairesel grid
  const cutCards = CUTS.map((cut) => {
    const img =
      IMAGE_BY_PRODUCT_VARIANT_AND_CUT?.[productKey]?.[vSlug]?.[cut] ??
      IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[vSlug] ??
      heroSrc;

    return {
      slug: cut,
      vKey: cut,
      title: cut.replace(/-/g, " "),
      alt: `${vTitle} – ${pageTitle} (${cut})`,
      href: buildVariantChildPath(locale, rawProduct, vSlug, [cut]),
      img,
    };
  });

  // ---- FAQ (varyant özel -> ürün genel QuestionsItems)
  const variantQA = vOverrides?.QuestionsItems || null;
  const productQA = messages?.ProductPage?.[productKey]?.QuestionsItems || null;
  
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

  const variantFaqItems = vOverrides?.faq?.items || harvestQA(variantQA) || [];
  const fallbackFaqItems = harvestQA(productQA);
  const faqItems = (variantFaqItems.length ? variantFaqItems : fallbackFaqItems) || [];

  // ---- Micro-proof (varyant özel)
  const microProof = Array.isArray(vOverrides?.microProof) ? vOverrides.microProof : [];

  const showVariantCircle = hasDeepLevels
    ? hasDeepLevels(productKey)
    : showVariantCircleFor.has(productKey);

  // ---- UI
  return (
    <main className="px-5 md:px-8 lg:px-0 py-7 mt-16">
      {/* ÜST INTRO / Breadcrumb ProductIntroSection içinde */}
      <ProductIntroSection
        title={`${vTitle}`}
        intro={pageIntro}
        heroSrc={heroSrc}
        title2={pageTitle2}
        intro2={pageIntro2}
        alt={`${vTitle}`}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Travertenler" : "Travertines"}
        depth={2}
      />

      <BreadcrumbsExact
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Travertenler" : "Travertines"}
        selectedSegments={selectedSegments}
        className="mt-6"
      />

      {/* CUT dairesel grid – VariantCircleSection */}
      {showVariantCircle && (
        <VariantCircleSection
          heading={locale.startsWith("tr") ? "Kesim şekli" : `${vTitle} Cut Options`}
          variantCards={cutCards}
          imgMap={PRODUCT_IMG[productKey]}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
          productKey={productKey}
          imgAlt={`${vTitle}`}
        />
      )}

      {/* 4 INFO CARD */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5 max-w-[1200px] mx-auto">
        {infoCards.map((c, i) => (
          <InfoCard key={i} title={c.title}>
            {c.content}
          </InfoCard>
        ))}
      </section>

      {/* Application Section */}
      {appSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{appSection.title}</h2>
            {appSection.text && (
              <p className="mt-2 text-[12px] lg:text-[14px]">{appSection.text}</p>
            )}
          </div>
          {appSection.subtitle && (
            <div className="flex max-w-[1200px] mt-8">
              <InfoCard title={appSection.subtitle}>
                {appSection.subtext}
              </InfoCard>
            </div>
          )}
        </div>
      )}

      {/* Available Sizes Section */}
      {availSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{availSection.title}</h2>
            {availSection.text && (
              <p className="mt-2 text-[12px] lg:text-[14px]">{availSection.text}</p>
            )}
          </div>
          {availSection.subtitle && (
            <div className="flex max-w-[1200px] mt-8">
              <InfoCard title={availSection.subtitle}>
                {availSection.subtext}
              </InfoCard>
            </div>
          )}
        </div>
      )}

      {/* Finishes Section */}
      {finishSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{finishSection.title}</h2>
            {finishSection.text && (
              <p className="mt-2 text-[12px] lg:text-[14px]">{finishSection.text}</p>
            )}
          </div>
          <div className="flex max-w-[1150px] mt-8 gap-4 flex-col md:flex-row">
            {finishSection.subtitle && (
              <InfoCard title={finishSection.subtitle}>
                {finishSection.subtext}
              </InfoCard>
            )}
            {finishSection.subtitle2 && (
              <InfoCard title={finishSection.subtitle2}>
                {finishSection.subtext2}
              </InfoCard>
            )}
          </div>
        </div>
      )}

      {/* Export Section */}
      {exportSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{exportSection.title}</h2>
            {exportSection.text && (
              <p className="mt-2 text-[12px] lg:text-[14px]">
   <IncotermLinkify text={exportSection.text} />
 </p>
            )}
          </div>
          {/* <div className="flex max-w-[1150px] mt-2 gap-4 flex-col md:flex-row">
            {exportSection.subtitle && (
              <InfoCard title={exportSection.subtitle}>
                {exportSection.subtext}
              </InfoCard>
            )}
          </div> */}
        </div>
      )}

      {/* Quality Section */}
      {qualitySection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{qualitySection.title}</h2>
            {qualitySection.text && (
              <p className="mt-2 text-[12px] lg:text-[14px]">{qualitySection.text}</p>
            )}
          </div>
          <div className="flex max-w-[1150px] mt-8 gap-4 flex-col md:flex-row">
            {qualitySection.subtitle && (
              <InfoCard title={qualitySection.subtitle}>
                {qualitySection.subtext}
              </InfoCard>
            )}
          </div>
        </div>
      )}

      {/* Partner Section with Accordion */}
      {partnerSection.title && (
        <div className="flex flex-col w-full items-center justify-center my-6 md:my-12">
          <div className="flex flex-col w-[80%] max-w-[1200px] items-center justify-center text-center">
            <h2 className="text-[24px] md:text-[26px]">{partnerSection.title}</h2>
            {partnerSection.description && (
              <p className="mt-2 text-[12px] lg:text-[14px]">{partnerSection.description}</p>
            )}
          </div>

          {accordionItems.length > 0 && (
            <div className="w-full max-w-[1100px] mt-8 px-4 md:px-0">
              <AccordionGroup
                defaultOpenIndex={0}
                items={accordionItems}
              />
            </div>
          )}
        </div>
      )}

      {/* Varyant/Ürün TextSection blokları */}
      {sections.map(({ id, title, paragraphs }) => (
        <TextSection
          key={id}
          title={title}
          paragraphs={paragraphs}
          schema={schema}
          className="max-w-5xl mx-auto mt-0"
          clampMobile={3}
          as="section"
        />
      ))}

      {/* Micro-proof (varsa) */}
      {microProof.length > 0 && (
        <section className="max-w-5xl mx-auto -mt-1 items-center justify-center text-center">
          <ul className="micro-proof pl-6 space-y-1 text-sm text-neutral-700">
            {microProof.map((line, i) => (
              <li key={i}>- {line}</li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ (varyant özel -> ürün genel fallback) */}
      {faqItems.length > 0 && (
        <div id="faq" className="max-w-5xl mx-auto mt-12">
          <QuestionsSection 
            items={faqItems} 
            span={`${vTitle}`}
            header="FAQ"
          />
        </div>
      )}
      <SocialMediaSection/>

      <OtherOptions2
        heading={locale === 'tr' ? "Diğer Seçenekler" : "Other Options"}
        excludeProduct={productKey}                         
        productOrder={["block", "slabs", "tiles", "special"]}
        baseHref={`${prefix}/${baseSegment}`}
        productSegments={PRODUCT_SLUGS[locale]}
        locale={locale}
        productImages={PRODUCT_IMG}
        currentVariantSlug={vSlug}
      />

      <ContactFrom />
    </main>
  );
}