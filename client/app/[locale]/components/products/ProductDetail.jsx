"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import blockImg from "@/public/images/traverterBlock.jpeg";
import slabsImg from "@/public/images/traverterSlabs.jpeg";
import tilesImg from "@/public/images/traverterFayans.jpeg";
import specialImg from "@/public/images/traverterDeskt.webp";

const IMAGES = {
  block: blockImg,
  slabs: slabsImg,
  tiles: tilesImg,
  special: specialImg,
};

const VALID_KEYS = ["block", "slabs", "tiles", "special"];

export default function ProductDetail({ kind = "block" }) {
  const t = useTranslations("ProductPage");

  const key = VALID_KEYS.includes(kind) ? kind : "block";
  const heroImg = IMAGES[key];

  const sizes = t.raw(`${key}.sizes`) || [];
  const finishes = t.raw(`${key}.finishes`) || [];
  const features = t.raw(`${key}.features`) || [];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden">
        <Image
          src={heroImg}
          alt={t(`${key}.alt`)}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className="text-white text-3xl md:text-5xl font-semibold text-center drop-shadow">
            {t(`${key}.title`)}
          </h1>
        </div>
      </section>

      {/* İçerik */}
      <section className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <p className="text-lg md:text-xl text-gray-800">
          {t(`${key}.intro`)}
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">{t("detailsHeadings.sizes")}</h2>
            <ul className="list-disc ml-5 space-y-1 text-gray-800">
              {sizes.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">{t("detailsHeadings.finishes")}</h2>
            <ul className="list-disc ml-5 space-y-1 text-gray-800">
              {finishes.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">{t("detailsHeadings.features")}</h2>
          <ul className="list-disc ml-5 space-y-1 text-gray-800">
            {features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}
