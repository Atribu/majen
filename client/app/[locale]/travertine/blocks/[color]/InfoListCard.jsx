"use client";

import React from "react";
import Link from "next/link";

/**
 * title: string
 * items: string[]  // "Label:* description" formatı da desteklenir
 * prefix: string   // örn: "/tr" veya "/en" (opsiyonel). Yoksa "" kullanılır.
 */
export default function InfoListCard({ title, items = [], prefix = "" }) {
  const linkifyIncoterms = (text) => {
    if (!text) return null;
    const regex = /\b(FOB|CIF|EXW)\b/gi;  // büyük/küçük duyarsız
    const parts = String(text).split(regex);

    return parts.map((part, i) => {
      if (/^FOB$/i.test(part)) {
        return (
          <Link key={i} href={`${prefix}/how-we-export/fob`} className="underline underline-offset-2">
            {part}
          </Link>
        );
      }
      if (/^CIF$/i.test(part)) {
        return (
          <Link key={i} href={`${prefix}/how-we-export/cif`} className="underline underline-offset-2">
            {part}
          </Link>
        );
      }
      if (/^EXW$/i.test(part)) {
        return (
          <Link key={i} href={`${prefix}/how-we-export/exw`} className="underline underline-offset-2">
            {part}
          </Link>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      {title ? <h3 className="text-base font-semibold mb-3">{title}</h3> : null}
      <ul className="space-y-2">
        {items.map((raw, i) => {
          // "Label:* description" --> <strong>Label:</strong> description
          const [label, rest] = String(raw).split(":*");

          return (
            <li key={i} className="text-sm text-neutral-800 leading-relaxed">
              {rest ? (
                <>
                  <strong className="font-semibold">{label.trim()}:</strong>{" "}
                  <span className="text-neutral-700">
                    {linkifyIncoterms(rest.trim())}
                  </span>
                </>
              ) : (
                <span className="text-neutral-700">
                  {linkifyIncoterms(raw)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
