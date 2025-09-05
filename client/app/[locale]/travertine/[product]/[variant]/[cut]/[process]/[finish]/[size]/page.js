// app/[locale]/travertine/[product]/[variant]/[cut]/[process]/[finish]/[size]/page.js
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import blockImg from "@/public/images/traverterBlock.jpeg";
import slabsImg from "@/public/images/traverterSlabs.jpeg";
import tilesImg from "@/public/images/traverterFayans.jpeg";
import specialImg from "@/public/images/traverterDeskt.webp";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const HERO_IMAGES = { block: blockImg, slabs: slabsImg, tiles: tilesImg, special: specialImg };
const PRODUCT_ALIASES = {
  block: "block", blok: "block",
  slabs: "slabs", plakalar: "slabs",
  tiles: "tiles", karolar: "tiles",
  special: "special", "special-designs": "special", "ozel-tasarimlar": "special",
};
const VARIANT_MAP = {
  "blaundos-antiko": "variant1",
  "blaundos-light": "variant2",
  "blaundos-ivory": "variant3",
};

const CUTS = ["vein-cut", "cross-cut"];
const PROCESSES = ["natural", "filling", "epoxy", "transparent", "antique"];
const FINISHES = ["polished", "unpolished"];

const baseFor = (locale) => (locale?.startsWith("tr") ? "traverten" : "travertine");
const sizeLabelFromSlug = (slug) =>
  slug === "custom" ? "Custom / Project-based" : slug.replace(/x/g, "×").replace(/([0-9])cm$/, "$1 cm");

// -------- SEO: dinamik metadata --------
export async function generateMetadata({ params }) {
  const {
    locale, product: rawProduct, variant: rawVariant,
    cut, process, finish, size
  } = await params;

  const product = PRODUCT_ALIASES[rawProduct?.toLowerCase()];
  const variantId = VARIANT_MAP[rawVariant?.toLowerCase()];
  if (!product || product === "block" || !variantId) return {};

  const t = await getTranslations({ locale, namespace: "ProductPage" });
  const productTitle = t(`${product}.title`, { default: "Product" });
  const vTitle = t(`${product}.variants.${variantId}.title`, { default: rawVariant });
  const intro = t(`${product}.intro`, { default: "" });

  const base = baseFor(locale);
  const pathname = `/${locale}/${base}/${rawProduct}/${rawVariant}/${cut}/${process}/${finish}/${size}`;
  const url = `${SITE_URL}${pathname}`;

  const pageTitle = `${vTitle} – ${productTitle} | ${cut}, ${process}, ${finish}, ${sizeLabelFromSlug(size)}`;
  const description = (intro || `${vTitle} ${productTitle}`).slice(0, 160);

  const ogImg = HERO_IMAGES[product]?.src
    ? `${SITE_URL}${HERO_IMAGES[product].src}`
    : `${SITE_URL}/images/og-fallback.jpg`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        tr: url.replace(`/${locale}/`, `/tr/`),
        en: url.replace(`/${locale}/`, `/en/`),
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      type: "website",
      images: [{ url: ogImg }],
      locale,
    },
    twitter: { card: "summary_large_image", title: pageTitle, description, images: [ogImg] },
    robots: { index: true, follow: true },
  };
}

// -------- Sayfa --------
export default async function Page({ params }) {
  const {
    locale, product: rawProduct, variant: rawVariant,
    cut, process, finish, size
  } = await params;

  const product = PRODUCT_ALIASES[rawProduct?.toLowerCase()];
  if (!product || product === "block") notFound();

  const variantId = VARIANT_MAP[rawVariant?.toLowerCase()];
  if (!variantId) notFound();

  if (!CUTS.includes((cut || "").toLowerCase())) notFound();
  if (!PROCESSES.includes((process || "").toLowerCase())) notFound();
  if (!FINISHES.includes((finish || "").toLowerCase())) notFound();
  if (!size) notFound();

  const t = await getTranslations({ locale, namespace: "ProductPage" });
  const title = t(`${product}.title`, { default: "Product" });
  const vTitle = t(`${product}.variants.${variantId}.title`, { default: rawVariant });
  const vAlt = t(`${product}.variants.${variantId}.alt`, { default: vTitle });
  const intro = t(`${product}.intro`, { default: "" });

  const heroImg = HERO_IMAGES[product];
  const base = baseFor(locale);

  const backToFinish = `/${locale}/${base}/${rawProduct}/${rawVariant}/${cut}/${process}/${finish}`;
  const contactPath = `/${locale}/${base === "traverten" ? "iletisim" : "contact"}`;

  // Breadcrumb (full width bar için)
  const breadcrumb = [
    { name: locale?.startsWith("tr") ? "Ana Sayfa" : "Home", href: `/${locale}` },
    { name: title, href: `/${locale}/${base}/${rawProduct}` },
    { name: vTitle, href: `/${locale}/${base}/${rawProduct}/${rawVariant}` },
    { name: cut, href: `/${locale}/${base}/${rawProduct}/${rawVariant}/${cut}` },
    { name: process, href: `/${locale}/${base}/${rawProduct}/${rawVariant}/${cut}/${process}` },
    { name: finish, href: backToFinish },
    { name: sizeLabelFromSlug(size), href: `/${locale}/${base}/${rawProduct}/${rawVariant}/${cut}/${process}/${finish}/${size}` },
  ];

  // H1 metni breadcrumb’dan
  const h1Text = breadcrumb.slice(1).map(b => b.name).join(" / ");

  // JSON-LD: Product + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@id": `${SITE_URL}${b.href}`, name: b.name }
        }))
      },
      {
        "@type": "Product",
        name: `${vTitle} – ${title}`,
        category: title,
        image: [`${SITE_URL}${heroImg?.src || ""}`],
        description: intro,
        brand: { "@type": "Brand", name: "Majen" },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Cut", value: cut },
          { "@type": "PropertyValue", name: "Process", value: process },
          { "@type": "PropertyValue", name: "Finish", value: finish },
          { "@type": "PropertyValue", name: "Size", value: sizeLabelFromSlug(size) },
        ],
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/${locale}/${base}/${rawProduct}/${rawVariant}/${cut}/${process}/${finish}/${size}`,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO: görünür H1 (breadcrumb’dan) */}
      <section className="relative flex items-center justify-center h-[18vh] sm:h-[22vh] lg:h-[26vh] bg-gradient-to-br from-[#0C1A13] via-[#11271d] to-[#1d3a2c] px-4">
        <h1 className="text-white text-base sm:text-2xl md:text-3xl font-semibold text-center drop-shadow max-w-6xl px-4 tracking-tight">
          {h1Text}
        </h1>
      </section>

      {/* FULL-WIDTH BREADCRUMB BAR: yazı & resmin üstünde */}
      <div className="px-6 mt-12">
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto -mt-6 md:-mt-8">
          <div className="rounded-xl border border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm ring-1 ring-black/5 px-3 py-2 md:px-4 md:py-2">
            <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-neutral-700">
              {breadcrumb.map((b, idx) => {
                const isLast = idx === breadcrumb.length - 1;
                return (
                  <li key={b.href} className="flex items-center">
                    {/* ikon: Home için basit bir ev simgesi */}
                    {idx === 0 && (
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="mr-1 h-4 w-4 text-neutral-500">
                        <path d="M10 3.2 3 8.3v8.5h5.2v-4.2h3.6v4.2H17V8.3L10 3.2z" fill="currentColor"/>
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
                        className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                      >
                        {b.name}
                      </Link>
                    )}
                    {!isLast && (
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="mx-2 h-4 w-4 text-neutral-400">
                        <path d="M7.5 3.5 13 10l-5.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
      </div>

      {/* İçerik: iki sütun (sol görsel, sağ metin/cta) */}
      <section className="max-w-6xl mx-auto px-6 pt-6 md:pt-8 pb-10 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* SOL: Görsel */}
          <div className="relative w-full h-64 sm:h-80 md:h-[520px] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <Image
              src={heroImg}
              alt={vAlt}
              fill
              placeholder="blur"
              className="object-cover object-center"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>

          {/* SAĞ: metin + chip’ler + CTA’lar */}
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
                ← {locale?.startsWith("tr") ? "Bir önceki adım" : "Previous step"}
              </Link>
              <Link href={contactPath} className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 transition">
                {locale?.startsWith("tr") ? "Teklif Al" : "Get a Quote"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
