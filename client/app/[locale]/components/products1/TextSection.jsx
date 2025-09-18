 // app/components/seo/TextSection.jsx
"use client";
import React, { useState, useMemo } from "react";
import Script from "next/script";

/**
 * SEO odaklı metin bloğu
 * Props:
 * - title: string               // H2 başlık
 * - paragraphs: string[]        // Paragraflar
 * - schema?: { type?: "Article"|"WebPage", url?: string, lang?: string }
 * - className?: string
 * - clampMobile?: number        // mobilde kaç paragrafı açık tutalım (0 = hepsi)
 * - as?: keyof JSX.IntrinsicElements ("section","div"...)
 */
export default function TextSection({
  title,
  title2,
  text2,
  paragraphs = [],
  schema,
  className = "",
  clampMobile = 2,
  as: As = "section",
}) {
  const [expanded, setExpanded] = useState(false);

  const visibleParagraphs = useMemo(() => {
    if (expanded || clampMobile === 0) return paragraphs;
    return paragraphs.slice(0, clampMobile);
  }, [expanded, paragraphs, clampMobile]);

  const hasMore = clampMobile > 0 && paragraphs.length > clampMobile;

  // Basit Article/WebPage JSON-LD
  const jsonLd =
    schema && (schema.type === "Article" || schema.type === "WebPage")
      ? {
          "@context": "https://schema.org",
          "@type": schema.type || "Article",
          headline: title,
          inLanguage: schema.lang || "tr",
          url: schema.url,
          articleBody: paragraphs.join("\n\n"),
        }
      : null;

  return (
    <As
      className={`mx-auto w-full max-w-[1100px] px-5 md:px-8 lg:px-0 lg:mb-10 ${className}`}
      aria-label={title}
    >
      {jsonLd ? (
        <Script
          id={`seo-text-${title?.slice(0,30).replace(/\s+/g,"-").toLowerCase()}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      {title ? (
        <h4 className="text-[20px] md:text-[22px] lg:text-[26px] font-semibold tracking-tight text-neutral-900">
          {title}
        </h4>
      ) : null}

      <div className="mt-1 text-neutral-800 lg:leading-[1.85] text-[12px] md:text-[14px] lg:text-[16px] space-y-4 leading-tight ">
        {visibleParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {title2 ? (
        <h5 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium tracking-tight text-black">
          {title2}
        </h5>
      ) : null}

    {text2 ? (
         <p className="-mt-3 leading-tight lg:leading-normal text-[12px] md:text-[14px] lg:text-[16px]">{text2}</p>
      ) : null}
    

        {/* Mobilde 'devamını göster' */}
        {hasMore && (
          <div className="md:hidden pt-2">
            <button
              type="button"
              onClick={() => setExpanded((s) => !s)}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-900 hover:text-white transition"
              aria-expanded={expanded}
              aria-controls="seo-more-content"
            >
              {expanded ? "Daha az göster" : "Devamını oku"}
              <span aria-hidden>{expanded ? "↑" : "↓"}</span>
            </button>
          </div>
        )}

        {/* Erişilebilirlik için gizli alan kimliği (buton aria-controls) */}
        <div id="seo-more-content" className="sr-only" />
      </div>
    </As>
  );
}
