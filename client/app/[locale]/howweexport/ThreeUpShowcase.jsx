// app/components/common/ThreeUpShowcase.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Props
 * - heading: string
 * - description?: string
 * - items: Array<{
 *     img: StaticImport | string;
 *     alt: string;
 *     title: string;
 *     href: string;
 *     cta?: string;             // default: "Learn more"
 *   }>
 * - className?: string          // dış sarmalayıcı için
 * - centered?: boolean          // başlık & metni ortala (default true)
 */
export default function ThreeUpShowcase({
  heading,
  description,
  items = [],
  className = "",
  centered = true
}) {
  return (
    <section
      className={`w-full py-10 md:py-14 ${className}`}
      aria-labelledby="threeup-heading"
    >
      {/* Üst kısım: başlık + açıklama */}
      <div className={`mx-auto max-w-5xl px-5 text-center ${centered ? "" : "text-left"}`}>
        {heading && (
          <h2 id="threeup-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mt-3 text-[13px] md:text-[15px] leading-[150%] text-neutral-700">
            {description}
          </p>
        )}
      </div>

      {/* Kartlar */}
      <div className="mx-auto mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-6xl px-5">
        {items.slice(0, 3).map((item, idx) => (
          <article
            key={idx}
            className="group rounded-xl border border-black/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            {/* Görsel alanı */}
            <div className="relative aspect-[4/3]">
              <Image
                src={item.img}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority={idx === 0}
              />
            </div>

            {/* Metin + CTA */}
            <div className="p-4 md:p-3 text-center">
              <h3 className="text-lg md:text-xl font-semibold text-neutral-900">
                {item.title}
              </h3>

              <div className="mt-2">
                <Link
                  href={item.href}
                  className="inline-flex items-center justify-center rounded-lg bg-black text-white text-sm md:text-[15px] font-semibold px-4 py-2.5 transition hover:bg-neutral-800"
                >
                  {item.cta || "Learn more"}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
