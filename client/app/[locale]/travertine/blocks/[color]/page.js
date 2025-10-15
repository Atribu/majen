
import BlockColorClient from "./BlockColorClient";
import { colorKeys, colorSlugFor } from "@/lib/travertine";

// Build-time rotalar
export async function generateStaticParams() {
  const locales = ["en", "tr"];
  const colors = colorKeys(); // ["ivory","light","antico"]
  const params = [];
  for (const locale of locales) {
    for (const key of colors) {
      params.push({
        locale,
        color: colorSlugFor(locale, key), // en: ivory|light|antico, tr: ivory|acik|antiko
      });
    }
  }
  return params;
}

// Server component: sadece client component'e paramları pasla
export default async function Page({ params }) {
  const { locale, color } = await params;
  return <BlockColorClient locale={locale} color={color} />;
}
