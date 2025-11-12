// app/[locale]/travertine/[product]/[cut]/[process]/page.jsx
"use client";

// resimler _images klasöründeki IMAGE_BY_PRODUCT burdan geliyor ve
// variant kısmının resimleri colorThumbs dan (_images)
import React from "react";
import Head from "next/head";
import { useParams, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  baseFor,
  productKeyFromSlug,
  colorKeys,
  colorLabelFor,
  colorSlugFor,
  buildSeoColorPath,
  CUTS,
  getLang,
  productSlugFor
} from "@/lib/travertine";

import {
  IMAGE_BY_PRODUCT,               // product/cut/process bazlı hero & thumb kaynakları
  IMAGE_BY_PRODUCT_AND_VARIANT,   // renk görselleri (color)
  PROCESS_THUMB_BY_COMBINED       // global fallback (filled:honed vb.)
} from "@/app/[locale]/(catalog)/_images";

import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";
import InlineLinks from "@/app/[locale]/components/generalcomponent/InlineLinks";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";
import SocialMediaSection from "@/app/[locale]/components/products1/SocialMediaSection";
import BreadcrumbsExact from "@/app/[locale]/components/generalcomponent/BreadcrumbsExact";
import {
  PRODUCT_LABEL,
  CUT_LABEL,
  TILE_SIZE_SLUGS_TILES,
  TILE_SIZE_SLUGS_PAVERS,
  tileSizeLabelForLocale
} from "@/lib/labels";
import { Link } from "@/i18n/navigation";
import OtherOptions from "@/app/[locale]/components/generalcomponent/OtherOptions";

/* ---------- küçük yardımcılar ---------- */

function InfoCard({
  title,
  children,
  contentClassName = "text-sm text-neutral-600 leading-[1.7] text-center",
}) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

// güvenli okuyucu
const safe = (fn, fallback) => {
  try { const v = fn(); return v ?? fallback; } catch { return fallback; }
};

const pickFirst = (v) => (Array.isArray(v) ? v.find(Boolean) : v);

// URL'deki process segmentini i18n anahtarı olarak normalize et (EN: filled-polished,
// TR: dolgulu-cilali, natural/dogal)
function normalizeProcKey(procSlug = "", locale = "en") {
  const s = String(procSlug).toLowerCase().trim();

  // natural/dogal → unfilled-natural/dolgusuz-dogal (kanonik)
  if (s === "natural" || s === "dogal") {
    return locale.startsWith("tr") ? "dolgusuz-dogal" : "unfilled-natural";
  }

  if (locale.startsWith("en")) {
    if (!s.includes("-")) return `filled-${s}`;
    return s;
  }

  if (locale.startsWith("tr")) {
    if (!s.includes("-")) return `dolgulu-${s}`;
    return s;
  }

  return s;
}

// UI'da okunaklı başlık üret ("Filled · Polished" / "Dolgulu · Cilalı" / "Natural")
function friendlyProcessLabel(procKey, locale) {
  const titleCase = (x) =>
    String(x || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

  if (!procKey) return locale.startsWith("tr") ? "İşlem" : "Process";
  if (procKey === "natural") return "Natural";
  if (procKey === "dogal") return "Doğal";

  const [fill, proc] = String(procKey).split("-");

  if (locale.startsWith("tr")) {
    const mapFill = { dolgulu: "Dolgulu", dolgusuz: "Dolgusuz" };
    const mapProc = {
      honlanmis: "Honlanmış",
      cilali: "Cilalı",
      fircalanmis: "Fırçalanmış",
      eskitilmis: "Eskitilmiş"
    };
    return `${mapFill[fill] || titleCase(fill)} · ${mapProc[proc] || titleCase(proc)}`;
  }

  const mapFillEn = { filled: "Filled", unfilled: "Unfilled" };
  return `${mapFillEn[fill] || titleCase(fill)} · ${titleCase(proc)}`;
}

// TR birleşik → EN birleşik ("dolgulu-cilali" → "filled-polished")
function trCombinedToEn(procKey = "") {
  const s = String(procKey).toLowerCase().trim();
  if (!s) return s;
  if (s === "dogal") return "natural";
  const [fillRaw, procRaw] = s.split("-");
  const fill = {
    dolgulu: "filled",
    dolgusuz: "unfilled",
    filled: "filled",
    unfilled: "unfilled"
  }[fillRaw] || fillRaw;
  const proc = {
    honlanmis: "honed",
    cilali: "polished",
    fircalanmis: "brushed",
    eskitilmis: "tumbled",
    honed: "honed",
    polished: "polished",
    brushed: "brushed",
    tumbled: "tumbled"
  }[procRaw] || procRaw;
  return `${fill}-${proc}`;
}

// "filled-polished" | "unfilled-honed" | "natural"/TR karşılıkları → combined key (EN sabit): "filled:polished"
function combinedKeyFromProc(procKey = "", locale = "en") {
  const s = String(procKey).toLowerCase().trim();
  if (!s) return null;

  if (s === "natural" || s === "dogal") return "unfilled:natural";

  const fillMap = {
    dolgulu: "filled",
    dolgusuz: "unfilled",
    filled: "filled",
    unfilled: "unfilled"
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
    dogal: "natural"
  };

  const [fillRaw, procRaw] = s.split("-");
  const fill = fillMap[fillRaw] || fillRaw;
  const proc = procMap[procRaw] || procRaw;
  return `${fill}:${proc}`;
}

// regex escape helper
const escapeRegExp = (s) =>
  String(s ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const cardTextClass = "text-[14px] leading-[120%] text-neutral-700 text-center";

/* -------------------------------- PAGE -------------------------------- */

export default function ProcessPage() {
  const { product: productSlug, cut: cutSlug, process } = useParams();
  const locale = useLocale();
  const lang = getLang(locale);
  const t = useTranslations("ProductPage");

  const prefix = `/${locale}`;
  const baseSegment = baseFor(locale);
  const baseHref = `${prefix}/${baseSegment}`;

  // ---- Breadcrumb için path
  const rawPath = usePathname();
  const pathname = typeof rawPath === "string" ? rawPath : "";
  const segments = pathname.split("/").filter(Boolean);
  const selectedSegments = segments.slice(-1);

  const productKey = productKeyFromSlug(locale, String(productSlug)) || "slabs";

  /* ---------- cut key çözümü ---------- */

  function cutSlugForProduct(locale, cutKey, productKey) {
    const base = (CUTS[getLang(locale)] || {})[cutKey] || cutKey;
    if (typeof base !== "string") return cutKey;

    if (locale.startsWith("en")) {
      if (productKey === "slabs")  return base.replace(/-travertine-slabs$/i, "-travertine-slabs");
      if (productKey === "tiles")  return base.replace(/-travertine-slabs$/i, "-travertine-tiles");
      if (productKey === "blocks") return base.replace(/-travertine-slabs$/i, "-travertine-blocks");
      if (productKey === "pavers") return base.replace(/-travertine-slabs$/i, "-travertine-pavers");
      return base;
    }

    if (productKey === "slabs")  return base.replace(/-traverten-plakalar$/i, "-traverten-plakalar");
    if (productKey === "tiles")  return base.replace(/-traverten-plakalar$/i, "-traverten-karolar");
    if (productKey === "blocks") return base.replace(/-traverten-plakalar$/i, "-traverten-bloklar");
    if (productKey === "pavers") return base.replace(/-traverten-plakalar$/i, "-traverten-dosemeler");
    return base;
  }

  function resolveCutKey(locale, productKey, cutSlugParam) {
    const target = String(cutSlugParam || "").toLowerCase().trim();
    const lang = getLang(locale);
    const cuts = CUTS[lang] || {};

    // 1) ürün tipine göre slug üretip birebir karşılaştır
    for (const k of Object.keys(cuts)) {
      const candidate = String(
        cutSlugForProduct(locale, k, productKey)
      ).toLowerCase();
      if (candidate === target) return k;
    }

    // 2) eski slabs tabanlı slug’a bak
    for (const k of Object.keys(cuts)) {
      const base = String(cuts[k] || "").toLowerCase();
      if (base === target) return k;
    }

    // 3) heuristik
    if (/vein|damar/.test(target)) return "vein-cut";
    if (/cross|yatay/.test(target)) return "cross-cut";
    return "vein-cut";
  }

  const cutKey = resolveCutKey(locale, productKey, cutSlug);
  const cutTitle = safe(() => t(`${productKey}.cuts.${cutKey}.title`), cutKey);

  /* ---------- process anahtarları ---------- */

  // URL’deki process → normalized (filled-polished/unfilled-honed/unfilled-natural vs.)
  const procKey = normalizeProcKey(process, locale);
  const procLabel = friendlyProcessLabel(procKey, locale);

  // TR ise EN’e çevirip tek kanaldan lookup yap
  const lookupProcKey = locale.startsWith("tr") ? trCombinedToEn(procKey) : procKey;

  // canonical cut + process slug
  const canonicalCutSlug = cutSlugForProduct(locale, cutKey, productKey) || cutSlug;

  function procSlugForLocaleFn(locale, procKeyAny) {
    const norm = String(procKeyAny).toLowerCase();
    if (norm === "natural" || norm === "dogal" || norm === "unfilled-natural") {
      return locale.startsWith("tr") ? "dolgusuz-dogal" : "unfilled-natural";
    }

    const enCombo = trCombinedToEn(norm);
    if (locale.startsWith("tr")) {
      const [fillEn, pEn] = enCombo.split("-");
      const fillTr = fillEn === "filled" ? "dolgulu" : "dolgusuz";
      const procTr = {
        honed: "honlanmis",
        polished: "cilali",
        brushed: "fircalanmis",
        tumbled: "eskitilmis",
        natural: "dogal"
      }[pEn] || pEn;
      return `${fillTr}-${procTr}`;
    }
    return enCombo;
  }

  const canonicalProcessSlug = procSlugForLocaleFn(locale, lookupProcKey);
  const processSlugLocalized = procSlugForLocaleFn(locale, process);

  const youtubeByColor =
    safe(
      () =>
        t.raw(
          `${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.youtubeByColor`
        ),
      {}
    ) || {};

  /* ---------- ürün genel ---------- */

  const productTitle = safe(() => t(`${productKey}.title`), "Product");
  const productIntro = safe(() => t(`${productKey}.intro`), "");
  const sizes = safe(() => t.raw(`${productKey}.sizes`), []) || [];
  const finishes = safe(() => t.raw(`${productKey}.finishes`), []) || [];
  const features = safe(() => t.raw(`${productKey}.features`), []) || [];
  const description =
    safe(() => t.raw(`${productKey}.description`), productIntro) || productIntro;

  /* ---------- process node ---------- */

  const processNode =
    safe(
      () =>
        t.raw(
          `${productKey}.cuts.${cutKey}.processes.${lookupProcKey}`
        ),
      {}
    ) || {};

  const processTitle = processNode.title || procLabel;
  const processIntro =
    processNode.lead ||
    processNode.intro ||
    safe(
      () => t.raw(`${productKey}.cuts.${cutKey}.processes.subtext`),
      ""
    );

  // hero
  const combinedKey = combinedKeyFromProc(procKey, locale);

  const heroI18n = processNode?.hero?.src || null;
  const heroByImages =
    IMAGE_BY_PRODUCT?.[productKey]?.processHero?.[cutKey]?.[combinedKey] ||
    IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[combinedKey] ||
    IMAGE_BY_PRODUCT?.[productKey]?.[cutKey] ||
    IMAGE_BY_PRODUCT?.[productKey]?.cover ||
    PROCESS_THUMB_BY_COMBINED?.[combinedKey] ||
    "/images/homepage/antikoarkplan.webp";

  const heroSrc = heroI18n || heroByImages;
  const heroAlt =
    processNode?.hero?.alt || `${productTitle} ${processTitle}`;
  const span =
    processNode.span || safe(() => t(`${productKey}.span`), undefined);

  const dh =
    processNode.detailsHeadings ||
    safe(
      () => t.raw(`${productKey}.cuts.${cutKey}.detailsHeadings`),
      {}
    ) ||
    {};

  const descArr = Array.isArray(processNode.description)
    ? processNode.description
    : safe(
        () => t.raw(`${productKey}.cuts.${cutKey}.description`),
        []
      ) || [];

  const hSizes = safe(
    () => t(`${productKey}.detailsHeadings.sizes`),
    "Sizes / Thickness"
  );
  const hFeatures = safe(
    () => t(`${productKey}.detailsHeadings.features`),
    "Finishes & Features"
  );

  /* ---------- FAQ ---------- */

  const qCut = safe(
    () =>
      t.raw(
        `${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.QuestionsItems`
      ),
    null
  );
  const qTop = safe(() => t.raw(`${productKey}.QuestionsItems`), {});
  const qSrc = qCut || qTop;

  const faqItems = [];
  if (qSrc) {
    let j = 1;
    while (
      qSrc[`aboutpage_s4_faq${j}_header`] &&
      qSrc[`aboutpage_s4_faq${j}_text`]
    ) {
      faqItems.push({
        q: qSrc[`aboutpage_s4_faq${j}_header`],
        a: qSrc[`aboutpage_s4_faq${j}_text`]
      });
      j++;
    }
  }

  /* ---------- Info cards ---------- */

  const cards = [
    {
      title: dh.title1 || `${productTitle} · ${cutTitle} · ${processTitle}`,
      content: descArr[0] || (Array.isArray(description) ? description[0] : "")
    },
    {
      title: dh.title2 || (locale.startsWith("tr") ? "Renkler" : "Colors"),
      content: descArr[1] || (Array.isArray(description) ? description[1] : "")
    },
    {
      title: dh.title3 || hSizes,
      content:
        descArr[2] ||
        (sizes.length
          ? sizes.join(", ")
          : locale.startsWith("tr")
          ? "Kalınlık seçeneklerini renk sayfasında görün."
          : "See size options on the color page.")
    },
    {
      title: dh.title4 || hFeatures,
      content:
        descArr[3] ||
        [...(finishes || []), ...(features || [])]
          .slice(0, 12)
          .join(", ")
    }
  ];

  /* ---------- renk & görseller ---------- */

  const cKeys = colorKeys();

  const colorImgMap = Object.fromEntries(
    cKeys.map((key) => {
      const slug = colorSlugFor(locale, key);

      const fromColorByProcess =
        IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[combinedKey]?.[
          key
        ];

      const fromVariant =
        IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug] ??
        IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[key];

      const fromProcessThumb = PROCESS_THUMB_BY_COMBINED?.[combinedKey];

      const src =
        pickFirst(fromColorByProcess) ||
        pickFirst(fromVariant) ||
        pickFirst(fromProcessThumb) ||
        heroSrc;

      return [slug, src];
    })
  );

  const colorCards = cKeys.map((key) => {
    const label = colorLabelFor(locale, key);
    const slug = colorSlugFor(locale, key);
    const youtubeUrl =
      youtubeByColor && typeof youtubeByColor === "object"
        ? youtubeByColor[key]
        : null;

    return {
      slug,
      vKey: slug,
      title: label,
      alt: label,
      href: buildSeoColorPath(locale, productKey, cutSlug, process, key),
      youtubeUrl: youtubeUrl || undefined
    };
  });

  /* ---------- link pattern’leri ---------- */

  const linkPatterns = [
    {
      pattern: /vein[- ]cut/i,
      href: `/${locale}/${baseSegment}/${productSlug}/${cutSlugForProduct(
        locale,
        "vein-cut",
        productKey
      )}`
    },
    {
      pattern: /cross[- ]cut/i,
      href: `/${locale}/${baseSegment}/${productSlug}/${cutSlugForProduct(
        locale,
        "cross-cut",
        productKey
      )}`
    }
  ];

  const PROCESS_EN = [
    "natural",
    "filled-honed",
    "unfilled-honed",
    "filled-polished",
    "unfilled-polished",
    "filled-brushed",
    "unfilled-brushed",
    "filled-tumbled",
    "unfilled-tumbled",
    "filled-natural",
    "unfilled-natural"
  ];

  const PROCESS_TR = [
    "dogal",
    "dolgulu-honlanmis",
    "dolgusuz-honlanmis",
    "dolgulu-cilali",
    "dolgusuz-cilali",
    "dolgulu-fircalanmis",
    "dolgusuz-fircalanmis",
    "dolgulu-eskitilmis",
    "dolgusuz-eskitilmis",
    "dolgulu-dogal",
    "dolgusuz-dogal"
  ];

  const wordsOrHyphenRegex = (s) => {
    const safeS = String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${safeS.replace("-", "[ -]")}\\b`, "i");
  };

  const NATURAL_EN_COMBO_REGEX =
    /\b(?:unfilled|filled)[ -]natural\b/i;
  const NATURAL_TR_COMBO_REGEX =
    /\b(?:dolgulu|dolgusuz)[ -]doğal\b/i;

  const processPatterns = []
    .concat(
      PROCESS_EN.flatMap((k) => {
        const processSlugLoc = procSlugForLocaleFn(locale, k);
        const href = `/${locale}/${baseSegment}/${productSlug}/${cutSlug}/${processSlugLoc}`;

        if (k === "natural") {
          return [{ pattern: NATURAL_EN_COMBO_REGEX, href }];
        }
        return [{ pattern: wordsOrHyphenRegex(k), href }];
      })
    )
    .concat(
      PROCESS_TR.flatMap((kTr) => {
        const processSlugLoc = procSlugForLocaleFn(locale, kTr);
        const href = `/${locale}/${baseSegment}/${productSlug}/${cutSlug}/${processSlugLoc}`;

        if (kTr === "dogal") {
          return [{ pattern: NATURAL_TR_COMBO_REGEX, href }];
        }
        return [{ pattern: wordsOrHyphenRegex(kTr), href }];
      })
    );

  linkPatterns.push(...processPatterns);

  /* ---------- TextSections (process → cut → product fallback) ---------- */

  function hasTS(obj) {
    if (!obj || typeof obj !== "object") return false;
    return Object.keys(obj).some((k) =>
      /^(header|text|subheader|subtext)\d+$/i.test(k)
    );
  }

  const textSectionProcRaw = safe(
    () =>
      t.raw(
        `${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.TextSection`
      ),
    null
  );

  const textSectionCutRaw = hasTS(textSectionProcRaw)
    ? null
    : safe(
        () => t.raw(`${productKey}.cuts.${cutKey}.TextSection`),
        null
      );

  const textSectionProdRaw =
    hasTS(textSectionProcRaw) || hasTS(textSectionCutRaw)
      ? null
      : safe(() => t.raw(`${productKey}.TextSection`), null);

  const textSectionObj =
    (hasTS(textSectionProcRaw) && textSectionProcRaw) ||
    (hasTS(textSectionCutRaw) && textSectionCutRaw) ||
    (hasTS(textSectionProdRaw) && textSectionProdRaw) ||
    null;

  const textSections = [];
  if (textSectionObj) {
    let i = 1;
    while (
      textSectionObj[`header${i}`] ||
      textSectionObj[`text${i}`] ||
      textSectionObj[`subheader${i}`] ||
      textSectionObj[`subtext${i}`]
    ) {
      const title =
        textSectionObj[`header${i}`] ||
        textSectionObj[`subheader${i}`] ||
        `${processTitle} — Section ${i}`;
      const paragraphs = [
        textSectionObj[`text${i}`],
        textSectionObj[`subtext${i}`]
      ].filter(Boolean);
      textSections.push({ id: i, title, paragraphs });
      i++;
    }
  }

  const optRaw = (key, fallback = null) => {
    try {
      const v = t.raw(key);
      return v ?? fallback;
    } catch {
      return fallback;
    }
  };

  const variantHeader = optRaw(
    `${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.variants.title`,
    ""
  );
  const variantText = optRaw(
    `${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.variants.text`,
    ""
  );

  /* ---------- breadcrumbs ---------- */

  const productLabel =
    PRODUCT_LABEL[lang]?.[productKey] || productSlug;
  const cutLabel =
    CUT_LABEL[lang]?.[cutKey] || cutKey;

  const items = [
    {
      label: locale.startsWith("tr") ? "Traverten" : "Travertine",
      href: `/${locale}/${baseSegment}`
    },
    {
      label: productLabel,
      href: `/${locale}/${baseSegment}/${productSlug}`
    },
    {
      label: cutLabel,
      href: `/${locale}/${canonicalCutSlug}`
    },
    {
      label: processSlugLocalized,
      href: `/${locale}/${canonicalProcessSlug}-${canonicalCutSlug}`
    }
  ];

  /* ---------- OtherOptions için diğer process kartları ---------- */

  const ALL_PROCS_EN = [
    "filled-polished",
    "filled-honed",
    "filled-brushed",
    "filled-tumbled",
    "unfilled-honed",
    "unfilled-brushed",
    "unfilled-tumbled",
    "unfilled-natural"
  ];

  const otherProcKeysEN = ALL_PROCS_EN
    .filter((p) => p !== lookupProcKey)
    .slice(0, 3);

  const COLOR_PRIORITY = ["ivory", "light", "antico"];
  const colorKeyList = colorKeys();

  const colorTriplet = COLOR_PRIORITY.map((enKey) => {
    const slug = colorSlugFor(locale, enKey);
    const label = colorLabelFor(locale, enKey);
    return { key: enKey, slug, label };
  }).slice(0, 3);

  function combinedKeyFromEn(enCombo) {
    if (!enCombo) return null;
    const s = String(enCombo).trim();
    if (s === "natural" || s === "unfilled-natural")
      return "unfilled:natural";
    const [fi, pr] = s.split("-");
    return `${fi}:${pr}`;
  }

  function processThumbFor(enCombo) {
    const cKey = combinedKeyFromEn(enCombo);
    return (
      IMAGE_BY_PRODUCT?.[productKey]?.processThumbs?.[cutKey]?.[cKey] ||
      PROCESS_THUMB_BY_COMBINED?.[cKey] ||
      heroSrc
    );
  }

  function sizeThumbForSize(sizeSlug) {
    const isSizeDrivenLocal =
      productKey === "tiles" || productKey === "pavers";
    if (!isSizeDrivenLocal) return null;

    const cKey = combinedKeyFromEn(lookupProcKey);
    const cutNode =
      IMAGE_BY_PRODUCT?.[productKey]?.colorThumbs?.[cutKey]?.[cKey];
    if (!cutNode) return null;

    const sizeNode = cutNode[sizeSlug];
    if (!sizeNode || typeof sizeNode !== "object") return null;

    const P = ["ivory", "light", "antico"];
    for (const ck of P) {
      const v = sizeNode[ck];
      if (v) return pickFirst(v);
    }

    const firstKey = Object.keys(sizeNode)[0];
    return firstKey ? pickFirst(sizeNode[firstKey]) : null;
  }

  const otherProcessCards = otherProcKeysEN.map((enCombo) => {
    const procTitle = friendlyProcessLabel(enCombo, locale);
    const targetProcessSlug = procSlugForLocaleFn(locale, enCombo);
    const img = processThumbFor(enCombo);

    const firstColor = colorTriplet[0];
    const buttonHref = buildSeoColorPath(
      locale,
      productKey,
      cutSlug,
      targetProcessSlug,
      firstColor.key
    );

    const textJsx = (
      <>
        {locale.startsWith("tr") ? "Renkler: " : "Colors: "}
        {colorTriplet.map((c, idx) => {
          const href = buildSeoColorPath(
            locale,
            productKey,
            cutSlug,
            targetProcessSlug,
            c.key
          );
          return (
            <React.Fragment key={`${enCombo}-${c.key}`}>
              <Link
                href={href}
                className="text-teal-700 hover:underline"
              >
                {c.label}
              </Link>
              {idx < colorTriplet.length - 1 ? " · " : ""}
            </React.Fragment>
          );
        })}
      </>
    );

    return {
      title: procTitle,
      textJsx,
      img,
      href: {
        pathname: buttonHref
      }
    };
  });

  /* ---------- ölçü (tiles/pavers) ---------- */

  const isSizeDriven =
    productKey === "tiles" || productKey === "pavers";

  const sizeSlugListForThisProduct =
    productKey === "tiles"
      ? TILE_SIZE_SLUGS_TILES
      : productKey === "pavers"
      ? TILE_SIZE_SLUGS_PAVERS
      : [];

  const sizeLinkPatterns = isSizeDriven
    ? sizeSlugListForThisProduct
        .filter(Boolean)
        .map((sizeSlug) => {
          const [w, h] = String(sizeSlug).split("x");
          if (!w || !h) return null;
          return {
            pattern: new RegExp(
              `${escapeRegExp(w)}["″']?\\s*x\\s*${escapeRegExp(
                h
              )}["″']?`,
              "gi"
            ),
            href: `/${locale}/${sizeSlug}-${canonicalProcessSlug}-${canonicalCutSlug}`
          };
        })
        .filter(Boolean)
    : [];

  const sizeCards = isSizeDriven
    ? sizeSlugListForThisProduct.map((sizeSlug) => {
        const title = tileSizeLabelForLocale(locale, sizeSlug);
        const seoPath = `/${sizeSlug}-${canonicalProcessSlug}-${canonicalCutSlug}`;
        const href = seoPath;
        const imgFromColorThumbs = sizeThumbForSize(sizeSlug);
        const img =
          imgFromColorThumbs ||
          processThumbFor(lookupProcKey) ||
          heroSrc;

        return {
          slug: sizeSlug,
          vKey: sizeSlug,
          title,
          href,
          img
        };
      })
    : [];

  /* ---------- META & CANONICAL ---------- */

  const metaTitleKey = `${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.metaTitle`;
  const metaDescKey = `${productKey}.cuts.${cutKey}.processes.${lookupProcKey}.metaDesc`;

  const metaTitle = safe(() => {
    if (typeof t.has === "function" && t.has(metaTitleKey)) {
      return t(metaTitleKey);
    }
    return `${processTitle} · ${cutTitle} · ${productTitle}`;
  }, `${processTitle} · ${cutTitle} · ${productTitle}`);

  const metaDesc = safe(() => {
    if (typeof t.has === "function" && t.has(metaDescKey)) {
      return t(metaDescKey);
    }
    return processIntro || productIntro;
  }, processIntro || productIntro);

  const canonical = `https://majen.com.tr/${locale}/${canonicalProcessSlug}-${canonicalCutSlug}`;

  /* ---------- render ---------- */

  return (
    <main className="py-6 mt-[22px] lg:mt-7 overflow-x-hidden text-center w-full">
      <Head>
        <title>{metaTitle}</title>
        {metaDesc ? (
          <meta name="description" content={metaDesc} />
        ) : null}
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroSrc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={heroSrc} />
      </Head>

      {/* INTRO */}
      <ProductIntroSection
        title={
          processNode.h1 ||
          `${productTitle} · ${cutTitle} · ${processTitle}`
        }
        intro={processIntro}
        title2={processNode.title2 || undefined}
        intro2={processNode.intro2 || undefined}
        span={span || ""}
        heroSrc={heroSrc}
        alt={heroAlt}
        prefix={prefix}
        baseHref={`${prefix}/${baseSegment}`}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={
          locale.startsWith("tr") ? "Traverten" : "Travertine"
        }
        depth={3}
      />

      <BreadcrumbsExact
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        selectedSegments={selectedSegments}
        className="mt-6"
        items={items}
      />

      {/* INFO CARDS */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto w-[95%]">
        {cards.map((c, i) => {
          const plain =
            typeof c.content === "string"
              ? c.content
              : Array.isArray(c.content)
              ? c.content.join(", ")
              : "";

          return (
            <InfoCard
              key={i}
              title={c.title}
              contentClassName={cardTextClass}
            >
              {i === 1 ? (
                <InlineLinks
                  text={plain}
                  patterns={linkPatterns}
                  textClassName={cardTextClass}
                  linkClassName="font-semibold"
                />
              ) : i === 2 && isSizeDriven ? (
                <InlineLinks
                  text={plain}
                  patterns={sizeLinkPatterns}
                  textClassName={cardTextClass}
                  linkClassName="font-semibold"
                />
              ) : (
                <span className={cardTextClass}>{plain}</span>
              )}
            </InfoCard>
          );
        })}
      </section>

     <section id="product-intro">
       <h2 className="text-[22px] lg:text-[24px] font-semibold mt-12">
        {variantHeader}
      </h2>
      <p className="text-[12px] lg:text-[14px] mt-3 leading-tight lg:leading-[140%] w-[90%] max-w-[1200px] mx-auto -mb-2">
        {variantText}
      </p>

      {/* COLOR / SIZE SEÇİMİ */}
      <VariantCircleSection
        heading={
          isSizeDriven
            ? locale.startsWith("tr")
              ? "Mevcut Ölçüler"
              : "Available Sizes"
            : `${processTitle} ${
                locale.startsWith("tr") ? "Renkleri" : "Colors"
              }`
        }
        variantCards={isSizeDriven ? sizeCards : colorCards}
        imgMap={isSizeDriven ? { cover: heroSrc } : colorImgMap}
        heroSrc={heroSrc}
        IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
        productKey={isSizeDriven ? `${productKey}-sizes` : "color"}
      />
     </section>

      {/* METİN BLOKLARI */}
      {textSections.length > 0 &&
        textSections.map(({ id, title, paragraphs }) => (
          <TextSection
            key={id}
            title={title}
            paragraphs={paragraphs}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"
          />
        ))}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <div id="faq" className="max-w-5xl mx-auto mt-12">
          <QuestionsSection items={faqItems} span={cutTitle} />
        </div>
      )}

      <SocialMediaSection />
      <ContactFrom />

      <OtherOptions
        locale={locale}
        heading={
          locale.startsWith("tr") ? "Diğer İşlemler" : "Other Processes"
        }
        customItems={otherProcessCards}
        gridClassName="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center"
      />
    </main>
  );
}
