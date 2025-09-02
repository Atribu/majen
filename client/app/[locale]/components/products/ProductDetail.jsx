"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import blockImg from "@/public/images/traverterBlock.jpeg";
import slabsImg from "@/public/images/traverterSlabs.jpeg";
import tilesImg from "@/public/images/traverterFayans.jpeg";
import specialImg from "@/public/images/traverterDeskt.webp";

/** ▼▼ Renk varyasyon görsellerini kendi dosyalarınla değiştir ▼▼ */
import var1 from "@/public/images/traverterBlock.jpeg";
import var2 from "@/public/images/traverterBlock.jpeg";
import var3 from "@/public/images/traverterBlock.jpeg";

import var4 from "@/public/images/traverterSlabs.jpeg";
import var5 from "@/public/images/traverterSlabs.jpeg";
import var6 from "@/public/images/traverterSlabs.jpeg";

import var7 from "@/public/images/traverterFayans.jpeg";
import var8 from "@/public/images/traverterFayans.jpeg";
import var9 from "@/public/images/traverterFayans.jpeg";

import var10 from "@/public/images/traverterDeskt.webp";
import var11 from "@/public/images/traverterDeskt.webp";
import var12 from "@/public/images/traverterDeskt.webp";



/** ▲▲ */

const IMAGES = {
  block: blockImg,
  slabs: slabsImg,
  tiles: tilesImg,
  special: specialImg,
};

const VALID_KEYS = ["block", "slabs", "tiles", "special"];

/** Her ürün için 3 varyasyon görseli (istersen ürün bazında farklılaştırabilirsin) */
const VARIANT_IMAGES = {
  block: [var1, var2, var3],
  slabs: [var4, var5, var6],
  tiles: [var7, var8, var9],
  special: [var10, var11, var12],
};


export default function ProductDetail({ kind = "block" }) {
  const t = useTranslations("ProductPage");

  const key = VALID_KEYS.includes(kind) ? kind : "block";
  const heroImg = IMAGES[key];

  const sizes = t.raw(`${key}.sizes`) || [];
  const finishes = t.raw(`${key}.finishes`) || [];
  const features = t.raw(`${key}.features`) || [];

  // Renk varyasyonları için: id’leri sabitledim; başlıkları i18n’den alıyoruz
  const variantIds = ["variant1", "variant2", "variant3"];
  const variantImgs = VARIANT_IMAGES[key] || VARIANT_IMAGES.block;

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO - sade, kısa ve modern */}
      <section
        className="
          relative flex items-center justify-center
          h-[18vh] sm:h-[22vh] lg:h-[26vh]
          bg-gradient-to-br from-[#0C1A13] via-[#11271d] to-[#1d3a2c]
          px-4
        "
      >
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_35%,#000_40%,transparent_100%)]" />
        <h1
          className="
            text-white text-2xl md:text-4xl font-semibold text-center drop-shadow
            max-w-2xl tracking-tight relative
            after:content-[''] after:block after:mx-auto after:mt-3
            after:h-[2px] after:w-16 after:bg-white/50 after:rounded-full
          "
        >
          {t(`${key}.title`)}
        </h1>
      </section>

      {/* CONTENT - solda görsel / sağda metin */}
      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Sol: Görsel Kartı */}
          <div
            className="
              group relative w-full h-64 sm:h-80 md:h-[520px]
              overflow-hidden rounded-2xl
              bg-white/50 backdrop-blur-sm
              border border-black/5 shadow-sm ring-1 ring-black/5
            "
          >
            <Image
              src={heroImg}
              alt={t(`${key}.alt`)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0 opacity-80" />
          </div>

          {/* Sağ: Metin & Listeler */}
          <div className="flex flex-col">
            <p className="text-[17px] md:text-[19px] leading-relaxed text-neutral-800">
              {t(`${key}.intro`)}
            </p>

            <div className="mt-6 h-px w-full bg-neutral-200" />

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-neutral-200 bg-white shadow-sm p-5">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-900">
                  {t("detailsHeadings.sizes")}
                </h2>
                <ul className="mt-3 space-y-2 text-neutral-800">
                  {sizes.map((s, i) => (
                    <li
                      key={i}
                      className="pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-neutral-400"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white shadow-sm p-5">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-900">
                  {t("detailsHeadings.finishes")}
                </h2>
                <ul className="mt-3 space-y-2 text-neutral-800">
                  {finishes.map((f, i) => (
                    <li
                      key={i}
                      className="pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-neutral-400"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-neutral-200 bg-white shadow-sm p-5">
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-900">
                {t("detailsHeadings.features")}
              </h2>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-2"
                  >
                    <span className="mt-0.5 inline-block text-green-600 font-bold">✓</span>
                    <span className="text-neutral-800">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 h-px w-full bg-neutral-200" />
          </div>
        </div>
      </section>

      {/* ▼▼ RENK ÇEŞİTLERİ BÖLÜMÜ ▼▼ */}
      <section className="max-w-6xl mx-auto px-6 pb-14 md:pb-20">
        {/* Başlık */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 text-center md:text-left">
            {t(`${key}.variants.heading`, { default: "Renk Çeşitleri" })}
          </h2>
          <div className="mt-3 h-px w-full bg-neutral-200" />
        </div>

        {/* 3'lü Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {variantIds.map((id, idx) => (
            <div
              key={id}
              className="
                group rounded-2xl overflow-hidden
                border border-neutral-200 bg-white shadow-sm
                hover:shadow-md transition-shadow
              "
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={variantImgs[idx]}
                  alt={t(`${key}.variants.${id}.alt`, { default: t(`${key}.title`) })}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* hafif üst gölge */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0" />
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-medium text-neutral-900">
                  {t(`${key}.variants.${id}.title`, { default: `Variant ${idx + 1}` })}
                </h3>
                {/* İstersen kısa bir açıklama anahtarı da ekleyebiliriz:
                    {t(`${key}.variants.${id}.desc`, { default: "" })}
                */}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ▲▲ RENK ÇEŞİTLERİ BİTTİ ▲▲ */}
    </main>
  );
}
