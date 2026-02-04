"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoWhite from "@/public/images/logobeyaz.webp";
import cornerImage from "@/public/images/solalt.jpg"; // ✅ EKLE

export default function MainBanner() {
  const videoSrc = "/videos/desktop.mp4"; 
  const videomobileSrc = "/videos/mobile.mp4"; 
  const HIDE_DELAY_MS = 5000;

  const [showLogo, setShowLogo] = useState(true);
  const startedRef = useRef(false);
  const timerRef = useRef(null);
  const backupTimerRef = useRef(null);

  useEffect(() => {
    backupTimerRef.current = setTimeout(() => setShowLogo(false), HIDE_DELAY_MS + 1000);
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

      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      {/* ✅ Sol alt köşe resim */}
      <div className="absolute left-4 bottom-4 z-30">
        <Image
          src={cornerImage}
          alt="Corner image"
          className="w-24 sm:w-32 lg:w-140 h-auto drop-shadow-lg"
          priority
        />
      </div>

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