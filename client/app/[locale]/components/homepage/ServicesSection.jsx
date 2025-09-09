// app/components/KeyFeatures.jsx
"use client";
import React, {useState, useEffect} from "react";
import { useTranslations } from "next-intl";
import {
  FaRulerCombined,
  FaPalette,
  FaCubes,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import light from "@/public/images/slabs/light.webp";
import ServiceBlocks from "./blocksComponents/ServiceBlocks";

const ICONS = {
  quality: FaRulerCombined,
  design: FaPalette,
  range: FaCubes,
  custom: FiSettings,
  sustain: FaLeaf,
  expert: FaUserTie,
};

// Sıra/öğe sayısını buradan yönetebilirsin
const FEATURE_KEYS = ["quality", "design", "range", "custom", "sustain", "expert"];

export default function KeyFeatures() {
  const t = useTranslations("KeyFeatures");

   const [blocksOrder, setBlocksOrder] = useState([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
      ]);

       useEffect(() => {
        const interval = setInterval(() => {
          // setGradientIndex((prev) => (prev === 7 ? 0 : prev + 1));
          // set blocks order
          // after one full cyle stop the interval
    
          setBlocksOrder((prev) => {
            // if (prev[0] == 1) {
            //   clearInterval(interval);
            //   return prev;
            // }
            const newOrder = [...prev];
            newOrder.unshift(newOrder.pop());
            return newOrder;
          });
        }, 1500);
        return () => clearInterval(interval);
      }, []);

          
      const blockPositions = {
        0: "-translate-y-1/2 z-[5] translate-x-[43px]",
        1: "-translate-y-[calc(50%-80px)] z-[10] -translate-x-[18px]",
        2: "-translate-y-[calc(50%-160px)] z-[50] -translate-x-[82px]",
        3: "-translate-y-[calc(50%-80px)] z-[70] -translate-x-[146px]",
        4: "-translate-y-1/2 z-[80] -translate-x-[210px]",
        5: "-translate-y-[calc(50%+80px)] z-[60]  -translate-x-[146px]",
        6: "-translate-y-[calc(50%+160px)] z-[40] -translate-x-[82px]",
        7: "-translate-y-[calc(50%+80px)] z-[20]  -translate-x-[18px]",
      };

  return (
    <section className="relative overflow-hidden  text-black py-16 sm:py-20 lg:py-8 max-h-[700px]"  style={{
    backgroundImage: "url('/images/homepage/anasayfa2.webp')",
    backgroundSize: "cover",       // resmi kırpmadan kaplar
    backgroundPosition: "center",  // ortalar
    backgroundRepeat: "no-repeat", // tekrar etmez
  }}>
      {/* Arkaplan efektleri */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />
        <div className="absolute inset-0" />
      </div> */}

 <div className='hidden md:flex h-full min-h-[700px] lg:w-[25%] items-center justify-start overflow-hidden'>
           <ServiceBlocks blocksOrder={blocksOrder} rotate={false}
          blockPositions={blockPositions}/>
        </div>
      
      {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center items-center justify-center flex flex-col">
       
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-black">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          {t("titlePrefix")}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{t("titleAccent")}</span>
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-white/80 to-white/10" />
          </span>
        </h2>

       
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURE_KEYS.map((key) => {
            const Icon = ICONS[key];
            return (
              <article
                key={key}
                className="group h-full rounded-xl  p-6 sm:p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] will-change-transform hover:-translate-y-0.5"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg ">
                  <Icon className="h-6 w-6 text-black" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-black leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>

                <div className="mt-6 h-[2px] w-12 bg-white/60 transition-[width] duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div> */}
    </section>
  );
}
