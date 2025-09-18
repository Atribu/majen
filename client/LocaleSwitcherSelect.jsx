// app/components/LocaleSwitcherSelect.jsx
"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { baseFor, productKeyFromSlug, productSlugFor } from "@/lib/travertine";

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
  isHome,    // Header'dan geliyor
  scrolled,  // Header'dan geliyor
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  // Renk mantığı: anasayfa dışı -> her zaman siyah; anasayfa -> scrolled'a göre
  const textColorClass = !isHome ? "text-black" : scrolled ? "text-black" : "text-white";

  // Dil değiştirince scroll konumunu geri yükleme
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, Number(saved));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [pathname]);

  // Path'i hedef dile göre yeniden kur
// app/components/LocaleSwitcherSelect.jsx (ilgili kısım)
function buildLocalizedPath(path, targetLocale) {
  const seg = path.split("/"); // ["", "tr", "traverten"] veya daha derin
  if (seg.length < 2) return `/${targetLocale}`;

  const currentLocale = seg[1] || "en";
  const currentBase   = seg[2];             // "travertine" | "traverten" | başka
  const productSlug   = seg[3];             // olabilir de olmayabilir!

  const isCatalogBase =
    currentBase === "travertine" || currentBase === "traverten";

  // Katalog değilse: sadece locale değiştir
  if (!isCatalogBase) {
    seg[1] = targetLocale;
    return seg.join("/");
  }

  // Katalog kökünde isek (/tr/traverten) → sadece base'i çevir
  const newBase = baseFor(targetLocale); // "travertine" | "traverten"
  if (!productSlug) {
    return `/${targetLocale}/${newBase}`;
  }

  // Ürün segmenti varsa: ürünü hedef dil slugu ile değiştir, kalan segmentleri koru
  const productKey = productKeyFromSlug(currentLocale, productSlug);
  // productKey çözülemezse sadece base'e dön (beklenmeyen slug güvenliği)
  if (!productKey) {
    return `/${targetLocale}/${newBase}`;
  }

  const newProd = productSlugFor(targetLocale, productKey);
  const rebuilt = ["", targetLocale, newBase, newProd, ...seg.slice(4)];
  return rebuilt.join("/");
}

  function handleLangChange(lang) {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    setIsOpen(false);
    startTransition(() => {
      const newPath = buildLocalizedPath(pathname, lang);
      router.replace(newPath);
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-md px-3 py-2 uppercase w-full text-[16px] transition-colors duration-200 ${textColorClass}`}
      >
        {defaultValue}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white shadow-lg left-0 w-full rounded">
          <ul>
            {React.Children.map(children, (child) =>
              child.props.value === defaultValue ? null : (
                <li
                  key={child.props.value}
                  className="cursor-pointer px-4 py-2 uppercase hover:bg-black hover:text-white text-black text-center"
                  onClick={() => handleLangChange(child.props.value)}
                >
                  {child.props.value}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}