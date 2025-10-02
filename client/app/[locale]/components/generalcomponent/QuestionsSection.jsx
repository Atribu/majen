// app/[locale]/components/generalcomponent/QuestionsSection.jsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import PlusSvg from "./PlusSvg";

const QuestionsSection = ({
  color = "#0B0B0B",
  span,
  items = [],
  linkMap, // { FOB: "/...", CIF: "/...", EXW: "/..." } opsiyonel
}) => {
  const t = useTranslations("QuestionsSection");
  const locale = useLocale();

  // Varsayılan haritalama (prop verilmezse)
  const base = locale?.startsWith("tr") ? "/howweexport" : "/howweexport";
  const defaultMap = {
    FOB: `${base}/fob`,
    CIF: `${base}/cif`,
    EXW: `${base}/exw`,
  };
  const map = { ...defaultMap, ...(linkMap || {}) };

  // Metin içindeki terimleri linke çevir
  const linkify = (text) => {
    if (!text || typeof text !== "string") return text;

    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const keys = Object.keys(map);
    if (!keys.length) return text;

    // Kelime sınırıyla (word boundary) büyük/küçük harf duyarsız eşleşme
    const re = new RegExp(`\\b(${keys.map(escape).join("|")})\\b`, "gi");

    const out = [];
    let last = 0;

    text.replace(re, (match, _g, idx) => {
      if (idx > last) out.push(text.slice(last, idx));
      // Hangi anahtarla eşleştiğini case-insensitive bul
      const key = keys.find((k) => k.toLowerCase() === match.toLowerCase());
      const href = map[key];
      out.push(
        <Link
          key={`${idx}-${match}`}
          href={href}
         className="underline text-teal-700 hover:decoration-solid mx-1 inline-block"
        >
        {match.toUpperCase()} 
        </Link>
      );
      last = idx + match.length;
      return match;
    });

    if (last < text.length) out.push(text.slice(last));
    return out;
  };

  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-[70px] lg:gap-[168px] font-inter mt-10 lg:mt-20 z-[99]">
      <div className="flex flex-col w-[100%] lg:w-[50%] items-center justify-center text-center gap-[10px] lg:gap-[16px]">
        <h4
          className="text-[20px] md:text-[22px] lg:text-[26px] font-bold leading-[120%] -tracking-[0.64px] mb-[16px] capitalize"
          style={{ color }}
        >
          {t("aboutpage_s4_faq_header1")}{" - "}{span}
        </h4>

        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`text-left flex flex-col overflow-hidden transition-[max-height,transform] duration-700 ease-in-out
                        px-[12px] lg:px-[32px] py-[15.5px] w-[92%] md:w-[600px]
                        border gradient-border-button rounded-[20px]
                        !text-[10px] lg:!text-[16px] !font-normal leading-[140%] -tracking-[0.32px]`}
            style={{
              color,
              maxHeight: open === i ? 260 : 52,
              transform: open === i ? "translateY(0)" : "translateY(-10px)",
            }}
            aria-expanded={open === i}
          >
            <div className="flex w-full justify-between items-start">
              <h5 className="flex whitespace-nowrap text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                {linkify(it.q)}
              </h5>
              <PlusSvg
                className={`transition-transform duration-500 ${open === i ? "rotate-180" : "rotate-0"}`}
                width={19}
                height={18}
              />
            </div>

            <div className="flex items-start text-start justify-center mt-4">
              <p className="w-[98%] text-[12px] lg:text-[14px]">
                {linkify(it.a)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionsSection;
