// app/components/MainBanner.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoWhite from "@/public/images/logobeyaz.webp";

export default function MainBanner() {
  const videoSrc = "/videos/newmajendesktop.mp4"; // public/videos altında
  const videomobileSrc = "/videos/newmajenmobile.mp4"; 
  const HIDE_DELAY_MS = 5000; // ⏱️ Logo görünme süresi

  const [showLogo, setShowLogo] = useState(true);
  const startedRef = useRef(false);
  const timerRef = useRef(null);
  const backupTimerRef = useRef(null);

  // Yedek zamanlayıcı (bazı cihazlarda canplay gecikebilir)
  useEffect(() => {
    backupTimerRef.current = setTimeout(() => setShowLogo(false), HIDE_DELAY_MS + 2000);
    return () => {
      clearTimeout(backupTimerRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  const startHideTimer = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    clearTimeout(backupTimerRef.current);
    timerRef.current = setTimeout(() => setShowLogo(false), HIDE_DELAY_MS);
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Arka plan video — merkezden kırp */}
      <video
        src={videomobileSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={startHideTimer}
        onCanPlay={startHideTimer}
        className="absolute inset-0 w-full h-full object-cover object-center flex md:hidden"
      />

       <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={startHideTimer}
        onCanPlay={startHideTimer}
        className="absolute inset-0 w-full h-full object-cover object-center md:flex hidden"
      />

      {/* Hafif siyah overlay */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      {/* Merkezde beyaz logo — 5 sn sonra fade-out */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none
        transition-opacity duration-700 ${showLogo ? "opacity-100" : "opacity-0"}`}
      >
        <Image
          src={logoWhite}
          alt="Majen logo"
          className="w-40 sm:w-56 lg:w-72 h-auto drop-shadow-xl"
          priority
        />
      </div>
    </section>
  );
}
