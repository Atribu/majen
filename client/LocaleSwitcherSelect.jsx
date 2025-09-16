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
  function buildLocalizedPath(path, targetLocale) {
    const seg = path.split("/"); // ["", "en", "travertine", "slabs", ...]
    if (seg.length < 2) return `/${targetLocale}`;

    const currentLocale = seg[1] || "en";
    const currentBase = seg[2];
    const productSlug = seg[3];

    const isCatalogBase = currentBase === "travertine" || currentBase === "traverten";
    if (!isCatalogBase) {
      seg[1] = targetLocale; // katalog dışı: locale'ı değiştir
      return seg.join("/");
    }

    const productKey = productKeyFromSlug(currentLocale, productSlug); // örn "slabs"
    const newBase = baseFor(targetLocale);                             // "traverten" | "travertine"
    const newProd = productSlugFor(targetLocale, productKey);          // "plakalar" | "slabs"

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