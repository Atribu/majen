// app/[locale]/(catalog)/product/page.jsx
"use client";

import { useParams, usePathname } from "next/navigation";
import { useLocale, useTranslations, useMessages } from "next-intl";
import React from "react";
import { colorKeys, colorSlugFor, colorLabelFor } from "@/lib/travertine";

import {
  baseFor,
  productSlugFor,
  productKeyFromSlug,
  hasDeepLevels,
  CUTS,
  getLang,
  productUrl,
  cutSlugFor,
} from "@/lib/travertine";
import block from "@/public/images/deneme/ivoryblok.webp";
import slabs from "@/public/images/deneme/slabson.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/deneme/masa2.webp";
import { PRODUCT_IMG, IMAGE_BY_PRODUCT_AND_VARIANT } from "@/app/[locale]/(catalog)/_images";
import { DetailBlock } from "@/app/[locale]/(catalog)/_ui";
import ProductIntroSection from "../../components/products1/ProductIntroSection";
import TextSection from "../../components/products1/TextSection";
import ContactFrom from "../../components/generalcomponent/ContactFrom";
import SocialMediaSection from "../../components/products1/SocialMediaSection";
import InlineLinks from "../../components/generalcomponent/InlineLinks";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import VariantCircleSection2 from "../../components/products1/VariantCircleSection"; // cut kartları için
import OtherOptions from "../../components/generalcomponent/OtherOptions";
import BreadcrumbsExact from "../../components/generalcomponent/BreadcrumbsExact";

function InfoCard({ title, children, contentClassName = "text-sm text-neutral-600 leading-tight text-center" }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

export default function ProductPage() {
  const { product } = useParams(); // bu, URL'deki product SLUG'ı (yerelleştirilmiş)
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");

const opt = (key, fallback = "") => {
  try {
    const v = t(key);
    return v && v !== key ? v : fallback; // key aynen dönerse bulunamamıştır
  } catch {
    return fallback;
  }
};
const optRaw = (key, fallback = null) => {
  try {
    const v = t.raw(key);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
  const messages = useMessages();

  // ---- Slug -> key
  const productKey = productKeyFromSlug(locale, String(product));

  // ---- Base segment (ör. /en/wholesale-travertine-from-turkey)
  const baseSegment = baseFor(locale);
  const prefix = `/${locale}`;
  const baseHref = `/${locale}/${baseSegment}`; // yeni base; artık "travertines/travertenler" değil

  // ---- Ürün ana başlıkları
const title  = t(`${productKey}.title`);
  const alt    = opt(`${productKey}.alt`, "");
  const intro  = opt(`${productKey}.intro`, "");
  const title2 = opt(`${productKey}.title2`, "");
  const alt2   = opt(`${productKey}.alt2`, "");
  const intro2 = opt(`${productKey}.intro2`, "");

 const cardTitle1 = opt(`${productKey}.detailsHeadings.title1`, "");
 const cardTitle2 = opt(`${productKey}.detailsHeadings.title2`, "");
 const cardTitle3 = opt(`${productKey}.detailsHeadings.title3`, "");
 const cardTitle4 = opt(`${productKey}.detailsHeadings.title4`, "");
 const description = optRaw(`${productKey}.description`, intro) || intro;

  // ---- FAQ
  const qItems = messages?.ProductPage?.[productKey]?.QuestionsItems || {};
  const items = [];
  let j = 1;
  while (qItems[`aboutpage_s4_faq${j}_header`] && qItems[`aboutpage_s4_faq${j}_text`]) {
    items.push({
      q: qItems[`aboutpage_s4_faq${j}_header`],
      a: qItems[`aboutpage_s4_faq${j}_text`],
    });
    j++;
  }

  // ---- Cut heading/text (i18n)
  const cutsHeading = opt(`${productKey}.cuts.heading`, opt("cuts.heading", "Select Your Cut Type"));
  const cutsText    = opt(`${productKey}.cuts.text`,    opt("cuts.text",    "Choose between vein-cut and cross-cut."));

  // ---- Hero image
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc = typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap;

  // ---- Hangi ürün derinleşir?
 const showCutSelection = hasDeepLevels(productKey) && productKey !== "blocks";

  // ---- CUT kartları (yalnız slabs/tiles)
  const productSlug = productSlugFor(locale, productKey);


  const isBlocks = productKey === "blocks";
let colorCards = [];
if (isBlocks) {
  const colors = colorKeys(); // örn: ["ivory","light","antico"]
  colorCards = colors.map((ckey) => {
    const slug  = colorSlugFor(locale, ckey);             // "ivory" → "ivory" | "fildisi"
    const label = colorLabelFor(locale, ckey);  
     // Kısa SEO URL: /{locale}/{color}-travertine-blocks  (TR: /{locale}/{color}-traverten-bloklar)
   const pretty =
     locale.startsWith("tr")
       ? `/${locale}/${slug}-traverten-bloklar`
       : `/${locale}/${slug}-travertine-blocks`;          // “Ivory” | “Fildişi”

    return {
      slug,
      vKey: ckey,
      title: label,
      // Yeni rota: /travertine/[product]/[color]
      // Yeni: kısa SEO link (string). Middleware bunu FS rotasına REWRITE edecek.
     href: pretty,
    };
  });
}

    // Ürüne göre cut slug'ını düzelt (slabs→tiles/blocks/special-designs)
   function cutSlugForProduct(locale, cutKey, productKey) {
    const lang = getLang(locale);
    const base = (CUTS[lang] || {})[cutKey] || cutKey; // örn: 'vein-cut-travertine-slabs'
    if (!base || typeof base !== "string") return cutKey;
    // EN dönüşümleri
    if (locale.startsWith("en")) {
      if (productKey === "slabs")             return base.replace(/-travertine-slabs$/i, "-travertine-slabs");
     if (productKey === "tiles")             return base.replace(/-travertine-slabs$/i, "-travertine-tiles");
      if (productKey === "blocks")            return base.replace(/-travertine-slabs$/i, "-travertine-blocks");
      if (productKey === "special" || productKey === "special-designs")
                                              return base.replace(/-travertine-slabs$/i, "-travertine-special");
    }
    // TR dönüşümleri
    if (productKey === "slabs")             return base.replace(/-traverten-plakalar$/i, "-traverten-plakalar");
     if (productKey === "tiles")             return base.replace(/-traverten-plakalar$/i, "-traverten-karolar");
    if (productKey === "blocks")            return base.replace(/-traverten-plakalar$/i, "-traverten-bloklar");
    if (productKey === "special" || productKey === "special-designs")
                                              return base.replace(/-traverten-plakalar$/i, "-traverten-ozel-tasarim");
  }

  const cutCards = showCutSelection
    ? Object.keys(CUTS[lang] || {}).map((cutKey) => {
        const localizedCutSlug = cutSlugForProduct(locale, cutKey, productKey);
        return {
          slug: cutKey,
          title: opt(`${productKey}.cuts.${cutKey}.title`, cutKey),
          description: opt(`${productKey}.cuts.${cutKey}.description`, ""),
          href: {
           pathname: "/travertine/[product]/[cut]",
           params: { product: productSlug, cut: localizedCutSlug }
         },
          image: `/images/cuts/${cutKey}.jpg`,
        };
      })
    : [];

  // ---- Info cards içeriği
  const cards = [
    {
      title: cardTitle1,
      content: Array.isArray(description) ? description[0] : description || intro,
    },
    {
      title: cardTitle2,
      content: Array.isArray(description) ? description[1] ?? intro : intro,
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

  // ---- Inline link patternleri (metin içi “vein/cross” tıklanabilir)
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

  const heroAlt = `Wholesale Travertine ${productKey} from Turkey`;
  const cardTextClass = "text-[14px] leading-[120%] text-neutral-700 text-center";

  // ---- Breadcrumb
  const rawPath = usePathname();
  const pathname = typeof rawPath === "string" ? rawPath : "";
  const segments = pathname.split("/").filter(Boolean);
  const selectedSegments = segments.slice(-1);

  // ---- Diğer seçenekler (çoğul anahtarlar!)
  const productAltMap = {
    blocks: "Blocks",
    slabs: "Slabs",
    tiles: "Tiles",
    "special-designs": "Custom Designs",
  };

  return (
    <main className="py-6 mt-16 overflow-x-hidden">
      {/* ÜST INTRO */}
      <ProductIntroSection
        title={title}
        intro={intro}
        title2={title2}
        intro2={intro2}
        heroSrc={heroSrc}
        alt={heroAlt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        span="- Direct Quarry Supplier"
      />

      <BreadcrumbsExact
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        selectedSegments={selectedSegments}
        className="mt-6"
      />

      {/* 4 BİLGİ KARTI */}
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

      {/* SLABS / TILES → Kesim seçimi */}
 {showCutSelection ? (
   <VariantCircleSection2
     heading={cutsHeading}
     text={cutsText}
     variantCards={cutCards}
     imgMap={imgMap}
     heroSrc={heroSrc}
     IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
     productKey={productKey}
   />
 ) : isBlocks ? (
   <VariantCircleSection2
     heading={locale.startsWith("tr") ? "Traverten Blok Renkler" : "Travertines Blocks Colors"}
     text={locale.startsWith("tr")
       ? "Bloklarda doğrudan renk seçebilirsiniz."
       : "We supply three exclusive varieties of Wholesale Travertine Blocks: Blaundos Antiko (grey-beige antique tones), Blaundos Light (light beige), and Blaundos Ivory (ivory-cream). These blocks are primarily delivered with natural quarry surfaces, ready for slab cutting or custom processing. Each variety provides distinct tones for luxury façades, interiors, or large-scale commercial projects. With flexible finishes available upon request, Majen ensures adaptability for diverse architectural needs."}
     variantCards={colorCards}
     imgMap={IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey] || imgMap}
     heroSrc={heroSrc}
     IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
     productKey={productKey}
   />
 ) : null}

      {/* Blocks / Special-Designs → burada artık renk varyantı YOK. 
          İstersen bu blok yerine direkt teknik bölümleri, CTA, görseller vs. göster. */}

      {/* Serbest metin bölümleri */}
      {(() => {
        const textSectionRaw = optRaw(`${productKey}.TextSection`, {}) || {};
        const sections = [];
        let i = 1;
        while (
          textSectionRaw[`header${i}`] ||
          textSectionRaw[`text${i}`] ||
          textSectionRaw[`subheader${i}`] ||
          textSectionRaw[`subtext${i}`]
        ) {
          const header = textSectionRaw[`header${i}`];
          const text = textSectionRaw[`text${i}`];
          const titleForSection = header || `${title} — Section ${i}`;
          const paragraphsForSection = [text].filter(Boolean);

          if (titleForSection || paragraphsForSection.length) {
            sections.push({ id: i, title: titleForSection, paragraphs: paragraphsForSection });
          }
          i++;
        }
        return sections.map(({ id, title: secTitle, paragraphs }) => (
          <TextSection
            key={id}
            title={secTitle}
            paragraphs={paragraphs}
            schema={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: `Wholesale Travertine ${productAltMap[productKey]} from Turkey`,
              author: { "@type": "Organization", name: "Majen" },
              publisher: { "@type": "Organization", name: "Majen" },
            }}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"
            title2=""
            text2=""
          />
        ));
      })()}

      <SocialMediaSection />
      <ContactFrom />
      <div id="faq" className="max-w-5xl mx-auto mt-12">
        <QuestionsSection items={items} span={`Travertine ${productAltMap[productKey]}`} />
      </div>

      <OtherOptions
        heading={locale === "tr" ? "Diğer Seçenekler" : "Other Options"}
        excludeProduct={productKey}
        productOrder={["blocks", "slabs", "tiles", "special-designs"]}
        baseHref={`${prefix}/${baseSegment}`}
        productSegments={{
          blocks: productSlugFor(locale, "blocks"),
          slabs: productSlugFor(locale, "slabs"),
          tiles: productSlugFor(locale, "tiles"),
          "special-designs": productSlugFor(locale, "special-designs"),
        }}
        locale={locale}
        productImages={{ blocks: block, slabs, tiles, "special-designs": special }}
        productHrefFor={(pkey) => productUrl(locale, pkey)}
      />
    </main>
  );
}
