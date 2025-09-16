// components/common/InlineLinks.jsx
"use client";
import Link from "next/link";
import React from "react";

/**
 * text: string
 * patterns: Array<{ pattern: RegExp, href: string, className?: string, ariaLabel?: string }>
 */
export default function InlineLinks({ text, patterns = [], linkClassName = "text-blue-600 hover:underline" }) {
  if (!text || !patterns.length) return <>{text}</>;

  // Tüm pattern'ları tek bir büyük RegExp'te birleştir (global + case-insensitive)
  const big = new RegExp(patterns.map(p => `(${p.pattern.source})`).join("|"), "gi");

  const nodes = [];
  let lastIndex = 0;
  let match;

  while ((match = big.exec(text)) !== null) {
    const start = match.index;
    const end = big.lastIndex;

    // eşleşmeden önceki düz metin
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

    // hangi pattern eşleşti?
    const matchedText = match[0];
    const p = patterns.find(pat => new RegExp(`^${pat.pattern.source}$`, "i").test(matchedText)) || patterns[0];

    nodes.push(
      <Link key={`${start}-${end}`} href={p.href} className={p.className || linkClassName} aria-label={p.ariaLabel || matchedText}>
        {matchedText}
      </Link>
    );
    lastIndex = end;
  }

  // son kuyruk
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <>{nodes}</>;
}