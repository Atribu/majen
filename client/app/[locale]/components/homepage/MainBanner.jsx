"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoWhite from "@/public/images/logobeyaz.webp";
import cornerImage from "@/public/images/solalt.jpg"; // ✅ EKLE
import fuar2 from "@/public/images/fuar2.jpeg";
import fuar3 from "@/public/images/fuar3.jpeg";

export default function MainBanner() {
  const videoSrc = "/videos/desktop.mp4"; 
  const videomobileSrc = "/videos/mobile.mp4"; 
  const HIDE_DELAY_MS = 5000;
  const ROTATE_MS = 3500;
  const fuarImages = [fuar2, fuar3];

  const [showLogo, setShowLogo] = useState(true);
  const [fuarIndex, setFuarIndex] = useState(0);
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

  useEffect(() => {
    const id = setInterval(() => {
      setFuarIndex((i) => (i + 1) % fuarImages.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [fuarImages.length]);

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

      {/* ✅ Sol alt köşe resim + mobil üst bindirme */}
      <div className="absolute left-4 bottom-4 z-30">
        <div className="relative inline-block">
          <Image
            src={cornerImage}
            alt="Corner image"
            className="w-52 sm:w-70 lg:w-120 h-auto drop-shadow-lg"
            priority
          />

          <div className="absolute left-0 bottom-full mb-3 z-10 rounded-md bg-white/88 p-1.5 shadow-xl ring-1 ring-white/40 backdrop-blur-sm md:hidden">
            <Image
              src={fuarImages[fuarIndex]}
              alt={`Fuar ${fuarIndex + 2}`}
              className="w-32 h-auto drop-shadow-lg xs:w-36 sm:w-40"
              priority
            />
          </div>
        </div>
      </div>

      {/* ✅ Desktop: sağ alt köşe */}
      <div className="absolute right-3 bottom-3 z-30 bg-white/85 backdrop-blur-sm p-1.5 rounded-md shadow-lg ring-1 ring-white/40 hidden md:block">
        <Image
          src={fuarImages[fuarIndex]}
          alt={`Fuar ${fuarIndex + 2}`}
          className="w-40 sm:w-56 lg:w-72 h-auto drop-shadow-lg"
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
