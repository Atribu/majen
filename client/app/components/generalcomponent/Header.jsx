// app/components/Header.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import logoBlack from "../../../public/images/majenlogo.png";
import logoWhite from "../../../public/images/logobeyaz.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClasses = `
      relative
    before:content-['']
    before:absolute before:left-0 before:bottom-0
    before:h-[2px] before:w-0 before:bg-current
    before:transition-all before:duration-300
    hover:before:w-full
  `;
  
  const linkClasses2 = `
  relative
  text-gray-900
  before:content-['']
  before:absolute before:left-0 before:bottom-0
  before:h-[2px] before:w-0 before:bg-current
  before:transition-all before:duration-300
  hover:before:w-full
  block py-2
`;

  const logoSrc = scrolled ? logoBlack : logoWhite;
  const logoWidth = scrolled ? logoBlack.width : logoWhite.width;
  const logoHeight = scrolled ? logoBlack.height : logoWhite.height;

  return (
    <header
      className={
        `fixed top-0 left-0 w-full z-50 transition-colors duration-300
         ${scrolled ? "bg-white text-gray-900" : "bg-transparent text-white"}`
      }
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
          <Link href="/" className={linkClasses}>Home</Link>
          <Link href="/pages" className={linkClasses}>Pages</Link>
          <Link href="/shop" className={linkClasses}>Shop</Link>
          <Link href="/projects" className={linkClasses}>Projects</Link>
          <Link href="/blog" className={linkClasses}>Blog</Link>
          <Link href="/contact-us" className={linkClasses}>Contact Us</Link>
        </nav>

        {/* Mobile Menu Button & Cart */}
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden focus:outline-none text-white lg:text-gray-900"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu size={24} />
          </button>
          <Link href="tel:+905335561092" className="whitespace-nowrap hidden sm:inline">Call us: +90 533 556 10 92</Link>
          <Link href="/cart">
            <div className="relative">
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
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
          <Link href="/" className={linkClasses2} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/pages" className={linkClasses2} onClick={() => setMenuOpen(false)}>Pages</Link>
          <Link href="/shop" className={linkClasses2} onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/projects" className={linkClasses2} onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/blog" className={linkClasses2} onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/contact-us" className={linkClasses2} onClick={() => setMenuOpen(false)}>Contact Us</Link>
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
