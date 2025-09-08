// app/[locale]/travertine/[product]/[variant]/page.js
// (TR için aynı: app/[locale]/traverten/[product]/[variant]/page.js)

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

// ✅ Yardımcılar ve görsel haritaları
import { CUTS, buildVariantChildPath, baseFor, VARIANT_KEY_BY_SLUG } from "@/lib/travertine";
import { PRODUCT_IMG, IMAGE_BY_PRODUCT_AND_VARIANT } from "@/app/[locale]/(catalog)/_images";

// Ürün aliasları (url normalizasyonu)
const PRODUCT_ALIASES = {
  block: "block", blok: "block",
  slabs: "slabs", plakalar: "slabs",
  tiles: "tiles", karolar: "tiles",
  special: "special", "special-designs": "special", "ozel-tasarimlar": "special",
};

// Çeviri anahtarları için (variant1/2/3)
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

  // çeviri için id
  const variantId = VARIANT_MAP[variantSlug?.toLowerCase()];
  if (!variantId) notFound();

  const t = await getTranslations({ locale, namespace: "ProductPage" });

  const title        = t(`${product}.title`, { default: "Product" });
  const variantTitle = t(`${product}.variants.${variantId}.title`, { default: variantSlug });
  const variantAlt   = t(`${product}.variants.${variantId}.alt`, { default: variantTitle });
  const intro        = t(`${product}.intro`, { default: "" });

  // 🔽 --- BANNER (soldaki büyük görsel) için KESİN seçim mantığı
  const vSlug = variantSlug?.toLowerCase();
  const vKey  = VARIANT_KEY_BY_SLUG?.[vSlug]; // "antiko" | "light" | "ivory" vb.
  const imgMap = PRODUCT_IMG?.[product];

  const heroImg =
    // 1) Ürün + slug'a özel tanım varsa onu kullan
    IMAGE_BY_PRODUCT_AND_VARIANT?.[product]?.[vSlug] ??
    // 2) Ürün alt haritasında vKey varsa onu kullan
    (typeof imgMap === "object" ? imgMap?.[vKey] : undefined) ??
    // 3) Ürünün cover'ı ya da ilk görseli
    (typeof imgMap === "object" ? (imgMap?.cover ?? Object.values(imgMap || {})[0]) : imgMap);

  if (!heroImg) notFound(); // hiçbir şey bulunamazsa

  // linkler
  const base = baseFor(locale);
  const productSlug = rawProduct;

  const showCuts = product !== "block"; // Block hariç

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO metin alanı (istersen buraya da arka plan görseli ekleyebiliriz) */}
      <section className="relative flex items-center justify-center h-[18vh] sm:h-[22vh] lg:h-[26vh] bg-gradient-to-br from-[#0C1A13] via-[#11271d] to-[#1d3a2c] px-4">
        <h1 className="text-white text-2xl md:text-4xl font-semibold text-center drop-shadow max-w-2xl tracking-tight">
          {variantTitle} – {title}
        </h1>
      </section>

      {/* İçerik */}
      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* 🔥 Seçilen varyantın görseli burada banner olarak geliyor */}
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

            {/* CUT linkleri — sadece Block hariç */}
            {showCuts && (
              <div className="mt-10">
                <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-3">
                  {locale?.startsWith("tr") ? "Kesim şekli seçin" : "Choose cut"}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {CUTS.map((cut) => (
                    <Link
                      key={cut}
                      href={buildVariantChildPath(locale, productSlug, vSlug, [cut])}
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
