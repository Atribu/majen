"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  baseFor,
  productKeyFromSlug,
  COLOR_KEY_BY_SLUG,
  colorLabelFor,
  sizeSlugListForProduct,
  sizeLabelFromSlug,
  CUTS,
  getLang
} from "@/lib/travertine";

import { IMAGE_BY_PRODUCT_AND_VARIANT as IMAGE_BY_PRODUCT_AND_COLOR } from "@/app/[locale]/(catalog)/_images";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";


export default function ColorDetailPage() {
  const { product: productSlug, cut: cutSlug, process: processSlug, color: colorSlug } = useParams();
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");

  // productKey: "slabs" | "tiles" | ...
  const productKey = productKeyFromSlug(locale, String(productSlug));

  // cutSlug (tam SEO) -> cutKey ("vein-cut" | "cross-cut")
  const cutKey =
    Object.keys(CUTS[lang] || {}).find((k) => CUTS[lang][k] === cutSlug) || "vein-cut";

  // process: TAM slug ile çalış (ör. "filled-polished" / "natural")
  const procKeyFull = String(processSlug || "").toLowerCase();

  // color key (ivory|light|antico) – güvenli
  const colorKey = (COLOR_KEY_BY_SLUG && COLOR_KEY_BY_SLUG[colorSlug]) || String(colorSlug || "").toLowerCase();

  if (!productKey || !colorKey || !procKeyFull) return null;

  // JSON: product > cuts > [cutKey] > processes > [procKeyFull] > colors > [colorKey]
  let page = t.raw(`${productKey}.cuts.${cutKey}.processes.${procKeyFull}.colors.${colorKey}`) || null;

  // Eğer TR JSON'unda EN anahtarlar kullanılıyorsa basit TR->EN map ile bir daha dene (opsiyonel).
  if (!page && locale === "tr") {
    const TR2EN = {
      "dogal": "natural",
      "dolgulu-honlanmis": "filled-honed",
      "dolgulu-cilali": "filled-polished",
      "dolgulu-fircalanmis": "filled-brushed",
      "dolgulu-eskitilmis": "filled-tumbled",
      "dolgusuz-honlanmis": "unfilled-honed",
      "dolgusuz-cilali": "unfilled-polished",
      "dolgusuz-fircalanmis": "unfilled-brushed",
      "dolgusuz-eskitilmis": "unfilled-tumbled"
    };
    const tryEnKey = TR2EN[procKeyFull];
    if (tryEnKey) {
      page = t.raw(`${productKey}.cuts.${cutKey}.processes.${tryEnKey}.colors.${colorKey}`) || null;
    }
  }

   const chooseThicknessLabel =
    page?.ui?.chooseThickness ||
    (locale.startsWith("tr") ? "Kalınlık Seç" : "Choose Thickness");

  const applicationsLabel =
    page?.ui?.applicationsLabel ||
    (locale.startsWith("tr") ? "Uygulamalar" : "Applications");

  const specsLabel =
    page?.ui?.specsLabel ||
    (locale.startsWith("tr") ? "Teknik Özellikler" : "Specifications");

  const faqLabel =
    page?.ui?.faqLabel ||
    (locale.startsWith("tr") ? "SSS" : "FAQ");



  // Fallback başlık/metinler
  const colorLabel = colorLabelFor(locale, colorKey);
  const processLabel =
    t.raw(`${productKey}.cuts.${cutKey}.processes.${procKeyFull}.title`) ||
    procKeyFull.replace(/-/g, " ");
  const H1 = page?.h1 || `${colorLabel} · ${processLabel}`;
  const lead = page?.lead || "";
  const intro = page?.intro || "";

  // Meta
  const metaTitle = page?.metaTitle || H1;
  const metaDesc = page?.metaDesc || intro;

  // Hero görsel (ürün+renk)
  const heroSrc =
    IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorSlug] ||
    IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.cover ||
    "/images/homepage/antikoarkplan.webp";

  const baseSegment = baseFor(locale);

  // Canonical (renk-önce kısa URL ile)
  const canonical = `https://www.majen.com.tr/${locale}/${colorSlug}-${processSlug}-${cutSlug}`;

  // Sections
  const sections = page?.sections || {};
  const apps  = sections.applications;
  const specs = sections.specs;
  const faq   = sections.faq;

  const faqItems = Array.isArray(sections?.faq?.items)
  ? sections.faq.items
      .filter((it) => it && typeof it.q === "string" && typeof it.a === "string")
  : [];

  // Size/Thickness içi
  const sizeSlugs = sizeSlugListForProduct(productKey, t);
  const [selected, setSelected] = React.useState(sizeSlugs[0]);

  return (
    <main className="px-5 md:px-8 lg:px-0 py-10 mt-14">
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

      {/* Hero + Başlık */}
      <header className="mx-auto max-w-[1200px] grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative h-56 md:h-80 w-full overflow-hidden rounded-2xl">
          <Image src={heroSrc} alt={H1} fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold">{H1}</h1>
          {lead && <p className="mt-2 text-neutral-700">{lead}</p>}
          {intro && <p className="mt-2 text-neutral-700">{intro}</p>}

          {/* Kalınlık/Ebat seçimi (URL değişmez) */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold">
              {chooseThicknessLabel}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizeSlugs.map((s) => {
                const active = selected === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSelected(s)}
                    className={[
                      "px-4 py-2 rounded-full border text-sm transition",
                      active
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800"
                    ].join(" ")}
                    aria-pressed={active}
                  >
                    {sizeLabelFromSlug(s)}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              {selected ? `Selected: ${sizeLabelFromSlug(selected)}` : null}
            </p>
          </div>
        </div>
      </header>

      {/* Applications */}
      {apps && (
        <section className="mx-auto max-w-[1100px] mt-10">
          <h2 className="text-xl md:text-2xl font-semibold">
            {apps.h2 || t("ui.applications", { default: "Applications" })}
          </h2>
          {apps.p && <p className="mt-2 text-neutral-700">{apps.p}</p>}
        </section>
      )}

      {/* Specs */}
      {specs && Array.isArray(specs.rows) && specs.rows.length > 0 && (
        <section className="mx-auto max-w-[1100px] mt-10 overflow-auto">
          <h2 className="text-xl md:text-2xl font-semibold">
            {specs.h2 || t("ui.specs", { default: "Specifications" })}
          </h2>
          <table className="mt-3 min-w-[520px] w-full text-sm border rounded-2xl overflow-hidden">
            <tbody>
              {specs.rows.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-medium">{r.prop}</td>
                  <td className="p-3">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* FAQ */}
     {faqItems.length > 0 && (
  <div id="faq" className="mx-auto max-w-[1100px] mt-10">
    <QuestionsSection
      items={faqItems}
      span={`${colorLabel} · ${processLabel}`}
    />
  </div>
)}

      {/* CTA */}
      {/* <section className="mx-auto max-w-[1100px] mt-10">
        <Link
          href={{
            pathname: `/${locale}/contactus`,
            query: { product: productKey, cut: cutSlug, process: processSlug, color: colorSlug, thickness: selected }
          }}
          className="inline-block rounded-full bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          {locale.startsWith("tr") ? "Teklif İste" : "Get a Quote"}
        </Link>
      </section> */}

      <TextSection
        title={locale.startsWith("tr") ? "Türkiye'den Toptan Traverten" : "Wholesale Travertine from Turkey"}
        paragraphs={[metaDesc || intro]}
        className="max-w-5xl mx-auto mt-12"
        clampMobile={3}
        as="section"
      />

      <ContactFrom />
    </main>
  );
}
