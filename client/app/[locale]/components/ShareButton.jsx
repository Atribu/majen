// app/components/ShareButton.jsx
"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import { FiShare2, FiCheck, FiLink, FiX } from "react-icons/fi";

export default function ShareButton({
  title,
  text,
  url,
  className = "",
  label = "Share",
  variant = "button", // "icon" | "button" | "floating"
}) {
  const pathname = usePathname();
  const [origin, setOrigin] = useState("");
  const [pageTitle, setPageTitle] = useState(title || "Majen"); // <-- SSR-safe
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // SSR'da yok; client'ta set et
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    // title prop verilmemişse, client'ta document.title'ı çek
    if (!title && typeof document !== "undefined") {
      setPageTitle(document.title || "Majen");
    }
  }, [title]);

  const shareUrl = useMemo(
    () => (url ? url : `${origin}${pathname || ""}`),
    [origin, pathname, url]
  );

  const shareText = text || "";

  const links = useMemo(() => {
    const u = encodeURIComponent(shareUrl);
    const t = encodeURIComponent(pageTitle);
    const tt = encodeURIComponent(shareText || pageTitle);
    return {
      whatsapp: `https://wa.me/?text=${tt}%20${u}`,
      telegram: `https://t.me/share/url?url=${u}&text=${tt}`,
      x:        `https://twitter.com/intent/tweet?url=${u}&text=${tt}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      email:    `mailto:?subject=${t}&body=${tt}%0A${u}`,
    };
  }, [shareUrl, pageTitle, shareText]);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const tryNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: pageTitle, text: shareText, url: shareUrl });
        setCopied(false);
        return;
      } catch {
        // kullanıcı iptal edebilir -> fallback menü
      }
    }
    setOpen((v) => !v);
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const baseBtn = "inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 transition";
  const iconBtn = "inline-flex items-center justify-center rounded-full border border-neutral-300 p-2 hover:bg-neutral-50 transition";
  const floatingBtn = "fixed bottom-5 right-5 z-[1000] shadow-lg bg-white " + iconBtn;

  return (
    <div className={`relative ${variant === "floating" ? "" : "inline-block"} ${className}`} ref={menuRef}>
      {variant === "icon" && (
        <button aria-label={label} onClick={tryNativeShare} className={iconBtn}>
          <FiShare2 />
        </button>
      )}
      {variant === "button" && (
        <button onClick={tryNativeShare} className={baseBtn}>
          <FiShare2 /> {label}
        </button>
      )}
      {variant === "floating" && (
        <button aria-label={label} onClick={tryNativeShare} className={floatingBtn}>
          <FiShare2 />
        </button>
      )}

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white shadow-xl">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <span className="text-sm font-semibold">Share</span>
            <button aria-label="Close" onClick={() => setOpen(false)} className="p-1 rounded hover:bg-neutral-100">
              <FiX />
            </button>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 rounded-lg border px-2 py-1.5">
              <FiLink className="shrink-0" />
              <span className="text-xs truncate">{shareUrl}</span>
              <button onClick={copyUrl} className="ml-auto rounded-md border px-2 py-0.5 text-xs hover:bg-neutral-50">
                {copied ? <span className="inline-flex items-center gap-1"><FiCheck /> Copied</span> : "Copy"}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <a className="rounded-md border px-2 py-2 text-center hover:bg-neutral-50" href={links.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a className="rounded-md border px-2 py-2 text-center hover:bg-neutral-50" href={links.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
              <a className="rounded-md border px-2 py-2 text-center hover:bg-neutral-50" href={links.x} target="_blank" rel="noopener noreferrer">X</a>
              <a className="rounded-md border px-2 py-2 text-center hover:bg-neutral-50" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="rounded-md border px-2 py-2 text-center hover:bg-neutral-50" href={links.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a className="rounded-md border px-2 py-2 text-center hover:bg-neutral-50" href={links.email}>Email</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
