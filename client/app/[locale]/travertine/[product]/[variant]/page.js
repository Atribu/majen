// app/[locale]/travertine/[product]/[variant]/page.js
// (Aynısı TR için: app/[locale]/traverten/[product]/[variant]/page.js)

import Image from "next/image";
import Link from "next/link";                     // ✅ eklendi
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import blockImg from "@/public/images/traverterBlock.jpeg";
import slabsImg from "@/public/images/traverterSlabs.jpeg";
import tilesImg from "@/public/images/traverterFayans.jpeg";
import specialImg from "@/public/images/traverterDeskt.webp";

// ✅ CUT linkleri ve base için yardımcılar
import { CUTS, buildVariantChildPath, baseFor } from "@/lib/travertine";

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

export default async function Page({ params }) {
  const { locale, product: rawProduct, variant: variantSlug } = await params;

  // product normalizasyonu
  const product = PRODUCT_ALIASES[rawProduct?.toLowerCase()];
  if (!product) notFound();

  const variantId = VARIANT_MAP[variantSlug?.toLowerCase()];
  if (!variantId) notFound();

  const t = await getTranslations({ locale, namespace: "ProductPage" });

  const title = t(`${product}.title`, { default: "Product" });
  const variantTitle = t(`${product}.variants.${variantId}.title`, { default: variantSlug });
  const variantAlt = t(`${product}.variants.${variantId}.alt`, { default: variantTitle });
  const intro = t(`${product}.intro`, { default: "" });

  const heroImg = HERO_IMAGES[product];

  // ✅ link üretimi için mevcut slug'ları kullanıyoruz
  const base = baseFor(locale);
  const productSlug = rawProduct;

  const showCuts = product !== "block"; // "Block" hariç

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO */}
      <section className="relative flex items-center justify-center h-[18vh] sm:h-[22vh] lg:h-[26vh] bg-gradient-to-br from-[#0C1A13] via-[#11271d] to-[#1d3a2c] px-4">
        <h1 className="text-white text-2xl md:text-4xl font-semibold text-center drop-shadow max-w-2xl tracking-tight">
          {variantTitle} – {title}
        </h1>
      </section>

      {/* İçerik */}
      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-64 sm:h-80 md:h-[520px] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <Image src={heroImg} alt={variantAlt} fill className="object-cover object-center" />
          </div>

          <div className="flex flex-col">
            <p className="text-[17px] md:text-[19px] leading-relaxed text-neutral-800">
              {intro}
            </p>

            <div className="mt-6 h-px w-full bg-neutral-200" />

            <div className="mt-8">
              <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-3">
                {t("detailsHeadings.features", { default: "Highlights" })}
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-neutral-800">
                {(t.raw(`${product}.features`) || []).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {/* ✅ CUT (Kesim) linkleri — sadece Block hariç ürünlerde */}
            {showCuts && (
              <div className="mt-10">
                <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-3">
                  {locale?.startsWith("tr") ? "Kesim şekli seçin" : "Choose cut"}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {CUTS.map((cut) => (
                    <Link
                      key={cut}
                      href={buildVariantChildPath(locale, productSlug, variantSlug, [cut])}
                      className="px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition"
                    >
                      {cut}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}