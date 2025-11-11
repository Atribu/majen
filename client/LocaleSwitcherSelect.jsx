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
// app/components/LocaleSwitcherSelect.jsx
// ...
// app/components/LocaleSwitcherSelect.jsx içi
function buildLocalizedPath(path, targetLocale) {
  const segs = (path || "/").split("/").filter(Boolean); // ["en","vein-cut-travertine-tiles"] gibi
  if (segs.length === 0) return `/${targetLocale}`;

  const currentLocale = segs[0] || "en";
  const afterLocale   = segs[1];   // SEO kısa slug burada
  const tail          = segs.slice(2); // (çoğu zaman boş)

  // 0) Sadece locale → /tr, /en
  if (!afterLocale) return `/${targetLocale}`;

   // 0.5) ÖZEL SAYFA: travertine guide sayfası (EN & TR)
  if (afterLocale === "travertine-guide" || afterLocale === "traverten-rehberi") {
    const seg = targetLocale === "tr" ? "traverten-rehberi" : "travertine-guide";
    return `/${targetLocale}/${seg}`;
  }

  // --- ÜRÜN ROOT (travertine-slabs / traverten-plakalar) ---
  const mShort = afterLocale.match(/^(travertine|traverten)-(.+)$/i);
  if (mShort) {
    const part = mShort[2].toLowerCase(); // "slabs" | "plakalar" | "pavers" | ...
    let key = null;

    // EN tablosunda ara
    for (const k of Object.keys(PRODUCT_SLUGS.en || {})) {
      if (String(PRODUCT_SLUGS.en[k]).toLowerCase() === part) {
        key = k;
        break;
      }
    }
    // TR tablosunda ara
    if (!key) {
      for (const k of Object.keys(PRODUCT_SLUGS.tr || {})) {
        if (String(PRODUCT_SLUGS.tr[k]).toLowerCase() === part) {
          key = k;
          break;
        }
      }
    }

    if (key) {
      const prefix = targetLocale === "tr" ? "traverten" : "travertine";
      const pslug  = PRODUCT_SLUGS[targetLocale]?.[key] ?? key;
      return `/${targetLocale}/${prefix}-${pslug}`;
    }

    // Bulamazsak sadece locale değiştir
    return `/${[targetLocale, ...segs.slice(1)].join("/")}`;
  }

  // --- Travertine CUT / PROCESS / COLOR / SIZE mapping ---

  // Aynı regexler (slabs + tiles + blocks + pavers)
  const CUT_EN = /^(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|pavers)$/i;
  const CUT_TR = /^(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|dosemeler)$/i;

  const PROC_EN = /^(?:natural|(?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural))$/i;
  const PROC_TR = /^(?:dogal|(?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis))$/i;

  // ✅ Kesimi slug’dan parse eden helper
  function parseCutSlug(slug) {
    const s = String(slug);

    let m = s.match(CUT_EN);
    if (m) {
      const cutType   = m[1].toLowerCase(); // vein-cut | cross-cut
      const productEn = m[2].toLowerCase(); // slabs | tiles | blocks | pavers
      return {
        cutKey: cutType === "vein-cut" ? "vein-cut" : "cross-cut",
        product: productEn, // slabs|tiles|blocks|pavers
      };
    }

    m = s.match(CUT_TR);
    if (m) {
      const cutTypeTr = m[1].toLowerCase();     // damar-kesim | enine-kesim
      const prodTr    = m[2].toLowerCase();     // plakalar | karolar | bloklar | dosemeler
      const cutKey    = cutTypeTr === "damar-kesim" ? "vein-cut" : "cross-cut";
      const product =
        prodTr === "plakalar" ? "slabs" :
        prodTr === "karolar"  ? "tiles" :
        prodTr === "bloklar"  ? "blocks" :
        prodTr === "dosemeler" ? "pavers" :
        "slabs";

      return { cutKey, product };
    }

    return null;
  }

  // ✅ Hedef locale’e göre tam cut slug üret
  function buildExternalCutSlug(loc, cutKey, product) {
    if (loc === "tr") {
      const cutSeg =
        cutKey === "vein-cut" ? "damar-kesim" : "enine-kesim";
      const prodSeg =
        product === "slabs" ? "plakalar" :
        product === "tiles" ? "karolar"  :
        product === "blocks" ? "bloklar" :
        product === "pavers" ? "dosemeler" :
        "plakalar";

      return `${cutSeg}-traverten-${prodSeg}`;
    }

    // en
    return `${cutKey}-travertine-${product}`;
  }

  const isCutSlug = (slug) => !!parseCutSlug(slug);

  // process’i ortak “filled:honed” formatına çevir
  const toCombined = (loc, procSlug) => {
    const s = String(procSlug).toLowerCase();
    if (s === "natural" || s === "dogal") return "natural";

    const fillMap = {
      dolgulu: "filled",
      dolgusuz: "unfilled",
      filled: "filled",
      unfilled: "unfilled",
    };
    const procMap = {
      honlanmis: "honed",
      cilali: "polished",
      fircalanmis: "brushed",
      eskitilmis: "tumbled",
      honed: "honed",
      polished: "polished",
      brushed: "brushed",
      tumbled: "tumbled",
      natural: "natural",
    };

    const [f, p] = s.split("-");
    return `${fillMap[f] || f}:${procMap[p] || p}`;
  };

  // common → locale slug
  const fromCombined = (loc, combined) => {
    if (combined === "natural") return loc === "tr" ? "dogal" : "natural";
    const [f, p] = combined.split(":");

    if (loc === "tr") {
      const fMap = { filled: "dolgulu", unfilled: "dolgusuz" };
      const pMap = {
        honed: "honlanmis",
        polished: "cilali",
        brushed: "fircalanmis",
        tumbled: "eskitilmis",
      };
      return `${fMap[f] || f}-${pMap[p] || p}`;
    }
    return `${f}-${p}`;
  };

  // color/size slug → hedef dil renk slug’ı (size ise olduğu gibi kalır)
  const colorToTarget = (curLoc, tgtLoc, colorSlug) => {
    const curMap = COLOR_VARIANTS[curLoc] || {};
    const key =
      Object.keys(curMap).find((k) => curMap[k] === colorSlug) || null;

    if (!key) return colorSlug; // 6x12 vs → aynı kalsın

    return (COLOR_VARIANTS[tgtLoc] || {})[key] || colorSlug;
  };

  const tokens = afterLocale.split("-");

  // 1) SADECE CUT SAYFASI:
  //    /en/vein-cut-travertine-tiles → /tr/damar-kesim-traverten-karolar
  if (isCutSlug(afterLocale)) {
    const parsed = parseCutSlug(afterLocale);
    if (!parsed) {
      const raw = [targetLocale, ...segs.slice(1)].join("/");
      return `/${raw}`;
    }
    const { cutKey, product } = parsed;
    const targetCut = buildExternalCutSlug(targetLocale, cutKey, product);
    return `/${targetLocale}/${targetCut}`;
  }

  // 2) PROCESS + CUT:
  //    /en/filled-polished-vein-cut-travertine-tiles
  if (tokens.length >= 5) {
    const cutCandidate = tokens.slice(-4).join("-");
    if (isCutSlug(cutCandidate)) {
      const procSlug = tokens.slice(0, tokens.length - 4).join("-");
      const isProcOk =
        currentLocale === "tr" ? PROC_TR.test(procSlug) : PROC_EN.test(procSlug);

      if (isProcOk) {
        const parsed = parseCutSlug(cutCandidate);
        if (!parsed) {
          const raw = [targetLocale, ...segs.slice(1)].join("/");
          return `/${raw}`;
        }
        const { cutKey, product } = parsed;
        const combined   = toCombined(currentLocale, procSlug);
        const targetProc = fromCombined(targetLocale, combined);
        const targetCut  = buildExternalCutSlug(targetLocale, cutKey, product);

        return `/${targetLocale}/${targetProc}-${targetCut}`;
      }
    }
  }

  // 3) COLOR/SIZE + PROCESS + CUT:
  //    /en/ivory-filled-polished-vein-cut-travertine-tiles
  //    /en/6x12-filled-polished-vein-cut-travertine-pavers
  if (tokens.length >= 6) {
    const colorSlug    = tokens[0];                         // ivory | 6x12
    const cutCandidate = tokens.slice(-4).join("-");        // vein-cut-travertine-tiles
    const procSlug     = tokens.slice(1, tokens.length - 4).join("-");

    if (isCutSlug(cutCandidate)) {
      const isProcOk =
        currentLocale === "tr" ? PROC_TR.test(procSlug) : PROC_EN.test(procSlug);
      if (!isProcOk) {
        const raw = [targetLocale, ...segs.slice(1)].join("/");
        return `/${raw}`;
      }

      const parsed = parseCutSlug(cutCandidate);
      if (!parsed) {
        const raw = [targetLocale, ...segs.slice(1)].join("/");
        return `/${raw}`;
      }
      const { cutKey, product } = parsed;

      const combined    = toCombined(currentLocale, procSlug);
      const targetProc  = fromCombined(targetLocale, combined);
      const targetCut   = buildExternalCutSlug(targetLocale, cutKey, product);
      const targetColor = colorToTarget(currentLocale, targetLocale, colorSlug);

      return `/${targetLocale}/${targetColor}-${targetProc}-${targetCut}`;
    }
  }

  // 4) Diğer tüm URL'lerde: sadece locale’i değiştir
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
