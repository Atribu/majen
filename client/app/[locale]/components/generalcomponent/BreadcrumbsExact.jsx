// app/components/navigation/BreadcrumbsExact.jsx
"use client";

import React from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * Verdiğin breadcrumb markup'ının birebir component hali.
 *
 * Props:
 * - prefix: string                → "/" | "/tr" | "/en"
 * - baseHref: string              → "/tr/travertines" | "/en/travertines"
 * - crumbHome: string             → "Ana Sayfa" | "Home"
 * - crumbProducts: string         → "Travertine(s)" (pathname ile aynı yazım)
 * - segments: string[]            → ek path parçaları (URL’den türetilmiş)
 * - className?: string            → dış wrapper (nav container) için ek sınıf
 */
export default function BreadcrumbsExact({
  prefix,
  baseHref,
  crumbHome,
  crumbProducts,
  segments = [],
   selectedSegments,
  className = "px-1 sm:px-3 mb-2",
}) {
  return (
    <div className={className}>
     <nav aria-label="breadcrumb" className="max-w-6xl mx-auto">
      <div className="rounded-xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm ring-1 ring-black/5 px-3 py-2 md:px-4 md:py-2">
        <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-neutral-700">
          {/* HOME */}
          <li className="flex items-center">
            {/* Home icon */}
            <svg viewBox="0 0 20 20" aria-hidden="true" className="mr-1 h-4 w-4 text-neutral-500">
              <path d="M10 3.2 3 8.3v8.5h5.2v-4.2h3.6v4.2H17V8.3L10 3.2z" fill="currentColor" />
            </svg>

            <Link
              href={prefix}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition"
            >
              {crumbHome}
            </Link>

            {/* Chevron */}
            <svg viewBox="0 0 20 20" aria-hidden="true" className="mx-1 h-4 w-4 text-neutral-400">
              <path d="M7.5 3.5 13 10l-5.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </li>

          {/* SECTION */}
          <li className="flex items-center">
            <Link
              href={baseHref}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition"
            >
              {crumbProducts}
            </Link>
          </li>
          {selectedSegments.map((seg, i) => (
                <React.Fragment key={i}>
                  <li><svg viewBox="0 0 20 20" aria-hidden="true" className="mx-1 h-4 w-4 text-neutral-400">
              <path d="M7.5 3.5 13 10l-5.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg></li>
                  <li className="capitalize px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition">{seg}</li>
                </React.Fragment>
              ))}
        </ol>
      </div>
    </nav>
    </div>
  );
}
