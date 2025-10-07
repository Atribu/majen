"use client";
import React from "react";

const TOP_OFFSET = 80; // header yüksekliğine göre ayarla

// Sayfanda zaten varsa bu listeyi oradan da verebilirsin
const tocItems = [
  { id: "types",         label: "Product Types" },
  { id: "finishes",      label: "Finishes" },
  { id: "colors",        label: "Colors" },
  { id: "applications",  label: "Applications" },
  { id: "business",      label: "Supply & Business" },
];

export default function StickySectionNav() {
  const [active, setActive] = React.useState(tocItems[0].id);

  // Scrollspy (hangi bölüm görünürse onu aktif yap)
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: `-${TOP_OFFSET + 8}px 0px -60% 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    const els = tocItems.map((x) => document.getElementById(x.id)).filter(Boolean);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // küçük offset düzeltmesi
    setTimeout(() => {
      window.scrollTo({ top: window.scrollY - 8, behavior: "instant" });
    }, 220);
  };

  return (
    <nav
      className="sticky z-20 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)]"
      style={{ top: TOP_OFFSET }}
      aria-label="On this page"
    >
      {/* Başlık + ilerleme çubuğu */}
      <div className="px-2 lg:px-4 pt-2 lg:pt-3 pb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-800">On this page</h2>
        <div className="ml-3 h-1 flex-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-800/70 transition-all"
            style={{
              width: `${
                ((Math.max(0, tocItems.findIndex((i) => i.id === active)) + 1) /
                  tocItems.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Pills */}
      <div className="px-2 pb-3">
        {/* Tek satır, taşarsa sağa kaydırmalı */}
        <ol className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar px-2 py-1">
          {tocItems.map((x) => {
            const isActive = active === x.id;
            return (
              <li key={x.id} className="inline-block">
                <a
                  href={`#${x.id}`}         // ← link yapısı değişmedi
                  onClick={(e) => handleClick(e, x.id)}
                  className={[
                    "inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 rounded-full border transition",
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white/80 hover:bg-neutral-100 border-neutral-200 text-neutral-700",
                  ].join(" ")}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-white" : "bg-neutral-400"
                    }`}
                  />
                  {x.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
