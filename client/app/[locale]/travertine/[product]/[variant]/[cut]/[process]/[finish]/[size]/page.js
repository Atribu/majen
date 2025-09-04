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
const sizeLabelFromSlug = (slug) =>
  slug === "custom" ? "Custom / Project-based" : slug.replace(/x/g, "×").replace(/([0-9])cm$/, "$1 cm");

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

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="relative flex items-center justify-center h-[18vh] sm:h-[22vh] lg:h-[26vh] bg-gradient-to-br from-[#0C1A13] via-[#11271d] to-[#1d3a2c] px-4">
        <h1 className="text-white text-2xl md:text-4xl font-semibold text-center drop-shadow max-w-2xl tracking-tight">
          {vTitle} – {title} · {cut} · {process} · {finish} · {sizeLabelFromSlug(size)}
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-64 sm:h-80 md:h-[520px] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <Image src={heroImg} alt={vAlt} fill className="object-cover object-center" />
          </div>

          <div className="flex flex-col">
            <p className="text-[17px] md:text-[19px] leading-relaxed text-neutral-800">{intro}</p>

            <div className="mt-8 flex flex-wrap gap-2 text-sm text-neutral-700">
              <span className="px-3 py-1 rounded-full bg-neutral-900/5">Cut: {cut}</span>
              <span className="px-3 py-1 rounded-full bg-neutral-900/5">Process: {process}</span>
              <span className="px-3 py-1 rounded-full bg-neutral-900/5">Finish: {finish}</span>
              <span className="px-3 py-1 rounded-full bg-neutral-900/5">Size: {sizeLabelFromSlug(size)}</span>
            </div>

            <div className="mt-8 flex gap-3">
              <Link href={backToFinish} className="px-4 py-2 rounded-xl border border-neutral-300 hover:border-black transition">
                ← {locale?.startsWith("tr") ? "Bir önceki adım" : "Previous step"}
              </Link>
             
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}