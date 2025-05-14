// app/components/LocaleSwitcherSelect.jsx
"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

export default function LocaleSwitcherSelect({ children, defaultValue, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  // Scroll durumunu takip et
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    // Başlangıç kontrolü
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll konumunu hatırlayıp geri yükle
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, Number(saved));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [pathname]);

  function handleLangChange(lang) {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    setIsOpen(false);
    startTransition(() => {
      const currentLocale = pathname.split('/')[1];
      const newPath = pathname.replace(`/${currentLocale}`, `/${lang}`);
      router.replace(newPath);
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-md px-3 py-2 uppercase w-full text-[16px] transition-colors duration-200
          ${scrolled ? 'text-black' : 'text-white'}`}
      >
        {defaultValue}
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white shadow-lg left-0 w-full rounded">
          <ul>
            {React.Children.map(children, (child) =>
              child.props.value === defaultValue ? null : (
                <li
                  key={child.props.value}
                  className="cursor-pointer px-4 py-2 uppercase hover:bg-black hover:text-white text-black text-center"
                  onClick={() => handleLangChange(child.props.value)}
                >
                  {child.props.value}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
