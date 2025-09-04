"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { baseFor, productKeyFromSlug, buildDeepPath, CUTS, PROCESSES, FINISHES, sizeSlugToLabel } from "@/lib/travertine";

// Minimal görsel/alan; gerçek görselleri kendi asset’lerinle değiştir.
const placeholder = "/images/placeholder-wide.jpg";

export default function OptionPage({ paramsPromise, level }) {
  const t = useTranslations("ProductPage");
  const locale = useLocale();
  const params = React.use(paramsPromise); // Next 15: params bir Promise
  const { product, variant, cut, process, finish, size } = params;

  const productKey = productKeyFromSlug(locale, product);
  const base = baseFor(locale);

  // Kademeye göre “sonraki seçenekler”
  const nextOptions = React.useMemo(() => {
    if (level === "cut") return CUTS.map(v => ({ label: v, parts: [v] }));
    if (level === "process") return PROCESSES.map(v => ({ label: v, parts: [cut, v] }));
    if (level === "finish") return FINISHES.map(v => ({ label: v, parts: [cut, process, v] }));
    if (level === "size") {
      // Demo: kalınlık seçenekleri (slabs için)
      const sizes = ["2cm", "3cm", "5cm"]; // tiles için burada farklı boyut listesi üretebilirsin
      return sizes.map(v => ({ label: v, parts: [cut, process, finish, v] }));
    }
    return [];
  }, [level, cut, process, finish]);

  const crumbs = [
    { href: `/${locale}/${base}/${product}/${variant}`, label: variant },
    cut && { href: buildDeepPath(locale, productKey, variant, [cut]), label: cut },
    process && { href: buildDeepPath(locale, productKey, variant, [cut, process]), label: process },
    finish && { href: buildDeepPath(locale, productKey, variant, [cut, process, finish]), label: finish },
    size && { href: "#", label: sizeSlugToLabel(size) },
  ].filter(Boolean);

  // Banner benzeri modern görünüm
  return (
    <main className="min-h-[60vh]">
      {/* Banner */}
      <section className="relative h-[28rem] w-full overflow-hidden rounded-b-2xl">
        <Image src={placeholder} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"/>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%]">
          <nav className="text-white/80 text-sm">
            {crumbs.map((c, i) => (
              <span key={i}>
                {i !== 0 && " / "}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="mt-2 text-white text-3xl md:text-5xl font-semibold tracking-tight">
            {t[productKey]?.title || "Travertine"}
          </h1>
          <p className="mt-2 max-w-2xl text-white/80">
            {t[productKey]?.intro}
          </p>
        </div>
      </section>

      {/* İçerik – kart yerine kart-free modern satır */}
      <section className="mx-auto w-[90%] md:w-[80%] py-10">
        {/* Özellik satırı */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-200">
            <h3 className="font-medium text-neutral-900">Sizes</h3>
            <p className="mt-2 text-neutral-700 text-sm">{(t[productKey]?.sizes || []).join(" • ")}</p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-200">
            <h3 className="font-medium text-neutral-900">Finishes</h3>
            <p className="mt-2 text-neutral-700 text-sm">{(t[productKey]?.finishes || []).join(" • ")}</p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-200">
            <h3 className="font-medium text-neutral-900">Highlights</h3>
            <p className="mt-2 text-neutral-700 text-sm">{(t[productKey]?.features || []).join(" • ")}</p>
          </div>
        </div>

        {/* Drilldown akışı */}
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold">Select {level}</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {nextOptions.map(({ label, parts }) => {
              const href = buildDeepPath(locale, productKey, variant, parts);
              return (
                <Link
                  key={label}
                  href={href}
                  className="px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition"
                >
                  {label}
                </Link>
              );
            })}
            {nextOptions.length === 0 && (
              <p className="text-neutral-600">No further options on this level.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}