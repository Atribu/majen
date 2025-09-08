import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import {
  PRODUCT_IMG,
  IMAGE_BY_PRODUCT_AND_VARIANT,
  IMAGE_BY_PRODUCT_VARIANT_AND_CUT,
} from "@/app/[locale]/(catalog)/_images";

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

const baseFor = (locale) => (locale?.startsWith("tr") ? "traverten" : "travertine");

export default async function Page({ params }) {
  const { locale, product: rawProduct, variant: rawVariant, cut } = await params;

  const product = PRODUCT_ALIASES[rawProduct?.toLowerCase()];
  if (!product || product === "block") notFound();

  const vSlug = rawVariant?.toLowerCase();
  const variantId = VARIANT_MAP[vSlug];
  if (!variantId) notFound();

  const cutKey = (cut || "").toLowerCase();
  if (!CUTS.includes(cutKey)) notFound();

  const t = await getTranslations({ locale, namespace: "ProductPage" });

  const title  = t(`${product}.title`, { default: "Product" });
  const vTitle = t(`${product}.variants.${variantId}.title`, { default: rawVariant });
  const vAlt   = t(`${product}.variants.${variantId}.alt`, { default: vTitle });
  const intro  = t(`${product}.intro`, { default: "" });

  // --- 🔽 Kesim öncelikli görsel seçimi (banner)
  const imgMap = PRODUCT_IMG?.[product];

  const heroImg =
    // 1) Ürün+Varyant+Kesim -> kesin eşleme
    IMAGE_BY_PRODUCT_VARIANT_AND_CUT?.[product]?.[vSlug]?.[cutKey] ??
    // 2) Ürün+Varyant -> kesim verilmemiş durumda
    IMAGE_BY_PRODUCT_AND_VARIANT?.[product]?.[vSlug] ??
    // 3) Ürün içi varyant anahtarları (ivory/light/antiko) → yoksa cover/ilk
    (typeof imgMap === "object"
      ? (imgMap?.[variantIdToKey(variantId)] ?? imgMap?.cover ?? Object.values(imgMap || {})[0])
      : imgMap);

  if (!heroImg) notFound();

  const base = baseFor(locale);
  const productSlug = rawProduct;
  const variantSlug = rawVariant;

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO başlık */}
      <section className="relative flex items-center justify-center h-[18vh] sm:h-[22vh] lg:h-[26vh] bg-gradient-to-br from-[#0C1A13] via-[#11271d] to-[#1d3a2c] px-4">
        <h1 className="text-white text-2xl md:text-4xl font-semibold text-center drop-shadow max-w-2xl tracking-tight">
          {vTitle} – {title} · {cutKey}
        </h1>
      </section>

      {/* İçerik */}
      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* 🔥 Banner görseli: seçilen kesime göre */}
          <div className="relative w-full h-64 sm:h-80 md:h-[520px] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <Image src={heroImg} alt={vAlt} fill className="object-cover object-center" />
          </div>

          <div className="flex flex-col">
            <p className="text-[17px] md:text-[19px] leading-relaxed text-neutral-800">{intro}</p>

            <div className="mt-8">
              <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-3">
                Choose process
              </h2>
              <div className="flex flex-wrap gap-3">
                {PROCESSES.map((p) => (
                  <Link
                    key={p}
                    href={`/${locale}/${base}/${productSlug}/${variantSlug}/${cutKey}/${p}`}
                    className="px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition"
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// "variant1|2|3" -> "antiko|light|ivory" dönüşümü (çıkarım)
// Eğer farklı isimlendiriyorsan burayı güncelle.
function variantIdToKey(id) {
  switch (id) {
    case "variant1": return "antiko";
    case "variant2": return "light";
    case "variant3": return "ivory";
    default: return undefined;
  }
}
