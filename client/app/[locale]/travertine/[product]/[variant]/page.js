// app/[locale]/travertine/[product]/[variant]/page.js
// (TR için aynı dosya adı "traverten" klasörü altında)
// "use client" zorunlu çünkü hooks kullanılıyor
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations, useMessages } from "next-intl";
import Link from "next/link";

import {
  CUTS,
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
} from "@/app/[locale]/(catalog)/_images";

// UI parçaları
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import OtherOptions2 from "@/app/[locale]/components/generalcomponent/OtherOptions2";

// Basit InfoCard
function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className="text-sm text-neutral-600 leading-[1.7] text-center">
        {children}
      </div>
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

  // ---- Router & i18n
  const { product: rawProduct, variant: vSlug } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");
  const messages = useMessages();

  // ---- Yol/segment yardımcıları
  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];
  const baseHref = locale === "tr" ? "travertenler" : "travertines"; // breadcrumb için

  // ---- productKey & vKey çıkar
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === rawProduct) || "block";
  const vKey = VARIANT_KEY_BY_SLUG[vSlug];
  if (!vKey) return null;

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

  const infoCards = [
    {
      title: "Design Versatility",
      content: "From luxury hospitality to private villas, Blaundos Antico adapts to varied aesthetics. Its neutral warmth pairs well with wood, metal, and glass, allowing cohesive palettes in mixed-material schemes. Designers value its ability to soften minimal interiors or enrich traditional settings with organic texture. Available finishes expand possibilities, from refined polished looks to tactile brushed or tumbled surfaces ideal for outdoor paths and pool surrounds. The result is a reliable, elegant stone that elevates spaces without visual noise.",
    },
    {
      title: "Performance for High-Traffic Areas",
      content: "Calibrated thickness, consistent flatness, and suitable surface treatments help Blaundos Antico perform in lobbies, corridors, and retail zones. Anti-slip options support safety outdoors, while proper sealing enhances stain resistance indoors. With accurate cutting and tight tolerances, installers achieve clean joints and level surfaces, reducing rework and time on site. This blend of aesthetics and practicality positions Blaundos Antico as a proven specification for demanding, design-driven environments across climates and usage patterns.",
    }
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
        alt={vAlt || pageAlt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Travertenler" : "Travertines"}
        depth={2}
      />

            {/* CUT dairesel grid – VariantCircleSection */}
      {productKey !== "block" && (
        <VariantCircleSection
          heading={locale.startsWith("tr") ? "Kesim şekli" : "Cut options"}
          variantCards={cutCards}
          imgMap={PRODUCT_IMG[productKey]}
          heroSrc={heroSrc}
          IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
          productKey={productKey}
        />
      )}

      {/* 4 INFO CARD */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5 max-w-[1200px] mx-auto">
        {infoCards.map((c, i) => (
          <InfoCard key={i} title={c.title}>
            {typeof c.content === "string"
              ? c.content
              : Array.isArray(c.content)
              ? c.content.join(", ")
              : null}
          </InfoCard>
        ))}
      </section>

      {/* <div className="flex flex-col w-screen items-center justify-center my-6 md:my-12">
        <div className="flex flex-col w-[80%] max-w-[1400px] items-center justify-center text-center">
          <h2 className="text-[24px] md:text-[26px]">Applications of Blaundos Antico Travertine Slabs</h2>
          <p className="mt-2 text-[12px] lg:tetx-[14px9">Blaundos Antico is specified for floors, wall cladding, countertops, fireplace surrounds, stair treads, and exterior façades. Its antique texture lends character to boutique hotels and residences, while honed or polished finishes suit refined interiors. Outdoors, brushed or tumbled slabs complement landscaping, garden paths, and pool decks. The stone’s tonal stability supports continuity between inside and outside, helping designers create cohesive transitions. With accurate sizing and reliable supply, it scales from small renovations to flagship builds.</p>
        </div>
        <div className="flex max-w-[1200px] mt-8">
          <InfoCard title="Interior & Exterior Use Cases" children="Indoors, Blaundos Antico brings warmth to living areas and statement value to feature walls or reception desks. In kitchens and baths, sealed surfaces provide practical durability with natural beauty. Externally, its weathered look enriches patios and façades, aging gracefully over time. For public spaces, coordinated formats (slabs, tiles, custom pieces) keep design language consistent. Majen’s technical support advises on finish selection, slip ratings, and maintenance to match climate, footfall, and performance requirements."/>
        </div>
      </div>

         <div className="flex flex-col w-screen items-center justify-center my-6 md:my-12">
        <div className="flex flex-col w-[80%] max-w-[1400px] items-center justify-center text-center">
          <h2 className="text-[24px] md:text-[26px]">Available Sizes & Thickness</h2>
          <p className="mt-2 text-[12px] lg:tetx-[14px9">Majen supplies slabs commonly at 2 cm and 3 cm thickness, cut from blocks selected for tone and structure. Custom dimensions can be produced on request, including book-matched sets for feature walls. Tight calibration and precision polishing ensure flatness and clean edges that speed installation. For special elements—vanities, stair treads, or oversized cladding—our team provides cut-to-size options that maintain vein continuity. Consistent sizing across batches supports predictable waste rates and accurate take-offs.</p>
        </div>
        <div className="flex max-w-[1200px] mt-8">
          <InfoCard title="Dimensional Tolerances" children="Slab thickness is controlled within industry tolerances to support even load distribution and dependable adhesion. Surface regularity reduces lippage risk on large floors, while square edges and stable geometry help installers achieve fine joints in visual-critical areas. For ventilated façades and lightweight assemblies, we coordinate with fabricators to meet bracket and anchor constraints. All dimensions are verified at dispatch, and reports are available for documentation and submittal packages when required."/>
        </div>
      </div>


      <div className="flex flex-col w-screen items-center justify-center my-6 md:my-12">
        <div className="flex flex-col w-[80%] max-w-[1400px] items-center justify-center text-center">
          <h2 className="text-[24px] md:text-[26px]">Finishes & Packaging Options</h2>
          <p className="mt-2 text-[12px] lg:tetx-[14px9">Blaundos Antico can be supplied polished, honed, brushed, or tumbled to align with design intent and slip resistance needs. Finishes are applied with calibrated equipment to keep tone and sheen consistent across lots. For export, slabs are packed in reinforced wooden bundles with corner guards, interleaves, and strapping that limits movement in transit. Moisture-resistant wrapping and clear labeling aid handling at ports and job sites. Packaging is optimized for container loading to minimize risk and freight costs.</p>
        </div>
        <div className="flex max-w-[1150px] mt-8 gap-4">
          <InfoCard title="Surface Finish Guidance" children="Select polished for premium interiors, honed for low-glare sophistication, brushed where texture is desired, and tumbled for rustic, outdoor-ready charm. In wet areas or exterior paths, combine texture with appropriate sealers to improve maintenance and slip performance. We can supply matched samples across finishes so teams preview appearance under project lighting. This process helps align expectations early, reducing change orders and helping stakeholders approve materials quickly and confidently."/>
          <InfoCard title="Export Packaging Standards" children="Each bundle is photographed and measured prior to loading. Straps, braces, and internal blocking limit vibration, while protective interlayers reduce abrasion. Bundle IDs map to packing lists for fast checks at customs and on site. Shock indicators can be added on request. The goal is simple: slabs arrive installation-ready, with documentation that keeps receiving and quality verification efficient for importers and contractors."/>
        </div>
      </div>

          <div className="flex flex-col w-screen items-center justify-center my-6 md:my-12">
        <div className="flex flex-col w-[80%] max-w-[1400px] items-center justify-center text-center">
          <h2 className="text-[24px] md:text-[26px]">Travertine Slab Export Process</h2>
          <p className="mt-2 text-[12px] lg:tetx-[14px9">We coordinate the entire export cycle—from quarry selection and block cutting to finishing, inspection, and documentation. Orders include commercial invoice, packing list, and certificate of origin. With FOB and CIF terms available, our logistics team manages bookings, customs, and container optimization to protect material and timelines. Pre-shipment photos and QC summaries provide transparency. This streamlined process reduces administrative load for buyers and helps large projects maintain predictable schedules worldwide.</p>
        </div>
     
      </div>


       <div className="flex flex-col w-screen items-center justify-center my-6 md:my-12">
        <div className="flex flex-col w-[80%] max-w-[1400px] items-center justify-center text-center">
          <h2 className="text-[24px] md:text-[26px]">Why Partner with Majen for Travertine Slabs?</h2>
          <p className="mt-2 text-[12px] lg:tetx-[14px9">Beyond quarry access, Majen offers technical guidance, flexible MOQs, and dependable lead times that fit real-world schedules. Direct sourcing keeps costs predictable and ensures tone matching across lots. Reinforced packaging, thorough documentation, and responsive support reduce friction during shipping and receiving. We build long-term relationships with importers, distributors, and contractors, providing post-delivery assistance and repeatable quality so projects finish on brief, on budget, and on time.</p>
        </div>
        <div className="flex max-w-[1100px] mt-8 gap-4">
          <InfoCard title="Service & Support" children="From sampling and mock-ups to installation advice, our team responds quickly with practical guidance. Multilingual communication, transparent timelines, and after-sales follow-up help keep stakeholders aligned. Whether you need book-matched features, custom cuts, or coordinated tiles, we manage details and share progress so decisions stay informed."/>
          <InfoCard title="Sustainability & Traceability" children="We prioritize responsible quarrying, water recycling, and waste reduction. Material traceability and documentation support green building goals and client ESG policies. These practices contribute to durable, long-life installations with lower lifecycle impact."/>
           <InfoCard title="Compliance & Documentation" children="We provide packing data, certificates of origin, and HS codes; optional lab tests and slip ratings can be arranged. This documentation simplifies import processes and supports submittals for architects and contractors, helping approvals proceed without delays."/>
        </div>
      </div> */}




      {/* Varyant/Ürün TextSection blokları */}
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

      {/* Micro-proof (varsa) */}
      {microProof.length > 0 && (
        <section className="max-w-5xl mx-auto mt-10">
          <ul className="micro-proof list-disc pl-6 space-y-1 text-sm text-neutral-700">
            {microProof.map((line, i) => (
              <li key={i}>{line}</li>
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