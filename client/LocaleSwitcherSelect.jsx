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
  CUTS,
  COLOR_VARIANTS
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
  const segs = (path || "/").split("/").filter(Boolean); // ["tr", "vein-cut-travertine-slabs"] gibi
  if (segs.length === 0) return `/${targetLocale}`;

  const currentLocale = segs[0] || "en";
  const afterLocale   = segs[1]; // kısa SEO formu genelde burada
  const tail          = segs.slice(2); // (kalınlık vs. pek yok; anchor'a dönüştürmüştük)

  // 0) Locale yalnızsa
  if (!afterLocale) return `/${targetLocale}`;

  // 0.5) ÖZEL SAYFA: travertine-guide → aynı slug iki dilde de sabit
  if (afterLocale === "travertine-guide") {
    return `/${targetLocale}/travertine-guide`;
  }

  const mShort = afterLocale.match(/^(travertine|traverten)-(.+)$/i);
  if (mShort) {
    const part = mShort[2].toLowerCase(); // "slabs" | "plakalar" | ...
    // ürün key'ini EN/TR tablolarında ara
    let key = null;
    for (const k of Object.keys(PRODUCT_SLUGS.en || {})) {
      if (String(PRODUCT_SLUGS.en[k]).toLowerCase() === part) { key = k; break; }
    }
    if (!key) {
      for (const k of Object.keys(PRODUCT_SLUGS.tr || {})) {
        if (String(PRODUCT_SLUGS.tr[k]).toLowerCase() === part) { key = k; break; }
      }
    }
    // bulunduysa hedef dile göre kısa slug üret
    if (key) {
      const prefix = targetLocale.startsWith("tr") ? "traverten" : "travertine";
      const pslug  = PRODUCT_SLUGS[targetLocale]?.[key] ?? key;
      return `/${targetLocale}/${prefix}-${pslug}`;
    }
    // bulunamazsa sadece locale değiştir
    return `/${[targetLocale, ...segs.slice(1)].join("/")}`;
  }

  // Yardımcılar
  const CUT_EN = /^(vein-cut|cross-cut)-travertine-(slabs|tiles)$/i;
  const CUT_TR = /^(damar-kesim|enine-kesim)-traverten-(plakalar|karolar)$/i;
  const PROC_EN = /^(?:natural|(?:filled|unfilled)-(?:honed|polished|brushed|tumbled))$/i;
  const PROC_TR = /^(?:dogal|(?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis))$/i;

  const isCutSlug = (loc, slug) =>
    loc === "tr" ? CUT_TR.test(slug) : CUT_EN.test(slug);

  const cutKeyFromExternalSlug = (loc, cutSlug) => {
    const table = CUTS[loc] || {};
    return Object.keys(table).find((k) => table[k] === String(cutSlug)) || null;
  };
  const externalCutSlugFor = (loc, cutKey) => {
    const table = CUTS[loc] || {};
    return table[cutKey] || cutKey;
  };
  const toCombined = (loc, procSlug) => {
    const s = String(procSlug).toLowerCase();
    if (s === "natural" || s === "dogal") return "natural";
    const fillMap = { dolgulu: "filled", dolgusuz: "unfilled", filled: "filled", unfilled: "unfilled" };
    const procMap = {
      honlanmis: "honed", cilali: "polished", fircalanmis: "brushed", eskitilmis: "tumbled",
      honed: "honed", polished: "polished", brushed: "brushed", tumbled: "tumbled"
    };
    const [f, p] = s.split("-");
    return `${fillMap[f] || f}:${procMap[p] || p}`; // "filled:polished"
  };
  const fromCombined = (loc, combined) => {
    if (combined === "natural") return loc === "tr" ? "dogal" : "natural";
    const [f, p] = combined.split(":");
   if (loc === "tr") {
      const fMap = { filled: "dolgulu", unfilled: "dolgusuz" };
      const pMap = { honed: "honlanmis", polished: "cilali", brushed: "fircalanmis", tumbled: "eskitilmis" };
      return `${fMap[f] || f}-${pMap[p] || p}`;
    }
    return `${f}-${p}`;
  };
  const colorToTarget = (curLoc, tgtLoc, colorSlug) => {
    // COLOR_VARIANTS: { en:{ivory:'ivory',...}, tr:{ivory:'fildisi',...} }
    // önce color key’i bul
    const curMap = COLOR_VARIANTS[curLoc] || {};
   const key = Object.keys(curMap).find((k) => curMap[k] === colorSlug) || colorSlug;
    return (COLOR_VARIANTS[tgtLoc] || {})[key] || colorSlug;
  };

  // 1) CUT sayfası (/{locale}/{cut})
  if (isCutSlug(currentLocale, afterLocale)) {
    const cutKey = cutKeyFromExternalSlug(currentLocale, afterLocale);
    const targetCut = externalCutSlugFor(targetLocale, cutKey);
    return `/${targetLocale}/${targetCut}`;
  }

  // 2) PROCESS + CUT (/{locale}/{process}-{cut})
  //    last 4 token cut; baştaki kısım process
  const tokens = afterLocale.split("-");
  if (tokens.length >= 4) {
    const cutCandidate = tokens.slice(-4).join("-");
    if (isCutSlug(currentLocale, cutCandidate)) {
      const procSlug = tokens.slice(0, tokens.length - 4).join("-");
      const cutKey   = cutKeyFromExternalSlug(currentLocale, cutCandidate);
      const targetCut = externalCutSlugFor(targetLocale, cutKey);

      // proc map
      const isProcOk = currentLocale === "tr" ? PROC_TR.test(procSlug) : PROC_EN.test(procSlug);
      if (isProcOk) {
        const combined = toCombined(currentLocale, procSlug);
        const targetProc = fromCombined(targetLocale, combined);
        return `/${targetLocale}/${targetProc}-${targetCut}`;
      }
    }
  }

  // 3) COLOR + PROCESS + CUT (/{locale}/{color}-{process}-{cut})
  //    color ilk token, son 4 token cut, arası process
  if (tokens.length >= 6) {
    const colorSlug = tokens[0];
    const cutCandidate = tokens.slice(-4).join("-");
    const procSlug = tokens.slice(1, tokens.length - 4).join("-");
    if (isCutSlug(currentLocale, cutCandidate)) {
      const cutKey    = cutKeyFromExternalSlug(currentLocale, cutCandidate);
      const targetCut = externalCutSlugFor(targetLocale, cutKey);
      const combined  = toCombined(currentLocale, procSlug);
      const targetProc  = fromCombined(targetLocale, combined);
      const targetColor = colorToTarget(currentLocale, targetLocale, colorSlug);
      // (Kalınlık parametresi varsa middleware’iniz zaten anchor’a çevrildi; tail’i korumuyoruz)
      return `/${targetLocale}/${targetColor}-${targetProc}-${targetCut}`;
    }
  }

  // 4) Diğer tüm yollar: sadece locale’i değiştir (mevcut davranış)
  const raw = [targetLocale, ...segs.slice(1)].join("/");
  return `/${raw}`;

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
