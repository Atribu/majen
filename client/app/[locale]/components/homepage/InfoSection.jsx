// app/components/InfoSection.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import antik from "@/public/images/slabs/antik.webp"

import block from "@/public/images/homepage/Ivoryblok.webp";
import slabs from "@/public/images/homepage/slabler2.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/homepage/Pavers3.webp";
import InlineLinks from "@/app/[locale]/components/generalcomponent/InlineLinks";

import { baseFor, productSlugFor, getLang } from "@/lib/travertine";

function Card({ t, img, href, tKey, linkPatterns }) {
  
  return (
    <div className="group rounded-md bg-white z-[999]">
      <Link href={href} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={img}
          alt={t(`products.${tKey}.alt`)} 
          fill
          sizes="100vw"
          className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="w-full p-4 items-center justify-center text-center">
        <h5 className="text-[16px] md:text-[20px] font-semibold text-[#0C1A13]">
          {t(`products.${tKey}.title`)}
        </h5>
                <InlineLinks
          text={t(`products.${tKey}.description`) || ""}
          patterns={linkPatterns || []}
          textClassName="mt-2 text-[12px] md:text-[14px] text-[#2a2a2a]"
          linkClassName="text-teal-700 font-semibold hover:underline"
        />

        <div className="mt-4 flex gap-2 items-center justify-center">
          <Link
            href={href}
            className="items-center justify-center bg-black text-white text-[13px] md:text-[15px] px-3 py-2 rounded-sm hover:bg-white hover:text-black transition font-bold"
          >
            {t(`products.${tKey}.cta`)} {/* CTA da JSON’dan gelsin */}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function InfoSection() {
  const t = useTranslations("InfoSection");
  const locale = useLocale();
  const lang = getLang(locale);
  const prefix = `/${locale}`;
  const base = locale === "tr" ? "travertenler" : "travertines"; 
  const shortBase = locale === "tr" ? "traverten" : "travertine"; 
  const contactPath = `${prefix}/${lang === "tr" ? "iletisim" : "contact"}`;

  // ---- SEO kuyrukları ve renk map'leri (VC2 ile aynı mantık)
  const PRODUCT_TAIL = locale.startsWith("tr")
    ? { blocks:"traverten-bloklar", slabs:"traverten-plakalar", tiles:"traverten-karolar", pavers:"traverten-dosemeler" }
    : { blocks:"travertine-blocks", slabs:"travertine-slabs",  tiles:"travertine-tiles",  pavers:"travertine-pavers" };
  const COLOR_EN = { ivory:"ivory", light:"light", antico:"antico" };
  const COLOR_TR = { ivory:"fildisi", light:"acik",  antico:"antiko" };
  const colorSeo = (c) => (locale.startsWith("tr") ? COLOR_TR[c] : COLOR_EN[c]) || c;
  const FILL = locale.startsWith("tr") ? { filled:"dolgulu" } : { filled:"filled" };
  const FIN  = locale.startsWith("tr") ? { brushed:"fircalanmis" } : { brushed:"brushed" };
  const CUT  = locale.startsWith("tr") ? { "vein-cut":"damar-kesim" } : { "vein-cut":"vein-cut" };

  // slabs için VC2'deki default combo (filled + brushed + vein-cut)
  const slabsDefaultHref = (color) => {
    const c = colorSeo(color);
    return `/${c}-${FILL.filled}-${FIN.brushed}-${CUT["vein-cut"]}-${PRODUCT_TAIL.slabs}`;
  };
  const blocksHref = (color) => `/${colorSeo(color)}-${PRODUCT_TAIL.blocks}`;

  // VC2 ile birebir: anchor'lı variant linkleri
  const TILES_VARIANT_LINKS = [
    "/vein-cut-travertine-tiles#product-intro",
    "/filled-honed-vein-cut-travertine-tiles#product-intro",
    "/8x8-filled-honed-vein-cut-travertine-tiles#product-intro",
  ];
  const PAVERS_VARIANT_LINKS = [
    "/vein-cut-travertine-pavers#product-intro",
    "/filled-honed-vein-cut-travertine-pavers#product-intro",
    "/6x12-filled-honed-vein-cut-travertine-pavers#product-intro",
  ];

  // Ürün bazlı pattern üreticileri (EN/TR)
  const makeColorPatterns = (product) => {
    const H = product === "blocks" ? blocksHref : slabsDefaultHref;
    return locale.startsWith("tr")
      ? [
          { pattern: /\bfild[iı]si\b/i, href: H("ivory") },
          { pattern: /\bac[ıi]k\b/i,    href: H("light") },
          { pattern: /\bantik[oö]\b/i,  href: H("antico") },
        ]
      : [
          { pattern: /\bivory\b/i,   href: H("ivory") },
          { pattern: /\blight\b/i,   href: H("light") },
          { pattern: /\bantico\b/i,  href: H("antico") },
        ];
  };

const makeTilesPatterns = () =>
   locale.startsWith("tr")
     ? [
         { pattern: /\bi[iı]şlemler\b/i, href: TILES_VARIANT_LINKS[0] }, // processes
         { pattern: /\brenk(ler)?\b/i,   href: TILES_VARIANT_LINKS[2] }, // color  -> SWAPPED
         { pattern: /\b(öl[cç][üu]|ebat|format)(lar)?\b/i, href: TILES_VARIANT_LINKS[1] }, // size -> SWAPPED
       ]
     : [
         { pattern: /\bprocess(es)?\b/i, href: TILES_VARIANT_LINKS[0] },
         { pattern: /\bcolou?r(s)?\b/i,  href: TILES_VARIANT_LINKS[2] }, // color  -> SWAPPED
         { pattern: /\bsize(s)?\b/i,     href: TILES_VARIANT_LINKS[1] }, // size -> SWAPPED
       ];

  const makePaversPatterns = () =>
   locale.startsWith("tr")
     ? [
         { pattern: /\bi[iı]şlemler\b/i, href: PAVERS_VARIANT_LINKS[0] },
         { pattern: /\brenk(ler)?\b/i,   href: PAVERS_VARIANT_LINKS[2] }, // color  -> SWAPPED
         { pattern: /\b(öl[cç][üu]|ebat|format)(lar)?\b/i, href: PAVERS_VARIANT_LINKS[1] }, // size -> SWAPPED
       ]
     : [
         { pattern: /\bprocess(es)?\b/i, href: PAVERS_VARIANT_LINKS[0] },
         { pattern: /\bcolou?r(s)?\b/i,  href: PAVERS_VARIANT_LINKS[2] }, // color  -> SWAPPED
         { pattern: /\bsize(s)?\b/i,     href: PAVERS_VARIANT_LINKS[1] }, // size -> SWAPPED
       ];

  const items = [
   { key: "product1", img: block,   href: `${prefix}/${shortBase}-${productSlugFor(locale, "blocks")}`, linkPatterns: makeColorPatterns("blocks") },
    { key: "product2", img: slabs,   href: `${prefix}/${shortBase}-${productSlugFor(locale, "slabs")}`,  linkPatterns: makeColorPatterns("slabs") },
    { key: "product3", img: tiles,   href: `${prefix}/${shortBase}-${productSlugFor(locale, "tiles")}`,  linkPatterns: makeTilesPatterns() },
    { key: "product4", img: special, href: `${prefix}/${shortBase}-${productSlugFor(locale, "pavers")}`, linkPatterns: makePaversPatterns() },
  ];

  // metin-içi link desenleri (EN/TR) — kart açıklamalarında geçecek olası ifadeler
  const P = {
    blocks: items[0]?.href,
    slabs:  items[1]?.href,
    tiles:  items[2]?.href,
    pavers: items[3]?.href,
  };

// Canonical blog href helper
const blogHref = (slug) => `/${String(slug).replace(/^\/+/, "")}`;

// EN: blocks / slabs / tiles + bathrooms / kitchens / pools / outdoor spaces
const mainLinkPatternsEn = [
  // Ürün grupları
  {
    pattern: /\btravertine blocks\b/i,
    href: blogHref("travertine-blocks-guide"),
  },
  {
    pattern: /\btravertine slabs\b/i,
    href: blogHref("travertine-slabs-guide"),
  },
  {
    pattern: /\btravertine tiles\b/i,
    href: blogHref("travertine-tiles-guide"),
  },

  // Kullanım alanları
  {
    pattern: /\bbathrooms?\b/i,
    href: blogHref("/travertine-bathroom"),
  },
  {
    pattern: /\bkitchens?\b/i,
    href: blogHref("/travertine-kitchen"),
  },
  {
    pattern: /\bpools?\b/i,
    href: blogHref("/travertine-pool"),
  },
  {
    pattern: /\boutdoor spaces?\b/i,
    href: blogHref("/travertine-flooring"),
  },
];

// TR: “traverten bloklar/plakalar/karolar” + “banyolar, mutfaklar, havuzlar, dış mekanlar”
const mainLinkPatternsTr = [
  // Ürün grupları
  {
    pattern: /\btraverten blok(lar)?\b/i,
    href: blogHref("travertine-blocks-guide"),
  },
  {
    pattern: /\btraverten plaka(lar)?\b/i,
    href: blogHref("travertine-slabs-guide"),
  },
  {
    pattern: /\btraverten karo(lar)?\b/i,
    href: blogHref("travertine-tiles-guide"),
  },

  // Kullanım alanları
  {
    pattern: /\bbanyo(lar)?\b/i,
    href: blogHref("/travertine-bathroom"),
  },
  {
    pattern: /\bmutfak(lar)?\b/i,
    href: blogHref("/travertine-kitchen"),
  },
  {
    pattern: /\bhavuz(lar)?\b/i,
    href: blogHref("/travertine-pool"),
  },
  {
    pattern: /\bd[ıi]ş mekan(lar)?\b/i,
    href: blogHref("/travertine-flooring"),
  },
];


 

  // t("__contactPath") hilesi: Card içinde contactPath'e erişmek için geçici key
  const tProxy = (k) => (k === "__contactPath" ? contactPath : t(k));

  // Embla (yalnızca mobilde görünür)
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
      slidesToScroll: 1,

    },
    [Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  return (
    <section className="flex w-screen items-center justify-center py-12 md:pt-12 lg:pt-20 xl:pt-24 z-[999] ">
      <div className="w-[95%] md:w-[80%] lg:w-[75%] lg:min-w-[1000px] items-center justify-center text-center gap-7 md:gap-9 lg:gap-12 flex flex-col">
        <div className="flex flex-col">
          <span className="text-[#6b7177] font-medium text-[12px] md:text-[14px] lg:text-[16px] uppercase leading-0">
            {t("subtitle")}
          </span>
          <h2 className="mt-2 lg:mt-5 text-[24px] font-bold md:text-[32px] lg:text-[36px] text-[#0C1A13] leading-[110%]">
            {t("heading")}
          </h2>
          <InlineLinks
  text={t("description") || ""}
  patterns={
    locale.startsWith("tr") ? mainLinkPatternsTr : mainLinkPatternsEn
  }
  textClassName="mt-3 text-black text-[12px] md:text-[14px] lg:text-[16px]"
  linkClassName="text-teal-700 font-semibold hover:underline"
/>

        </div>

        {/* Mobil: Embla Carousel */}
<div className="mt-8 block md:hidden">
  <div ref={emblaRef} className="overflow-hidden w-full">
    <div className="flex">
       {items.map(({ key, img, href, linkPatterns }) => (
        <div
          key={key}
          className="flex-[0_0_80%] shrink-0 items-center justify-center" 
        >
          <Card t={tProxy} img={img} href={href} tKey={key} linkPatterns={linkPatterns} />
        </div>
      ))}
    </div>
  </div>
</div>

        {/* Tablet & Desktop: Grid */}
        <div className="mt-8 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ key, img, href, alt, linkPatterns }) => (
     <Card key={key} t={tProxy} img={img} href={href} tKey={key} alt={alt} linkPatterns={linkPatterns}/>
          ))}
        </div>
      </div>
    </section>
  );
}