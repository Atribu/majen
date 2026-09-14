"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoWhite from "@/public/images/logobeyaz.webp";
import desktopPoster from "@/public/images/homepage/hero-desktop-poster.webp";
import mobilePoster from "@/public/images/homepage/hero-mobile-poster.webp";

const HIDE_DELAY_MS = 5000;
const DESKTOP_QUERY = "(min-width: 768px)";

const HERO_MEDIA = {
  desktop: {
    webm: "/videos/desktop.webm",
    mp4: "/videos/desktop.mp4",
    poster: desktopPoster.src,
  },
  mobile: {
    webm: "/videos/mobile.webm",
    mp4: "/videos/mobile.mp4",
    poster: mobilePoster.src,
  },
};

export default function MainBanner() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [showLogo, setShowLogo] = useState(true);
  const startedRef = useRef(false);
  const timerRef = useRef(null);
  const backupTimerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const selectMedia = () => {
      setActiveMedia(mediaQuery.matches ? HERO_MEDIA.desktop : HERO_MEDIA.mobile);
    };

    selectMedia();
    mediaQuery.addEventListener("change", selectMedia);

    return () => mediaQuery.removeEventListener("change", selectMedia);
  }, []);

  useEffect(() => {
    backupTimerRef.current = setTimeout(
      () => setShowLogo(false),
      HIDE_DELAY_MS + 1000,
    );

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
    <section className="relative h-[100svh] w-full overflow-hidden">
      <picture className="absolute inset-0 block h-full w-full">
        <source media="(max-width: 767px)" srcSet={mobilePoster.src} />
        <Image
          src={desktopPoster}
          alt=""
          width={desktopPoster.width}
          height={desktopPoster.height}
          fetchPriority="high"
          sizes="100vw"
          className="h-full w-full object-cover object-center"
        />
      </picture>

      {activeMedia && (
        <video
          key={activeMedia.webm}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={activeMedia.poster}
          onLoadedData={startHideTimer}
          onCanPlay={startHideTimer}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={activeMedia.webm} type="video/webm" />
          <source src={activeMedia.mp4} type="video/mp4" />
        </video>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/30" />

      <div
        className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700 ${
          showLogo ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={logoWhite}
          alt="Majen logo"
          className="h-auto w-40 drop-shadow-xl sm:w-56 lg:w-72"
          priority
        />
      </div>

            {/* Sol alt reklam videosu */}
      {/* Sağ alt reklam videosu */}
<div className="absolute right-2 bottom-2 z-30 aspect-[9/16] w-[46vw] max-w-[190px] overflow-hidden shadow-2xl sm:right-3 sm:bottom-3 sm:w-[225px] sm:max-w-none md:w-[281px] lg:w-[357px] xl:w-[362px] 2xl:w-[368px]">
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    aria-label="Marmomac 2026 tanıtım videosu"
    className="block h-full w-full object-cover"
  >
    <source src="/videos/marmo.webm" type="video/webm" />
    <source src="/videos/marmo.mp4" type="video/mp4" />
  </video>
</div>

    </section>
  );
}
