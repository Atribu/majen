// app/components/KeyFeatures.jsx
"use client";

import { useTranslations } from "next-intl";
import {
  FaRulerCombined,
  FaPalette,
  FaCubes,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const ICONS = {
  quality: FaRulerCombined,
  design: FaPalette,
  range: FaCubes,
  custom: FiSettings,
  sustain: FaLeaf,
  expert: FaUserTie,
};

// Sıra/öğe sayısını buradan yönetebilirsin
const FEATURE_KEYS = ["quality", "design", "range", "custom", "sustain", "expert"];

export default function KeyFeatures() {
  const t = useTranslations("KeyFeatures");

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white py-16 sm:py-20 lg:py-24">
      {/* Arkaplan efektleri */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-950 to-black" />
      </div>

      {/* text-center */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center items-center justify-center flex flex-col">
        {/* Başlık alanı */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          {t("titlePrefix")}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{t("titleAccent")}</span>
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-white/80 to-white/10" />
          </span>
        </h2>

        {/* Özellik kartları */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURE_KEYS.map((key) => {
            const Icon = ICONS[key];
            return (
              <article
                key={key}
                className="group h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] will-change-transform hover:-translate-y-0.5"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 transition group-hover:bg-white/15 group-hover:ring-white/30">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-200 leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>

                <div className="mt-6 h-[2px] w-12 bg-white/60 transition-[width] duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
