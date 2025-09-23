"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Basit linkify yardımcı fonksiyonu (CLIENT tarafında)
function linkifyText(text, patterns, linkClassName = "text-blue-600 hover:underline") {
  if (!text || !patterns?.length) return text;

  const big = new RegExp(patterns.map(p => `(${p.pattern.source})`).join("|"), "gi");
  const nodes = [];
  let last = 0, m;

  while ((m = big.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));

    const matched = m[0];
    const p = patterns.find(pat => new RegExp(`^${pat.pattern.source}$`, "i").test(matched)) || patterns[0];

    nodes.push(
      <Link key={`${m.index}-${big.lastIndex}`} href={p.href} className={p.className || linkClassName} aria-label={matched}>
        {matched}
      </Link>
    );
    last = big.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export default function ExportMethodsShowcase({
  heading,
  description,
  items = [],
  defaultIndex = 0,
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
      {/* üst başlık + açıklama */}
      <header className="text-center max-w-3xl mx-auto mb-8">
        {heading && <h2 className="text-2xl md:text-3xl font-semibold">{heading}</h2>}
        {description && <p className="mt-2 text-sm md:text-base text-gray-700">{description}</p>}
      </header>

      {/* 3’lü vitrin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.article
            key={i}
            initial={{ y: 0, opacity: 1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={it.img}
                alt={it.alt || it.title || "Export method"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority={i === defaultIndex}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{it.title}</h3>

              {/* açıklama varsa linkify et */}
              {it.text ? (
                <p className="text-sm leading-relaxed text-gray-700">
                  {linkifyText(it.text, it.linkifyPatterns)}
                </p>
              ) : null}

              <div className="mt-3">
                <Link
                  href={it.href || "#"}
                  className="inline-flex items-center gap-2 rounded-lg border border-black px-3 py-1.5 text-sm font-medium hover:bg-black hover:text-white transition"
                >
                  {it.cta || "Learn more"}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
