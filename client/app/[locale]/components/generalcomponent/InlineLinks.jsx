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
  linkClassName = "text-blue-600 hover:underline",
}) {
  if (!text || !patterns.length) {
    return <span className={textClassName}>{text}</span>;
  }

  // Tüm pattern'ları tek bir RegExp'te birleştir
  const big = new RegExp(
    patterns.map((p) => `(${p.pattern.source})`).join("|"),
    "gi"
  );

  const nodes = [];
  let lastIndex = 0;
  let match;

  while ((match = big.exec(text)) !== null) {
    const start = match.index;
    const end = big.lastIndex;

    // Eşleşmeden önceki düz metin
    if (start > lastIndex) {
      nodes.push(
        <span key={`text-${start}`} className={textClassName}>
          {text.slice(lastIndex, start)}
        </span>
      );
    }

    // Hangi pattern eşleşti?
    const matchedText = match[0];
    const matchedPat =
      patterns.find((pat) =>
        new RegExp(`^${pat.pattern.source}$`, "i").test(matchedText)
      ) || patterns[0];

    // Link: metin stilini (font/leading) koru + link stilini ekle
    const linkCls = `${textClassName} ${matchedPat.className || linkClassName}`;

    nodes.push(
      <Link
        key={`link-${start}-${end}`}
        href={matchedPat.href}
        aria-label={matchedPat.ariaLabel || matchedText}
        className={linkCls}
      >
        {matchedText}
      </Link>
    );

    lastIndex = end;
  }

  // Son kalan düz metin
  if (lastIndex < text.length) {
    nodes.push(
      <span key={`text-last`} className={textClassName}>
        {text.slice(lastIndex)}
      </span>
    );
  }

  return <>{nodes}</>;
}
