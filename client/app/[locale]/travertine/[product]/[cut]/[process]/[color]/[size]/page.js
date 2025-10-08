// app/[locale]/travertine/[product]/[variant]/[cut]/[process]/[finish]/[size]/page.js
// (TR için: app/[locale]/traverten/...)

"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import {
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
  VARIANT_KEY_BY_SLUG,
  baseFor,
} from "@/lib/travertine";

import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection"; // ⇐ Banner
import TextSection from "@/app/[locale]/components/products1/TextSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

const sizeLabelFromSlug = (slug) =>
  slug === "custom"
    ? "Custom / Project-based"
    : slug.replace(/x/g, "×").replace(/([0-9])cm$/, "$1 cm");

export default function SizePage() {
       const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  const { product: rawProduct, variant: vSlug, cut, process, finish, size } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");

  const prefix = `/${locale}`;
  const baseSegment = baseFor(locale);
  const baseHref = `${prefix}/${baseSegment}`; // ProductIntroSection için

  // productKey çözümle
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === rawProduct) || "slabs";

  // varyant key
  const vKey = VARIANT_KEY_BY_SLUG[vSlug];
  if (!vKey) return null;

  const title   = t(`${productKey}.title`, { default: "Product" });
  const intro   = t(`${productKey}.intro`, { default: "" });
  const vTitle  = t(`${productKey}.variants.${vKey}.title`, { default: vSlug });
  const vAlt    = t(`${productKey}.variants.${vKey}.alt`, { default: vTitle });

  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    typeof imgMap === "object"
      ? imgMap?.[vKey] ?? imgMap?.cover ?? Object.values(imgMap)[0]
      : imgMap;

  const backToFinish = `/${locale}/${baseSegment}/${rawProduct}/${vSlug}/${cut}/${process}/${finish}`;
  const contactPath = `/${locale}/${baseSegment === "traverten" ? "iletisim" : "contact"}`;

  // breadcrumb (detaylı bar için)
  const breadcrumb = [
    { name: locale.startsWith("tr") ? "Ana Sayfa" : "Home", href: `/${locale}` },
    { name: title, href: `/${locale}/${baseSegment}/${rawProduct}` },
    { name: vTitle, href: `/${locale}/${baseSegment}/${rawProduct}/${vSlug}` },
    { name: cut, href: `/${locale}/${baseSegment}/${rawProduct}/${vSlug}/${cut}` },
    { name: process, href: `/${locale}/${baseSegment}/${rawProduct}/${vSlug}/${cut}/${process}` },
    { name: finish, href: backToFinish },
    { name: sizeLabelFromSlug(size), href: `${backToFinish}/${size}` },
  ];

  // structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@id": `${SITE_URL}${b.href}`, name: b.name },
        })),
      },
      {
        "@type": "Product",
        name: `${vTitle} – ${title}`,
        category: title,
        image: [`${SITE_URL}${heroSrc?.src || ""}`],
        description: intro,
        brand: { "@type": "Brand", name: "Majen" },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Cut", value: cut },
          { "@type": "PropertyValue", name: "Process", value: process },
          { "@type": "PropertyValue", name: "Finish", value: finish },
          { "@type": "PropertyValue", name: "Size", value: sizeLabelFromSlug(size) },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-neutral-50 mt-10 lg:mt-28 xl:mt-36">
      {/* ======= BANNER: ProductIntroSection ======= */}
      <ProductIntroSection
        title={`${vTitle} – ${title}`}
        intro={intro}
        heroSrc={heroSrc}
        alt={vAlt}
        prefix={prefix}
        baseHref={baseHref}
         depth={6}
        // istersen breadcrumb etiketlerini override edebilirsin:
        // crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        // crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
      />

      {/* ======= Detaylı Breadcrumb Bar (tam yol) ======= */}
      {/* <div className="px-6 mt-10 lg:mt-16">
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto -mt-6 md:-mt-8">
          <div className="rounded-xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm ring-1 ring-black/5 px-3 py-2 md:px-4 md:py-2">
            <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-neutral-700">
              {breadcrumb.map((b, idx) => {
                const isLast = idx === breadcrumb.length - 1;
                return (
                  <li key={b.href} className="flex items-center">
                    {idx === 0 && (
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="mr-1 h-4 w-4 text-neutral-500">
                        <path d="M10 3.2 3 8.3v8.5h5.2v-4.2h3.6v4.2H17V8.3L10 3.2z" fill="currentColor" />
                      </svg>
                    )}
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 font-medium"
                      >
                        {b.name}
                      </span>
                    ) : (
                      <Link
                        href={b.href}
                        className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition"
                      >
                        {b.name}
                      </Link>
                    )}
                    {!isLast && (
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="mx-2 h-4 w-4 text-neutral-400">
                        <path d="M7.5 3.5 13 10l-5.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
      </div> */}

      {/* ======= İçerik ======= */}
      <section className="max-w-6xl mx-auto px-6 pt-6 md:pt-8 pb-10 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Sol: görsel */}
          <div className="relative w-full h-64 sm:h-80 md:h-[520px] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <Image
              src={heroSrc}
              alt={vAlt}
              fill
              placeholder="blur"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Sağ: metin + chipler + CTA */}
          <div className="flex flex-col">
            <p className="text-[17px] md:text-[19px] leading-relaxed text-neutral-800">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-2 text-sm text-neutral-700">
              <span className="px-3 py-1 rounded-full bg-neutral-900/5">Cut: {cut}</span>
              <span className="px-3 py-1 rounded-full bg-neutral-900/5">Process: {process}</span>
              <span className="px-3 py-1 rounded-full bg-neutral-900/5">Finish: {finish}</span>
              <span className="px-3 py-1 rounded-full bg-neutral-900/5">Size: {sizeLabelFromSlug(size)}</span>
            </div>
            <div className="mt-8 flex gap-3">
              <Link href={backToFinish} className="px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:border-black transition">
                ← {locale.startsWith("tr") ? "Bir önceki adım" : "Previous step"}
              </Link>
              <Link href={contactPath} className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 transition">
                {locale.startsWith("tr") ? "Teklif Al" : "Get a Quote"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TextSection title="Wholesale Travertine Special Designs From Turkey"  paragraphs={[
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
            ]}
            schema={schema}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"/>

      <TextSection title="Wholesale Travertine Special Designs From Turkey"  paragraphs={[
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
            ]}
            schema={schema}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"/>

     <TextSection title="Wholesale Travertine Special Designs From Turkey"  paragraphs={[
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
            ]}
            schema={schema}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"/>

            <ContactFrom/>
    </main>
  );
}
