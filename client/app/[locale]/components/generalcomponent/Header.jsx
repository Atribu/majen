// app/components/Header.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LangSwitcher from "@/LangSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import logoBlack from "@/public/images/majenlogo.png";
import logoWhite from "@/public/images/logobeyaz.png";

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const isHome = pathname === "/tr" || pathname === "/en";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const firstMenuLinkRef = useRef(null);

  // Scroll durumuna göre header stili
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const setByScroll = () => setScrolled(window.scrollY > window.innerHeight);
    setByScroll();
    window.addEventListener("scroll", setByScroll);
    return () => window.removeEventListener("scroll", setByScroll);
  }, [isHome]);

  // ESC ile kapat + ilk linke odak
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Body scroll kilidi + focus
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstMenuLinkRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  // Route değişince menüyü kapat
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Link hover underline animasyonu
  const linkClasses = `
    relative
    before:content-['']
    before:absolute before:left-0 before:bottom-0
    before:h-[2px] before:w-0 before:bg-current
    before:transition-all before:duration-300
    hover:before:w-full
    focus:outline-none
  `;

  const headerScrolled = scrolled;

  // Logo seçimi (üst header için)
  const logoSrc = headerScrolled ? logoBlack : logoWhite;
  const logoWidth = headerScrolled ? logoBlack.width : logoWhite.width;
  const logoHeight = headerScrolled ? logoBlack.height : logoWhite.height;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        headerScrolled ? "bg-white text-gray-900 shadow-sm" : "bg-transparent text-white"
      }`}
    >
      {/* Sol (Hamburger) - Orta (Logo; absolute merkez) - Sağ (Aksiyonlar) */}
      <div className="relative max-w-screen mx-auto h-14 sm:h-16 px-3 sm:px-4 flex items-center justify-between">
        {/* SOL: Hamburger */}
        <div className="order-1 ml-2 sm:ml-4 lg:ml-20">
          <button
            className={`p-2 -m-2 focus:outline-none ${headerScrolled ? "text-gray-900" : "text-white"}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Menüyü aç"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <FiMenu className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        </div>

        {/* ORTA: LOGO (gerçek ortalama) */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Majen Home">
          <Image
            src={logoSrc}
            alt="Majen logo"
            width={logoWidth}
            height={logoHeight}
            className="w-[64px] sm:w-[84px] lg:w-[104px] h-auto"
            priority
          />
        </Link>

        {/* SAĞ: Aksiyonlar */}
        <div className="flex items-center gap-2 sm:gap-3 order-3">
          <LangSwitcher className="uppercase" />
          <Link
            href="tel:+905335561092"
            className={`hidden md:inline whitespace-nowrap transition-colors mr-2 sm:mr-4 lg:mr-20 ${
              headerScrolled ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-gray-200"
            }`}
          >
            {t("callUs")}
          </Link>
        </div>
      </div>

      {/* Sidebar — SOLDAN açılır, glassmorphism, beyaz yazılar */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] transform transition-transform duration-300
        w-[90%] sm:w-80 md:w-96
        bg-white/20 backdrop-blur-md supports-[backdrop-filter]:bg-white/20
        ring-1 ring-white/40
        text-white
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Sidebar Üst: Logo + Kapat */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <Link
            href="/"
            aria-label="Majen Home (sidebar logo)"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src={logoWhite}
              alt="Majen logo"
              width={logoWhite.width}
              height={logoWhite.height}
              className="h-8 w-auto"
              priority={false}
            />
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 -m-2 focus:outline-none cursor-pointer text-white"
            aria-label="Menüyü kapat"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <hr className="border-white/30" />

        {/* Menü Linkleri */}
        <nav className="flex flex-col gap-3 sm:gap-4 p-4 text-base md:text-lg">
          <Link
            href="/"
            className={linkClasses}
            onClick={() => setMenuOpen(false)}
            ref={firstMenuLinkRef}
          >
            {t("home")}
          </Link>
          <Link href="/pages" className={linkClasses} onClick={() => setMenuOpen(false)}>
            {t("pages")}
          </Link>
          <Link href="/shop" className={linkClasses} onClick={() => setMenuOpen(false)}>
            {t("shop")}
          </Link>
          <Link href="/projects" className={linkClasses} onClick={() => setMenuOpen(false)}>
            {t("projects")}
          </Link>
          <Link href="/blog" className={linkClasses} onClick={() => setMenuOpen(false)}>
            {t("blog")}
          </Link>
          <Link href="/contactus" className={linkClasses} onClick={() => setMenuOpen(false)}>
            {t("contactUs")}
          </Link>
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
          aria-label="Menüyü kapat (arka plan)"
        />
      )}
    </header>
  );
}
