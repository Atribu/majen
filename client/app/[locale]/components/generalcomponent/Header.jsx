// app/components/Header.jsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { routing } from "@/i18n/routing";
import LangSwitcher from '@/LangSwitcher';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import logoBlack from "@/public/images/majenlogo.png";
import logoWhite from "@/public/images/logobeyaz.png";

export default function Header() {

  const t = useTranslations('Header');
  
  const pathname = usePathname();
  const isHome = pathname === "/tr" || pathname === "/en";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    // Home sayfasındaysak, mount anında scroll durumu kontrolü
    setScrolled(window.scrollY > window.innerHeight);
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);
  

  // Link hover underline animasyonu
  const linkClasses = `
    relative
    before:content-['']
    before:absolute before:left-0 before:bottom-0
    before:h-[2px] before:w-0 before:bg-current
    before:transition-all before:duration-300
    hover:before:w-full
  `;

  // Sidebar linklar için koyu renk tehcili
  const linkSidebar = `
    ${linkClasses}
    text-gray-900 block py-2
  `;

  // header durumu: scrolled veya non-home
  const headerScrolled = scrolled;

  // Logo seçimi
  const logoSrc = headerScrolled ? logoBlack : logoWhite;
  const logoWidth = headerScrolled ? logoBlack.width : logoWhite.width;
  const logoHeight = headerScrolled ? logoBlack.height : logoWhite.height;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
        ${headerScrolled ? "bg-white text-gray-900" : "bg-transparent text-white"}`}
    >
      <div className="max-w-screen mx-auto h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="inline-block">
            <Image
              src={logoSrc}
              alt="Majen logo"
              width={logoWidth}
              height={logoHeight}
              className="w-[70px] lg:w-[100px] h-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex space-x-8 text-[16px] lg:text-[18px]">
        <Link href="/" className={linkClasses}>{t('home')}</Link>
      <Link href="/pages" className={linkClasses}>{t('pages')}</Link>
      <Link href="/shop" className={linkClasses}>{t('shop')}</Link>
      <Link href="/projects" className={linkClasses}>{t('projects')}</Link>
      <Link href="/blog" className={linkClasses}>{t('blog')}</Link>
      <Link href="/contactus" className={linkClasses}>{t('contactUs')}</Link>
        </nav>

        {/* Mobile Menu Button & Cart */}
        <div className="flex items-center space-x-4">
          <button
            className={`lg:hidden focus:outline-none ${headerScrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu size={24} />
          </button>
            <LangSwitcher className="uppercase" />
          <Link
            href="tel:+905335561092"
            className={`whitespace-nowrap hidden sm:inline transition-colors ${headerScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
          >
            {t('callUs')}
          </Link>
          <Link href="/cart">
            <div className="relative">
              <FiShoppingCart size={20} className={headerScrolled ? 'text-gray-900' : 'text-white'} />
              <span className="absolute -top-2 -right-2 w-4 h-4 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
                0
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white text-gray-900 z-50 transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setMenuOpen(false)} className="focus:outline-none text-gray-900">
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
        <Link href="/" className={linkClasses}>{t('home')}</Link>
      <Link href="/pages" className={linkClasses}>{t('pages')}</Link>
      <Link href="/shop" className={linkClasses}>{t('shop')}</Link>
      <Link href="/projects" className={linkClasses}>{t('projects')}</Link>
      <Link href="/blog" className={linkClasses}>{t('blog')}</Link>
      <Link href="/contactus" className={linkClasses}>{t('contactUs')}</Link>
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
