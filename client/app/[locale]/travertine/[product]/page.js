"use client";

import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { BASE_BY_LOCALE, PRODUCT_KEYS, PRODUCT_SLUGS, VARIANT_KEY_BY_SLUG } from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import { DetailBlock, HeroImage } from "@/app/[locale]/(catalog)/_ui";

const VARIANT_SLUGS = ["blaundos-antiko", "blaundos-light", "blaundos-ivory"];

export default function ProductPage() {
  const { product } = useParams();              // ✅ sadece bunu kullan
  const locale = useLocale();

  const t = useTranslations("ProductPage");

  // ✅ prefix & base (segment) ayrımı
  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];   // örn: "traverten"
  const baseHref = `${prefix}/${baseSegment}`;  // örn: "/tr/traverten"

  // ✅ productKey hesaplama
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

  // ✅ içerikler
  const title       = t(`${productKey}.title`);
  const alt         = t(`${productKey}.alt`);
  const intro       = t(`${productKey}.intro`);
  const sizes       = t.raw(`${productKey}.sizes`)       || [];
  const finishes    = t.raw(`${productKey}.finishes`)    || [];
  const features    = t.raw(`${productKey}.features`)    || [];
  const description = t.raw(`${productKey}.description`) || intro;
  const variantsHeading = t(`${productKey}.variants.heading`);

  // ✅ varyant kartları (baseHref üzerine kur)
  const variantCards = VARIANT_SLUGS.map((slug) => {
    const vKey = VARIANT_KEY_BY_SLUG[slug];
    return {
      slug,
      title: t(`${productKey}.variants.${vKey}.title`),
      alt:   t(`${productKey}.variants.${vKey}.alt`),
      href:  `${baseHref}/${product}/${slug}`,
    };
  });

  return (
    <main className="px-5 md:px-8 lg:px-12 py-10 max-w-6xl mx-auto mt-16">
      {/* 1) Başlık */}
      <div className="flex h-[50px] items-center rounded-xl bg-black text-white">
        <h1 className="ml-5 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
      </div>

      {/* 2) Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mt-2 mb-6 text-sm text-neutral-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href={prefix} className="hover:text-neutral-700">Anasayfa</Link>
          </li>
          <li className="px-1">/</li>
          <li>
            <Link href={baseHref} className="hover:text-neutral-700">Ürünler</Link>
          </li>
          <li className="px-1">/</li>
          <li className="text-neutral-700">{title}</li>
        </ol>
      </nav>

      {/* 3) Resim + Yanında Yazılar */}
      <section className="grid gap-6 md:grid-cols-2 items-start">
        {/* Sol: Resim */}
        <div className="rounded-xl border overflow-hidden bg-neutral-50 shadow-sm">
          <div className="relative">
            <HeroImage src={PRODUCT_IMG[productKey]} alt={alt} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-black/55 via-black/10 to-transparent">
              <span className="block text-white/95 text-xs md:text-sm">{alt}</span>
            </div>
          </div>
        </div>

        {/* Sağ: Yazılar (kısa giriş + detail blokları) */}
        <div className="mt-2 md:mt-0">
          <p className="text-base md:text-lg text-neutral-700 leading-relaxed">{intro}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <DetailBlock heading={t("detailsHeadings.sizes")}    items={sizes} />
            <DetailBlock heading={t("detailsHeadings.finishes")} items={finishes} />
            <DetailBlock heading={t("detailsHeadings.features")} items={features} />
          </div>
        </div>
      </section>

      {/* 4) Ürün Açıklamaları (resim+metnin ALTINDA) */}
      <section className="mt-10 border-t pt-8">
        <h2 className="text-2xl font-semibold">
          {t("descriptions.heading", { default: "Ürün Açıklaması" })}
        </h2>
        <div className="mt-4 space-y-4 text-neutral-700 leading-relaxed">
          {Array.isArray(description)
            ? description.map((p, i) => <p key={i}>{p}</p>)
            : <p>{description}</p>}
        </div>
      </section>

      {/* 5) Varyantlar */}
      <section className="mt-12">
        <h3 className="text-2xl font-semibold">{variantsHeading}</h3>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {variantCards.map(({ slug, title, alt, href }) => (
            <Link
              key={slug}
              href={href}
              className="group rounded-xl border bg-white/80 backdrop-blur-sm hover:shadow-md transition"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={PRODUCT_IMG[productKey]}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-white font-semibold drop-shadow-sm">{title}</h4>
                  <p className="text-white/90 text-xs mt-0.5 line-clamp-2">{alt}</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-sm">
                <span className="font-medium text-neutral-700 group-hover:text-neutral-900">Detayları Gör</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
