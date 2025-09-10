// app/components/ModernSidebar.jsx
"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import { Home, LayoutGrid, ShoppingBag, FolderKanban, Newspaper, Phone } from "lucide-react";

export default function ModernSidebar({
  menuOpen,
  setMenuOpen,
  t,
  logoWhite,
}) {
  const pathname = usePathname();
  const dialogRef = useRef(null);
  const firstLinkRef = useRef(null);
  const lastFocusableRef = useRef(null);
  const touchStartX = useRef(null);

  // Scroll lock + focus trap + ESC
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    }
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (e.key === "Tab" && dialogRef.current) {
        // basic focus trap
        const focusables = dialogRef.current.querySelectorAll(
          "a,button,input,select,textarea,[tabindex]:not([tabindex='-1'])"
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  // Swipe to close (mobile)
  const onTouchStart = (e) => { touchStartX.current = e.touches?.[0]?.clientX ?? null; };
  const onTouchMove = (e) => {
    const start = touchStartX.current; if (start == null) return;
    const dx = e.touches?.[0]?.clientX - start;
    if (dx < -60) { setMenuOpen(false); touchStartX.current = null; }
  };
  const onTouchEnd = () => { touchStartX.current = null; };

  // Link helper
  const linkBase =
    "group inline-flex items-center gap-3 rounded-xl px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  const linkIdle =
    "text-white/90 hover:text-white hover:bg-white/10 transition-colors";
  const activeStyles =
    "text-white bg-white/15 ring-1 ring-white/25";

  const NAV = [
    { href: "/", label: t("home"), icon: <Home className="h-5 w-5" /> },
    { href: "/pages", label: t("pages"), icon: <LayoutGrid className="h-5 w-5" /> },
    { href: "/shop", label: t("shop"), icon: <ShoppingBag className="h-5 w-5" /> },
    { href: "/projects", label: t("projects"), icon: <FolderKanban className="h-5 w-5" /> },
    { href: "/blog", label: t("blog"), icon: <Newspaper className="h-5 w-5" /> },
    { href: "/contactus", label: t("contactUs"), icon: <Phone className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[59] bg-black/40 backdrop-blur-[1px] transition-opacity
        ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`fixed inset-y-0 left-0 z-[60] w-[88%] xs:w-[85%] sm:w-80 md:w-96
        translate-x-0 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        outline-none`}
      >
        {/* Glass panel with gradient border */}
        <div
          className="relative h-full bg-white/15 supports-[backdrop-filter]:bg-white/10 backdrop-blur-xl
          ring-1 ring-white/25 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.45)]
          before:absolute before:inset-0 before:rounded-none
          before:pointer-events-none before:[mask-composite:exclude]
          before:[mask:linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)]
          before:[-webkit-mask-composite:xor] before:p-[1px]
          before:bg-[linear-gradient(135deg,rgba(255,255,255,.65),rgba(255,255,255,.1)_40%,rgba(147,197,253,.4))]
          "
        >
          {/* Safe area padding */}
          <div className="h-full flex flex-col pt-[max(env(safe-area-inset-top),12px)] pb-[max(env(safe-area-inset-bottom),12px)]">
            {/* Header */}
            <div className="px-4 pt-2 pb-2 flex items-center justify-between">
              <Link
                href="/"
                aria-label="Majen Home"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-lg"
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
                ref={lastFocusableRef}
                onClick={() => setMenuOpen(false)}
                className="p-2 -m-2 text-white/90 hover:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Close menu"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <hr className="border-white/20" />

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {NAV.map((item, idx) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    ref={idx === 0 ? firstLinkRef : null}
                    className={`${linkBase} ${active ? activeStyles : linkIdle}`}
                    style={{
                      // staggered fade/slide in
                      animation: menuOpen
                        ? `sidebarIn 380ms ease-out ${idx * 40}ms both`
                        : "none",
                    }}
                  >
                    <span
                      className={`shrink-0 transition-transform ${
                        active ? "scale-100" : "group-hover:scale-110"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-white/80 shadow-[0_0_12px_2px_rgba(255,255,255,.55)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer (mini) */}
            <div className="px-4 py-3 text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span>© {new Date().getFullYear()} Majen</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    className="hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                    aria-label="Instagram"
                  >
                    IG
                  </a>
                  <a
                    href="https://dribbble.com"
                    className="hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                    aria-label="Dribbble"
                  >
                    DB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 1ms !important;
            scroll-behavior: auto !important;
          }
        }
        @keyframes sidebarIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
