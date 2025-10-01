"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Script from "next/script";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function TextSection({
  title,
  title2,
  text2,
  paragraphs = [],
  schema,
  className = "",
  clampMobile = 2,      // mobilde gösterilecek paragraf sayısı (0 = tamamı)
  as: As = "section",
}) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const locale = useLocale();

  // locale'e göre doğru base
  const prefix = `/${locale}`;
  const exportBase = locale === "tr" ? "nasıl-ihracat-yapıyoruz" : "how-we-export";

  // Metindeki FOB/CIF/EXW'yi linke çevir
  const renderWithIncotermLinks = useCallback((text = "") => {
    const pattern = /\b(FOB|CIF|EXW)\b/g; // büyük/küçük duyarsızlık için 'i' de ekleyebilirsin
    const nodes = [];
    let last = 0;
    let m;
    let k = 0;

    while ((m = pattern.exec(text)) !== null) {
      if (m.index > last) nodes.push(text.slice(last, m.index));
      const token = m[1].toUpperCase();
      const href = `${prefix}/${exportBase}/${token.toLowerCase()}`;
      nodes.push(
        <Link
          key={`incoterm-${k++}-${m.index}`}
          href={href}
          className="text-teal-700 underline underline-offset-4 hover:no-underline"
        >
          {token}
        </Link>
      );
      last = m.index + token.length;
    }
    if (last < text.length) nodes.push(text.slice(last));
    return nodes;
  }, [prefix, exportBase]);

  // Yalnızca istemcide ölç: md breakpoint ~768px
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleParagraphs = useMemo(() => {
    if (isMobile && !expanded && clampMobile > 0) {
      return paragraphs.slice(0, clampMobile);
    }
    return paragraphs;
  }, [isMobile, expanded, paragraphs, clampMobile]);

  const hasMore = isMobile && clampMobile > 0 && paragraphs.length > clampMobile;

  const jsonLd =
    schema && (schema.type === "Article" || schema.type === "WebPage")
      ? {
          "@context": "https://schema.org",
          "@type": schema.type || "Article",
          headline: title,
          inLanguage: schema.lang || locale,
          url: schema.url,
          articleBody: paragraphs.join("\n\n"),
        }
      : null;

  return (
    <As
      className={`mx-auto w-full max-w-[1100px] px-5 md:px-8 lg:px-0 mb-4 lg:mb-[22px] text-center ${className}`}
      aria-label={title}
    >
      {jsonLd ? (
        <Script
          id={`seo-text-${title?.slice(0, 30).replace(/\s+/g, "-").toLowerCase()}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      {title ? (
        <h3 className="text-[20px] lg:text-[22px] font-bold tracking-tight text-neutral-900">
          {title}
        </h3>
      ) : null}

      <div className="mt-0 text-neutral-800 lg:leading-[1.85] text-[12px] md:text-[14px] leading-tight">
        {visibleParagraphs.map((p, i) => (
          <p key={i}>{renderWithIncotermLinks(String(p))}</p>
        ))}

        {title2 ? (
          <h4 className="text-[16px] md:text-[18px] lg:text-[18px] font-semibold tracking-tight text-black mt-2">
            {title2}
          </h4>
        ) : null}

        {text2 ? (
          <p className="mt-1 lg:mt-2 leading-tight lg:leading-normal text-[12px] md:text-[14px]">
            {renderWithIncotermLinks(String(text2))}
          </p>
        ) : null}

        {hasMore && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setExpanded((s) => !s)}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-900 hover:text-white transition text-center"
              aria-expanded={expanded}
              aria-controls="seo-more-content"
            >
              {expanded ? "Daha az göster" : "Devamını oku"}
              <span aria-hidden>{expanded ? "↑" : "↓"}</span>
            </button>
          </div>
        )}

        <div id="seo-more-content" className="sr-only" />
      </div>
    </As>
  );
}
