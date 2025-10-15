// app/components/navigation/BreadcrumbsExact.jsx
"use client";

import React from "react";
import Link from "next/link";

export default function BreadcrumbsExact({
  prefix,
  baseHref,
  crumbHome,
  crumbProducts,
  segments = [],
  selectedSegments,
  className = "px-1 sm:px-3 mb-2",
  items,               // ⬅️ YENİ: doğrudan verilecek kırıntılar [{label, href}]
}) {
  // Yardımcı: tek bir crumb render’ı
  const Crumb = ({ label, href, current }) =>
    current ? (
      <span aria-current="page" className="capitalize px-2.5 py-1 rounded-full bg-white border border-neutral-200">
        {label}
      </span>
    ) : (
      <Link
        href={href}
        className="capitalize px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition"
      >
        {label}
      </Link>
    );

  // Chevron
  const Sep = () => (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="mx-1 h-4 w-4 text-neutral-400">
      <path d="M7.5 3.5 13 10l-5.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  // Eğer items verildiyse, onları birebir çiz
  if (Array.isArray(items) && items.length) {
    return (
      <div className={className}>
        <nav aria-label="breadcrumb" className="max-w-6xl mx-auto w-[98%]">
          <div className="rounded-xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm ring-1 ring-black/5 px-3 py-2 md:px-4 md:py-2">
            <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-neutral-700">
              {/* Home */}
              <li className="flex items-center">
                <svg viewBox="0 0 20 20" aria-hidden="true" className="mr-1 h-4 w-4 text-neutral-500">
                  <path d="M10 3.2 3 8.3v8.5h5.2v-4.2h3.6v4.2H17V8.3L10 3.2z" fill="currentColor" />
                </svg>
                <Crumb label={crumbHome} href={prefix} />
              </li>

              {/* Diğer kırıntılar */}
              {items.map((it, i) => (
                <React.Fragment key={i}>
                  <li><Sep /></li>
                  <li><Crumb label={it.label} href={it.href} current={i === items.length - 1} /></li>
                </React.Fragment>
              ))}
            </ol>
          </div>
        </nav>
      </div>
    );
  }

  // ⬇️ ESKİ DAVRANIŞ (fallback)
  return (
    <div className={className}>
      <nav aria-label="breadcrumb" className="max-w-6xl mx-auto w-[98%]">
        <div className="rounded-xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm ring-1 ring-black/5 px-3 py-2 md:px-4 md:py-2">
          <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-neutral-700">
            {/* HOME */}
            <li className="flex items-center">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="mr-1 h-4 w-4 text-neutral-500">
                <path d="M10 3.2 3 8.3v8.5h5.2v-4.2h3.6v4.2H17V8.3L10 3.2z" fill="currentColor" />
              </svg>
              <Link href={prefix} className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition">
                {crumbHome}
              </Link>
              <Sep />
            </li>

            {/* SECTION (eski mantık) */}
            {(() => {
              const baseLink = (baseHref?.startsWith('/')) ? baseHref : `${prefix}/${baseHref ?? ''}`.replace(/\/+/g, '/');
              const rawSegs = Array.isArray(selectedSegments) ? selectedSegments : (segments || []);
              const baseNames = new Set([
                String(baseHref || '').toLowerCase(),
                'travertine','travertines','traverten','travertenler'
              ]);
              const segs = rawSegs.filter(Boolean).map(s => String(s).trim()).filter(s => !baseNames.has(s.toLowerCase()));
              const parts = [baseLink];

              return (
                <>
                  <li className="flex items-center">
                    <Link href={baseLink} className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition">
                      {crumbProducts}
                    </Link>
                  </li>
                  {segs.map((seg, i) => {
                    const href = `${parts[parts.length - 1]}/${seg}`.replace(/\/+/g, '/');
                    parts.push(href);
                    const isLast = i === segs.length - 1;
                    const label = seg.replace(/-/g, ' ');
                    return (
                      <React.Fragment key={`${seg}-${i}`}>
                        <li><Sep /></li>
                        <li>
                          {isLast ? (
                            <span aria-current="page" className="capitalize px-2.5 py-1 rounded-full bg-white border border-neutral-200">{label}</span>
                          ) : (
                            <Link href={href} className="capitalize px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 transition">
                              {label}
                            </Link>
                          )}
                        </li>
                      </React.Fragment>
                    );
                  })}
                </>
              );
            })()}
          </ol>
        </div>
      </nav>
    </div>
  );
}
