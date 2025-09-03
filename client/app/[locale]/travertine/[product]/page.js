"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // 👈 ekle
import { useLocale, useTranslations } from "next-intl";
import { baseFor, productKeyFromSlug, VARIANT_KEY_BY_SLUG } from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import { DetailBlock, HeroImage } from "@/app/[locale]/(catalog)/_ui";

const VARIANT_SLUGS = ["blaundos-antiko","blaundos-light","blaundos-ivory"];

export default function ProductPage() {
  const { product } = useParams();                 // 👈 params yerine
  const locale = useLocale();
  const t = useTranslations("ProductPage");

  const productKey = productKeyFromSlug(locale, product);
  const base = baseFor(locale);
  const prefix = `/${locale}`;

  const title    = t(`${productKey}.title`);
  const alt      = t(`${productKey}.alt`);
  const intro    = t(`${productKey}.intro`);
  const sizes    = t.raw(`${productKey}.sizes`)    || [];
  const finishes = t.raw(`${productKey}.finishes`) || [];
  const features = t.raw(`${productKey}.features`) || [];
  const variantsHeading = t(`${productKey}.variants.heading`);

  const variantCards = VARIANT_SLUGS.map((slug) => {
    const vKey = VARIANT_KEY_BY_SLUG[slug];
    return {
      slug,
      title: t(`${productKey}.variants.${vKey}.title`),
      alt:   t(`${productKey}.variants.${vKey}.alt`),
      href:  `${prefix}/${base}/${product}/${slug}`,
    };
  });

  return (
    <main className="px-5 md:px-8 lg:px-12 py-10 max-w-6xl mx-auto">
      <header className="grid gap-6 md:grid-cols-[1.2fr,1fr] items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
          <p className="mt-3 text-base md:text-lg text-neutral-700">{intro}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <DetailBlock heading={t("detailsHeadings.sizes")}    items={sizes}/>
            <DetailBlock heading={t("detailsHeadings.finishes")} items={finishes}/>
            <DetailBlock heading={t("detailsHeadings.features")} items={features}/>
          </div>
        </div>
        <HeroImage src={PRODUCT_IMG[productKey]} alt={alt}/>
      </header>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{variantsHeading}</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {variantCards.map(({ slug, title, alt, href }) => (
            <Link key={slug} href={href}
              className="group rounded-md border bg-white/70 backdrop-blur-sm hover:shadow-md transition">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={PRODUCT_IMG[productKey]} alt={alt} fill
                       className="object-cover transition-transform duration-500 group-hover:scale-105"/>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-neutral-600 mt-1">{alt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
