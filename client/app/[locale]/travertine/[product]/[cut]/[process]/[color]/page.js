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
import {
  IMAGE_BY_PRODUCT,
  IMAGE_BY_PRODUCT_AND_VARIANT as IMAGE_BY_PRODUCT_AND_COLOR,
  PROCESS_THUMB_BY_COMBINED
} from "@/app/[locale]/(catalog)/_images";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";

export default function ColorDetailPage() {
  const { product: productSlug, cut: cutSlug, process: processSlug, color: colorSlug } = useParams();
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");
  const productKey = productKeyFromSlug(locale, String(productSlug));
  const cutKey = Object.keys(CUTS[lang] || {}).find((k) => CUTS[lang][k] === cutSlug) || "vein-cut";
  const procKeyFull = String(processSlug || "").toLowerCase();
  const colorKey = (COLOR_KEY_BY_SLUG && COLOR_KEY_BY_SLUG[colorSlug]) || String(colorSlug || "").toLowerCase();
  const sizeSlugs = sizeSlugListForProduct(productKey, t);
  const [selected, setSelected] = React.useState(sizeSlugs[0]);

  if (!productKey || !colorKey || !procKeyFull) {
    return <main className="p-10 text-center text-neutral-500">Loading...</main>;
  }

  let page = t.raw(`${productKey}.cuts.${cutKey}.processes.${procKeyFull}.colors.${colorKey}`) || null;

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

  const chooseThicknessLabel = page?.ui?.chooseThickness || (locale.startsWith("tr") ? "Kalınlık Seç" : "Choose Thickness");
  const applicationsLabel = page?.ui?.applicationsLabel || (locale.startsWith("tr") ? "Uygulamalar" : "Applications");
  const specsLabel = page?.ui?.specsLabel || (locale.startsWith("tr") ? "Teknik Özellikler" : "Specifications");
  const faqLabel = page?.ui?.faqLabel || (locale.startsWith("tr") ? "SSS" : "FAQ");
  const colorLabel = colorLabelFor(locale, colorKey);
  const processLabel = t.raw(`${productKey}.cuts.${cutKey}.processes.${procKeyFull}.title`) || procKeyFull.replace(/-/g, " ");
  const H1 = page?.h1 || `${colorLabel} · ${processLabel}`;
  const lead = page?.lead || "";
  const intro = page?.intro || "";
  const metaTitle = page?.metaTitle || H1;
  const metaDesc = page?.metaDesc || intro;
// process → combinedKey
const combinedKey = combinedKeyFromProc(procKeyFull, locale);

// 1) _images: product → colorThumbs → cut → combinedKey → colorKey
const fromColorByProcess =
  IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[combinedKey]?.[colorKey];

// 2) ürün-variant genel renk görselleri (slug ya da key)
const fromVariant =
  IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorSlug]
  || IMAGE_BY_PRODUCT_AND_COLOR?.[productKey]?.[colorKey];

// 3) process thumb (global)
const fromProcessThumb = PROCESS_THUMB_BY_COMBINED?.[combinedKey];

// 4) en son genel cover
const heroSrc =
  fromColorByProcess
  || fromVariant
  || fromProcessThumb
  || IMAGE_BY_PRODUCT?.[productKey]?.[cutKey]   // cut cover varsa
  || IMAGE_BY_PRODUCT?.[productKey]?.cover
  || "/images/homepage/antikoarkplan.webp";

  const baseSegment = baseFor(locale);
  const canonical = `https://www.majen.com.tr/${locale}/${colorSlug}-${processSlug}-${cutSlug}`;
  const sections = page?.sections || {};
  const apps = sections.applications;
  const specs = sections.specs;
  const faqItems = Array.isArray(sections?.faq?.items) ? sections.faq.items.filter((it) => it && typeof it.q === "string" && typeof it.a === "string") : [];

  function combinedKeyFromProc(proc = "", locale = "en") {
  const s = String(proc).toLowerCase().trim();
  if (!s) return null;
  if (s === "natural" || s === "dogal") return "natural";

  const fillMap = { dolgulu: "filled", dolgusuz: "unfilled", filled: "filled", unfilled: "unfilled" };
  const procMap = {
    honlanmis: "honed", cilali: "polished", fircalanmis: "brushed", eskitilmis: "tumbled",
    honed: "honed", polished: "polished", brushed: "brushed", tumbled: "tumbled"
  };

  const [fillRaw, procRaw] = s.split("-");
  const fill = fillMap[fillRaw] || fillRaw;
  const p    = procMap[procRaw] || procRaw;
  return `${fill}:${p}`; // örn: "filled:polished"
}

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

      <header className="mx-auto max-w-[1200px] grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative h-56 md:h-80 w-full overflow-hidden rounded-2xl">
          <Image src={heroSrc} alt={H1} fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold">{H1}</h1>
          {lead && <p className="mt-2 text-neutral-700">{lead}</p>}
          {intro && <p className="mt-2 text-neutral-700">{intro}</p>}
          <div className="mt-4">
            <h3 className="text-sm font-semibold">{chooseThicknessLabel}</h3>
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

      {apps && (
        <section className="mx-auto max-w-[1100px] mt-10">
          <h2 className="text-xl md:text-2xl font-semibold">
            {apps.h2 || t("ui.applications", { default: "Applications" })}
          </h2>
          {apps.p && <p className="mt-2 text-neutral-700">{apps.p}</p>}
        </section>
      )}

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

      {faqItems.length > 0 && (
        <div id="faq" className="mx-auto max-w-[1100px] mt-10">
          <QuestionsSection items={faqItems} span={`${colorLabel} · ${processLabel}`} />
        </div>
      )}

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