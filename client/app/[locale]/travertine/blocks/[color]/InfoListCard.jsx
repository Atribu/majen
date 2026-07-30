"use client";

import React from "react";

/**
 * title: string
 * items: string[]  // "Label:* description" formatı da desteklenir
 * prefix: string   // örn: "/tr" veya "/en" (opsiyonel). Yoksa "" kullanılır.
 */
export default function InfoListCard({ title, items = [] }) {
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
                    {rest.trim()}
                  </span>
                </>
              ) : (
                <span className="text-neutral-700">
                  {raw}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
