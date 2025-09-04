import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import blockImg from "@/public/images/traverterBlock.jpeg";
import slabsImg from "@/public/images/traverterSlabs.jpeg";
import tilesImg from "@/public/images/traverterFayans.jpeg";
import specialImg from "@/public/images/traverterDeskt.webp";

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
const FINISHES = ["polished", "honed", "brushed", "matte"];

const baseFor = (locale) => (locale?.startsWith("tr") ? "traverten" : "travertine");

// — ürün bazlı ölçüler
function sizeSlugList(productKey, t) {
  if (productKey === "slabs") return ["2cm", "3cm"]; // kalınlık
  if (productKey === "tiles") {
    const sizes = t.raw("tiles.sizes") || ["30×60", "60×60", "60×120"];
    return sizes.map((s) => s.toLowerCase().replace(/[×*]/g, "x").replace(/\s+/g, ""));
  }
  // special için proje bazlı tek "custom" sayfası koyalım
  return ["custom"];
}
function sizeLabelFromSlug(slug) {
  if (slug === "custom") return "Custom / Project-based";
  return slug.replace(/x/g, "×").replace(/([0-9])cm$/, "$1 cm");
}

export default async function Page({ params }) {
  const { locale, product: rawProduct, variant: rawVariant, cut, process, finish } = await params;

  const product = PRODUCT_ALIASES[rawProduct?.toLowerCase()];
  if (!product || product === "block") notFound();

  const variantId = VARIANT_MAP[rawVariant?.toLowerCase()];
  if (!variantId) notFound();

  if (!CUTS.includes((cut || "").toLowerCase())) notFound();
  if (!PROCESSES.includes((process || "").toLowerCase())) notFound();
  if (!FINISHES.includes((finish || "").toLowerCase())) notFound();

  const t = await getTranslations({ locale, namespace: "ProductPage" });
  const title = t(`${product}.title`, { default: "Product" });
  const vTitle = t(`${product}.variants.${variantId}.title`, { default: rawVariant });
  const vAlt = t(`${product}.variants.${variantId}.alt`, { default: vTitle });
  const intro = t(`${product}.intro`, { default: "" });

  const heroImg = HERO_IMAGES[product];
  const base = baseFor(locale);

  const sizes = sizeSlugList(product, t);

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="relative flex items-center justify-center h-[18vh] sm:h-[22vh] lg:h-[26vh] bg-gradient-to-br from-[#0C1A13] via-[#11271d] to-[#1d3a2c] px-4">
        <h1 className="text-white text-2xl md:text-4xl font-semibold text-center drop-shadow max-w-2xl tracking-tight">
          {vTitle} – {title} · {cut} · {process} · {finish}
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-64 sm:h-80 md:h-[520px] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <Image src={heroImg} alt={vAlt} fill className="object-cover object-center" />
          </div>

          <div className="flex flex-col">
            <p className="text-[17px] md:text-[19px] leading-relaxed text-neutral-800">{intro}</p>

            <div className="mt-8">
              <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-3">Choose size</h2>
              <div className="flex flex-wrap gap-3">
                {sizes.map((s) => (
                  <Link
                    key={s}
                    href={`/${locale}/${base}/${rawProduct}/${rawVariant}/${cut}/${process}/${finish}/${s}`}
                    className="px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition"
                  >
                    {sizeLabelFromSlug(s)}
                  </Link>
                ))}
              </div>
            </div>

            {product === "special" && (
              <p className="mt-4 text-sm text-neutral-600">
                Special designs are project-based; size/finish can be fully customized.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}