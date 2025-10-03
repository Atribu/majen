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
  // app/components/LocaleSwitcherSelect.jsx
// ...
function buildLocalizedPath(path, targetLocale) {
  const seg = (path || "/").split("/"); // ["", "tr", "travertenler", "plakalar", ...]
  if (seg.length < 2) return `/${targetLocale}`;

  const currentLocale = seg[1] || "en";
  const currentBase   = seg[2];          // "travertines" | "travertenler" | "travertine" | "traverten"
  const productSlug   = seg[3];
  const rest          = seg.slice(4);

  // 1) Katalog base’lerini çoğul+tekil olarak tanı
  const CATALOG_BASES = new Set([
    "travertine", "travertines",
    "traverten",  "travertenler",
  ]);
  const isCatalog = CATALOG_BASES.has(currentBase);

  // 2) Katalog değilse: sadece locale’i değiştir
  if (!isCatalog) {
    seg[1] = targetLocale;
    return seg.join("/");
  }

  // 3) Hedef dil için doğru base’i (çoğul form) seç
  // baseFor() varsa onu kullan, yoksa locale’e göre varsayılan ver
  const rawBase = (typeof baseFor === "function" && baseFor(targetLocale)) 
    || (targetLocale.startsWith("tr") ? "travertenler" : "travertines");

  // rawBase tekil dönerse çoğula çevir
  const toPluralBase = (base, loc) => {
    if (loc.startsWith("tr")) return base === "traverten" ? "travertenler" : "travertenler";
    return base === "travertine" ? "travertines" : "travertines";
  };
  const newBase = toPluralBase(rawBase, targetLocale);

  // 4) Katalog kökü ise: sadece base’i çevir
  if (!productSlug) {
    return `/${targetLocale}/${newBase}`;
  }

  // 5) Ürün slugu → productKey (çok dilli sağlam çözüm)
  const productKey =
    productKeyFromSlug(currentLocale, productSlug) ||
    productKeyFromSlug(targetLocale, productSlug) ||
    resolveProductKeyFromAnyLocale(productSlug); // sizin yardımcı fonksiyon

  // Bulunamazsa güvenli fallback
  if (!productKey) {
    return `/${targetLocale}/${newBase}`;
  }

  // 6) Hedef dilde ilgili slugu yaz ve kuyruğu koru
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
