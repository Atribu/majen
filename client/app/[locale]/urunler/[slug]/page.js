// app/[locale]/urunler/[slug]/page.jsx
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

// products altındaki componentlerin dosya adlarını kendi projene göre düzelt:
const componentMap = {
    block: dynamic(() => import("@/app/[locale]/components/products/Block")),
    slabs: dynamic(() => import("@/app/[locale]/components/products/Slabs")),
    tiles: dynamic(() => import("@/app/[locale]/components/products/Tiles")),
    special: dynamic(() => import("@/app/[locale]/components/products/SpecialDesigns")),
};

// TR slug -> ortak anahtar
const slugToKeyTR = {
  "blok": "block",
  "plakalar": "slabs",
  "karolar": "tiles",
  "ozel-tasarimlar": "special",
};

export default function Page({ params }) {
  const { locale, slug } = params;        // locale = "tr"
  const key = slugToKeyTR[slug];
  if (!key || !componentMap[key]) return notFound();

  const Comp = componentMap[key];
  return <Comp locale={locale} />;
}

export function generateStaticParams() {
  return ["blok", "plakalar", "karolar", "ozel-tasarimlar"].map((slug) => ({ slug }));
}
