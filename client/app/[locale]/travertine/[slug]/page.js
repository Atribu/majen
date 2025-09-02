// app/[locale]/products/[slug]/page.jsx
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const componentMap = {
  block: dynamic(() => import("@/app/[locale]/components/products/Block")),
  slabs: dynamic(() => import("@/app/[locale]/components/products/Slabs")),
  tiles: dynamic(() => import("@/app/[locale]/components/products/Tiles")),
  special: dynamic(() => import("@/app/[locale]/components/products/SpecialDesigns")),
};

// EN slug -> ortak anahtar
const slugToKeyEN = {
  "block": "block",
  "slabs": "slabs",
  "tiles": "tiles",
  "special-designs": "special",
};

export default function Page({ params }) {
  const { locale, slug } = params;       // locale = "en"
  const key = slugToKeyEN[slug];
  if (!key || !componentMap[key]) return notFound();

  const Comp = componentMap[key];
  return <Comp locale={locale} />;
}

export function generateStaticParams() {
  return ["block", "slabs", "tiles", "special-designs"].map((slug) => ({ slug }));
}
