// app/components/Header.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-colors duration-300
        ${scrolled ? "bg-white text-gray-900" : "bg-transparent text-white"}
      `}
    >
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif">
         Majen
        </Link>

        {/* Navbar */}
        <nav className="flex space-x-8">
          <Link href="#" className="hover:underline">Home</Link>
          <Link href="#" className="hover:underline">Pages</Link>
          <Link href="#" className="hover:underline">Shop</Link>
          <Link href="#" className="hover:underline">Projects</Link>
          <Link href="#" className="hover:underline">Blog</Link>
          <Link href="#" className="hover:underline">Contact Us</Link>
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
