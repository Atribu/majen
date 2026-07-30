// components/common/InlineLinks.jsx
"use client";
import Link from "next/link";
import React from "react";

/**
 * text: string
 * patterns: Array<{ pattern: RegExp, href: string, className?: string, ariaLabel?: string }>
 * textClassName: normal metin için className
 * linkClassName: linkler için ek className (renk/underline vs)
 */
export default function InlineLinks({
  text,
  patterns = [],
  textClassName = "text-[14px] leading-[110%] text-gray-700",
  linkClassName = "text-teal-700 hover:underline",
}) {
  const source = text || "";

  if (!source || !patterns.length) {
    return <span className={textClassName}>{source}</span>;
  }

  const parts = [];
  let index = 0;

  // Her seferinde global kopya üret (orijinal regex’i bozmamak için)
  const makeGlobal = (rx) =>
    new RegExp(rx.source, rx.flags.includes("g") ? rx.flags : rx.flags + "g");

  while (index < source.length) {
    let earliestMatch = null;
    let earliestPattern = null;

    // En erken başlayan match'i bul
    for (const p of patterns) {
      const rx = makeGlobal(p.pattern);
      rx.lastIndex = index;
      const m = rx.exec(source);
      if (!m) continue;

      if (!earliestMatch || m.index < earliestMatch.index) {
        earliestMatch = m;
        earliestPattern = p;
      }
    }

    // Hiç eşleşme yoksa kalan metni ekleyip bitir
    if (!earliestMatch) {
      parts.push(source.slice(index));
      break;
    }

    const start = earliestMatch.index;
    const matchedText = earliestMatch[0];

    // Match’ten önceki düz metin
    if (start > index) {
      parts.push(source.slice(index, start));
    }

    // Incoterm adları bilgi metnidir; yönlendirme bağlantısı oluşturma.
    if (/^(FOB|CIF|EXW)$/i.test(matchedText.trim())) {
      parts.push(matchedText);
    } else {
      parts.push(
        <Link
          key={`${start}-${matchedText}`}
          href={earliestPattern.href}
          aria-label={earliestPattern.ariaLabel || matchedText}
          className={
            (earliestPattern.className || linkClassName) +
            "" // parent span tipografiyi verecek
          }
        >
          {matchedText}
        </Link>
      );
    }

    index = start + matchedText.length;
  }

  // 🔹 Tek bir span içinde, aynı paragraf akışında
  return <span className={textClassName}>{parts}</span>;
}
