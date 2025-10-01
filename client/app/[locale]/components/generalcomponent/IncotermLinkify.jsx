// app/[locale]/components/IncotermLinkify.jsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function IncotermLinkify({ text = "", className = "" }) {
  const locale = useLocale();
  const prefix = `/${locale}`;
  const exportBase = locale === "tr" ? "nasıl-ihracat-yapıyoruz" : "how-we-export";

  const re = /\b(FOB|CIF|EXW)\b/gi;
  const out = [];
  let last = 0, m, i = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const word = m[0];                      // orijinal yazımı koru
    const key  = word.toUpperCase();        // route için normalize
    const href = `${prefix}/${exportBase}/${key.toLowerCase()}`;

    out.push(
      <Link key={`${key}-${m.index}-${i++}`} href={href}
        className="text-teal-700 underline underline-offset-4 hover:no-underline">
        {word}
      </Link>
    );
    last = m.index + word.length;
  }
  if (last < text.length) out.push(text.slice(last));

  return <span className={className}>{out}</span>;
}
