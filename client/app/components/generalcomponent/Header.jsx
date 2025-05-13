// app/components/Header.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import logoBlack from "../../../public/images/majenlogo.png"
import logoWhite from "../../../public/images/logobeyaz.png"

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };
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
  `
  const logoSrc = scrolled ? logoBlack : logoWhite;
  const logoWidth = scrolled ? logoBlack.width : logoWhite.width;
  const logoHeight = scrolled ? logoBlack.height : logoWhite.height;

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-colors duration-300 
        ${scrolled ? "bg-white text-gray-900" : "bg-transparent text-white"}
      `}
    >
      <div className="max-w-screen mx-auto h-16 px-4 flex items-center justify-between">
        {/* Logo */}
         <Link href="/" className="inline-block">
            <Image
              src={logoSrc}
              alt="Majen logo"
              width={logoWidth}
              height={logoHeight}
              className="w-[100px] h-auto"
              priority
            />
        </Link>

        {/* Navbar */}
        <nav className="flex space-x-8 text-[16px] lg:text-[18px]">
          <Link href="#"  className={linkClasses}>Home</Link>
          <Link href="#" className={linkClasses}>Pages</Link>
          <Link href="#" className={linkClasses}>Shop</Link>
          <Link href="#" className={linkClasses}>Projects</Link>
          <Link href="#" className={linkClasses}>Blog</Link>
          <Link href="#" className={linkClasses}>Contact Us</Link>
        </nav>

        {/* Call-to / Cart */}
        <div className="flex items-center space-x-6">
          <span className="whitespace-nowrap">Call us: 06 458 968 365</span>
          <Link href="/cart" >
            <div className="relative">
              <FiShoppingCart size={20} />
              <span className="
                absolute -top-2 -right-2
                w-5 h-5 text-xs flex items-center justify-center
                rounded-full bg-red-500 text-white
              ">
                0
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
