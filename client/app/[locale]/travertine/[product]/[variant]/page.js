"use client";

import { useParams } from "next/navigation"; // 👈 ekle
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { baseFor, productKeyFromSlug, VARIANT_KEY_BY_SLUG } from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import { DetailBlock, HeroImage } from "@/app/[locale]/(catalog)/_ui";

export default function VariantPage() {
  const { product, variant } = useParams();        // 👈 params yerine
  const locale = useLocale();
  const t = useTranslations("ProductPage");

  const productKey = productKeyFromSlug(locale, product);
  const vKey = VARIANT_KEY_BY_SLUG[variant] || "variant1";

  const title    = t(`${productKey}.variants.${vKey}.title`);
  const alt      = t(`${productKey}.variants.${vKey}.alt`);
  const sizes    = t.raw(`${productKey}.sizes`)    || [];
  const finishes = t.raw(`${productKey}.finishes`) || [];
  const features = t.raw(`${productKey}.features`) || [];

  const backHref = `/${locale}/${baseFor(locale)}/${product}`;

  return (
    <main className="px-5 md:px-8 lg:px-12 py-10 max-w-6xl mx-auto">
      <nav className="text-sm text-neutral-600 mb-4">
        <Link href={backHref} className="underline hover:no-underline">
          ← {t(`${productKey}.title`)}
        </Link>
      </nav>

      <div className="grid gap-6 md:grid-cols-[1.2fr,1fr] items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
          <p className="mt-2 text-neutral-700">{alt}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <DetailBlock heading={t("detailsHeadings.sizes")}    items={sizes}/>
            <DetailBlock heading={t("detailsHeadings.finishes")} items={finishes}/>
            <DetailBlock heading={t("detailsHeadings.features")} items={features}/>
          </div>
        </div>
        <HeroImage src={PRODUCT_IMG[productKey]} alt={alt}/>
      </div>
    </main>
  );
}
