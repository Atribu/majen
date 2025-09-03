// app/components/LocaleSwitcherSelect.jsx
"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
// ⬇️ bu yardımcıları ekleyin
import { getLang, baseFor, productKeyFromSlug, productSlugFor } from "@/lib/travertine";

export default function LocaleSwitcherSelect({ children, defaultValue, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, Number(saved));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [pathname]);

  // 🔧 path'i hedef dile göre doğru base + product slug ile yeniden kur
  function buildLocalizedPath(path, targetLocale) {
    // pathname her zaman / ile başlar, query yoktur
    const seg = path.split("/"); // ["", "en", "travertine", "slabs", "…"]
    if (seg.length < 2) return `/${targetLocale}`;

    const currentLocale = seg[1] || "en";
    const currentBase   = seg[2];          // "travertine" | "traverten" | başka bir şey
    const productSlug   = seg[3];          // örn "slabs" | "plakalar"
    // const rest       = seg.slice(4);    // variant ve sonrası (varsa)

    // Katalog yolunda mıyız?
    const isCatalogBase = currentBase === "travertine" || currentBase === "traverten";
    if (!isCatalogBase) {
      // katalog dışındaysa sadece locale segmentini değiştir
      seg[1] = targetLocale;
      return seg.join("/");
    }

    // product slug -> key (mevcut DİL’e göre çöz)
    const productKey = productKeyFromSlug(currentLocale, productSlug); // örn "slabs"

    // hedef dilin base ve product slug'ı
    const newBase   = baseFor(targetLocale);                 // "traverten" | "travertine"
    const newProd   = productSlugFor(targetLocale, productKey); // "plakalar" | "slabs"

    // yeni path: /{targetLocale}/{newBase}/{newProd}/(variant ve diğerleri aynı kalır)
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
        className={`flex items-center gap-2 rounded-md px-3 py-2 uppercase w-full text-[16px] transition-colors duration-200
          ${scrolled ? 'text-black' : 'text-white'}`}
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
