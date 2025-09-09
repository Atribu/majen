// app/components/HighlightSection.jsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import imgA from "@/public/images/homepage/Antiktasarim3.webp";
import imgC from "@/public/images/homepage/Ivorytasarim1.webp";
import imgB from "@/public/images/homepage/Lighttasarim1.webp";

export default function HighlightSection() {
  const t = useTranslations("HighlightSection");

  // Hangi görsel hangi bloğa gelecek + yön
  const items = [
    { key: "item1", img: imgA, reverse: false },
    { key: "item2", img: imgB, reverse: true },
    { key: "item3", img: imgC, reverse: false },
  ];

  return (
    <section className="relative w-full mt-24">
      <div className="max-w-7xl mx-auto space-y-24 lg:space-y-28">
        {items.map(({ key, img, reverse }, idx) => (
          <div
            key={key}
            className={`flex flex-col-reverse ${
              reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center`}
          >
            {/* Görsel */}
            <div className="w-full lg:w-[96%]">
              <div className="relative w-full h-80 sm:h-96 lg:h-[600px]">
                <Image
                  src={img}
                  alt={t(`items.${key}.alt`)}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Kart */}
            <div
              className={`w-full lg:w-1/2 flex ${
                reverse ? "lg:justify-start" : "lg:justify-end"
              }`}
            >
              <div
                className={`bg-white shadow-xl p-8 sm:p-8 max-w-md text-center items-center justify-center flex flex-col
                -mt-12 sm:-mt-16 lg:mt-0
                ${
                  reverse
                    ? "lg:translate-x-16 xl:translate-x-24"
                    : "lg:-translate-x-16 xl:-translate-x-24"
                }`}
              >
                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-black">
                  {t(`items.${key}.title`)}
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>

                {/* İsteğe bağlı CTA (anahtarlar eklenirse aç) */}
                {/* {t(`items.${key}.ctaLabel`) && (
                  <Link
                    href={t(`items.${key}.ctaHref`)}
                    className="mt-6 inline-block border border-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition"
                  >
                    {t(`items.${key}.ctaLabel`)}
                  </Link>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
