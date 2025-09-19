"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import PlusSvg from "./PlusSvg";

const QuestionsSection = ({ color = "#0B0B0B", span, items  }) => {
  const t = useTranslations("QuestionsSection");

 
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-[70px] lg:gap-[168px] font-inter mt-20 z-[99]">
      <div className="flex flex-col w-[100%] lg:w-[50%] items-center justify-center text-center gap-[10px] lg:gap-[16px]">
        <h4
          className="text-[20px] md:text-[22px] lg:text-[26px] font-bold leading-[120%] -tracking-[0.64px] mb-[16px]"
          style={{ color }}>
          {t("aboutpage_s4_faq_header1")}{"-"} {span}
          {/* <span className="bg-gradient-to-r from-[#312d2d] to-[#5b5656] bg-clip-text text-transparent">
            {t("aboutpage_s4_faq_span1")}
          </span> */}
        </h4>

        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`text-left flex flex-col overflow-hidden transition-[max-height,transform] duration-700 ease-in-out
                        px-[20px] lg:px-[32px] py-[14.5px] w-[90%] md:w-[600px]
                        border gradient-border-button rounded-[20px]
                        !text-[10px] lg:!text-[16px] !font-normal leading-[140%] -tracking-[0.32px]`}
            style={{
              color,
              maxHeight: open === i ? 260 : 52,
              transform: open === i ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            <div className="flex w-full justify-between items-start">
              <h5 className="flex whitespace-nowrap text-[14px] md:text-[16px] lg:text-[18px]">{it.q}</h5>
              <PlusSvg
                className={`transition-transform duration-500 ${
                  open === i ? "rotate-180" : "rotate-0"
                }`}
                width={19}
                height={18}
              />
            </div>

            <div className="flex items-start text-start justify-center mt-4">
              <p className="w-[98%] text-[12px] lg:text-[14px]">{it.a}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionsSection;
