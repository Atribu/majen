// app/components/LocaleSwitcherSelect.jsx
"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import {
  baseFor,            // "travertine" | "traverten"
  productKeyFromSlug, // (locale, slug) -> "block" | "slabs" | ...
  productSlugFor,     // (locale, key) -> locale'ye uygun slug
  PRODUCT_SLUGS,      // { en: {block:"blocks",...}, tr:{block:"bloklar",...}, ... }
} from "@/lib/travertine";

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
  isHome,
  scrolled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const textColorClass = !isHome ? "text-black" : scrolled ? "text-black" : "text-white";

  useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, Number(saved));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [pathname]);

  // --- YARDIMCI: slug'ı tüm dillerde dene, productKey'i bul
  function resolveProductKeyFromAnyLocale(slug) {
    for (const loc of Object.keys(PRODUCT_SLUGS || {})) {
      const key = productKeyFromSlug(loc, slug);
      if (key) return key;
    }
    return null;
  }

  // --- Path'i hedef dile göre yeniden kur
  function buildLocalizedPath(path, targetLocale) {
    const seg = path.split("/");           // ["", "en", "travertine", "slabs", ...]
    if (seg.length < 2) return `/${targetLocale}`;

    const currentLocale = seg[1] || "en";
    const currentBase   = seg[2];          // "travertine" | "traverten" | başka
    const productSlug   = seg[3];          // olabilir de olmayabilir
    const rest          = seg.slice(4);    // [variant, cut, process, ...]

    // Katalog sayfaları için basit tespit
    const knownBases = new Set(["travertine", "traverten"]);
    const isCatalog  = knownBases.has(currentBase);

    // Katalog değilse sadece locale segmentini değiştir
    if (!isCatalog) {
      seg[1] = targetLocale;
      return seg.join("/");
    }

    const newBase = baseFor(targetLocale); // hedef dilin base'i

    // Katalog kökünde isek (/tr/traverten) → sadece base'i çevir
    if (!productSlug) {
      return `/${targetLocale}/${newBase}`;
    }

    // Ürün slug -> productKey (çok dilli sağlam çözüm)
    const productKey =
      productKeyFromSlug(currentLocale, productSlug) ||
      productKeyFromSlug(targetLocale, productSlug) ||
      resolveProductKeyFromAnyLocale(productSlug);

    // Bulunamazsa güvenli fallback: sadece base'e dön
    if (!productKey) {
      return `/${targetLocale}/${newBase}`;
    }

    // Hedef dilin ürün slug'ını al, geri kalanı olduğu gibi bırak
    const newProduct = productSlugFor(targetLocale, productKey);
    const tail = rest.length ? `/${rest.join("/")}` : "";

    return `/${targetLocale}/${newBase}/${newProduct}${tail}`;
  }

  function handleLangChange(lang) {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    setIsOpen(false);
    startTransition(() => {
      const newPath = buildLocalizedPath(pathname || "/", lang);
      router.replace(newPath, { scroll: false });
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
